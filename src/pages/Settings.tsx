import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Sparkles, Calendar, Clock, Compass, Save, Moon, Sun, Bell } from 'lucide-react';

interface SettingsProps {
  onNavigate: (route: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const { user, updateUser, theme, toggleTheme, showToast } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Gilbert Raj',
    email: user?.email || 'gilbertraj800@gmail.com',
    currentYear: user?.currentYear || '3rd Year (Semester 5)',
    semesterName: user?.semesterName || 'Fall Semester 2026',
    semesterStartDate: user?.semesterStartDate || '2026-08-01',
    semesterEndDate: user?.semesterEndDate || '2026-12-15',
    availableHoursPerDay: user?.availableHoursPerDay || 3,
    availableDaysPerWeek: user?.availableDaysPerWeek || 6,
    careerTitle: user?.careerTitle || 'Full Stack Developer'
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser(formData);
    showToast('Semester schedule & study preferences updated! ✨');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <SettingsIcon className="w-4 h-4" />
          Academic Calendar & Schedule Configuration
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Platform Settings</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure semester timelines, daily study capacity, and active target career.
        </p>
      </div>

      <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-2">
              Student Profile Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Academic Semester Configuration */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Semester & Academic Timeline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Semester Name</label>
                <input
                  type="text"
                  value={formData.semesterName}
                  onChange={(e) => setFormData({ ...formData, semesterName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Semester Start Date</label>
                <input
                  type="date"
                  value={formData.semesterStartDate}
                  onChange={(e) => setFormData({ ...formData, semesterStartDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Semester End Date</label>
                <input
                  type="date"
                  value={formData.semesterEndDate}
                  onChange={(e) => setFormData({ ...formData, semesterEndDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Daily Study Capacity */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Daily Study Capacity & Workload
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Available Hours Per Day</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.availableHoursPerDay}
                  onChange={(e) => setFormData({ ...formData, availableHoursPerDay: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Available Study Days / Week</label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={formData.availableDaysPerWeek}
                  onChange={(e) => setFormData({ ...formData, availableDaysPerWeek: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Appearance Configuration */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Appearance & Theme
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-800 border border-slate-700">
              <div>
                <span className="text-xs font-bold text-white block mb-0.5">Interface Theme</span>
                <p className="text-[11px] text-slate-400">Choose between light and dark modes.</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="mt-3 sm:mt-0 px-4 py-2 rounded-xl bg-[#0A0C10] hover:bg-[#11141D] text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-2 cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    Switch to Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    Switch to Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Career Switch Shortcut */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-indigo-400" />
              <div>
                <span className="text-xs font-bold text-white">Target Career: {formData.careerTitle}</span>
                <p className="text-[11px] text-slate-400">Want to pivot? Retake the RIASEC test or 3D domain explorer.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/personality-test')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700"
            >
              Switch Career
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
