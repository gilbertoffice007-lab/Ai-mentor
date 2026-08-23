import React from 'react';
import { HoloCareerExplorer } from '../components/holo/HoloCareerExplorer';
import { useAuth } from '../context/AuthContext';
import {
  Compass,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Orbit,
  LogIn,
  UserPlus
} from 'lucide-react';

interface ExploreDomainsProps {
  onNavigate: (route: string) => void;
  onSelectCareer?: (career: any) => void;
}

export const ExploreDomains: React.FC<ExploreDomainsProps> = ({ onNavigate }) => {
  const { user, updateUser, showToast } = useAuth();

  const handleSelectHoloCareer = async (
    careerTitle: string,
    domainName: string,
    skills: string[]
  ) => {
    if (user) {
      await updateUser({
        careerTitle,
        skillLevel: 'Intermediate',
      });
      showToast(`Selected '${careerTitle}' as your active career goal! 🚀`, 'success');
      onNavigate('/roadmap');
    } else {
      showToast(`Selected '${careerTitle}'! Sign in or take the RIASEC test to personalize your roadmap.`, 'info');
      onNavigate('/personality-test');
    }
  };

  return (
    <div className="min-h-screen bg-[#06080E] text-slate-100 p-3 sm:p-6 lg:p-8 flex flex-col justify-between space-y-6">
      {/* Starting Top Header */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Orbit className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
            <span>3D Holographic Orbit Universe</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Explore 12 Major Domains & 120+ Tracks
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Rotate the holographic core to inspect engineering, healthcare, management, law, pure sciences, arts, and emerging technologies.
          </p>
        </div>

        {/* Starting Navigation Actions */}
        <div className="flex items-center gap-2.5">
          <button
            id="btn-holo-back-home"
            onClick={() => onNavigate('/')}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {!user ? (
            <button
              id="btn-holo-get-started"
              onClick={() => onNavigate('/auth')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Get Started</span>
            </button>
          ) : (
            <button
              id="btn-holo-open-dashboard"
              onClick={() => onNavigate('/dashboard')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main 3D Holographic Orbit Explorer */}
      <div className="max-w-7xl mx-auto w-full flex-1">
        <HoloCareerExplorer onSelectCareerGoal={handleSelectHoloCareer} />
      </div>

      {/* Footer Info Pill */}
      <div className="max-w-7xl mx-auto w-full text-center">
        <p className="text-[11px] text-slate-500">
          Tip: Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px]">→</kbd> to rotate orbits • Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px]">Enter</kbd> to explore a field or career path • Click the center core for full ecosystem overview.
        </p>
      </div>
    </div>
  );
};
