import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';
import { api } from '../services/api';
import { supabase, supabaseAuthService, isSupabaseConfigured } from '../services/supabaseClient';
import { recordDailyLogin, recordLocalDailyLogin, loginDayString } from '../services/cloud';

export interface ToastState {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSupabaseOnline: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: Partial<UserProfile>, password?: string) => Promise<{ success: boolean; error?: string; isConfirmationRequired?: boolean }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string; error?: string }>;
  demoLogin: () => Promise<boolean>;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
  completeDailyTask: (taskId: string) => Promise<void>;
  notifications: any[];
  markNotificationsRead: () => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  hideToast: () => void;
  theme: 'dark' | 'light' | 'system';
  toggleTheme: () => void;
  setThemeMode: (theme: 'dark' | 'light' | 'system') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(() => {
    return (localStorage.getItem('careerpath_theme') as 'dark' | 'light' | 'system') || 'dark';
  });
  const [isSupabaseOnline, setIsSupabaseOnline] = useState<boolean>(isSupabaseConfigured());

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  /**
   * Daily-login engine hook: counts today once (streak + stage are earned
   * by showing up). Idempotent — safe to call from init, listeners and
   * login/register paths without double-counting.
   */
  const applyLoginDay = useCallback(async (
    profile: UserProfile
  ): Promise<{ profile: UserProfile; counted: boolean; streak: number; leveledUp: boolean; stageDropped: boolean; stage: number }> => {
    const quiet = { profile, counted: false, streak: profile.currentStreakDays ?? 0, leveledUp: false, stageDropped: false, stage: profile.currentStage ?? 1 };
    try {
      if (isSupabaseConfigured()) {
        const res = await recordDailyLogin(profile.id);
        return {
          profile: {
            ...profile,
            lastLoginDate: loginDayString(),
            currentStreakDays: res.streak,
            totalLoginDays: res.totalDays,
            currentStage: res.stage,
          },
          counted: res.counted,
          streak: res.streak,
          leveledUp: res.leveledUp,
          stageDropped: res.stageDropped,
          stage: res.stage,
        };
      }
    } catch (e) {
      console.warn('Daily login sync skipped:', e);
    }
    // Offline / demo mirror with identical rules
    const alreadyCounted = profile.lastLoginDate === loginDayString();
    const { user: mirrored, leveledUp } = recordLocalDailyLogin(profile);
    try {
      await api.updateProfile({
        lastLoginDate: mirrored.lastLoginDate,
        currentStreakDays: mirrored.currentStreakDays,
        totalLoginDays: mirrored.totalLoginDays,
        currentStage: mirrored.currentStage,
      });
    } catch {
      /* local already merged above */
    }
    return {
      profile: mirrored,
      counted: !alreadyCounted,
      streak: mirrored.currentStreakDays ?? 0,
      leveledUp,
      stageDropped: false,
      stage: mirrored.currentStage ?? 1,
    };
  }, []);

  /** Resolves 'system' to the OS-preferred actual theme */
  const resolveTheme = (t: 'dark' | 'light' | 'system'): 'dark' | 'light' => {
    if (t === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return t;
  };

  const applyThemeToDom = (resolved: 'dark' | 'light') => {
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const setThemeMode = (newTheme: 'dark' | 'light' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('careerpath_theme', newTheme);
    applyThemeToDom(resolveTheme(newTheme));
  };

  const toggleTheme = () => {
    const order: ('dark' | 'light' | 'system')[] = ['dark', 'light', 'system'];
    const nextTheme = order[(order.indexOf(theme) + 1) % order.length];
    setThemeMode(nextTheme);
  };

  // Listen for OS theme changes when in system mode
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') applyThemeToDom(resolveTheme('system'));
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => {
    applyThemeToDom(resolveTheme(theme));
  }, []);

  // Initial Auth session verification & Supabase auth listener
  useEffect(() => {
    let isMounted = true;


    const initializeAuth = async () => {
      try {
        if (isSupabaseConfigured()) {
          // Check for existing Supabase active session
          const session = await supabaseAuthService.getSession();
          if (session && session.user) {
            const profile = await supabaseAuthService.fetchProfile(session.user);
            const day = await applyLoginDay(profile);
            if (isMounted) {
              setUser(day.profile);
              setIsSupabaseOnline(true);
              if (day.counted) {
                if (day.leveledUp) {
                  showToast(`🎓 Stage ${day.stage} unlocked! Your daily logins earned it.`, 'success');
                } else if (day.stageDropped) {
                  showToast(`Semester ${day.stage} active: later stages are locked again. Stage 1 stays open.`, 'info');
                } else if (day.streak > 1) {
                  showToast(`🔥 ${day.streak}-day login streak! Come back tomorrow to grow it.`, 'info');
                }
              }
            }
          } else {
            // Check local storage for persistent guest / preview session
            const localProfile = await api.getProfile();
            // If localProfile exists in localStorage, leave as null or guest unless signed in
            const hasExplicitLocalSession = localStorage.getItem('careerpath_has_session') === 'true';
            if (hasExplicitLocalSession && localProfile) {
              if (isMounted) setUser((await applyLoginDay(localProfile)).profile);
            }
          }
        } else {
          // Fallback to local storage if Supabase is not configured
          const profile = await api.getProfile();
          if (isMounted) setUser(profile);
        }
      } catch (e) {
        console.error('Failed to initialize authentication session:', e);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Subscribe to real-time auth changes from Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if (event === 'SIGNED_IN' && session?.user) {
        localStorage.setItem('careerpath_has_session', 'true');
        const profile = await supabaseAuthService.fetchProfile(session.user);
        const day = await applyLoginDay(profile);
        setUser(day.profile);
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('careerpath_has_session');
        setUser(null);
      } else if (event === 'USER_UPDATED' && session?.user) {
        const profile = await supabaseAuthService.fetchProfile(session.user);
        setUser(profile);
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  /**
   * User Sign In (Supports Supabase Auth with fallback)
   */
  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (isSupabaseConfigured() && password) {
        const res = await supabaseAuthService.signIn(email, password);
        if (res.success && res.user) {
          localStorage.setItem('careerpath_has_session', 'true');
          const day = await applyLoginDay(res.user);
          setUser(day.profile);
          showToast(
            day.leveledUp
              ? `Welcome back, ${res.user.fullName}! 🎓 Stage ${day.stage} unlocked!`
              : `Welcome back, ${res.user.fullName}! 👋${day.streak > 1 ? ` 🔥 ${day.streak}-day streak` : ''}`,
            'success'
          );
          return { success: true };
        } else {
          const errMsg = res.error || 'Invalid email or password.';
          showToast(errMsg, 'error');
          return { success: false, error: errMsg };
        }
      } else {
        // Fallback local authentication
        const res = await api.login(email, password);
        if (res.success && res.user) {
          localStorage.setItem('careerpath_has_session', 'true');
          setUser(res.user);
          showToast(`Welcome back, ${res.user.fullName}! 👋`, 'success');
          return { success: true };
        }
      }
    } catch (e: any) {
      const errMsg = e.message || 'Login failed. Please try again.';
      showToast(errMsg, 'error');
      return { success: false, error: errMsg };
    }
    return { success: false, error: 'Authentication failed.' };
  };

  /**
   * User Registration (Creates Supabase User & Student Profile)
   */
  const register = async (
    data: Partial<UserProfile>,
    password?: string
  ): Promise<{ success: boolean; error?: string; isConfirmationRequired?: boolean }> => {
    try {
      if (isSupabaseConfigured() && data.email && password) {
        const res = await supabaseAuthService.signUp(data.email, password, data);
        if (res.success && res.user) {
          if (res.isConfirmationRequired) {
            // No Supabase session exists yet — do NOT log the user into the app.
            // (Previously this created a phantom session that the router pushed
            // into onboarding with no real auth, then lost on refresh.)
            showToast('Account created! Please check your email inbox to verify your account, then sign in.', 'info');
            return { success: true, isConfirmationRequired: true };
          }
          localStorage.setItem('careerpath_has_session', 'true');
          const day = await applyLoginDay(res.user);
          setUser(day.profile);
          showToast('Student registration complete! Day 1 of your streak starts today 🔥 Launching career test 🚀', 'success');
          return { success: true, isConfirmationRequired: false };
        } else {
          const errMsg = res.error || 'Failed to create student account.';
          showToast(errMsg, 'error');
          return { success: false, error: errMsg };
        }
      } else {
        // Fallback local registration
        const res = await api.register(data);
        if (res.success && res.user) {
          localStorage.setItem('careerpath_has_session', 'true');
          setUser(res.user);
          showToast('Registration successful! Launching career test 🚀', 'success');
          return { success: true };
        }
      }
    } catch (e: any) {
      const errMsg = e.message || 'Registration failed.';
      showToast(errMsg, 'error');
      return { success: false, error: errMsg };
    }
    return { success: false, error: 'Registration could not be completed.' };
  };

  /**
   * One-Click Instant Demo Login
   */
  const demoLogin = async (): Promise<boolean> => {
    try {
      const demoUser = await api.getProfile();
      localStorage.setItem('careerpath_has_session', 'true');
      const day = await applyLoginDay(demoUser);
      setUser(day.profile);
      showToast(
        `Logged in as Demo Student: ${demoUser.fullName} ✨${day.streak > 1 ? ` 🔥 ${day.streak}-day streak` : ''}`,
        'success'
      );
      return true;
    } catch {
      showToast('Demo login error', 'error');
      return false;
    }
  };

  /**
   * Sign Out
   */
  const logout = async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabaseAuthService.signOut();
      }
    } catch (err) {
      console.warn('Supabase signout notice:', err);
    } finally {
      localStorage.removeItem('careerpath_has_session');
      setUser(null);
      showToast('Logged out successfully. See you soon! 👋', 'info');
    }
  };

  /**
   * Reset Password
   */
  const resetPassword = async (email: string): Promise<{ success: boolean; message: string; error?: string }> => {
    if (isSupabaseConfigured()) {
      const res = await supabaseAuthService.resetPassword(email);
      if (res.success) {
        showToast(res.message, 'success');
      } else {
        showToast(res.error || res.message, 'error');
      }
      return res;
    } else {
      showToast('Password reset link sent (Demo mode simulated).', 'info');
      return { success: true, message: 'Password reset link sent.' };
    }
  };

  /**
   * Update Profile Data (Synchronizes locally and with Supabase)
   */
  const updateUser = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);

    // An email change must also move the real auth account, otherwise the
    // next login with the new address would fail. Supabase emails them a
    // confirmation link; the account flips once they click it.
    let notice: { message: string; kind: 'success' | 'info' | 'warning' | 'error' } | null = null;
    if (data.email && data.email.trim() !== user.email) {
      try {
        const { error } = await supabase.auth.updateUser({ email: data.email.trim() });
        notice = error
          ? { message: `Email change needs confirmation: ${error.message}`, kind: 'warning' }
          : { message: 'Confirmation link sent to your new email — click it to finish the change.', kind: 'info' };
      } catch (err) {
        console.warn('Auth email update skipped:', err);
      }
    }

    try {
      let cloudOk = true;
      if (isSupabaseConfigured()) {
        cloudOk = await supabaseAuthService.saveProfile(updated);
      }
      await api.updateProfile(data);
      if (notice) {
        showToast(notice.message, notice.kind);
      } else if (cloudOk) {
        showToast('Profile settings saved ✨', 'success');
      } else {
        // Never pretend the database has it: next login would show old data.
        showToast('Saved on this device — cloud sync failed. Check connection and save again.', 'warning');
      }
    } catch (e) {
      setUser(prev => prev ? { ...prev, ...data } : null);
      showToast('Profile updated on this device only', 'info');
    }
  };

  /**
   * Mark Daily Task Completed
   */
  const completeDailyTask = async (taskId: string) => {
    try {
      const res = await api.completeTask(taskId);
      if (res.success && res.user) {
        setUser(res.user);
        if (isSupabaseConfigured()) {
          await supabaseAuthService.saveProfile(res.user);
        }
        showToast(`Task complete! +${res.task.xpReward} XP earned 🌟`, 'success');
      }
    } catch (e) {
      console.error('Failed to complete task:', e);
    }
  };

  /**
   * Notifications
   */
  const markNotificationsRead = () => {
    if (user) {
      setUser({
        ...user,
        notifications: user.notifications.map(n => ({ ...n, read: true })),
      });
      api.markNotificationsRead();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isSupabaseOnline,
        login,
        register,
        logout,
        resetPassword,
        demoLogin,
        updateUser,
        completeDailyTask,
        notifications: user?.notifications || [],
        markNotificationsRead,
        toast,
        showToast,
        hideToast,
        theme,
        toggleTheme,
        setThemeMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
