export type OnboardingStatus =
  | 'assessment_not_started'
  | 'assessment_in_progress'
  | 'assessment_completed'
  | 'career_path_selected'
  | 'roadmap_initialized';

export type RIASECScore = {
  R: number; // Realistic (0-100%)
  I: number; // Investigative (0-100%)
  A: number; // Artistic (0-100%)
  S: number; // Social (0-100%)
  E: number; // Enterprising (0-100%)
  C: number; // Conventional (0-100%)
};

export type RIASECCategoryKey = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export type RIASECInterpretationLevel =
  | 'Lower preference'
  | 'Moderate preference'
  | 'Strong preference'
  | 'Very strong preference';

export interface RIASECCategoryDetail {
  code: RIASECCategoryKey;
  name: string;
  fullName: string;
  icon: string;
  rawScore: number;
  score: number;
  level: RIASECInterpretationLevel;
  badgeColor: string;
  barColor: string;
  description: string;
  summary: string;
  workActivities: string[];
  preferredEnvironments: string[];
  sampleCareers: string[];
}

export interface RIASECQuestionOption {
  label: string;
  emoji?: string;
  points: number; // 1 to 5
  description?: string;
  text?: string;
  type?: RIASECCategoryKey;
}

export interface RIASECQuestion {
  id: number;
  question: string;
  prompt?: string;
  scenario?: string;
  category: RIASECCategoryKey;
  categoryIndex?: number;
  type?: RIASECCategoryKey;
  options?: RIASECQuestionOption[];
}

export interface CareerRecommendation {
  careerId: string;
  title: string;
  field: string;
  domainId: string;
  matchScore: number;
  reason: string;
  demandGrowth: string;
  averageSalary: string;
  keySkills: string[];
  whyMatches?: string[];
  typicalWorkActivities?: string[];
  recommendedLearningPath?: string[];
  riasecWeights?: RIASECScore;
  education?: string;
  difficulty?: string;
}

export interface PersonalityResult {
  userId?: string;
  assessmentId?: string;
  scores: RIASECScore;
  rawScores?: RIASECScore;
  dominantCode: string; // e.g. "ICR"
  primaryInterest: string; // e.g. "Investigative"
  secondaryInterest: string; // e.g. "Conventional"
  tertiaryInterest: string; // e.g. "Realistic"
  personalityTitle: string;
  description: string;
  strengths: string[];
  workStyle: string;
  recommendedDomain: string;
  recommendedField: string;
  categoryDetails?: RIASECCategoryDetail[];
  recommendations: CareerRecommendation[];
  responses?: Record<string | number, number>;
  completedAt?: string;
}

export interface CareerPath {
  id: string;
  title: string;
  field: string;
  domainId: string;
  description: string;
  skillsRequired: string[];
  learningDuration: string;
  averageDifficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  growthRate: string;
  avgSalary: string;
  typicalProjects: string[];
  internshipRoles: string[];
  jobRoles: string[];
  recommendedEducation: string;
  color: string;
  position3D?: [number, number, number];
}

export interface DomainCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  popularCareers: string[];
  requiredSkills: string[];
  careerGrowth: string;
  difficulty: 'Beginner' | 'Moderate' | 'Challenging' | 'Intermediate' | 'Advanced';
  educationRequirement: string;
  careers: CareerPath[];
}

export interface RoadmapSkill {
  id: string;
  name: string;
  category: string;
  status: 'locked' | 'in_progress' | 'completed';
  level: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface RoadmapTaskItem {
  id: string;
  title: string;
  description?: string;
  durationMinutes?: number;
  estimatedHours?: number;
  completed: boolean;
  resourceLink?: string;
  module?: string;
  type?: 'concept' | 'video' | 'exercise' | 'project';
}

export interface RoadmapStage {
  id: number;
  stageNumber: number;
  title: string;
  subtitle?: string;
  description: string;
  estimatedDuration?: string;
  durationWeeks?: number;
  progressPercentage?: number;
  completionPercentage?: number;
  status?: 'locked' | 'in_progress' | 'completed';
  isLocked?: boolean;
  isCurrent?: boolean;
  skillsCovered?: string[];
  skills?: RoadmapSkill[];
  tasks: RoadmapTaskItem[];
  requiredProject?: string;
  keyTopics?: string[];
  projects?: string[];
  features?: string[];
}

export interface DailyTask {
  id: string;
  date?: string;
  stageId?: number;
  dayNumber?: number;
  goalTitle?: string;
  title: string;
  category?: string;
  description: string;
  estimatedMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  resourceLink?: string;
  videoLink?: string;
  docLink?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  skillTag?: string;
  xpReward: number;
  updatedAt?: string;
}

export interface ProjectMilestone {
  id: string;
  week?: number;
  title: string;
  description?: string;
  deliverable?: string;
  dayTarget?: number;
  completed: boolean;
  deliverables?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  stage?: number;
  stageNumber?: number;
  tier?: string;
  difficulty?: 'Small (1 week)' | 'Medium (2-3 weeks)' | 'Large (4+ weeks)' | string;
  durationWeeks?: number;
  estimatedDays?: number;
  description: string;
  skills?: string[];
  requirements?: string[];
  expectedOutcome?: string;
  techStack: string[];
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercentage: number;
  milestones: ProjectMilestone[];
  repoUrl?: string;
  liveDemoUrl?: string;
}

export interface TechNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  category?: string;
  date?: string;
  publishedAt?: string;
  url: string;
  tags?: string[];
  readTime?: string;
  imageUrl?: string;
}

