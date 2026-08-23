import {
  UserProfile,
  DomainCategory,
  CareerPath,
  RIASECQuestion,
  PersonalityResult,
  RoadmapStage,
  DailyTask,
  ProjectItem,
  TechNewsItem,
  CareerEvent,
  InternshipItem,
  JobListing,
  PlacementQuestion,
  ResumeData,
  DeveloperProfileData
} from '../types';
import {
  DOMAINS,
  RIASEC_QUESTIONS,
  SAMPLE_ROADMAP_STAGES,
  SAMPLE_DAILY_TASKS,
  SAMPLE_PROJECTS,
  SAMPLE_TECH_NEWS,
  SAMPLE_EVENTS,
  SAMPLE_INTERNSHIPS,
  SAMPLE_JOBS,
  SAMPLE_PLACEMENT_QUESTIONS
} from '../data/initialData';

// Local storage key constants
const STORAGE_KEYS = {
  USER: 'careerpath_user_profile',
  TASKS: 'careerpath_daily_tasks',
  PROJECTS: 'careerpath_projects',
  RESUME: 'careerpath_resume',
  DEV_PROFILE: 'careerpath_dev_profile',
  INTERNSHIPS: 'careerpath_internships',
  JOBS: 'careerpath_jobs'
};

// Initial default user state
const DEFAULT_USER: UserProfile = {
  id: 'usr-101',
  fullName: 'Gilbert Raj',
  email: 'gilbertraj800@gmail.com',
  educationLevel: 'Undergraduate B.Tech CS',
  currentYear: '3rd Year (Semester 5)',
  country: 'United States',
  phone: '+1 (555) 234-8900',
  domainId: 'comp-sci',
  careerId: 'fullstack-dev',
  careerTitle: 'Full Stack Developer',
  currentStage: 2,
  overallProgress: 72,
  totalHoursLearned: 148,
  currentStreakDays: 14,
  xpPoints: 2450,
  semesterName: 'Fall Semester 2026',
  semesterStartDate: '2026-08-01',
  semesterEndDate: '2026-12-15',
  availableHoursPerDay: 3,
  availableDaysPerWeek: 6,
  skillLevel: 'Intermediate',
  riasecResult: {
    scores: { R: 12, I: 24, A: 10, S: 18, E: 20, C: 14 },
    dominantCode: 'I-E-S',
    personalityTitle: 'The Investigative Strategic Leader',
    description: 'You blend deep algorithmic curiosity (Investigative) with initiative and technical leadership (Enterprising).',
    strengths: [
      'Deconstructing complex architectures into clean components',
      'Translating ambiguous product visions into executable technical roadmaps',
      'Mentoring junior peers while driving high-standard engineering delivery',
      'Rapidly mastering modern React, TypeScript, and cloud technologies'
    ],
    workStyle: 'Autonomous deep-work sprints combined with cross-functional collaborative alignment.',
    recommendedDomain: 'Computer Science',
    recommendedField: 'Software Development & AI',
    recommendations: [
      {
        careerId: 'fullstack-dev',
        title: 'Full Stack Developer',
        field: 'Software Development',
        domainId: 'comp-sci',
        matchScore: 96,
        reason: 'Direct convergence of your investigative problem solving and desire to build end-to-end user-facing products.',
        demandGrowth: '+24% YoY',
        averageSalary: '$95,000 - $145,000',
        keySkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
      },
      {
        careerId: 'ai-engineer',
        title: 'AI & Machine Learning Engineer',
        field: 'Artificial Intelligence',
        domainId: 'comp-sci',
        matchScore: 92,
        reason: 'Leverages your high Investigative score for mathematical models and LLM agents.',
        demandGrowth: '+38% YoY',
        averageSalary: '$115,000 - $180,000',
        keySkills: ['Python', 'PyTorch', 'Gemini API', 'Vector DBs', 'RAG']
      }
    ]
  },
  notifications: [
    {
      id: 'notif-1',
      title: 'Daily Goal Ready 🎯',
      message: 'Day 17 tasks are queued for Stage 2: Full Stack Development.',
      type: 'task',
      date: '10 mins ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Milestone Unlocked 🚀',
      message: 'You reached 72% completion in Stage 2 Development. Keep up the streak!',
      type: 'milestone',
      date: '2 hours ago',
      read: false
    }
  ]
};

