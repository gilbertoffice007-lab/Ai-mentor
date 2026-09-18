import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { FloatingMentorWidget } from './components/mentor/FloatingMentorWidget';
import { Compass, RefreshCw, Sparkles } from 'lucide-react';
import { checkRouteAccess } from './config/semesterAccess';

// Pages
import { Landing } from './pages/Landing';
import { ExploreDomains } from './pages/ExploreDomains';
import { Auth } from './pages/Auth';
import { PersonalityTest } from './pages/PersonalityTest';
import { CareerResult } from './pages/CareerResult';
import { AcademicSetup } from './pages/AcademicSetup';
import { Dashboard } from './pages/Dashboard';
import { Roadmap } from './pages/Roadmap';
import { DailyTasks } from './pages/DailyTasks';
import { Projects } from './pages/Projects';
import { DeveloperProfile } from './pages/DeveloperProfile';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { Internships } from './pages/Internships';
import { PlacementPrep } from './pages/PlacementPrep';
import { Jobs } from './pages/Jobs';
import { TechNews } from './pages/TechNews';
import { Events } from './pages/Events';
import { Analytics } from './pages/Analytics';
import { AIMentorRoom } from './pages/AIMentorRoom';
import { Settings } from './pages/Settings';

const PROTECTED_ROUTES = [
  '/dashboard',
  '/roadmap',
  '/tasks',
  '/projects',
  '/profile',
  '/developer-profile',
  '/resume',
  '/internships',
  '/placement',
  '/jobs',
  '/analytics',
  '/mentor',
  '/settings',
];

// Routes that are part of the onboarding flow — isolated layout (no sidebar)
const ONBOARDING_ROUTES = [
  '/personality-test',
  '/assignment',
  '/assessment',
  '/career-result',
  '/onboarding/setup',
];

// Auth entry points — all render the same Auth page (login/register tabs).
// /login and /register are aliases of /auth so deep links and refreshes work.
const AUTH_ROUTES = [
  '/auth',
  '/login',
  '/register',
];

