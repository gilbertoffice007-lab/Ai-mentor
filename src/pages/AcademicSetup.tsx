import React, { useState, useEffect } from 'react';
import {
  Calendar, GraduationCap, Compass, ChevronRight, CheckCircle2,
  Clock, BookOpen, ArrowRight, Sparkles, RefreshCw, Info, Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCurrentSemester } from '../lib/semesterCalculator';

interface AcademicSetupProps {
  onNavigate: (route: string) => void;
}

interface FormData {
  programName: string;
  courseStartDate: string;
  totalSemesters: number;
  courseDurationMonths: number;
}

export const AcademicSetup: React.FC<AcademicSetupProps> = ({ onNavigate }) => {
  const { user, updateUser, showToast } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  // Default: start date = today
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<FormData>({
    programName: user?.educationLevel || 'B.Tech Computer Science',
    courseStartDate: today,
    totalSemesters: user?.totalSemesters || 8,
    courseDurationMonths: user?.courseDurationMonths || 6,
  });

  // Live preview of semester info
  const preview = getCurrentSemester(
    form.courseStartDate,
    form.totalSemesters,
    form.courseDurationMonths
  );

  // Graduation year derived from dates
  const graduationYear = (() => {
    if (!form.courseStartDate) return '—';
    const start = new Date(form.courseStartDate);
    const totalMonths = form.totalSemesters * form.courseDurationMonths;
    const grad = new Date(start);
    grad.setMonth(grad.getMonth() + totalMonths);
    return grad.getFullYear();
  })();

  const handleChange = (field: keyof FormData, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.courseStartDate) {
      showToast('Please enter your course start date.', 'error');
      return;
    }
    setIsSaving(true);
    try {
      await updateUser({
        educationLevel: form.programName,
        courseStartDate: form.courseStartDate,
        totalSemesters: form.totalSemesters,
        courseDurationMonths: form.courseDurationMonths,
        onboardingStatus: 'roadmap_initialized',
        // Populate legacy semester fields for backward compat
        semesterName: `Semester ${preview.currentSemester}`,
        semesterStartDate: preview.currentSemesterStart,
        semesterEndDate: preview.currentSemesterEnd,
      });
      showToast('Academic calendar saved! Building your roadmap... 🚀');
      onNavigate('/dashboard');
    } catch (e) {
      console.error(e);
      showToast('Failed to save. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100">
      {/* Minimal onboarding header */}
      <header className="sticky top-0 z-30 bg-[#07090E]/90 backdrop-blur-xl border-b border-slate-800/80 px-5 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-white tracking-tight text-sm">CareerPath AI</span>
          </div>
          {/* Onboarding progress */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Assessment</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Career Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-300 font-semibold">Academic Setup</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-500">Dashboard</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Page header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            Academic Calendar Setup
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tell Us About Your Course
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            CareerPath AI uses your course dates to calculate your current semester, 
            track daily progress, and align your roadmap with your real academic schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            {/* Program Name */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Program & Degree</h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Program / Degree Name
                </label>
                <input
                  id="input-program-name"
                  type="text"
                  value={form.programName}
                  onChange={e => handleChange('programName', e.target.value)}
                  placeholder="e.g. B.Tech Computer Science & Engineering"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                />
              </div>
            </div>

            {/* Course Dates */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Academic Calendar</h3>
              </div>

              {/* Course start date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Course Start Date <span className="text-rose-400">*</span>
                </label>
                <input
                  id="input-course-start-date"
                  type="date"
                  value={form.courseStartDate}
                  onChange={e => handleChange('courseStartDate', e.target.value)}
                  max={today}
                  required
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                />
                <p className="text-[11px] text-slate-500">
                  The date you started (or will start) your current program. Used to calculate your current semester.
                </p>
              </div>

              {/* Total semesters */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Total Semesters in Program
                </label>
                <div className="flex gap-3 flex-wrap">
                  {[4, 6, 8, 10].map(n => (
                    <button
                      key={n}
                      type="button"
                      id={`btn-sem-count-${n}`}
                      onClick={() => handleChange('totalSemesters', n)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                        form.totalSemesters === n
                          ? 'bg-indigo-600/30 border-indigo-400 text-white ring-1 ring-indigo-400/50'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {n} sem
                    </button>
                  ))}
                  <input
                    id="input-total-semesters"
                    type="number"
                    min={2}
                    max={16}
                    value={form.totalSemesters}
                    onChange={e => handleChange('totalSemesters', parseInt(e.target.value) || 8)}
                    className="w-20 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Custom"
                  />
                </div>
              </div>

              {/* Semester duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Duration Per Semester (months)
                </label>
                <div className="flex gap-3 flex-wrap">
                  {[4, 5, 6].map(n => (
                    <button
                      key={n}
                      type="button"
                      id={`btn-sem-dur-${n}`}
                      onClick={() => handleChange('courseDurationMonths', n)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                        form.courseDurationMonths === n
                          ? 'bg-cyan-600/30 border-cyan-400 text-white ring-1 ring-cyan-400/50'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {n} months
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              id="btn-build-roadmap"
              type="submit"
              disabled={isSaving || !form.courseStartDate}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-500 hover:from-indigo-500 hover:via-cyan-500 hover:to-emerald-400 text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving
                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Building Your Roadmap...</>
                : <><Zap className="w-4 h-4" /> Build My Personalized Roadmap <ArrowRight className="w-4 h-4" /></>
              }
            </button>
          </form>

          {/* ── Live Preview ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Live calculation preview */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-5 space-y-4 shadow-xl sticky top-24">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Live Preview</h3>
              </div>
              <p className="text-[11px] text-slate-400">Updates as you type. This is how your dashboard will look.</p>

              <div className="space-y-3">
                {/* Current semester */}
                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-slate-400">Current Semester</span>
                  </div>
                  <span className="text-sm font-extrabold text-white">
                    Semester {preview.currentSemester}
                    <span className="text-xs text-slate-400 font-normal"> of {form.totalSemesters}</span>
                  </span>
                </div>

                {/* Current day */}
                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-slate-400">Current Day</span>
                  </div>
                  <span className="text-sm font-extrabold text-white">
                    Day {preview.semesterDay}
                    <span className="text-xs text-slate-400 font-normal"> of {preview.totalSemesterDays}</span>
                  </span>
                </div>

                {/* Semester progress */}
                <div className="py-3 px-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Semester Progress</span>
                    <span className="text-xs font-extrabold text-indigo-300">{preview.semesterProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${preview.semesterProgress}%` }}
                    />
                  </div>
                </div>

                {/* Overall progress */}
                <div className="py-3 px-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Overall Course Progress</span>
                    <span className="text-xs font-extrabold text-emerald-400">{preview.overallProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${preview.overallProgress}%` }}
                    />
                  </div>
                </div>

                {/* Graduation year */}
                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-slate-400">Expected Graduation</span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-400">{graduationYear}</span>
                </div>
              </div>

              {/* Info note */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-300 leading-relaxed">
                  You can change these dates anytime in <strong>Settings → Academic Calendar</strong>. 
                  Your semester will automatically recalculate.
                </p>
              </div>
            </div>

            {/* Career card */}
            {user?.careerTitle && (
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Selected Career Path</span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user.careerTitle}</p>
                    <p className="text-xs text-slate-400">{user.domainId}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
