import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';
import { api } from '../services/api';
import { supabase, supabaseAuthService, isSupabaseConfigured } from '../services/supabaseClient';

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
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSupabaseOnline, setIsSupabaseOnline] = useState<boolean>(isSupabaseConfigured());

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initial Auth session verification & Supabase auth listener
  useEffect(() => {
    document.documentElement.classList.add('dark');
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        if (isSupabaseConfigured()) {
          // Check for existing Supabase active session
          const session = await supabaseAuthService.getSession();
          if (session && session.user) {
            const profile = await supabaseAuthService.fetchProfile(session.user);
            if (isMounted) {
              setUser(profile);
              setIsSupabaseOnline(true);
            }
          } else {
            // Check local storage for persistent guest / preview session
            const localProfile = await api.getProfile();
            // If localProfile exists in localStorage, leave as null or guest unless signed in
            const hasExplicitLocalSession = localStorage.getItem('careerpath_has_session') === 'true';
            if (hasExplicitLocalSession && localProfile) {
              if (isMounted) setUser(localProfile);
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
        setUser(profile);
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
          setUser(res.user);
          showToast(`Welcome back, ${res.user.fullName}! 👋`, 'success');
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
          localStorage.setItem('careerpath_has_session', 'true');
          setUser(res.user);
          if (res.isConfirmationRequired) {
            showToast('Account created! Please check your email inbox to verify your account.', 'info');
          } else {
            showToast('Student registration complete! Launching career test 🚀', 'success');
          }
          return { success: true, isConfirmationRequired: res.isConfirmationRequired };
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
      setUser(demoUser);
      showToast(`Logged in as Demo Student: ${demoUser.fullName} ✨`, 'success');
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
    try {
      const updated = { ...user, ...data };
      setUser(updated);

      if (isSupabaseConfigured()) {
        await supabaseAuthService.saveProfile(updated);
      }
      await api.updateProfile(data);
      showToast('Profile settings saved ✨', 'success');
    } catch (e) {
      setUser(prev => prev ? { ...prev, ...data } : null);
      showToast('Profile updated locally', 'info');
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
