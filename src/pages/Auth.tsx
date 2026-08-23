import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Compass,
  Sparkles,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  RefreshCw,
  GraduationCap,
  Globe,
  Phone
} from 'lucide-react';

interface AuthProps {
  initialMode?: 'login' | 'register';
  onNavigate: (route: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ initialMode = 'login', onNavigate }) => {
  const { login, register, resetPassword, demoLogin, isSupabaseOnline } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    educationLevel: 'Undergraduate B.Tech CS',
    currentYear: '3rd Year (Semester 5)',
    country: 'United States',
    phone: '',
  });

  const resetFormState = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleModeChange = (mode: 'login' | 'register' | 'forgot') => {
    resetFormState();
    setAuthMode(mode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();

    if (!formData.email || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (authMode !== 'forgot' && (!formData.password || formData.password.length < 6)) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      if (authMode === 'login') {
        const res = await login(formData.email, formData.password);
        if (res.success) {
          onNavigate('/dashboard');
        } else {
          setErrorMessage(res.error || 'Invalid credentials. Please verify your email and password.');
        }
      } else if (authMode === 'register') {
        if (!formData.fullName.trim()) {
          setErrorMessage('Please enter your full name.');
          setLoading(false);
          return;
        }

        const res = await register(
          {
            fullName: formData.fullName,
            email: formData.email,
            educationLevel: formData.educationLevel,
            currentYear: formData.currentYear,
            country: formData.country,
            phone: formData.phone,
          },
          formData.password
        );

        if (res.success) {
          if (res.isConfirmationRequired) {
            setSuccessMessage(
              'Account created! A confirmation email has been dispatched. Please verify your inbox, then sign in.'
            );
            setAuthMode('login');
          } else {
            onNavigate('/personality-test');
          }
        } else {
          setErrorMessage(res.error || 'Failed to complete registration.');
        }
      } else if (authMode === 'forgot') {
        const res = await resetPassword(formData.email);
        if (res.success) {
          setSuccessMessage(res.message);
        } else {
          setErrorMessage(res.error || 'Failed to send password reset email.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    resetFormState();
    setLoading(true);
    try {
      const success = await demoLogin();
      if (success) {
        onNavigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg rounded-3xl bg-[#0D111A]/90 border border-slate-800/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl relative z-10">
        {/* Supabase connection badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Supabase Cloud Auth Active</span>
          </div>

          <button
            type="button"
            onClick={handleDemoSignIn}
            disabled={loading}
            className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Try Demo Student</span>
          </button>
        </div>

        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/30 mb-3">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {authMode === 'login' && 'Welcome Back'}
            {authMode === 'register' && 'Create Student Account'}
            {authMode === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
            {authMode === 'login' && 'Access your personalized AI career roadmap & daily task dashboard'}
            {authMode === 'register' && 'Empower your student career with 24/7 AI mentorship & ATS placement'}
            {authMode === 'forgot' && 'Enter your registered email address to receive a password recovery link'}
          </p>
        </div>

        {/* Auth Mode Toggle Tabs (Hidden in Forgot Password mode) */}
        {authMode !== 'forgot' && (
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 text-xs font-semibold">
            <button
              id="tab-auth-login"
              type="button"
              onClick={() => handleModeChange('login')}
              className={`py-2.5 rounded-xl transition-all ${
                authMode === 'login'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              id="tab-auth-register"
              type="button"
              onClick={() => handleModeChange('register')}
              className={`py-2.5 rounded-xl transition-all ${
                authMode === 'register'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              New Student Register
            </button>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div
            id="auth-error-banner"
            className="mb-5 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-shake"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Authentication Notice</p>
              <p className="mt-0.5 text-rose-300/90 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Success Alert Box */}
        {successMessage && (
          <div
            id="auth-success-banner"
            className="mb-5 p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Success</p>
              <p className="mt-0.5 text-emerald-300/90 leading-relaxed">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (Sign Up only) */}
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Gilbert Raj"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@university.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Password (Login & Register) */}
          {authMode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleModeChange('forgot')}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Registration Details (Education, Year, Country, Phone) */}
          {authMode === 'register' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Education Level</label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>High School / 12th Grade</option>
                    <option>Undergraduate B.Tech CS</option>
                    <option>Undergraduate Non-CS STEM</option>
                    <option>Business / Management</option>
                    <option>Postgraduate / Masters</option>
                    <option>Bootcamp / Self-Taught</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current Academic Year</label>
                  <select
                    value={formData.currentYear}
                    onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>1st Year (Semester 1-2)</option>
                    <option>2nd Year (Semester 3-4)</option>
                    <option>3rd Year (Semester 5-6)</option>
                    <option>4th Year (Final Placement)</option>
                    <option>Recent Graduate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Country</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. United States"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 234-8900"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Action Submit Button */}
          <button
            type="submit"
            id="btn-submit-auth"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : authMode === 'login' ? (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : authMode === 'register' ? (
              <>
                <span>Create Account & Start Test</span>
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Send Password Reset Link</span>
                <KeyRound className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Back to Login link from Forgot Password */}
          {authMode === 'forgot' && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => handleModeChange('login')}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                ← Back to Sign In
              </button>
            </div>
          )}
        </form>

        {/* Footer Security / Demo Box */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Encrypted Supabase Security</span>
          </div>
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            One-Click Preview Mode
          </button>
        </div>
      </div>
    </div>
  );
};
