-- ==============================================================================
-- CareerPath AI Mentor - Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ==============================================================================
-- MIGRATION v2 (Non-destructive): Run below ALTER TABLE block in SQL Editor
-- to add new onboarding + academic calendar fields to existing profiles table:
--
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_status TEXT DEFAULT 'assessment_not_started';
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS course_start_date DATE;
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_semesters INTEGER DEFAULT 8;
-- ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS course_duration_months INTEGER DEFAULT 6;
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Core Student & Career Metadata)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  education_level TEXT,
  current_year TEXT,
  country TEXT,
  phone TEXT,
  domain_id TEXT DEFAULT 'comp-sci',
  career_id TEXT DEFAULT 'fullstack-dev',
  career_title TEXT DEFAULT 'Full Stack Developer',
  current_stage INTEGER DEFAULT 1,
  overall_progress INTEGER DEFAULT 0,
  total_hours_learned INTEGER DEFAULT 0,
  current_streak_days INTEGER DEFAULT 0,
  xp_points INTEGER DEFAULT 0,
  semester_name TEXT,
  semester_start_date DATE,
  semester_end_date DATE,
  available_hours_per_day NUMERIC DEFAULT 3,
  available_days_per_week INTEGER DEFAULT 6,
  skill_level TEXT DEFAULT 'Intermediate',
  riasec_result JSONB,
  -- Onboarding state machine
  onboarding_status TEXT DEFAULT 'assessment_not_started',
  -- Academic calendar (for dynamic semester calculation)
  course_start_date DATE,
  total_semesters INTEGER DEFAULT 8,
  course_duration_months INTEGER DEFAULT 6,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. RIASEC Assessments Table
CREATE TABLE IF NOT EXISTS public.riasec_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  scores JSONB NOT NULL,
  dominant_code TEXT NOT NULL,
  personality_title TEXT NOT NULL,
  description TEXT,
  strengths TEXT[],
  work_style TEXT,
  recommended_domain TEXT,
  recommended_field TEXT,
  recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Daily Learning Tasks Table
CREATE TABLE IF NOT EXISTS public.daily_tasks (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  stage_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  topic TEXT,
  estimated_minutes INTEGER DEFAULT 60,
  difficulty TEXT DEFAULT 'Medium',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'skipped')),
  category TEXT DEFAULT 'coding',
  xp_reward INTEGER DEFAULT 100,
  resource_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. User Projects & Milestones Table
CREATE TABLE IF NOT EXISTS public.user_projects (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  stage_number INTEGER NOT NULL,
  difficulty TEXT DEFAULT 'Intermediate',
  estimated_hours INTEGER DEFAULT 20,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percentage INTEGER DEFAULT 0,
  tech_stack TEXT[],
  repository_url TEXT,
  live_demo_url TEXT,
  milestones JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. User Resumes Table
CREATE TABLE IF NOT EXISTS public.user_resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  personal_info JSONB NOT NULL,
  summary TEXT,
  education JSONB,
  skills JSONB,
  experience JSONB,
  projects JSONB,
  certifications JSONB,
  achievements TEXT[],
  template_id TEXT DEFAULT 'modern-tech',
  ats_score INTEGER DEFAULT 88,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Developer Profiles Table (Public Portfolio)
CREATE TABLE IF NOT EXISTS public.developer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  title TEXT,
  bio TEXT,
  career_goal TEXT,
  location TEXT,
  github_handle TEXT,
  linkedin_handle TEXT,
  website TEXT,
  education TEXT,
  badges JSONB,
  top_skills JSONB,
  pinned_projects TEXT[],
  activity_heatmap JSONB,
  certifications TEXT[],
  stats JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Job & Internship Applications
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  opportunity_type TEXT NOT NULL CHECK (opportunity_type IN ('internship', 'job')),
  opportunity_id TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT DEFAULT 'applied' CHECK (status IN ('saved', 'applied', 'interviewing', 'offered', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'system' CHECK (type IN ('task', 'milestone', 'job', 'system')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.riasec_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow public reads and anon key operations for demo/authenticated users
CREATE POLICY "Allow public read access on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow all operations for service and anon on profiles" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Allow public read access on daily_tasks" ON public.daily_tasks FOR SELECT USING (true);
CREATE POLICY "Allow all operations on daily_tasks" ON public.daily_tasks FOR ALL USING (true);

CREATE POLICY "Allow public read on developer_profiles" ON public.developer_profiles FOR SELECT USING (true);
CREATE POLICY "Allow all operations on developer_profiles" ON public.developer_profiles FOR ALL USING (true);

CREATE POLICY "Allow all operations on user_projects" ON public.user_projects FOR ALL USING (true);
CREATE POLICY "Allow all operations on user_resumes" ON public.user_resumes FOR ALL USING (true);
CREATE POLICY "Allow all operations on notifications" ON public.notifications FOR ALL USING (true);
CREATE POLICY "Allow all operations on job_applications" ON public.job_applications FOR ALL USING (true);
CREATE POLICY "Allow all operations on riasec_assessments" ON public.riasec_assessments FOR ALL USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_user_id ON public.daily_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_projects_user_id ON public.user_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