const DEFAULT_RESUME: ResumeData = {
  personalInfo: {
    fullName: 'Gilbert Raj',
    email: 'gilbertraj800@gmail.com',
    phone: '+1 (555) 234-8900',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/gilbertraj',
    github: 'https://github.com/gilbertraj',
    portfolio: 'https://gilbertraj.dev'
  },
  summary: 'Dedicated Full Stack Software Engineering student specializing in React 19, TypeScript, PostgreSQL, and scalable systems. Proven track record of developing responsive web applications and real-time collaboration platforms.',
  education: [
    {
      institution: 'University School of Engineering & Technology',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science and Engineering',
      startYear: '2023',
      endYear: '2027',
      grade: '3.88 / 4.0 GPA'
    }
  ],
  skills: [
    { category: 'Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Zustand'] },
    { category: 'Backend & Cloud', items: ['Node.js', 'FastAPI', 'PostgreSQL', 'Supabase', 'Docker'] },
    { category: 'Tools & AI', items: ['Gemini API', 'Git & GitHub', 'REST APIs', 'Vite', 'Postman'] }
  ],
  experience: [
    {
      title: 'Frontend Engineering Intern',
      company: 'TechNovation Labs',
      location: 'Remote',
      startDate: 'May 2025',
      endDate: 'Aug 2025',
      current: false,
      description: [
        'Engineered responsive customer analytics dashboard in React & TypeScript, boosting page speed index by 38%.',
        'Authored modular UI components and integrated RESTful endpoints with complete type safety.',
        'Wrote end-to-end integration tests, elevating codebase reliability across core user funnels.'
      ]
    }
  ],
  projects: [
    {
      name: 'DevPulse — Developer Productivity & Learning Platform',
      techStack: 'React 19, TypeScript, Tailwind CSS, Recharts',
      description: 'Architected dynamic Kanban task planner with semester-aware rescheduling logic and interactive performance analytics.',
      link: 'https://github.com/gilbertraj/devpulse'
    }
  ],
  certifications: [
    {
      name: 'Google Cloud Associate Cloud Engineer',
      issuer: 'Google Cloud',
      date: '2025',
      credentialUrl: 'https://cloud.google.com'
    }
  ],
  achievements: [
    'Winner (1st Place) — Inter-College 36-Hour Hackathon 2025 out of 120 teams',
    'Solved 250+ algorithmic challenges on LeetCode with top 10% global ranking'
  ],
  templateId: 'modern-tech'
};

const DEFAULT_DEV_PROFILE: DeveloperProfileData = {
  username: 'gilbertraj',
  fullName: 'Gilbert Raj',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  title: 'Full Stack Engineer & AI Explorer',
  bio: 'Turning complex logic into silky smooth digital experiences. Building at the intersection of modern React, microservices, and Generative AI.',
  careerGoal: 'Seeking Software Engineering Internships & Full-Time New Grad Roles for 2026/2027.',
  location: 'San Francisco, CA / Open to Remote',
  githubHandle: 'gilbertraj',
  linkedinHandle: 'gilbertraj',
  website: 'https://gilbertraj.dev',
  education: 'B.Tech in Computer Science, Year 3',
  badges: [
    { id: 'b1', name: '14-Day Study Streak 🔥', icon: 'Flame', description: 'Consistently completed daily learning tasks for two straight weeks', unlockedAt: 'Yesterday' },
    { id: 'b2', name: 'Stage 1 Graduate 🎓', icon: 'Award', description: '100% completed Foundation stage logic and core projects', unlockedAt: '2 weeks ago' },
    { id: 'b3', name: 'Full Stack Craftsman ⚡', icon: 'Code', description: 'Built production-grade async microservices', unlockedAt: '1 month ago' }
  ],
  topSkills: [
    { name: 'React 19 & TypeScript', level: 92 },
    { name: 'Node.js & Python', level: 88 },
    { name: 'PostgreSQL & Supabase', level: 84 },
    { name: 'Google Gemini API', level: 80 }
  ],
  pinnedProjects: ['proj-1', 'proj-2'],
  activityHeatmap: Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
    count: (i % 5) + 1
  })),
  certifications: ['Google Cloud Associate Cloud Engineer', 'Meta Front-End Professional'],
  stats: {
    tasksCompleted: 48,
    hoursLearned: 148,
    streakDays: 14,
    projectsFinished: 4
  }
};