export interface CareerEvent {
  id: string;
  title: string;
  organizer: string;
  type?: string;
  category?: 'Hackathon' | 'Tech Conference' | 'Webinar' | 'Workshop' | 'Coding Competition' | 'College Event' | 'AI Event' | string;
  date: string;
  location: string;
  isOnline?: boolean;
  tags?: string[];
  link?: string;
  prizePool?: string;
  registrationOpen?: boolean;
}

export interface InternshipItem {
  id: string;
  company: string;
  companyLogo?: string;
  role: string;
  logo?: string;
  domainId?: string;
  location: string;
  isRemote?: boolean;
  duration: string;
  stipend: string;
  deadline?: string;
  skillsRequired?: string[];
  requiredSkills?: string[];
  eligibility?: string;
  description: string;
  matchScore: number;
  status?: 'applied' | 'saved' | 'none';
  externalUrl?: string;
}

export interface JobListing {
  id: string;
  company: string;
  companyLogo?: string;
  title?: string;
  position?: string;
  location: string;
  jobType?: 'Full-time' | 'Contract' | 'Remote' | 'Hybrid';
  experience?: string;
  salary?: string;
  salaryRange?: string;
  skills?: string[];
  skillsRequired?: string[];
  matchScore: number;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  postedDaysAgo?: number;
  status?: 'applied' | 'saved' | 'interviewing' | 'none';
  externalUrl?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  education: {
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    grade: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
  }[];
  projects: {
    name: string;
    techStack: string;
    description: string;
    link?: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
    credentialUrl: string;
  }[];
  achievements?: string[];
  templateId?: 'modern-tech' | 'clean-minimal' | 'executive-pro';
  atsScore?: number;
}

export interface DeveloperProfileData {
  username: string;
  fullName: string;
  avatarUrl: string;
  title: string;
  bio: string;
  careerGoal: string;
  location: string;
  githubHandle: string;
  linkedinHandle: string;
  website: string;
  badges: {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlockedAt: string;
  }[];
  topSkills: { name: string; level: number }[];
  pinnedProjects: string[]; // Project IDs
  activityHeatmap: { date: string; count: number }[];
  certifications: string[];
  education: string;
  stats: {
    tasksCompleted: number;
    hoursLearned: number;
    streakDays: number;
    projectsFinished: number;
  };
}

export interface PlacementQuestion {
  id: string;
  category: 'Aptitude' | 'DSA' | 'Technical' | 'HR' | string;
  subCategory?: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  companies?: string[];
  description?: string;
  question?: string;
  codeTemplate?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  codeSnippet?: string;
  starterCode?: string;
  testCases?: { input: string; output: string }[];
  completed?: boolean;
}

export interface MentorMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: { label: string; url: string };
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  registeredAt?: string;
  educationLevel: string;
  currentYear: string;
  country: string;
  phone?: string;
  domainId: string;
  careerId: string;
  careerTitle: string;
  currentStage: number;
  currentDay?: number;
  overallProgress: number;
  totalHoursLearned: number;
  currentStreakDays: number;
  xpPoints: number;
  // Daily-login engagement (streak + stage are earned by showing up)
  lastLoginDate?: string;      // local 'YYYY-MM-DD' of the last counted login
  totalLoginDays?: number;     // distinct days the student has logged in
  // Semester settings
  semesterName: string;
  semesterStartDate: string;
  semesterEndDate: string;
  availableHoursPerDay: number;
  availableDaysPerWeek: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  riasecResult?: PersonalityResult;
  // Onboarding state machine
  onboardingStatus?: OnboardingStatus;
  // Academic calendar for dynamic semester calculation
  courseStartDate?: string;        // ISO date string: 'YYYY-MM-DD'
  totalSemesters?: number;         // e.g. 8 (for 4-year course)
  courseDurationMonths?: number;   // e.g. 6 (6 months per semester)
  notifications: {
    id: string;
    title: string;
    message: string;
    type: 'task' | 'milestone' | 'event' | 'job' | 'system';
    date: string;
    read: boolean;
  }[];
}
