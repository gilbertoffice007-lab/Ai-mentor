import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { UserProfile } from '../types';

// Resolve Supabase configuration from environment with default fallbacks
const metaEnv = typeof import.meta !== 'undefined' ? (import.meta as any).env : {};
const procEnv = typeof process !== 'undefined' ? process.env : {};

const supabaseUrl: string =
  metaEnv?.VITE_SUPABASE_URL ||
  procEnv?.SUPABASE_URL ||
  procEnv?.VITE_SUPABASE_URL ||
  'https://djdyhmxwheycemhgkzwf.supabase.co';

const supabaseAnonKey: string =
  metaEnv?.VITE_SUPABASE_ANON_KEY ||
  procEnv?.SUPABASE_ANON_KEY ||
  procEnv?.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_8y66aRePvriNzZrV7od1pQ_r4j8JN7Q';


// Check if credentials are appropriately configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 10 &&
    !supabaseUrl.includes('your-project-id')
  );
};

// Initialize the single Supabase client instance
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

export interface AuthResponseResult {
  success: boolean;
  user?: UserProfile;
  rawUser?: User;
  session?: Session | null;
  error?: string;
  isConfirmationRequired?: boolean;
}

export const supabaseAuthService = {
  /**
   * Register a new user with Supabase Auth
   */
  async signUp(
    email: string,
    password: string,
    profileData: Partial<UserProfile>
  ): Promise<AuthResponseResult> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: profileData.fullName || 'Student Developer',
            education_level: profileData.educationLevel || 'Undergraduate B.Tech CS',
            current_year: profileData.currentYear || '3rd Year (Semester 5)',
            country: profileData.country || 'United States',
            phone: profileData.phone || '',
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'Registration failed. No user returned.' };
      }

      // Email confirmation required when Supabase returns no session.
      // (Checking `!data.session` is the robust signal across API versions —
      // inspecting `identities` is fragile and version-dependent.)
      const isConfirmationRequired = data.session === null || !data.session;

      // Construct application user profile
      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        fullName: profileData.fullName || data.user.user_metadata?.full_name || 'Student Developer',
        educationLevel: profileData.educationLevel || data.user.user_metadata?.education_level || 'Undergraduate B.Tech CS',
        currentYear: profileData.currentYear || data.user.user_metadata?.current_year || '3rd Year (Semester 5)',
        country: profileData.country || data.user.user_metadata?.country || 'United States',
        phone: profileData.phone || data.user.user_metadata?.phone || '',
        // Roadmap is allocated ONLY after the assessment + career selection.
        // New signups start blank so onboarding (test → result → setup) runs fully.
        domainId: profileData.domainId || '',
        careerId: profileData.careerId || '',
        careerTitle: profileData.careerTitle || '',
        currentStage: profileData.currentStage || 1,
        overallProgress: profileData.overallProgress || 0,
        totalHoursLearned: profileData.totalHoursLearned || 0,
        currentStreakDays: 0,
        lastLoginDate: undefined,
        totalLoginDays: 0,
        xpPoints: profileData.xpPoints || 100,
        semesterName: profileData.semesterName || 'Fall Semester 2026',
        semesterStartDate: profileData.semesterStartDate || new Date().toISOString().split('T')[0],
        semesterEndDate: profileData.semesterEndDate || '2026-12-15',
        availableHoursPerDay: profileData.availableHoursPerDay || 3,
        availableDaysPerWeek: profileData.availableDaysPerWeek || 6,
        skillLevel: profileData.skillLevel || 'Intermediate',
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: 'Welcome to CareerPath AI! 🚀',
            message: 'Your student account is active. Complete your RIASEC test to unlock personalized AI roadmaps.',
            type: 'system',
            date: 'Just now',
            read: false,
          },
        ],
      };

      // Try saving profile to database if table is available
      try {
        await supabaseAuthService.saveProfile(userProfile);
      } catch (dbErr) {
        console.warn('Database profiles table sync skipped (using cached profile):', dbErr);
      }

      return {
        success: true,
        user: userProfile,
        rawUser: data.user,
        session: data.session,
        isConfirmationRequired,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'An unexpected error occurred during registration.',
      };
    }
  },

  /**
   * Sign in an existing user with Supabase Auth
   */
  async signIn(email: string, password: string): Promise<AuthResponseResult> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        let errorMsg = error.message;
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          errorMsg = 'Invalid email or password. Please check your credentials.';
        } else if (error.message.toLowerCase().includes('email not confirmed')) {
          errorMsg = 'Please verify your email address before signing in.';
        }
        return { success: false, error: errorMsg };
      }

      if (!data.user) {
        return { success: false, error: 'Sign in failed. No user found.' };
      }

      // Fetch or synthesize user profile
      const userProfile = await supabaseAuthService.fetchProfile(data.user);

      return {
        success: true,
        user: userProfile,
        rawUser: data.user,
        session: data.session,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'An unexpected error occurred during sign in.',
      };
    }
  },

  /**
   * Sign out current user
   */
  async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Sign out error' };
    }
  },

  /**
   * Send a password reset email
   */
  async resetPassword(email: string): Promise<{ success: boolean; message: string; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });

      if (error) {
        return { success: false, message: error.message, error: error.message };
      }

      return {
        success: true,
        message: 'Password reset link has been dispatched to your email address.',
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Failed to send password reset email.',
        error: err.message,
      };
    }
  },

  /**
   * Get current active session
   */
  async getSession(): Promise<Session | null> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) return null;
      return data.session;
    } catch {
      return null;
    }
  },

  /**
   * Fetch profile for authenticated user
   */
  async fetchProfile(authUser: User): Promise<UserProfile> {
    const meta = authUser.user_metadata || {};

    // Try fetching from public.profiles table in Supabase
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (!error && data) {
        return {
          id: data.id,
          fullName: data.full_name || meta.full_name || 'Student',
          email: data.email || authUser.email || '',
          educationLevel: data.education_level || meta.education_level || 'Undergraduate B.Tech CS',
          currentYear: data.current_year || meta.current_year || '1st Year (Semester 1)',
          country: data.country || meta.country || 'India',
          phone: data.phone || meta.phone || '',
          domainId: data.domain_id || '',
          careerId: data.career_id || '',
          careerTitle: data.career_title || '',
          currentStage: data.current_stage || 1,
          lastLoginDate: data.last_login_date || undefined,
          totalLoginDays: data.total_login_days ?? 0,
          overallProgress: data.overall_progress || 0,
          totalHoursLearned: data.total_hours_learned || 0,
          currentStreakDays: data.current_streak_days || 0,
          xpPoints: data.xp_points || 0,
          semesterName: data.semester_name || '',
          semesterStartDate: data.semester_start_date || '',
          semesterEndDate: data.semester_end_date || '',
          availableHoursPerDay: data.available_hours_per_day || 3,
          availableDaysPerWeek: data.available_days_per_week || 6,
          skillLevel: data.skill_level || 'Beginner',
          riasecResult: data.riasec_result || undefined,
          onboardingStatus: data.onboarding_status || 'assessment_not_started',
          courseStartDate: data.course_start_date || undefined,
          totalSemesters: data.total_semesters || 8,
          courseDurationMonths: data.course_duration_months || 6,
          notifications: [
            {
              id: 'notif-welcome',
              title: 'Welcome to CareerPath AI! 🚀',
              message: 'Start your career assessment to unlock your personalized roadmap.',
              type: 'system',
              date: 'Just now',
              read: false,
            },
          ],
        };
      }
    } catch (e) {
      console.warn('Supabase DB table query fallback:', e);
    }

    // Fallback profile synthesized from Auth metadata
    return {
      id: authUser.id,
      fullName: meta.full_name || authUser.email?.split('@')[0] || 'Student',
      email: authUser.email || '',
      educationLevel: meta.education_level || 'Undergraduate B.Tech CS',
      currentYear: meta.current_year || '1st Year (Semester 1)',
      country: meta.country || 'India',
      phone: meta.phone || '',
      domainId: '',
      careerId: '',
      careerTitle: '',
      currentStage: 1,
      lastLoginDate: undefined,
      totalLoginDays: 0,
      overallProgress: 0,
      totalHoursLearned: 0,
      currentStreakDays: 0,
      xpPoints: 0,
      semesterName: '',
      semesterStartDate: '',
      semesterEndDate: '',
      availableHoursPerDay: 3,
      availableDaysPerWeek: 6,
      skillLevel: 'Beginner',
      onboardingStatus: 'assessment_not_started',
      courseStartDate: undefined,
      totalSemesters: 8,
      courseDurationMonths: 6,
      notifications: [
        {
          id: 'notif-welcome',
          title: 'Welcome to CareerPath AI! 🚀',
          message: 'Complete your career assessment to unlock your personalized roadmap.',
          type: 'system',
          date: 'Just now',
          read: false,
        },
      ],
    };
  },

  /**
   * Save or update profile in Supabase table
   */
  async saveProfile(profile: UserProfile): Promise<boolean> {
    try {
      const dbPayload = {
        id: profile.id,
        email: profile.email,
        full_name: profile.fullName,
        education_level: profile.educationLevel,
        current_year: profile.currentYear,
        country: profile.country,
        phone: profile.phone,
        domain_id: profile.domainId,
        career_id: profile.careerId,
        career_title: profile.careerTitle,
        current_stage: profile.currentStage,
        last_login_date: profile.lastLoginDate || null,
        total_login_days: profile.totalLoginDays ?? 0,
        overall_progress: profile.overallProgress,
        total_hours_learned: profile.totalHoursLearned,
        current_streak_days: profile.currentStreakDays,
        xp_points: profile.xpPoints,
        semester_name: profile.semesterName,
        semester_start_date: profile.semesterStartDate || null,
        semester_end_date: profile.semesterEndDate || null,
        available_hours_per_day: profile.availableHoursPerDay ?? 3,
        available_days_per_week: profile.availableDaysPerWeek ?? 6,
        skill_level: profile.skillLevel,
        riasec_result: profile.riasecResult || null,
        onboarding_status: profile.onboardingStatus || 'assessment_not_started',
        course_start_date: profile.courseStartDate || null,
        total_semesters: profile.totalSemesters ?? 8,
        course_duration_months: profile.courseDurationMonths ?? 6,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(dbPayload, { onConflict: 'id' });

      if (error) {
        console.warn('Supabase profile upsert note:', error.message);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },
};
