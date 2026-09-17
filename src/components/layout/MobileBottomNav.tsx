import React from 'react';
import {
  LayoutDashboard,
  Milestone,
  CheckSquare,
  FolderGit2,
  Bot,
  Menu,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { checkRouteAccess } from '../../config/semesterAccess';

interface MobileBottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSidebar: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRoute,
  onNavigate,
  onOpenSidebar
}) => {
  const { user } = useAuth();

  const tabs = [
    { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
    { label: 'Roadmap', route: '/roadmap', icon: Milestone },
    { label: 'Tasks', route: '/tasks', icon: CheckSquare },
    { label: 'Projects', route: '/projects', icon: FolderGit2 },
    { label: 'AI Mentor', route: '/mentor', icon: Bot, isHighlight: true }
  ];

  return (
    <div
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#11141D]/95 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 safe-area-pb"
    >
      <nav className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = currentRoute === tab.route;
          const { hasAccess } = checkRouteAccess(tab.route, user?.currentStage || 1);
          const Icon = hasAccess ? tab.icon : Lock;

          return (
            <button
              key={tab.route}
              id={`mobile-tab-${tab.route.replace('/', '')}`}
              onClick={() => {
                if (hasAccess) onNavigate(tab.route);
              }}
              disabled={!hasAccess}
              className={`flex flex-col flex-1 min-w-0 items-center justify-center py-1 px-1 rounded-xl transition-all min-h-[48px] ${
                !hasAccess ? 'opacity-50 cursor-not-allowed' : isActive
                  ? 'text-indigo-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    !hasAccess ? 'text-slate-500' : isActive ? 'scale-110 text-indigo-400' : 'text-slate-400'
                  }`}
                />
                {tab.isHighlight && hasAccess && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#11141D]" />
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${!hasAccess ? 'text-slate-500' : isActive ? 'text-indigo-300 font-semibold' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* More Menu Drawer Trigger */}
        <button
          id="mobile-tab-more"
          onClick={onOpenSidebar}
          className="flex flex-col flex-1 min-w-0 items-center justify-center py-1 px-1 rounded-xl text-slate-400 hover:text-slate-200 transition-all min-h-[48px]"
        >
          <Menu className="w-5 h-5 text-slate-400" />
          <span className="text-[10px] mt-0.5 tracking-tight text-slate-400 font-medium">More</span>
        </button>
      </nav>
    </div>
  );
};
