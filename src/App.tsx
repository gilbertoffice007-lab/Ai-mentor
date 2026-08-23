import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { FloatingMentorWidget } from './components/mentor/FloatingMentorWidget';
import { Compass, RefreshCw, Sparkles } from 'lucide-react';

// Pages
import { Landing } from './pages/Landing';
import { ExploreDomains } from './pages/ExploreDomains';
import { Auth } from './pages/Auth';
import { PersonalityTest } from './pages/PersonalityTest';
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

const AppContent: React.FC = () => {
  const { user, isLoading, toast, hideToast, showToast } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<string>(user ? '/dashboard' : '/');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync route on auth state changes
  useEffect(() => {
    if (!isLoading) {
      if (!user && PROTECTED_ROUTES.includes(currentRoute)) {
        setCurrentRoute('/auth');
        showToast('Please sign in to access your student dashboard.', 'info');
      } else if (user && (currentRoute === '/auth' || currentRoute === '/')) {
        setCurrentRoute('/dashboard');
      }
    }
  }, [user, isLoading]);

  const handleNavigate = (route: string) => {
    if (!user && PROTECTED_ROUTES.includes(route)) {
      showToast('Please sign in to access this feature.', 'info');
      setCurrentRoute('/auth');
    } else {
      setCurrentRoute(route);
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

  // Public/Starting Flow Pages (No Dashboard Sidebar)
  const isPublicFlow = currentRoute === '/' || currentRoute === '/auth' || currentRoute === '/explore' || !user;

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/':
        return <Landing onNavigate={handleNavigate} />;
      case '/explore':
        return <ExploreDomains onNavigate={handleNavigate} onSelectCareer={() => handleNavigate('/roadmap')} />;
      case '/auth':
        return <Auth onNavigate={handleNavigate} />;
      case '/personality-test':
        return <PersonalityTest onNavigate={handleNavigate} />;
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
        <FloatingMentorWidget onNavigate={handleNavigate} />
      )}

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 animate-bounce">
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
