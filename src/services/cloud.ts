import { supabase } from './supabaseClient';
import {
  DailyTask,
  ProjectItem,
  ResumeData,
  DeveloperProfileData,
  PersonalityResult,
  UserProfile,
} from '../types';
import { SAMPLE_DAILY_TASKS, SAMPLE_PROJECTS } from '../data/initialData';

/**
 * Supabase-backed persistence for per-user progress.
 * Every function throws on failure so callers can fall back
 * to browser-local storage (offline / not signed in).
 */

export interface SessionUser {
  id: string;
  email: string;
}

export async function sessionUser(): Promise<SessionUser | null> {
  try {
    const { data } = await supabase.auth.getSession();
    const u = data.session?.user;
    if (!u) return null;
    return { id: u.id, email: u.email || '' };
  } catch {
    return null;
  }
}

/**
 * Ensure the profiles row exists (FK targets need it before seeding).
 * INSERT-ONLY: if the row already exists it is left completely untouched.
 * (An upsert here used to overwrite the student's saved name with the
 * email prefix on every page load — wiping Settings changes.)
 */
export async function ensureProfileRow(id: string, email: string, fullName?: string): Promise<void> {
  const { data, error } = await supabase.from('profiles').select('id').eq('id', id).maybeSingle();
  if (error) throw error;
  if (data) return;
  const { error: insErr } = await supabase.from('profiles').insert({
    id,
    email,
    full_name: fullName || email.split('@')[0] || 'Student',
    updated_at: new Date().toISOString(),
  });
  // 23505 = another parallel call won the race and inserted first. Fine.
  if (insErr && (insErr as any).code !== '23505') throw insErr;
}

/* ------------------------------------------------------------------ */
/* Daily tasks                                                         */
/* ------------------------------------------------------------------ */

type DbTaskStatus = 'pending' | 'completed' | 'skipped';

/** DB check constraint has no 'in_progress' — store it as pending. */
function toDbStatus(s: DailyTask['status']): DbTaskStatus {
  return s === 'completed' ? 'completed' : s === 'skipped' ? 'skipped' : 'pending';
}

function rowToTask(row: any): DailyTask {
  return {
    id: String(row.id),
    title: row.title || 'Untitled task',
    description: row.topic || '',
    estimatedMinutes: Number(row.estimated_minutes) || 60,
    difficulty: row.difficulty || 'Medium',
    status: row.status === 'completed' ? 'completed' : row.status === 'skipped' ? 'skipped' : 'pending',
    category: row.category || 'coding',
    xpReward: Number(row.xp_reward) || 100,
    resourceLink: row.resource_url || undefined,
    dayNumber: Number(row.day_number) || 1,
    stageId: Number(row.stage_number) || 1,
    updatedAt: row.updated_at || undefined,
  };
}

/** Seed a personal task list for a career stage (namespaced ids per user). */
export async function seedTasks(userId: string, stage: number): Promise<DailyTask[]> {
  const prefix = userId.replace(/-/g, '').slice(0, 8);
  const rows = SAMPLE_DAILY_TASKS.map((t, i) => ({
    id: `${prefix}-${t.id}`,
    user_id: userId,
    day_number: t.dayNumber || i + 1,
    stage_number: stage,
    title: t.title,
    topic: t.description || t.title,
    estimated_minutes: t.estimatedMinutes || 60,
    difficulty: t.difficulty || 'Medium',
    status: 'pending',
    category: t.category || 'coding',
    xp_reward: t.xpReward || 100,
    resource_url: t.resourceLink || t.docLink || null,
  }));
  const { error } = await supabase.from('daily_tasks').upsert(rows, { onConflict: 'id' });
  if (error) throw error;
  return rows.map(rowToTask);
}

export async function fetchTasks(userId: string): Promise<DailyTask[]> {
  const { data, error } = await supabase
    .from('daily_tasks')
    .select('*')
    .eq('user_id', userId)
    .order('day_number', { ascending: true });
  if (error) throw error;
  return (data || []).map(rowToTask);
}

