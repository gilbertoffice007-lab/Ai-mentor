import React, { useState } from 'react';
import { Compass, Flame, Bell, User, Sparkles, Moon, Sun, Check, LogOut, Settings, ExternalLink, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onToggleSidebar?: () => void;
  isPublic?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onToggleSidebar, isPublic = false }) => {
  const { user, logout, notifications, markNotificationsRead, theme, toggleTheme } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0A0C10]/95 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          {!isPublic && onToggleSidebar && (
            <button
              id="btn-toggle-sidebar"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#11141D] border border-slate-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div
            id="brand-logo-button"
            onClick={() => onNavigate(user ? '/dashboard' : '/')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white">CareerPath</span>
                <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase rounded border border-indigo-500/20">
                  AI Active
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">AI Mentor for Student Careers</p>
            </div>
          </div>
        </div>

        {/* Center Nav: Landing & Public view */}
        {isPublic ? (
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <button
              id="nav-link-explore"
              onClick={() => onNavigate('/explore')}
              className={`hover:text-white transition-colors ${currentRoute === '/explore' ? 'text-indigo-400 font-bold' : ''}`}
            >
              Explore Domains
            </button>
            <button
              id="nav-link-how-it-works"
              onClick={() => onNavigate('/explore')}
              className="hover:text-white transition-colors"
            >
              Career Journey
            </button>
            <button
              id="nav-link-test"
              onClick={() => onNavigate('/personality-test')}
              className="hover:text-white transition-colors flex items-center gap-1 text-indigo-400 font-bold"
            >
              RIASEC Test
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            </button>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-[#11141D] border border-slate-800 text-xs">
            <span className="text-slate-500 uppercase tracking-widest text-[10px] font-semibold">Career Goal:</span>
            <span className="font-semibold text-white px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs">
              {user?.careerTitle || 'Full-Stack AI Developer'}
            </span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400 font-semibold text-xs">Stage {user?.currentStage || 2} ({user?.overallProgress || 72}%)</span>
          </div>
        )}

        {/* Right Action buttons */}
        <div className="flex items-center gap-2.5">
          {/* 3D Explore Domain shortcut */}
          <button
            id="btn-nav-explore-3d"
            onClick={() => onNavigate('/explore')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#11141D] hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 hover:border-indigo-500/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            3D Explorer
          </button>

          {/* Theme switcher */}
          <button
            id="btn-toggle-theme"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#11141D] border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {user ? (
            <>
              {/* Streak Badge */}
              <div
                id="user-streak-pill"
                onClick={() => onNavigate('/analytics')}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#11141D] border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/10 transition-all"
                title={`${user.currentStreakDays} day study streak!`}
              >
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{user.currentStreakDays}d Streak</span>
              </div>

              {/* Notifications Popover */}
              <div className="relative">
                <button
                  id="btn-notifications"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (!showNotifications) markNotificationsRead();
                  }}
                  className="relative p-2 rounded-xl bg-[#11141D] hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-[#0A0C10]" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-96 rounded-3xl bg-[#11141D] border border-slate-800 shadow-2xl p-4 z-50 animate-fade-in">
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
                          <div key={n.id} className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs space-y-1">
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

              {/* User Profile */}
              <div className="relative">
                <button
                  id="btn-user-menu"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2.5 p-1 rounded-xl bg-[#11141D] hover:bg-slate-800 text-white transition-all border border-slate-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
                    {user.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="text-left pr-2 hidden sm:block">
                    <p className="text-xs font-semibold leading-tight text-white">{user.fullName}</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Year 3, CS</p>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-3xl bg-[#11141D] border border-slate-800 shadow-2xl p-2 z-50 animate-fade-in text-xs">
                    <div className="px-3 py-2.5 border-b border-slate-800">
                      <p className="font-semibold text-white">{user.fullName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1.5 space-y-0.5">
                      <button
                        onClick={() => { onNavigate('/profile'); setShowUserMenu(false); }}
                        className="w-full px-3 py-2 rounded-xl text-left text-slate-300 hover:text-white hover:bg-slate-800/70 flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        Developer Profile
                      </button>
                      <button
                        onClick={() => { onNavigate('/resume'); setShowUserMenu(false); }}
                        className="w-full px-3 py-2 rounded-xl text-left text-slate-300 hover:text-white hover:bg-slate-800/70 flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        Resume Builder
                      </button>
                      <button
                        onClick={() => { onNavigate('/settings'); setShowUserMenu(false); }}
                        className="w-full px-3 py-2 rounded-xl text-left text-slate-300 hover:text-white hover:bg-slate-800/70 flex items-center gap-2"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        Settings & Semester
                      </button>
                    </div>
                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={() => { logout(); onNavigate('/auth'); setShowUserMenu(false); }}
                        className="w-full px-3 py-2 rounded-xl text-left text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="btn-nav-login"
                onClick={() => onNavigate('/auth')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#11141D] transition-colors"
              >
                Login
              </button>
              <button
                id="btn-nav-register"
                onClick={() => onNavigate('/auth')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-all"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
