import React from 'react';
import {
  LayoutDashboard,
  Milestone,
  CheckSquare,
  FolderGit2,
  Newspaper,
  Calendar,
  BarChart3,
  UserCheck,
  FileText,
  Building2,
  GraduationCap,
  Briefcase,
  Bot,
  Settings,
  Sparkles,
  ChevronRight,
  Flame,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isOpen,
  onClose,
  isMobileOpen,
  onCloseMobile
}) => {
  const { user } = useAuth();
  const effectiveIsOpen = isOpen ?? isMobileOpen ?? false;
  const handleClose = () => {
    if (onClose) onClose();
    else if (onCloseMobile) onCloseMobile();
  };

  const navItems = [
    { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard, badge: 'Overview' },
    { label: 'My Roadmap', route: '/roadmap', icon: Milestone, badge: 'Stage 2' },
    { label: 'Daily Tasks', route: '/tasks', icon: CheckSquare, badge: 'Day 17' },
    { label: 'Projects', route: '/projects', icon: FolderGit2, badge: '3 Active' },
    { label: 'Tech News', route: '/news', icon: Newspaper },
    { label: 'Events & Hackathons', route: '/events', icon: Calendar, badge: 'Live' },
    { label: 'Analytics', route: '/analytics', icon: BarChart3 },
    { label: 'Developer Profile', route: '/developer-profile', icon: UserCheck, badge: 'Stage 4' },
    { label: 'Resume Builder', route: '/resume', icon: FileText, badge: 'ATS 92%' },
    { label: 'Internships', route: '/internships', icon: Building2, badge: '94% Match' },
    { label: 'Placement Prep', route: '/placement', icon: GraduationCap, badge: 'DSA & Mock' },
    { label: 'Job Portal', route: '/jobs', icon: Briefcase, badge: 'Stage 6' },
    { label: 'AI Mentor Room', route: '/mentor', icon: Bot, isHighlight: true },
    { label: 'Settings & Semester', route: '/settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {effectiveIsOpen && (
        <div
          id="sidebar-mobile-overlay"
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 lg:z-20 lg:top-16 w-72 sm:w-64 bg-[#11141D] border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          effectiveIsOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Header - Mobile only */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/20">
              CP
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight leading-none">CareerPath AI</h2>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Student Portal</span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Student Mini Status */}
        <div className="px-4 py-3 bg-[#0A0C10]/60 border-b border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 uppercase text-[10px] tracking-widest font-semibold">Target Career:</span>
            <span className="font-semibold text-indigo-300 truncate max-w-[120px] text-xs">{user?.careerTitle || 'Full-Stack AI'}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${user?.overallProgress || 72}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
            <span>Stage {user?.currentStage || 2} Active</span>
            <span className="text-indigo-400 font-bold">{user?.overallProgress || 72}%</span>
          </div>
        </div>

        {/* Navigation Link List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;

            return (
              <button
                key={item.route}
                id={`sidebar-link-${item.route.replace('/', '')}`}
                onClick={() => {
                  onNavigate(item.route);
                  handleClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  item.isHighlight
                    ? isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20'
                    : isActive
                    ? 'bg-slate-800 text-indigo-400 border border-slate-700 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-indigo-400' : item.isHighlight ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800/80 text-slate-500 group-hover:text-slate-400 border border-slate-700/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom AI Mentor Quick Trigger Card */}
        <div className="p-3 border-t border-slate-800 bg-[#0A0C10]">
          <div
            onClick={() => { onNavigate('/mentor'); handleClose(); }}
            className="cursor-pointer p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all group"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">AI Mentor Active</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              2 days ahead of schedule. Need help on your next project?
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
