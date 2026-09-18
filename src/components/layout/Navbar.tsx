import React, { useState } from 'react';
import {
  Compass,
  Flame,
  Bell,
  User,
  Sparkles,
  Moon,
  Sun,
  Check,
  LogOut,
  Settings,
  ExternalLink,
  Menu,
  X,
  Layers,
  Brain,
  Milestone,
  Orbit
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onToggleSidebar?: () => void;
  isPublic?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onToggleSidebar,
  isPublic = false
}) => {
  const { user, logout, notifications, markNotificationsRead, theme, toggleTheme } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [publicMenuOpen, setPublicMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0A0C10]/95 backdrop-blur-xl border-b border-slate-800">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Logo in Left Corner & Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          {!isPublic && onToggleSidebar && (
            <button
              id="btn-toggle-sidebar"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#11141D] border border-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle sidebar navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {isPublic && (
            <button
              id="btn-toggle-public-menu"
              onClick={() => setPublicMenuOpen(!publicMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#11141D] border border-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle public navigation menu"
            >
              {publicMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          {/* Logo Placed Properly in Left Corner */}
          <div
            id="brand-logo-button"
            onClick={() => onNavigate(user ? '/dashboard' : '/')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform font-bold shrink-0">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="font-extrabold text-sm sm:text-lg tracking-tight text-white leading-none truncate">
                  CareerPath
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 text-[9px] sm:text-[10px] font-bold uppercase rounded border border-indigo-500/20 shrink-0">
                  AI Active
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block font-medium mt-0.5 leading-none">
                AI Mentor for Student Careers
              </p>
            </div>
          </div>
        </div>

        {/* Center Nav: Landing & Public view only */}
        {isPublic ? (
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <button
              id="nav-link-explore"
              onClick={() => onNavigate('/explore')}
              className={`hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentRoute === '/explore' ? 'text-indigo-400 font-bold' : ''
              }`}
            >
              <Orbit className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D Holo Orbit</span>
            </button>
            <button
              id="nav-link-test"
              onClick={() => onNavigate(user ? '/personality-test' : '/auth')}
              className={`hover:text-white transition-colors flex items-center gap-1 cursor-pointer ${
                currentRoute === '/personality-test' ? 'text-indigo-400 font-bold' : ''
              }`}
            >
              <span>RIASEC Assessment</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </button>
          </nav>
        ) : (
          /* Authenticated Center Career Goal Pill (Hidden on mobile, shown on laptop) */
          <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#11141D] border border-slate-800 text-xs">
            <span className="text-slate-500 uppercase tracking-widest text-[10px] font-semibold">Target:</span>
            <span className="font-semibold text-white px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs truncate max-w-[180px]">
              {user?.careerTitle || 'Full-Stack AI Developer'}
            </span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400 font-semibold text-xs whitespace-nowrap">
              Stage {user?.currentStage || 1} ({user?.overallProgress ?? 0}%)
            </span>
          </div>
        )}

        {/* Right Action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* 3D Holo Explore shortcut - Shown ONLY in public/start of app */}
          {isPublic && (
            <button
              id="btn-nav-explore-3d"
              onClick={() => onNavigate('/explore')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#11141D] hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 hover:border-indigo-500/30 transition-all cursor-pointer"
            >
              <Orbit className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D Orbit</span>
            </button>
          )}

          {/* Theme switcher */}
          <button
            id="btn-toggle-theme"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#11141D] border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer hover:border-indigo-500/40"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {user ? (
            <>
              {/* Streak Badge */}
              <div
                id="user-streak-pill"
                onClick={() => onNavigate('/analytics')}
                className="cursor-pointer flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-[#11141D] border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/10 transition-all"
                title={`${user.currentStreakDays} day study streak!`}
              >
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span className="hidden min-[420px]:inline">{user.currentStreakDays}d</span>
                <span className="hidden sm:inline">Streak</span>
              </div>

              {/* Notifications Popover */}
              <div className="relative">
                <button
                  id="btn-notifications"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (!showNotifications) markNotificationsRead();
                  }}
                  className="relative p-2 rounded-xl bg-[#11141D] hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-[#0A0C10]" />
                  )}
                </button>

                {showNotifications && (
                  <div className="fixed sm:absolute right-3 sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm rounded-3xl bg-[#11141D] border border-slate-800 shadow-2xl p-4 z-50 animate-fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
                      </div>
                      <span className="text-[11px] text-indigo-400 font-semibold">All caught up</span>
                    </div>
                    <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-500 py-3 text-center">No new notifications</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white">{n.title}</span>
                              <span className="text-[10px] text-slate-500">{n.date}</span>
                            </div>
                            <p className="text-slate-400 text-[11px] leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Menu */}
              <div className="relative">
                <button
                  id="btn-user-menu"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 rounded-xl bg-[#11141D] hover:bg-slate-800 text-white transition-all border border-slate-800 cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-sm shrink-0">
                    {(user?.fullName || 'User')
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div className="text-left pr-2 hidden md:block">
                    <p className="text-xs font-semibold leading-tight text-white truncate max-w-[100px]">
                      {user?.fullName || 'User'}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight">Stage {user?.currentStage || 1}</p>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="fixed sm:absolute right-3 sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-1.5rem)] sm:w-60 max-w-xs rounded-3xl bg-[#11141D] border border-slate-800 shadow-2xl p-2 z-50 animate-fade-in text-xs">
                    <div className="px-3 py-2.5 border-b border-slate-800">
                      <p className="font-semibold text-white truncate">{user?.fullName || 'User'}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    <div className="py-1.5 space-y-0.5">
                      <button
                        onClick={() => {
                          onNavigate('/developer-profile');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-slate-300 hover:text-white hover:bg-slate-800/70 flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Developer Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('/resume');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-slate-300 hover:text-white hover:bg-slate-800/70 flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>ATS Resume Builder</span>
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('/settings');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-slate-300 hover:text-white hover:bg-slate-800/70 flex items-center gap-2 cursor-pointer"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Settings & Schedule</span>
                      </button>
                    </div>
                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={() => {
                          logout();
                          onNavigate('/auth');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 font-medium cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                id="btn-nav-login"
                onClick={() => onNavigate('/auth')}
                className="px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#11141D] transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                id="btn-nav-register"
                onClick={() => onNavigate('/auth')}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Public Mobile Navigation Drawer */}
      {isPublic && publicMenuOpen && (
        <div className="md:hidden border-t border-slate-800/90 bg-[#0E1118]/98 backdrop-blur-2xl px-4 py-4 space-y-2 animate-fade-in">
          <button
            onClick={() => {
              onNavigate('/explore');
              setPublicMenuOpen(false);
            }}
            className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs font-semibold text-slate-200 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Orbit className="w-4 h-4 text-cyan-400" />
              <span>3D Holographic Orbit Explorer</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">12 Fields</span>
          </button>

          <button
            onClick={() => {
              onNavigate(user ? '/personality-test' : '/auth');
              setPublicMenuOpen(false);
            }}
            className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs font-semibold text-slate-200 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span>Holland RIASEC Assessment</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Free</span>
          </button>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                onNavigate('/auth');
                setPublicMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 text-center text-xs font-semibold text-slate-300 cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                onNavigate('/auth');
                setPublicMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-center text-xs font-bold text-white shadow-lg shadow-indigo-500/30 cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
