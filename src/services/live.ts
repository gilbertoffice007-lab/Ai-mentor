import { TechNewsItem, JobListing, InternshipItem } from '../types';

/**
 * Live external content (keyless public APIs, CORS-open).
 * Every fetcher times out fast and throws on failure so callers
 * can fall back to the bundled offline dataset.
 */

async function fetchJson<T>(url: string, timeoutMs = 9000): Promise<T> {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return (await res.json()) as T;
}

function timeAgo(iso: string | undefined): string {
  if (!iso) return 'recently';
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

/* ------------------------------------------------------------------ */
/* Tech news — Hacker News front page + top tech stories (live)        */
/* ------------------------------------------------------------------ */

interface HNHit {
  objectID: string;
  title?: string;
  url?: string | null;
  author?: string;
  points?: number;
  num_comments?: number;
  created_at?: string;
  _tags?: string[];
}

export async function fetchLiveNews(): Promise<TechNewsItem[]> {
  const data = await fetchJson<{ hits: HNHit[] }>(
    'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=24'
  );
  const hits = (data.hits || []).filter((h) => h.title);
  if (hits.length === 0) throw new Error('Empty HN response');
  return hits.map((h, i) => {
    const host = (() => {
      try {
        return h.url ? new URL(h.url).hostname.replace(/^www\./, '') : 'news.ycombinator.com';
      } catch {
        return 'news.ycombinator.com';
      }
    })();
    const category = /ai|llm|gpt|machine|neural/i.test(h.title || '')
      ? 'AI & ML'
      : /react|javascript|typescript|web|css|frontend/i.test(h.title || '')
        ? 'Web Dev'
        : /cloud|k8s|docker|devops|infra/i.test(h.title || '')
          ? 'Cloud & DevOps'
          : /hiring|job|career|interview/i.test(h.title || '')
            ? 'Careers'
            : 'Tech';
    return {
      id: `hn-${h.objectID}`,
      title: h.title || 'Untitled story',
      summary: `${h.points ?? 0} points · ${h.num_comments ?? 0} comments · by ${h.author || 'hn'} · live from Hacker News`,
      source: host,
      category,
      date: timeAgo(h.created_at),
      publishedAt: h.created_at,
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      tags: (h._tags || []).slice(0, 3),
      readTime: `${2 + ((h.objectID.charCodeAt(0) || 0) % 6)} min read`,
    } as TechNewsItem;
  });
}

/* ------------------------------------------------------------------ */
/* Jobs + internships — Arbeitnow (live) + Remotive (live)             */
/* ------------------------------------------------------------------ */

export interface LiveHints {
  careerTitle?: string;
  skills?: string[];
}

interface ArbeitnowJob {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  location: string;
  job_types: string[];
  url: string;
  created_at: number;
}

function matchScore(text: string, hints: LiveHints): number {
  const hay = text.toLowerCase();
  let score = 68;
  const terms = `${hints.careerTitle || ''} ${(hints.skills || []).join(' ')}`
    .toLowerCase()
    .split(/[^a-z#+]+/)
    .filter((t) => t.length > 2);
  for (const t of new Set(terms)) {
    if (hay.includes(t)) score += 3;
  }
  return Math.min(98, score);
}

function postedDaysAgo(createdAtSec: number | undefined): number {
  if (!createdAtSec) return 0;
  return Math.max(0, Math.round((Date.now() - createdAtSec * 1000) / 86400000));
}

function isInternLevel(title: string, description: string): boolean {
  return /intern|trainee|working student|apprentice|junior|graduate|entry[\s-]?level|fresher/i.test(
    `${title} ${description.slice(0, 500)}`
  );
}

export async function fetchArbeitnowJobs(): Promise<ArbeitnowJob[]> {
  const data = await fetchJson<{ data: ArbeitnowJob[] }>('https://www.arbeitnow.com/api/job-board-api');
  const jobs = data.data || [];
  if (jobs.length === 0) throw new Error('Empty Arbeitnow response');
  return jobs;
}

export async function fetchLiveJobs(hints: LiveHints = {}): Promise<JobListing[]> {
  const [arbeitnow, remotive] = await Promise.all([
    fetchArbeitnowJobs(),
    fetchJson<{ jobs: any[] }>('https://remotive.com/api/remote-jobs?category=software-dev&limit=40').catch(
      () => ({ jobs: [] })
    ),
  ]);

  const jobs: JobListing[] = arbeitnow
    .filter((j) => !isInternLevel(j.title, j.description || ''))
    .slice(0, 40)
    .map((j) => {
      const text = `${j.title} ${j.description || ''} ${j.company_name}`;
      const days = postedDaysAgo(j.created_at);
      return {
        id: `arbeitnow-${j.slug}`,
        company: j.company_name || 'Tech Company',
        title: j.title || 'Software Engineer',
        location: j.remote ? 'Remote' : j.location || 'On-site',
        jobType: (j.remote ? 'Remote' : 'Full-time') as JobListing['jobType'],
        experience: (j.job_types || []).join(' · ') || 'See posting',
        salary: '',
        salaryRange: '',
        skills: [],
        skillsRequired: extractSkills(text),
        matchScore: matchScore(text, hints),
        description: (j.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 280),
        responsibilities: [],
        requirements: [],
        postedDaysAgo: days,
        status: 'none',
        externalUrl: j.url,
      } as JobListing;
    });

  for (const r of (remotive.jobs || []).slice(0, 20)) {
    if (!r?.title) continue;
    const text = `${r.title} ${r.description || ''} ${r.company_name || ''}`;
    jobs.push({
      id: `remotive-${r.id}`,
      company: r.company_name || 'Remote Company',
      title: r.title,
      location: r.candidate_required_location || 'Remote',
      jobType: 'Remote',
      experience: r.job_type || 'See posting',
      salary: r.salary || '',
      salaryRange: '',
      skills: [],
      skillsRequired: extractSkills(`${text} ${(r.tags || []).join(' ')}`),
      matchScore: matchScore(text, hints),
      description: (r.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 280),
      responsibilities: [],
      requirements: [],
      postedDaysAgo: 0,
      status: 'none',
      externalUrl: r.url,
    } as JobListing);
  }

  if (jobs.length === 0) throw new Error('No live jobs assembled');
  return jobs;
}

export async function fetchLiveInternships(hints: LiveHints = {}): Promise<InternshipItem[]> {
  const arbeitnow = await fetchArbeitnowJobs();
  const items: InternshipItem[] = arbeitnow
    .filter((j) => isInternLevel(j.title, j.description || ''))
    .slice(0, 30)
    .map((j) => {
      const text = `${j.title} ${j.description || ''} ${j.company_name}`;
      return {
        id: `intern-${j.slug}`,
        company: j.company_name || 'Tech Company',
        role: j.title || 'Intern',
        location: j.remote ? 'Remote' : j.location || 'On-site',
        isRemote: !!j.remote,
        duration: (j.job_types || []).join(' · ') || 'See posting',
        stipend: 'See posting',
        skillsRequired: extractSkills(text),
        requiredSkills: [],
        description: (j.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 260),
        matchScore: matchScore(text, hints),
        status: 'none',
        externalUrl: j.url,
      } as InternshipItem;
    });
  if (items.length === 0) throw new Error('No live internships assembled');
  return items;
}

const SKILL_VOCAB = [
  'react', 'typescript', 'javascript', 'python', 'java', 'node', 'next', 'sql', 'postgres',
  'aws', 'docker', 'kubernetes', 'azure', 'gcp', 'figma', 'git', 'linux', 'go', 'rust',
  'flutter', 'angular', 'vue', 'django', 'fastapi', 'spring', 'ml', 'ai', 'data',
  'cybersecurity', 'devops', 'graphql', 'rest', 'firebase', 'mongodb', 'redis', 'ci/cd',
];

function extractSkills(text: string): string[] {
  const hay = ` ${text.toLowerCase()} `;
  const found = SKILL_VOCAB.filter((s) => hay.includes(s));
  return (found.length > 0 ? found : ['javascript', 'git', 'communication']).slice(0, 6);
}