export async function saveTaskStatus(userId: string, task: DailyTask): Promise<void> {
  const { error } = await supabase.from('daily_tasks').upsert(
    {
      id: task.id,
      user_id: userId,
      day_number: task.dayNumber || 1,
      stage_number: task.stageId || 1,
      title: task.title,
      topic: task.description || task.title,
      estimated_minutes: task.estimatedMinutes || 60,
      difficulty: task.difficulty || 'Medium',
      status: toDbStatus(task.status),
      category: task.category || 'coding',
      xp_reward: task.xpReward || 100,
      resource_url: task.resourceLink || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );
  if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

function rowToProject(row: any): ProjectItem {
  return {
    id: String(row.id),
    title: row.title || 'Untitled project',
    description: row.description || '',
    stageNumber: Number(row.stage_number) || 1,
    difficulty: row.difficulty || 'Medium (2-3 weeks)',
    durationWeeks: Math.max(1, Math.round((Number(row.estimated_hours) || 24) / 8)),
    techStack: row.tech_stack || [],
    status: row.status === 'completed' ? 'completed' : row.status === 'in_progress' ? 'in_progress' : 'not_started',
    progressPercentage: Number(row.progress_percentage) || 0,
    milestones: Array.isArray(row.milestones) ? row.milestones : [],
    repoUrl: row.repository_url || undefined,
    liveDemoUrl: row.live_demo_url || undefined,
  };
}

function projectToRow(userId: string, p: ProjectItem): any {
  return {
    id: p.id,
    user_id: userId,
    title: p.title,
    description: p.description || '',
    stage_number: p.stageNumber || p.stage || 1,
    difficulty: p.difficulty || 'Medium (2-3 weeks)',
    estimated_hours: (p.durationWeeks || 3) * 8,
    status: p.status,
    progress_percentage: p.progressPercentage || 0,
    tech_stack: p.techStack || [],
    repository_url: p.repoUrl || null,
    live_demo_url: p.liveDemoUrl || null,
    milestones: p.milestones || [],
    updated_at: new Date().toISOString(),
  };
}

export async function seedProjects(userId: string, stage: number): Promise<ProjectItem[]> {
  const prefix = userId.replace(/-/g, '').slice(0, 8);
  const items = SAMPLE_PROJECTS.map((p) => ({ ...p, id: `${prefix}-${p.id}`, stageNumber: stage }));
  const { error } = await supabase.from('user_projects').upsert(items.map((p) => projectToRow(userId, p)), {
    onConflict: 'id',
  });
  if (error) throw error;
  return items;
}

export async function fetchProjects(userId: string): Promise<ProjectItem[]> {
  const { data, error } = await supabase.from('user_projects').select('*').eq('user_id', userId);
  if (error) throw error;
  return (data || []).map(rowToProject);
}

export async function saveProject(userId: string, project: ProjectItem): Promise<void> {
  const { error } = await supabase.from('user_projects').upsert(projectToRow(userId, project), {
    onConflict: 'id',
  });
  if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Job / internship applications                                       */
/* ------------------------------------------------------------------ */

export interface AppRecord {
  opportunityId: string;
  kind: 'internship' | 'job';
  company: string;
  role: string;
  status: string;
}

export async function fetchApplications(userId: string): Promise<AppRecord[]> {
  const { data, error } = await supabase.from('job_applications').select('*').eq('user_id', userId);
  if (error) throw error;
  return (data || []).map((r: any) => ({
    opportunityId: String(r.opportunity_id),
    kind: r.opportunity_type === 'job' ? 'job' : 'internship',
    company: r.company || '',
    role: r.role || '',
    status: r.status || 'applied',
  }));
}

export async function recordApplication(
  userId: string,
  rec: { kind: 'internship' | 'job'; opportunityId: string; company: string; role: string; status: 'saved' | 'applied' }
): Promise<void> {
  const { data: existing, error: selErr } = await supabase
    .from('job_applications')
    .select('id')
    .eq('user_id', userId)
    .eq('opportunity_id', rec.opportunityId)
    .order('applied_at', { ascending: false })
    .limit(1);
  if (selErr) throw selErr;
  if (existing && existing.length > 0) {
    const { error } = await supabase.from('job_applications').update({ status: rec.status }).eq('id', existing[0].id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('job_applications').insert({
      user_id: userId,
      opportunity_type: rec.kind,
      opportunity_id: rec.opportunityId,
      company: rec.company,
      role: rec.role,
      status: rec.status,
    });
    if (error) throw error;
  }
}

/* ------------------------------------------------------------------ */
/* Resume                                                              */
/* ------------------------------------------------------------------ */

export async function fetchResume(userId: string): Promise<ResumeData | null> {
  const { data, error } = await supabase.from('user_resumes').select('*').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    personalInfo: data.personal_info,
    summary: data.summary || '',
    education: data.education || [],
    skills: data.skills || [],
    experience: data.experience || [],
    projects: data.projects || [],
    certifications: data.certifications || [],
    achievements: data.achievements || [],
    templateId: data.template_id || 'modern-tech',
    atsScore: data.ats_score ?? 88,
  };
}

export async function saveResume(userId: string, resume: ResumeData): Promise<void> {
  const { error } = await supabase.from('user_resumes').upsert(
    {
      user_id: userId,
      personal_info: resume.personalInfo,
      summary: resume.summary,
      education: resume.education,
      skills: resume.skills,
      experience: resume.experience,
      projects: resume.projects,
      certifications: resume.certifications || [],
      achievements: resume.achievements || [],
      template_id: resume.templateId || 'modern-tech',
      ats_score: resume.atsScore ?? 88,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
  if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Developer profile                                                   */
/* ------------------------------------------------------------------ */

export async function fetchDevProfile(userId: string, email: string): Promise<DeveloperProfileData | null> {
  const { data, error } = await supabase.from('developer_profiles').select('*').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    username: data.username || email.split('@')[0],
    fullName: data.full_name || '',
    avatarUrl: data.avatar_url || '',
    title: data.title || '',
    bio: data.bio || '',
    careerGoal: data.career_goal || '',
    location: data.location || '',
    githubHandle: data.github_handle || '',
    linkedinHandle: data.linkedin_handle || '',
    website: data.website || '',
    education: data.education || '',
    badges: data.badges || [],
    topSkills: data.top_skills || [],
    pinnedProjects: data.pinned_projects || [],
    activityHeatmap: data.activity_heatmap || [],
    certifications: data.certifications || [],
    stats: data.stats || { tasksCompleted: 0, hoursLearned: 0, streakDays: 0, projectsFinished: 0 },
  };
}

export async function saveDevProfile(userId: string, email: string, profile: DeveloperProfileData): Promise<void> {
  const username =
    profile.username || `${email.split('@')[0] || 'dev'}-${userId.replace(/-/g, '').slice(0, 4)}`;
  const { error } = await supabase.from('developer_profiles').upsert(
    {
      user_id: userId,
      username,
      full_name: profile.fullName,
      avatar_url: profile.avatarUrl || null,
      title: profile.title || null,
      bio: profile.bio || null,
      career_goal: profile.careerGoal || null,
      location: profile.location || null,
      github_handle: profile.githubHandle || null,
      linkedin_handle: profile.linkedinHandle || null,
      website: profile.website || null,
      education: profile.education || null,
      badges: profile.badges || [],
      top_skills: profile.topSkills || [],
      pinned_projects: profile.pinnedProjects || [],
      activity_heatmap: profile.activityHeatmap || [],
      certifications: profile.certifications || [],
      stats: profile.stats || { tasksCompleted: 0, hoursLearned: 0, streakDays: 0, projectsFinished: 0 },
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
  if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Assessment history                                                  */
/* ------------------------------------------------------------------ */

export async function saveAssessment(userId: string, result: PersonalityResult): Promise<void> {
  const { error } = await supabase.from('riasec_assessments').insert({
    user_id: userId,
    scores: result.scores,
    dominant_code: result.dominantCode,
    personality_title: result.personalityTitle,
    description: result.description,
    strengths: result.strengths || [],
    work_style: result.workStyle,
    recommended_domain: result.recommendedDomain,
    recommended_field: result.recommendedField,
    recommendations: result.recommendations || [],
  });
  if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Authoritative profile read (XP math must use cloud truth)           */
/* ------------------------------------------------------------------ */

export async function fetchUserRow(userId: string): Promise<any | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  if (error) throw error;
  return data || null;
}

export function profileRowToPartial(row: any): Partial<UserProfile> {
  return {
    overallProgress: row.overall_progress ?? 0,
    totalHoursLearned: row.total_hours_learned ?? 0,
    xpPoints: row.xp_points ?? 0,
    currentStreakDays: row.current_streak_days ?? 0,
    currentStage: row.current_stage ?? 1,
  };
}

/* ------------------------------------------------------------------ */
/* Daily-login engine: streak + stage are EARNED by showing up daily   */
/*  - streak: consecutive login days (a missed day resets to 1)        */
/*  - total active days drive the stage: 15 active days per stage      */
/* ------------------------------------------------------------------ */

/** Local calendar day as 'YYYY-MM-DD' (not UTC — streaks are human days). */
export function loginDayString(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysBetweenDayStrings(a: string, b: string): number {
  const pa = a.split('-').map(Number);
  const pb = b.split('-').map(Number);
  const da = new Date(pa[0], pa[1] - 1, pa[2]).getTime();
  const db = new Date(pb[0], pb[1] - 1, pb[2]).getTime();
  return Math.round((db - da) / 86400000);
}

/** Stage from total active login days: 15 active days per stage, max 6. */
export function stageForActiveDays(totalLoginDays: number): number {
  return Math.min(6, Math.floor(Math.max(0, totalLoginDays) / 15) + 1);
}

export interface DailyLoginResult {
  streak: number;
  totalDays: number;
  stage: number;
  counted: boolean; // false when today was already counted
  leveledUp: boolean;
}

/** Pure transition — same rules for cloud rows and local profiles. */
export function nextLoginState(
  prev: { lastLoginDate?: string; currentStreakDays?: number; totalLoginDays?: number; currentStage?: number },
  today: string = loginDayString()
): DailyLoginResult {
  const last = prev.lastLoginDate || '';
  const prevStreak = prev.currentStreakDays ?? 0;
  const prevTotal = prev.totalLoginDays ?? 0;
  const prevStage = prev.currentStage ?? 1;
  if (last === today) {
    return { streak: prevStreak, totalDays: prevTotal, stage: prevStage, counted: false, leveledUp: false };
  }
  const consecutive = last !== '' && daysBetweenDayStrings(last, today) === 1;
  const streak = consecutive ? prevStreak + 1 : 1;
  const totalDays = prevTotal + 1;
  const stage = Math.max(prevStage, stageForActiveDays(totalDays));
  return { streak, totalDays, stage, counted: true, leveledUp: stage > prevStage };
}

/**
 * Record today's login for a Supabase user. Idempotent — calling twice
 * on the same day counts once. Returns the new values + level-up flag.
 */
export async function recordDailyLogin(userId: string): Promise<DailyLoginResult> {
  const row = await fetchUserRow(userId);
  if (!row) throw new Error('no profile row');
  const next = nextLoginState(
    {
      lastLoginDate: row.last_login_date || undefined,
      currentStreakDays: row.current_streak_days ?? 0,
      totalLoginDays: row.total_login_days ?? 0,
      currentStage: row.current_stage ?? 1,
    },
    loginDayString()
  );
  if (!next.counted) return next;
  const { error } = await supabase
    .from('profiles')
    .update({
      last_login_date: loginDayString(),
      current_streak_days: next.streak,
      total_login_days: next.totalDays,
      current_stage: next.stage,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
  if (error) throw error;
  return next;
}

/** Offline/demo mirror of the same rules on a local profile object. */
export function recordLocalDailyLogin<T extends UserProfile>(user: T): { user: T; leveledUp: boolean } {
  const next = nextLoginState(user, loginDayString());
  if (!next.counted) return { user, leveledUp: false };
  return {
    user: {
      ...user,
      lastLoginDate: loginDayString(),
      currentStreakDays: next.streak,
      totalLoginDays: next.totalDays,
      currentStage: next.stage,
    },
    leveledUp: next.leveledUp,
  };
}
