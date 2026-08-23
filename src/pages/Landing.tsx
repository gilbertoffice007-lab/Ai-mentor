import React from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Milestone,
  Brain,
  Layers,
  Award,
  Building2,
  Briefcase,
  Users,
  Terminal,
  Zap,
  TrendingUp,
  Cpu,
  BookOpen
} from 'lucide-react';
import { DOMAINS } from '../data/initialData';

interface LandingProps {
  onNavigate: (route: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const careerJourneyStages = [
    { num: '01', title: 'School & Foundation', desc: 'Core logic, math, fundamentals, and scientific inquiry.', icon: BookOpen, color: 'from-blue-500 to-cyan-400' },
    { num: '02', title: 'Career Discovery', desc: 'Holland RIASEC psychometric analysis and 3D domain exploration.', icon: Compass, color: 'from-cyan-400 to-indigo-500' },
    { num: '03', title: 'Skill Mastery', desc: 'Personalized semester-aware daily tasks & modern tech stacks.', icon: Layers, color: 'from-indigo-500 to-purple-500' },
    { num: '04', title: 'Real Projects', desc: 'Portfolio-grade full-stack and AI apps with milestone schedules.', icon: Terminal, color: 'from-purple-500 to-pink-500' },
    { num: '05', title: 'Internships', desc: 'Matching algorithms connecting verified skills to top tech firms.', icon: Building2, color: 'from-pink-500 to-rose-500' },
    { num: '06', title: 'Placement & Job', desc: 'DSA coding sandboxes, AI mock interviews, and high-paying offers.', icon: Briefcase, color: 'from-amber-400 to-emerald-400' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-lg shadow-indigo-950/50">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          The Modern AI Operating System for Student Careers
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Your AI Mentor for the Journey from{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Student to Professional.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Discover the right career, build industry-tested skills, complete production projects, prepare for placements, and land verified job opportunities with a personalized AI-guided roadmap.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="btn-hero-start-journey"
            onClick={() => onNavigate('/personality-test')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-base shadow-2xl shadow-indigo-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Start Your Career Journey
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            id="btn-hero-explore-domains"
            onClick={() => onNavigate('/explore')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 hover:border-indigo-500/40 shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <Compass className="w-5 h-5 text-cyan-400" />
            Explore 12 Domains (3D)
          </button>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Active Students Guided', value: '25,000+' },
            { label: 'Verified Career Roadmaps', value: '12 Domains' },
            { label: 'Internship Placement Rate', value: '94.2%' },
            { label: 'AI Mentor Availability', value: '24/7 Real-Time' }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Six-Stage Career Journey Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Step-by-Step Blueprint</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            The Six-Stage Career Transformation
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            From the moment you leave school to receiving your first full-time offer letter, our adaptive AI engine generates tasks, tests, and milestones tailored to your pace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerJourneyStages.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="relative rounded-3xl bg-slate-900/80 border border-slate-800 p-6 hover:border-indigo-500/40 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-600 group-hover:text-indigo-400 transition-colors">
                      {st.num}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${st.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                  <span>AI Guided Milestones</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Explore Major Domains Grid Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Infinite Possibilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">12 Major Career Domains</h2>
            <p className="text-sm text-slate-400 mt-2">Explore 40+ specialized career paths with full roadmaps and salary benchmarks.</p>
          </div>
          <button
            id="btn-landing-all-domains"
            onClick={() => onNavigate('/explore')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-all self-start md:self-auto"
          >
            View All 12 Domains & 3D Visualizer
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DOMAINS.slice(0, 6).map((domain) => (
            <div
              key={domain.id}
              onClick={() => onNavigate('/explore')}
              className="cursor-pointer p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/95 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: domain.color }}
                >
                  <Cpu className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {domain.careerGrowth}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-4 group-hover:text-cyan-300 transition-colors">
                {domain.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {domain.description}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">{domain.careers.length} Specialized Careers</span>
                <span className="font-semibold text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Launch 3D
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-cyan-900 p-8 sm:p-12 border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Discover Your True Career Potential?
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
              Take the 5-minute interactive Holland RIASEC assessment and unlock your dynamic, semester-aware career roadmap now.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="btn-landing-take-assessment"
                onClick={() => onNavigate('/personality-test')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-indigo-900 font-extrabold text-sm shadow-xl transition-all"
              >
                Take Free RIASEC Career Test
              </button>
              <button
                id="btn-landing-login-dash"
                onClick={() => onNavigate('/auth')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-950/60 hover:bg-indigo-950 text-white font-semibold text-sm border border-indigo-400/30 transition-all"
              >
                Sign In to Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
