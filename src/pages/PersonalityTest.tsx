import React, { useState, useEffect } from 'react';
import {
  RIASEC_48_QUESTIONS,
  RIASEC_OPTIONS,
  RIASEC_CATEGORIES_META,
  calculateRIASECScores
} from '../data/riasecData';
import { PersonalityResult, RIASECCategoryKey } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Brain,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Compass,
  Clock,
  ShieldCheck,
  Target,
  RefreshCw,
  BookOpen,
  Wrench,
  Palette,
  Users,
  TrendingUp,
  CheckSquare,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PersonalityTestProps {
  onNavigate: (route: string) => void;
}

const STORAGE_PROGRESS_KEY = 'careerpath_riasec_progress';

export const PersonalityTest: React.FC<PersonalityTestProps> = ({ onNavigate }) => {
  const { user, isLoading, updateUser, showToast } = useAuth();

  // Test flow stage: 'intro' | 'testing'
  const [stage, setStage] = useState<'intro' | 'testing' | 'results'>('intro');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [animatingStep, setAnimatingStep] = useState<boolean>(false);
  const questions = RIASEC_48_QUESTIONS;
  const currentQ = questions[currentStep];

  // Restore saved in-progress state on mount.
  // Guests must sign in first (workflow: landing → auth → assessment),
  // otherwise their 48 answers would be lost. Completed users skip ahead.
  useEffect(() => {
    if (!isLoading && !user) {
      showToast('Please sign in or create a student account to take the assessment.', 'info');
      onNavigate('/auth');
      return;
    }
    try {
      const savedProgress = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed.responses && typeof parsed.responses === 'object') {
          setResponses(parsed.responses);
          if (parsed.currentStep !== undefined && !user?.riasecResult) {
            setCurrentStep(Math.min(questions.length - 1, Math.max(0, parsed.currentStep)));
          }
        }
      }
    } catch (e) {
      console.warn('Could not restore RIASEC progress', e);
    }

    // If already completed, go directly to career result page
    if (user?.riasecResult) {
      onNavigate('/career-result');
    }
  }, [user, isLoading]);

  // Persist progress to localStorage
  const saveProgress = (newResponses: Record<number, number>, step: number) => {
    try {
      localStorage.setItem(
        STORAGE_PROGRESS_KEY,
        JSON.stringify({
          responses: newResponses,
          currentStep: step,
          timestamp: new Date().toISOString()
        })
      );
    } catch (e) {
      console.warn('Storage save warning:', e);
    }
  };

  // Handle selecting an answer
  const handleSelectOption = (points: number) => {
    const updated = {
      ...responses,
      [currentQ.id]: points
    };
    setResponses(updated);
    saveProgress(updated, currentStep);
  };

  // Move to next question or complete
  const handleContinue = () => {
    if (!responses[currentQ.id]) {
      showToast('Please select an answer before continuing.', 'warning');
      return;
    }

    if (currentStep < questions.length - 1) {
      setAnimatingStep(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        saveProgress(responses, currentStep + 1);
        setAnimatingStep(false);
      }, 150);
    } else {
      handleCompleteAssessment();
    }
  };

  // Move to previous question
  const handlePrevious = () => {
    if (currentStep > 0) {
      setAnimatingStep(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        saveProgress(responses, currentStep - 1);
        setAnimatingStep(false);
      }, 150);
    }
  };

  // Start assessment from intro
  const handleStartAssessment = () => {
    setStage('testing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retake test
  const handleRetake = () => {
    setResponses({});
    setCurrentStep(0);
    setStage('testing');
    localStorage.removeItem(STORAGE_PROGRESS_KEY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete assessment and compute real-time scores, then navigate to career result page
  const handleCompleteAssessment = async () => {
    setIsSubmitting(true);
    try {
      const calculatedResult = calculateRIASECScores(responses);
      calculatedResult.userId = user?.id || 'current_student';

      const res = await api.completeRIASEC(responses);
      const finalResult = res.success && res.result ? res.result : calculatedResult;

      await updateUser({
        riasecResult: finalResult,
        onboardingStatus: 'assessment_completed',
      });
      localStorage.removeItem(STORAGE_PROGRESS_KEY);

      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      showToast('Career Interest Profile generated! Viewing your results... 🎉');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Navigate to dedicated Career Result page
      onNavigate('/career-result');
    } catch (e) {
      console.error('Error completing RIASEC assessment', e);
      const fallback = calculateRIASECScores(responses);
      await updateUser({
        riasecResult: fallback,
        onboardingStatus: 'assessment_completed',
      });
      localStorage.removeItem(STORAGE_PROGRESS_KEY);
      showToast('Career Interest Profile generated! 🎉');
      onNavigate('/career-result');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPct = Math.round(((currentStep + 1) / questions.length) * 100);
  const isCurrentAnswered = !!responses[currentQ?.id];

  // Helper for category icon
  const getCategoryIcon = (code: string) => {
    switch (code) {
      case 'R':
        return <Wrench className="w-4 h-4" />;
      case 'I':
        return <Brain className="w-4 h-4" />;
      case 'A':
        return <Palette className="w-4 h-4" />;
      case 'S':
        return <Users className="w-4 h-4" />;
      case 'E':
        return <TrendingUp className="w-4 h-4" />;
      case 'C':
        return <CheckSquare className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  /* =========================================================================
     STAGE 1: INTRODUCTION ONBOARDING SCREEN
     ========================================================================= */
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-[#07090E] text-slate-100 p-4 sm:p-6 lg:p-10 flex flex-col justify-center items-center relative overflow-hidden">
        {/* Glow ambient backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl w-full mx-auto relative z-10 space-y-10 py-6">
          {/* Top Pill */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-indigo-950/50">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span>Holland RIASEC Career Exploration</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Discover Your Career Interests
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              "Let's understand what naturally interests, motivates, and excites you."
            </p>
          </div>

          {/* Clean Tech/Career Exploration Illustration & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Holographic Radar / Career Constellation Visual */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center">
                {/* Orbit rings */}
                <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-pulse" />
                <div className="absolute inset-6 rounded-full border border-cyan-500/20 border-dashed animate-spin" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-14 rounded-full border border-emerald-500/20" />

                {/* Central AI Core */}
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-2xl shadow-indigo-500/30 flex items-center justify-center relative z-10">
                  <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center text-center p-2">
                    <Brain className="w-8 h-8 text-cyan-300 mb-1" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">RIASEC</span>
                  </div>
                </div>

                {/* 6 Dimension Satellite Nodes */}
                {[
                  { key: 'R', label: 'Realistic', color: 'border-amber-500/60 bg-amber-950/80 text-amber-300', pos: 'top-2 left-1/2 -translate-x-1/2', icon: '⚙️' },
                  { key: 'I', label: 'Investigative', color: 'border-cyan-500/60 bg-cyan-950/80 text-cyan-300', pos: 'top-14 right-2', icon: '🔬' },
                  { key: 'A', label: 'Artistic', color: 'border-fuchsia-500/60 bg-fuchsia-950/80 text-fuchsia-300', pos: 'bottom-14 right-2', icon: '🎨' },
                  { key: 'S', label: 'Social', color: 'border-emerald-500/60 bg-emerald-950/80 text-emerald-300', pos: 'bottom-2 left-1/2 -translate-x-1/2', icon: '🤝' },
                  { key: 'E', label: 'Enterprising', color: 'border-indigo-500/60 bg-indigo-950/80 text-indigo-300', pos: 'bottom-14 left-2', icon: '🚀' },
                  { key: 'C', label: 'Conventional', color: 'border-blue-500/60 bg-blue-950/80 text-blue-300', pos: 'top-14 left-2', icon: '📊' }
                ].map((node, i) => (
                  <div
                    key={node.key}
                    className={`absolute ${node.pos} px-2.5 py-1.5 rounded-xl border backdrop-blur-md text-[11px] font-bold shadow-lg flex items-center gap-1.5 transition-all hover:scale-110 ${node.color}`}
                  >
                    <span>{node.icon}</span>
                    <span>{node.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Pillars & Guidelines */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3.5 backdrop-blur-xl shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  What to Expect
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-white block">8–10 Minutes</span>
                      <span className="text-[11px] text-slate-400">Quick and focused flow</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <BookOpen className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-white block">48 Questions</span>
                      <span className="text-[11px] text-slate-400">8 per interest dimension</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-white block">No Right or Wrong</span>
                      <span className="text-[11px] text-slate-400">There are no wrong answers</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <Target className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-white block">Career Matching</span>
                      <span className="text-[11px] text-slate-400">Identifies suitable paths</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-slate-300 flex items-start gap-2">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Answer honestly:</strong> Select the option that best reflects your genuine interest. Your responses calculate your 6-dimension Holland Code.
                  </span>
                </div>
              </div>

              {/* Primary Start Button */}
              <button
                id="btn-start-riasec-assessment"
                onClick={handleStartAssessment}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 hover:from-indigo-600 hover:via-cyan-600 hover:to-emerald-600 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     STAGE 2: QUESTION INTERFACE (1 OF 48)
     ========================================================================= */
  if (stage === 'testing') {
    const selectedPoints = responses[currentQ.id];
    const isFinalQuestion = currentStep === questions.length - 1;

    return (
      <div className="min-h-screen bg-[#07090E] text-slate-100 p-4 sm:p-6 lg:p-10 flex flex-col justify-between relative overflow-hidden">
        {/* Glow ambient backdrops */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl w-full mx-auto space-y-6 relative z-10 flex-1 flex flex-col justify-center py-4">
          {/* Header Bar with Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Career Interest Assessment
                </span>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Question {currentStep + 1} of {questions.length}
                </h2>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-extrabold text-xs">
                  {progressPct}%
                </span>
              </div>
            </div>

            {/* Horizontal Progress Bar */}
            <div className="w-full bg-slate-800/90 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-1.5 rounded-full transition-all duration-300 shadow-sm shadow-cyan-500/50"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Question Card Area */}
          <div
            className={`rounded-3xl bg-slate-900/95 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8 transition-opacity duration-150 ${
              animatingStep ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'
            }`}
          >
            {/* Prompt & Statement */}
            <div className="space-y-2 text-center py-2">
              <span className="text-xs sm:text-sm font-semibold text-indigo-400 uppercase tracking-wider block">
                How much would you enjoy doing this?
              </span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white leading-relaxed max-w-2xl mx-auto pt-1">
                "{currentQ.question}"
              </h1>
            </div>

            {/* 5 Selectable Large Answer Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {RIASEC_OPTIONS.map(opt => {
                const isSelected = selectedPoints === opt.points;
                return (
                  <button
                    key={opt.points}
                    id={`btn-riasec-option-${opt.points}`}
                    onClick={() => handleSelectOption(opt.points)}
                    className={`p-4 sm:p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group relative overflow-hidden ${
                      isSelected
                        ? 'bg-indigo-600/30 border-cyan-400 text-white shadow-xl shadow-indigo-500/25 ring-2 ring-cyan-400/60 scale-[1.03]'
                        : 'bg-slate-800/70 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:scale-[1.01]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                      </div>
                    )}
                    <span className="text-3xl sm:text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                      {opt.emoji}
                    </span>
                    <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {opt.label}
                    </span>
                    <span className={`text-[10px] uppercase font-semibold tracking-wider ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`}>
                      Level {opt.points}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation & Continue Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                id="btn-riasec-previous"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-3">
                {isFinalQuestion ? (
                  <button
                    id="btn-view-career-profile"
                    onClick={handleContinue}
                    disabled={!isCurrentAnswered || isSubmitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Calculating Profile...</span>
                      </>
                    ) : (
                      <>
                        <span>View My Career Profile</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    id="btn-riasec-continue"
                    onClick={handleContinue}
                    disabled={!isCurrentAnswered}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Answered Counter Footer */}
          <div className="text-center text-xs text-slate-400">
            <span>{Object.keys(responses).length} of {questions.length} questions answered</span>
          </div>
        </div>
      </div>
    );
  }

  // Assessment is complete — redirect handled by useEffect above
  return null;
};

