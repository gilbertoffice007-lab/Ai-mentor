import React, { useState, useRef, useEffect } from 'react';
import {
  Brain, Award, Briefcase, ArrowRight, RefreshCw, CheckCircle2,
  Sparkles, ChevronRight, BarChart2, Target, DollarSign,
  GraduationCap, ExternalLink, X, Zap, Compass, TrendingUp, BookOpen
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip
} from 'recharts';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  CareerRecommendation,
  RIASECCategoryKey,
  RIASECCategoryDetail
} from '../types';

interface CareerResultProps {
  onNavigate: (route: string) => void;
}

const CATEGORY_ICON_MAP: Record<RIASECCategoryKey, React.ReactNode> = {
  R: <span title="Realistic">⚙️</span>,
  I: <span title="Investigative">🔬</span>,
  A: <span title="Artistic">🎨</span>,
  S: <span title="Social">🤝</span>,
  E: <span title="Enterprising">🚀</span>,
  C: <span title="Conventional">📊</span>,
};

export const CareerResult: React.FC<CareerResultProps> = ({ onNavigate }) => {
  const { user, updateUser, showToast } = useAuth();
  const result = user?.riasecResult;
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);
  const [isActivating, setIsActivating] = useState<string | null>(null);
  const careersSectionRef = useRef<HTMLDivElement>(null);

  // If there's no riasecResult, redirect back to assessment
  useEffect(() => {
    if (!result) {
      onNavigate('/personality-test');
    }
  }, [result]);

  if (!result) return null;

  // Radar chart data
  const radarData = [
    { subject: 'Realistic', score: result.scores.R },
    { subject: 'Investigative', score: result.scores.I },
    { subject: 'Artistic', score: result.scores.A },
    { subject: 'Social', score: result.scores.S },
    { subject: 'Enterprising', score: result.scores.E },
    { subject: 'Conventional', score: result.scores.C },
  ];

  const categoryDetails: RIASECCategoryDetail[] = result.categoryDetails || [];

  const handleSelectCareer = async (rec: CareerRecommendation) => {
    setIsActivating(rec.careerId);
    try {
      await api.selectCareer({
        domainId: rec.domainId,
        careerId: rec.careerId,
        careerTitle: rec.title,
      });
      await updateUser({
        domainId: rec.domainId,
        careerId: rec.careerId,
        careerTitle: rec.title,
        onboardingStatus: 'career_path_selected',
      });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      showToast(`Career path set: ${rec.title} 🎯`);
      // Navigate to academic setup wizard
      onNavigate('/onboarding/setup');
    } catch (e) {
      console.error(e);
      showToast('Failed to select career. Please try again.', 'error');
    } finally {
      setIsActivating(null);
    }
  };

  const handleRetake = () => {
    updateUser({ riasecResult: undefined, onboardingStatus: 'assessment_not_started' });
    localStorage.removeItem('careerpath_riasec_progress');
    onNavigate('/personality-test');
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100">
      {/* ── Minimal onboarding header ── */}
      <header className="sticky top-0 z-30 bg-[#07090E]/90 backdrop-blur-xl border-b border-slate-800/80 px-5 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-white tracking-tight text-sm">CareerPath AI</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Onboarding progress indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Assessment
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-cyan-300 font-semibold">Career Profile</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-500">Academic Setup</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-500">Dashboard</span>
            </div>
            <button
              id="btn-retake-assessment"
              onClick={handleRetake}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Retake
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* ── Hero: RIASEC code + title ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Psychometric Assessment Results</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your Career Interest Profile
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your answers reveal the activities and environments you naturally gravitate toward.
            Review your profile below and select a career path to continue.
          </p>
        </div>

        {/* ── RIASEC Profile Card ── */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Dominant code strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Your RIASEC Code</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400 tracking-wider">
                  {result.dominantCode}
                </span>
                <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Primary: {result.primaryInterest}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Primary: <strong>{result.primaryInterest}</strong>
                {result.secondaryInterest && <> · Secondary: <strong>{result.secondaryInterest}</strong></>}
                {result.tertiaryInterest && <> · Third: <strong>{result.tertiaryInterest}</strong></>}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1.5">
              <span className="text-xs text-slate-400">Personality Type</span>
              <span className="text-sm font-bold text-white">{result.personalityTitle}</span>
            </div>
          </div>

          {/* Radar chart + bar breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Radar */}
            <div className="lg:col-span-5 h-72 sm:h-80 w-full flex flex-col items-center justify-center bg-slate-950/70 rounded-2xl p-3 border border-slate-800/80 shadow-inner">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">6-Dimension Interest Radar</span>
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 600 }} />
                    <PolarRadiusAxis stroke="#475569" angle={30} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#f8fafc' }} />
                    <Radar name="Interest Score" dataKey="score" stroke="#818cf8" fill="#6366f1" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar breakdown */}
            <div className="lg:col-span-7 space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-1">Interest Dimension Scores (Ranked)</span>
              {categoryDetails.map(cat => (
                <div key={cat.code} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-md bg-slate-800 text-slate-300">{CATEGORY_ICON_MAP[cat.code]}</span>
                      <span className="text-white">{cat.fullName}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${cat.badgeColor}`}>{cat.level}</span>
                    </div>
                    <span className="text-indigo-300 font-extrabold">{cat.score}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className={`bg-gradient-to-r ${cat.barColor} h-2 rounded-full transition-all duration-700`} style={{ width: `${cat.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Top 3 Dimensions ── */}
        {categoryDetails.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                Understanding Your Top 3 Interest Dimensions
              </h2>
              <span className="text-xs text-slate-400">Activities & Environments You May Prefer</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryDetails.slice(0, 3).map((cat, idx) => (
                <div key={cat.code} className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 p-6 flex flex-col justify-between shadow-xl transition-all space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{CATEGORY_ICON_MAP[cat.code]}</span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Rank #{idx + 1} ({cat.score}%)</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{cat.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">"{cat.description}"</p>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Preferred Work Activities</span>
                    <ul className="space-y-1.5">
                      {cat.workActivities.slice(0, 2).map((act, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Career Recommendations ── */}
        <div ref={careersSectionRef} className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-indigo-400" />
                Select Your Career Path
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Ranked by compatibility across your 6 RIASEC interest scores. Click a card to activate your path.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
              {result.recommendations?.length || 0} career matches found
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(result.recommendations || []).map((rec, i) => (
              <div
                key={rec.careerId}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 p-6 flex flex-col justify-between shadow-xl transition-all group relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedCareer(rec)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{rec.field}</span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {rec.matchScore}% Match
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-tight">{rec.title}</h3>
                    {rec.reason && <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{rec.reason}</p>}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(rec.keySkills || []).slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
                  <div className="space-y-0.5">
                    {rec.averageSalary && <p className="text-xs text-emerald-400 font-semibold">{rec.averageSalary}</p>}
                    {rec.demandGrowth && <p className="text-[10px] text-slate-400">{rec.demandGrowth} growth</p>}
                  </div>
                  <button
                    id={`btn-select-career-${rec.careerId}`}
                    onClick={e => { e.stopPropagation(); handleSelectCareer(rec); }}
                    disabled={!!isActivating}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
                  >
                    {isActivating === rec.careerId
                      ? <><RefreshCw className="w-3 h-3 animate-spin" /> Activating...</>
                      : <><Zap className="w-3 h-3" /> Select Path</>
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Career Detail Modal ── */}
      {selectedCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto holo-scroll">
            {/* Modal header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-extrabold text-white">{selectedCareer.title}</h3>
                <p className="text-xs text-slate-400">{selectedCareer.field}</p>
              </div>
              <button
                id="btn-close-career-modal"
                onClick={() => setSelectedCareer(null)}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Match score */}
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2.5 rounded-full" style={{ width: `${selectedCareer.matchScore}%` }} />
                </div>
                <span className="text-sm font-black text-emerald-400 whitespace-nowrap">{selectedCareer.matchScore}% Interest Match</span>
              </div>
              {/* Why it matches */}
              {selectedCareer.whyMatches && selectedCareer.whyMatches.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2"><Target className="w-4 h-4" /> Why This Matches You</h4>
                  <ul className="space-y-1.5">
                    {selectedCareer.whyMatches.map((w, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />{w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Key skills */}
              {selectedCareer.keySkills?.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-indigo-300 mb-2">Key Skills You'll Build</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.keySkills.map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {/* Salary + growth */}
              <div className="grid grid-cols-2 gap-4">
                {selectedCareer.averageSalary && (
                  <div className="bg-slate-800/60 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-emerald-400 mb-1"><DollarSign className="w-3.5 h-3.5" /><span className="text-[11px] font-bold uppercase tracking-wider">Avg Salary</span></div>
                    <span className="text-sm font-extrabold text-white">{selectedCareer.averageSalary}</span>
                  </div>
                )}
                {selectedCareer.demandGrowth && (
                  <div className="bg-slate-800/60 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-cyan-400 mb-1"><TrendingUp className="w-3.5 h-3.5" /><span className="text-[11px] font-bold uppercase tracking-wider">Demand Growth</span></div>
                    <span className="text-sm font-extrabold text-white">{selectedCareer.demandGrowth}</span>
                  </div>
                )}
              </div>
              {/* Learning path */}
              {selectedCareer.recommendedLearningPath && selectedCareer.recommendedLearningPath.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Recommended Learning Path</h4>
                  <ol className="space-y-1.5">
                    {selectedCareer.recommendedLearningPath.map((step, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {/* CTA */}
              <button
                id={`btn-activate-career-${selectedCareer.careerId}`}
                onClick={() => handleSelectCareer(selectedCareer)}
                disabled={!!isActivating}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-500 hover:from-indigo-500 hover:via-cyan-500 hover:to-emerald-400 text-white font-extrabold tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {isActivating === selectedCareer.careerId
                  ? <><RefreshCw className="w-4 h-4 animate-spin" /> Activating Career Path...</>
                  : <><Zap className="w-4 h-4" /> Activate This Career Path <ArrowRight className="w-4 h-4" /></>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