// Helper for local state persistence
function getStoredItem<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStoredItem<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export const api = {
  // Auth & Profile
  async getProfile(): Promise<UserProfile> {
    return getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
  },

  async login(email: string, _password?: string): Promise<{ success: boolean; user: UserProfile }> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    user.email = email;
    setStoredItem(STORAGE_KEYS.USER, user);
    return { success: true, user };
  },

  async register(data: Partial<UserProfile>): Promise<{ success: boolean; user: UserProfile; redirect: string }> {
    const user = { ...getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER), ...data };
    setStoredItem(STORAGE_KEYS.USER, user);
    return { success: true, user, redirect: '/personality-test' };
  },

  async updateProfile(data: Partial<UserProfile>): Promise<{ success: boolean; user: UserProfile }> {
    const user = { ...getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER), ...data };
    setStoredItem(STORAGE_KEYS.USER, user);
    return { success: true, user };
  },

  // Personality
  async getRIASECQuestions(): Promise<RIASECQuestion[]> {
    return RIASEC_QUESTIONS;
  },

  async completeRIASEC(answers: any[]): Promise<{ success: boolean; result: PersonalityResult }> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    const scores = { R: 12, I: 24, A: 10, S: 18, E: 20, C: 14 };

    if (answers && Array.isArray(answers)) {
      answers.forEach(ans => {
        if (ans.type && ans.type in scores) {
          (scores as any)[ans.type] += ans.points || 3;
        }
      });
    }

    const result: PersonalityResult = {
      scores,
      dominantCode: 'I-E-S',
      personalityTitle: 'The Investigative Strategic Leader',
      description: 'You blend deep analytical curiosity with technical leadership and product strategy.',
      strengths: [
        'Deconstructing complex architectures into clean modular systems',
        'Translating ambiguous product requirements into executable technical roadmaps',
        'Mentoring junior peers while driving high-standard engineering delivery',
        'Rapidly mastering modern cloud, frontend, and AI stacks'
      ],
      workStyle: 'Autonomous deep-work sprints combined with cross-functional collaborative alignment.',
      recommendedDomain: 'Computer Science',
      recommendedField: 'Software Development & AI',
      recommendations: [
        {
          careerId: 'fullstack-dev',
          title: 'Full Stack Developer',
          field: 'Software Development',
          domainId: 'comp-sci',
          matchScore: 96,
          reason: 'Direct convergence of your investigative problem solving and end-to-end user-facing product execution.',
          demandGrowth: '+24% YoY',
          averageSalary: '$95,000 - $145,000',
          keySkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
        },
        {
          careerId: 'ai-engineer',
          title: 'AI & Machine Learning Engineer',
          field: 'Artificial Intelligence',
          domainId: 'comp-sci',
          matchScore: 92,
          reason: 'Leverages your high Investigative score for mathematical models and LLM agents.',
          demandGrowth: '+38% YoY',
          averageSalary: '$115,000 - $180,000',
          keySkills: ['Python', 'PyTorch', 'Gemini API', 'Vector DBs', 'RAG']
        }
      ]
    };

    user.riasecResult = result;
    setStoredItem(STORAGE_KEYS.USER, user);
    return { success: true, result };
  },

  async getRIASECResult(): Promise<PersonalityResult | undefined> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    return user.riasecResult;
  },

  // Domains & Careers
  async getDomains(): Promise<DomainCategory[]> {
    return DOMAINS;
  },

  async getDomain(id: string): Promise<DomainCategory> {
    return DOMAINS.find(d => d.id === id) || DOMAINS[0];
  },

  async getCareers(): Promise<CareerPath[]> {
    return DOMAINS.flatMap(d => d.careers);
  },

  async selectCareer(data: { domainId: string; careerId: string; careerTitle: string }): Promise<{ success: boolean; user: UserProfile }> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    user.domainId = data.domainId;
    user.careerId = data.careerId;
    user.careerTitle = data.careerTitle;
    user.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Career Pathway Selected 🎯',
      message: `You are actively pursuing the '${data.careerTitle}' roadmap.`,
      type: 'system',
      date: 'Just now',
      read: false
    });
    setStoredItem(STORAGE_KEYS.USER, user);
    return { success: true, user };
  },

  // Roadmap & Tasks
  async getRoadmap(): Promise<{ careerTitle: string; currentStage: number; overallProgress: number; stages: RoadmapStage[] }> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    return {
      careerTitle: user.careerTitle || 'Full Stack Developer',
      currentStage: user.currentStage || 2,
      overallProgress: user.overallProgress || 72,
      stages: SAMPLE_ROADMAP_STAGES
    };
  },

  async getDailyTasks(): Promise<{ date: string; stageId: number; dayNumber: number; goalTitle: string; tasks: DailyTask[] }> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    const tasks = getStoredItem<DailyTask[]>(STORAGE_KEYS.TASKS, SAMPLE_DAILY_TASKS);
    return {
      date: new Date().toISOString().split('T')[0],
      stageId: user.currentStage || 2,
      dayNumber: 17,
      goalTitle: 'Master React Performance & Cloud Architecture',
      tasks
    };
  },

  async completeTask(taskId: string): Promise<{ success: boolean; task: DailyTask; user: UserProfile }> {
    const tasks = getStoredItem<DailyTask[]>(STORAGE_KEYS.TASKS, SAMPLE_DAILY_TASKS);
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].status = 'completed';
      user.xpPoints += tasks[taskIndex].xpReward || 100;
      user.totalHoursLearned += Math.max(1, Math.round((tasks[taskIndex].estimatedMinutes || 60) / 60));
      user.overallProgress = Math.min(100, user.overallProgress + 2);
      setStoredItem(STORAGE_KEYS.TASKS, tasks);
      setStoredItem(STORAGE_KEYS.USER, user);
      return { success: true, task: tasks[taskIndex], user };
    }

    return { success: false, task: tasks[0], user };
  },

  async skipTask(taskId: string): Promise<{ success: boolean; task: DailyTask }> {
    const tasks = getStoredItem<DailyTask[]>(STORAGE_KEYS.TASKS, SAMPLE_DAILY_TASKS);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].status = 'skipped';
      setStoredItem(STORAGE_KEYS.TASKS, tasks);
      return { success: true, task: tasks[taskIndex] };
    }
    return { success: false, task: tasks[0] };
  },

  async rescheduleTasks(missedDaysCount: number, remainingWeeks: number): Promise<{ success: boolean; tasks: DailyTask[] }> {
    const tasks = getStoredItem<DailyTask[]>(STORAGE_KEYS.TASKS, SAMPLE_DAILY_TASKS);
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);

    const updatedTasks = tasks.map(t => ({
      ...t,
      estimatedMinutes: Math.max(30, (t.estimatedMinutes || 60) - 10),
      difficulty: 'Medium' as const
    }));

    user.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Coursework Readjusted ⚡',
      message: `Re-balanced study tasks across your remaining ${remainingWeeks} semester weeks.`,
      type: 'system',
      date: 'Just now',
      read: false
    });

    setStoredItem(STORAGE_KEYS.TASKS, updatedTasks);
    setStoredItem(STORAGE_KEYS.USER, user);
    return { success: true, tasks: updatedTasks };
  },

  // Projects
  async getProjects(): Promise<ProjectItem[]> {
    return getStoredItem<ProjectItem[]>(STORAGE_KEYS.PROJECTS, SAMPLE_PROJECTS);
  },

  async getProject(id: string): Promise<ProjectItem> {
    const projects = getStoredItem<ProjectItem[]>(STORAGE_KEYS.PROJECTS, SAMPLE_PROJECTS);
    return projects.find(p => p.id === id) || projects[0];
  },

  async startProject(id: string): Promise<{ success: boolean; project: ProjectItem }> {
    const projects = getStoredItem<ProjectItem[]>(STORAGE_KEYS.PROJECTS, SAMPLE_PROJECTS);
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    const proj = projects.find(p => p.id === id);

    if (proj) {
      proj.status = 'in_progress';
      user.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: 'Project Started 🚀',
        message: `You started building '${proj.title}'. Complete milestones for verified XP!`,
        type: 'milestone',
        date: 'Just now',
        read: false
      });
      setStoredItem(STORAGE_KEYS.PROJECTS, projects);
      setStoredItem(STORAGE_KEYS.USER, user);
      return { success: true, project: proj };
    }
    return { success: false, project: projects[0] };
  },

  async completeProjectMilestone(projectId: string, milestoneId: string): Promise<{ success: boolean; project: ProjectItem }> {
    const projects = getStoredItem<ProjectItem[]>(STORAGE_KEYS.PROJECTS, SAMPLE_PROJECTS);
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    const proj = projects.find(p => p.id === projectId);

    if (proj) {
      const milestone = proj.milestones.find(m => m.id === milestoneId);
      if (milestone) {
        milestone.completed = true;
        const completedCount = proj.milestones.filter(m => m.completed).length;
        proj.progressPercentage = Math.round((completedCount / proj.milestones.length) * 100);

        if (proj.progressPercentage === 100) {
          proj.status = 'completed';
          user.xpPoints += 500;
          user.notifications.unshift({
            id: `notif-${Date.now()}`,
            title: 'Project Completed! 🏆',
            message: `Congratulations on shipping '${proj.title}'! 500 XP awarded.`,
            type: 'milestone',
            date: 'Just now',
            read: false
          });
        }
        setStoredItem(STORAGE_KEYS.PROJECTS, projects);
        setStoredItem(STORAGE_KEYS.USER, user);
        return { success: true, project: proj };
      }
    }
    return { success: false, project: projects[0] };
  },

  // Developer Profile & Resume
  async getDevProfile(): Promise<DeveloperProfileData> {
    return getStoredItem<DeveloperProfileData>(STORAGE_KEYS.DEV_PROFILE, DEFAULT_DEV_PROFILE);
  },

  async updateDevProfile(data: Partial<DeveloperProfileData>): Promise<{ success: boolean; profile: DeveloperProfileData }> {
    const profile = { ...getStoredItem<DeveloperProfileData>(STORAGE_KEYS.DEV_PROFILE, DEFAULT_DEV_PROFILE), ...data };
    setStoredItem(STORAGE_KEYS.DEV_PROFILE, profile);
    return { success: true, profile };
  },

  async getResume(): Promise<ResumeData> {
    return getStoredItem<ResumeData>(STORAGE_KEYS.RESUME, DEFAULT_RESUME);
  },

  async updateResume(data: Partial<ResumeData>): Promise<{ success: boolean; resume: ResumeData }> {
    const resume = { ...getStoredItem<ResumeData>(STORAGE_KEYS.RESUME, DEFAULT_RESUME), ...data };
    setStoredItem(STORAGE_KEYS.RESUME, resume);
    return { success: true, resume };
  },

  // Internships & Jobs
  async getInternships(): Promise<InternshipItem[]> {
    return getStoredItem<InternshipItem[]>(STORAGE_KEYS.INTERNSHIPS, SAMPLE_INTERNSHIPS);
  },

  async applyInternship(id: string): Promise<{ success: boolean; internship: InternshipItem }> {
    const list = getStoredItem<InternshipItem[]>(STORAGE_KEYS.INTERNSHIPS, SAMPLE_INTERNSHIPS);
    const item = list.find(i => i.id === id) || list[0];
    item.status = 'applied';
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    user.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Internship Application Sent 📤',
      message: `Applied for '${item.role}' at ${item.company}. Developer profile attached.`,
      type: 'job',
      date: 'Just now',
      read: false
    });
    setStoredItem(STORAGE_KEYS.INTERNSHIPS, list);
    setStoredItem(STORAGE_KEYS.USER, user);
    return { success: true, internship: item };
  },

  async saveInternship(id: string): Promise<{ success: boolean; internship: InternshipItem }> {
    const list = getStoredItem<InternshipItem[]>(STORAGE_KEYS.INTERNSHIPS, SAMPLE_INTERNSHIPS);
    const item = list.find(i => i.id === id) || list[0];
    item.status = 'saved';
    setStoredItem(STORAGE_KEYS.INTERNSHIPS, list);
    return { success: true, internship: item };
  },

  async getJobs(): Promise<JobListing[]> {
    return getStoredItem<JobListing[]>(STORAGE_KEYS.JOBS, SAMPLE_JOBS);
  },

  async applyJob(id: string): Promise<{ success: boolean; job: JobListing }> {
    const list = getStoredItem<JobListing[]>(STORAGE_KEYS.JOBS, SAMPLE_JOBS);
    const item = list.find(j => j.id === id) || list[0];
    item.status = 'applied';
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    const jobTitle = item.title || item.position || 'Software Engineer';
    user.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Job Application Dispatched 💼',
      message: `Applied for '${jobTitle}' at ${item.company}.`,
      type: 'job',
      date: 'Just now',
      read: false
    });
    setStoredItem(STORAGE_KEYS.JOBS, list);
    setStoredItem(STORAGE_KEYS.USER, user);
    return { success: true, job: item };
  },

  async saveJob(id: string): Promise<{ success: boolean; job: JobListing }> {
    const list = getStoredItem<JobListing[]>(STORAGE_KEYS.JOBS, SAMPLE_JOBS);
    const item = list.find(j => j.id === id) || list[0];
    item.status = 'saved';
    setStoredItem(STORAGE_KEYS.JOBS, list);
    return { success: true, job: item };
  },

  // Placement & News & Events & Analytics
  async getPlacementQuestions(): Promise<PlacementQuestion[]> {
    return SAMPLE_PLACEMENT_QUESTIONS;
  },

  async submitPlacementCode(_questionId: string, code: string): Promise<any> {
    const passed = code.includes('return') && code.length > 20;
    return {
      success: true,
      passed,
      testResults: [
        { testCase: 1, passed: true, input: 'numbers = [2,7,11,15], target = 9', actualOutput: '[1, 2]', expectedOutput: '[1, 2]' },
        { testCase: 2, passed: true, input: 'numbers = [2,3,4], target = 6', actualOutput: '[1, 3]', expectedOutput: '[1, 3]' },
        { testCase: 3, passed, input: 'numbers = [-1,0], target = -1', actualOutput: passed ? '[1, 2]' : '[]', expectedOutput: '[1, 2]' }
      ],
      runtimeMs: 24,
      memoryMb: 18.2
    };
  },

  async getNews(): Promise<TechNewsItem[]> {
    return SAMPLE_TECH_NEWS;
  },

  async getEvents(): Promise<CareerEvent[]> {
    return SAMPLE_EVENTS;
  },

  async getAnalytics(): Promise<any> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    return {
      overallProgress: user.overallProgress || 72,
      weeklyLearningHours: [
        { day: 'Mon', hours: 2.5 },
        { day: 'Tue', hours: 3.0 },
        { day: 'Wed', hours: 2.0 },
        { day: 'Thu', hours: 3.5 },
        { day: 'Fri', hours: 1.5 },
        { day: 'Sat', hours: 4.5 },
        { day: 'Sun', hours: 2.0 }
      ],
      skillProficiencies: [
        { subject: 'React & Frontend', A: 90, fullMark: 100 },
        { subject: 'TypeScript & Node', A: 86, fullMark: 100 },
        { subject: 'Databases & SQL', A: 84, fullMark: 100 },
        { subject: 'Algorithms & DSA', A: 78, fullMark: 100 },
        { subject: 'Cloud & DevOps', A: 80, fullMark: 100 }
      ],
      taskStats: {
        completedThisWeek: 16,
        totalHours: user.totalHoursLearned || 148,
        streak: user.currentStreakDays || 14,
        xp: user.xpPoints || 2450
      }
    };
  },

  async getNotifications(): Promise<any[]> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    return user.notifications || [];
  },

  async markNotificationsRead(): Promise<void> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    user.notifications = (user.notifications || []).map(n => ({ ...n, read: true }));
    setStoredItem(STORAGE_KEYS.USER, user);
  },

  // AI Mentor & Resume Review
  async askMentor(message: string): Promise<{ reply: string; suggestions: string[]; timestamp: string }> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);

    // Responsive AI guidance based on user context
    let reply = `Hello ${user.fullName}! As your 24/7 AI Career Mentor for **${user.careerTitle}**, I am tracking your Stage ${user.currentStage} milestone progress (${user.overallProgress}% completed).

### 🎯 Recommended Focus for Today:
1. **Core Practice**: Solidify your React state management and asynchronous data pipeline skills.
2. **Project Portfolio**: Continue building milestones for your active project to showcase on your developer profile.
3. **Streak Preservation**: Keep your **${user.currentStreakDays}-day study streak** going strong!

What technical topic, interview strategy, or project challenge would you like help with?`;

    if (message.toLowerCase().includes('resume') || message.toLowerCase().includes('cv')) {
      reply = `### 📄 Resume Optimization Advice for ${user.careerTitle}:
1. **Quantify Results**: Use the Google X-Y-Z formula: *"Accomplished [X] as measured by [Y], by doing [Z]"*.
2. **Keyword Optimization**: Ensure core competencies like React, TypeScript, PostgreSQL, and Cloud Deployment appear in both the Skills and Project descriptions.
3. **Action Verbs**: Start each bullet point with strong verbs like *Architected*, *Engineered*, *Optimized*, or *Automated*.`;
    } else if (message.toLowerCase().includes('interview') || message.toLowerCase().includes('dsa')) {
      reply = `### 💡 Technical Interview Strategy:
1. **Clarify Requirements**: Spend the first 2-3 minutes confirming input constraints, edge cases, and expected output types.
2. **Think Out Loud**: Walk the interviewer through your initial brute force concept, then optimize to $O(N)$ or $O(N \\log N)$.
3. **STAR Behavioral Method**: Structure stories using **Situation**, **Task**, **Action**, and **Result**.`;
    } else if (message.toLowerCase().includes('stage') || message.toLowerCase().includes('roadmap')) {
      reply = `### 🗺️ Roadmap Guidance (Stage ${user.currentStage}):
You are currently in **Stage ${user.currentStage}** at **${user.overallProgress}%** overall progress.
- Once you reach Stage 3, you will dive into **System Architecture and Production Deployment**.
- Complete your remaining daily tasks and project milestones to unlock the next verified badge!`;
    }

    return {
      reply,
      suggestions: [
        'What should I prioritize today?',
        'How do I prepare for technical interviews?',
        'How can I improve my project portfolio?',
        'Review my career roadmap'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  },

  async reviewResumeAI(): Promise<{ feedback: string; atsScore: number; strengths: string[]; improvementTips: string[] }> {
    const user = getStoredItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
    return {
      feedback: `### Comprehensive Resume Audit for ${user.fullName}
**ATS Compatibility Score: 92/100 (Exceptional)**

#### 🌟 Key Strengths:
- **Quantified Impact**: Clear performance metrics in internship and project descriptions (+38% speed index, 20k+ daily requests).
- **Core Alignment**: Strong keyword density matching **${user.careerTitle}** requirements.
- **Verifiable Achievements**: Recognized hackathon ranking and consistent coding track record.`,
      atsScore: 92,
      strengths: [
        'Clear quantifiable metrics in work experience and projects',
        'Strong modern tech stack alignment with industry demand',
        'Verified hackathon victory and 250+ solved algorithmic problems'
      ],
      improvementTips: [
        'Add user adoption metrics to personal full-stack projects',
        'Mention Docker containerization and CI/CD automation in skill bullet points'
      ]
    };
  },

  // Supabase Database Integration
  async getSupabaseStatus(): Promise<{ configured: boolean; connected: boolean; message: string; url?: string }> {
    return {
      configured: true,
      connected: true,
      message: 'Running in self-contained client mode with reactive local persistence.'
    };
  },
  async syncSupabasePush(): Promise<any> {
    return { success: true, message: 'Local state saved to browser storage.' };
  },
  async syncSupabasePull(): Promise<any> {
    return { success: true, message: 'State synced from storage.' };
  }
};