const AppContent: React.FC = () => {
  const { user, isLoading, toast, hideToast, showToast } = useAuth();

  /**
   * Determine the correct initial route based on the user's onboarding state.
   * This implements the full 5-step onboarding chain:
   *   1. No user             → Landing
   *   2. No riasecResult     → Assessment
   *   3. No domainId         → Career Result / Selection
   *   4. No courseStartDate  → Academic Setup
   *   5. All complete        → Dashboard
   */
  const [currentRoute, setCurrentRoute] = useState<string>(() => window.location.pathname || '/');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync state with browser URL
  const safeSetRoute = (route: string, replace = false) => {
    setCurrentRoute(route);
    if (window.location.pathname !== route) {
      if (replace) {
        window.history.replaceState(null, '', route);
      } else {
        window.history.pushState(null, '', route);
      }
    }
  };

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync route on auth state changes
  useEffect(() => {
    if (!isLoading) {
      if (!user && PROTECTED_ROUTES.includes(currentRoute)) {
        safeSetRoute('/auth', true);
        showToast('Please sign in to access your student dashboard.', 'info');
      } else if (user) {
        // Step-by-step onboarding enforcement
        if (!user.riasecResult) {
          // Must complete assessment first
          if (!ONBOARDING_ROUTES.includes(currentRoute) || currentRoute === '/career-result' || currentRoute === '/onboarding/setup') {
            safeSetRoute('/personality-test', true);
            if (PROTECTED_ROUTES.includes(currentRoute)) {
              showToast('Complete your Career Assessment to get started.', 'info');
            }
          }
        } else if (!user.domainId) {
          // Must select a career path
          if (currentRoute !== '/career-result') {
            safeSetRoute('/career-result', true);
          }
        } else if (!user.courseStartDate) {
          // Must complete academic setup
          if (currentRoute !== '/onboarding/setup') {
            safeSetRoute('/onboarding/setup', true);
          }
        } else if (AUTH_ROUTES.includes(currentRoute) || currentRoute === '/') {          safeSetRoute('/dashboard', true);
        } else if (PROTECTED_ROUTES.includes(currentRoute)) {
          const { hasAccess, requiredStage } = checkRouteAccess(currentRoute, user.currentStage);
          if (!hasAccess) {
            showToast(`This feature unlocks in Semester ${requiredStage}.`, 'warning');
            safeSetRoute('/dashboard', true);
          }
        }
      }
    }
  }, [user, isLoading, currentRoute]);

  // Auth + onboarding screens are checkpoints, not history entries.
  // Navigating TO them REPLACES the current entry instead of pushing.
  // Without this, browser Back walks into stale onboarding pages whose
  // guards instantly push forward again — an infinite back-button trap
  // (e.g. Back onto /personality-test after finishing the assessment).
  const REPLACE_TARGETS = [...AUTH_ROUTES, ...ONBOARDING_ROUTES];

  const handleNavigate = (route: string) => {
    const useReplace = REPLACE_TARGETS.includes(route);
    if (!user && PROTECTED_ROUTES.includes(route)) {
      showToast('Please sign in to access this feature.', 'info');
      safeSetRoute('/auth', true);
    } else if (user) {
      // Enforce onboarding flow
      if (!user.riasecResult && !ONBOARDING_ROUTES.includes(route)) {
        showToast('Please complete your Career Assessment first.', 'info');
        safeSetRoute('/personality-test', true);
      } else if (user.riasecResult && !user.domainId && route !== '/career-result' && !ONBOARDING_ROUTES.includes(route)) {
        safeSetRoute('/career-result', true);
      } else if (user.riasecResult && user.domainId && !user.courseStartDate && route !== '/onboarding/setup' && PROTECTED_ROUTES.includes(route)) {
        safeSetRoute('/onboarding/setup', true);
      } else if (PROTECTED_ROUTES.includes(route)) {
        const { hasAccess, requiredStage } = checkRouteAccess(route, user.currentStage);
        if (!hasAccess) {
          showToast(`This feature unlocks in Semester ${requiredStage}.`, 'warning');
          return;
        }
        safeSetRoute(route);
      } else {
        safeSetRoute(route, useReplace);
      }
    } else {
      safeSetRoute(route, useReplace);
    }
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07090E] text-slate-200 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 animate-pulse">
            <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
              <span>CareerPath AI Mentor</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h1>
            <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>Verifying Supabase secure authentication session...</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Public/onboarding flow: no sidebar shown
  const isPublicFlow = [
    '/',
    '/auth',
    '/login',
    '/register',
    '/explore',
    '/personality-test',
    '/assignment',
    '/assessment',
    '/career-result',
    '/onboarding/setup',
  ].includes(currentRoute) || !user;

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/':
        return <Landing onNavigate={handleNavigate} />;
      case '/explore':
        return <ExploreDomains onNavigate={handleNavigate} onSelectCareer={() => handleNavigate('/roadmap')} />;
      case '/auth':
        return <Auth key="auth" onNavigate={handleNavigate} />;
      case '/login':
        return <Auth key="login" initialMode="login" onNavigate={handleNavigate} />;
      case '/register':
        return <Auth key="register" initialMode="register" onNavigate={handleNavigate} />;
      case '/personality-test':
      case '/assignment':
      case '/assessment':
        return <PersonalityTest onNavigate={handleNavigate} />;
      case '/career-result':
        return <CareerResult onNavigate={handleNavigate} />;
      case '/onboarding/setup':
        return <AcademicSetup onNavigate={handleNavigate} />;
      case '/dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case '/roadmap':
        return <Roadmap onNavigate={handleNavigate} />;
      case '/tasks':
        return <DailyTasks onNavigate={handleNavigate} />;
      case '/projects':
        return <Projects onNavigate={handleNavigate} />;
      case '/profile':
      case '/developer-profile':
        return <DeveloperProfile onNavigate={handleNavigate} />;
      case '/resume':
        return <ResumeBuilder onNavigate={handleNavigate} />;
      case '/internships':
        return <Internships onNavigate={handleNavigate} />;
      case '/placement':
        return <PlacementPrep onNavigate={handleNavigate} />;
      case '/jobs':
        return <Jobs onNavigate={handleNavigate} />;
      case '/news':
        return <TechNews />;
      case '/events':
        return <Events />;
      case '/analytics':
        return <Analytics />;
      case '/mentor':
        return <AIMentorRoom />;
      case '/settings':
        return <Settings onNavigate={handleNavigate} />;
      default:
        return user ? <Dashboard onNavigate={handleNavigate} /> : <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-200 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isPublic={isPublicFlow}
      />

      {/* Main Area with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar only shown for authenticated dashboard pages */}
        {!isPublicFlow && user && (
          <Sidebar
            currentRoute={currentRoute}
            onNavigate={handleNavigate}
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Page Viewport */}
        <main
          className={`flex-1 min-w-0 overflow-y-auto transition-all duration-300 ${
            !isPublicFlow && user ? 'pb-24 lg:pb-10 lg:pl-64' : ''
          }`}
        >
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile Bottom Thumb Navigation */}
      {!isPublicFlow && user && (
        <MobileBottomNav
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onOpenSidebar={() => setIsMobileSidebarOpen(true)}
        />
      )}

      {/* Omnipresent AI Floating Mentor Widget */}
      {!isPublicFlow && user && (
        <FloatingMentorWidget currentRoute={currentRoute} onNavigate={handleNavigate} />
      )}

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-50 animate-bounce">
          <div
            className={`px-4 sm:px-5 py-3 rounded-2xl text-xs font-semibold shadow-2xl flex items-center gap-3 border backdrop-blur-xl ${
              toast.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-rose-500/40 shadow-rose-950/50'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 text-amber-200 border-amber-500/40 shadow-amber-950/50'
                : toast.type === 'info'
                ? 'bg-indigo-950/90 text-cyan-200 border-indigo-500/40 shadow-indigo-950/50'
                : 'bg-slate-900/95 text-white border-emerald-500/40 shadow-emerald-950/50'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={hideToast}
              className="text-slate-400 hover:text-white text-xs ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
