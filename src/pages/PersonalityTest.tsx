import React, { useState, useEffect } from 'react';
import { RIASEC_QUESTIONS } from '../data/initialData';
import { PersonalityResult, RIASECScore, CareerRecommendation } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Brain,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Compass,
  Layers,
  Award,
  BarChart2,
  Briefcase
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';
import confetti from 'canvas-confetti';

interface PersonalityTestProps {
  onNavigate: (route: string) => void;
}

export const PersonalityTest: React.FC<PersonalityTestProps> = ({ onNavigate }) => {
  const { user, updateUser, showToast } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { type: keyof RIASECScore; points: number }>>({});
  const [result, setResult] = useState<PersonalityResult | null>(user?.riasecResult || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = RIASEC_QUESTIONS;
  const currentQ = questions[currentStep];

  const handleSelectOption = (points: number) => {
    const qCategory = (currentQ.category || currentQ.type || 'R') as keyof RIASECScore;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: { type: qCategory, points }
    }));

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleCompleteAssessment = async () => {
    setIsSubmitting(true);
    try {
      const answerList = Object.keys(answers).map(k => ({
        questionId: k,
        type: answers[k].type,
        points: answers[k].points
      }));

      const res = await api.completeRIASEC(answerList);
      if (res.success && res.result) {
        setResult(res.result);
        await updateUser({ riasecResult: res.result });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        showToast('Holland RIASEC profile generated successfully! 🎉');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectCareer = async (rec: CareerRecommendation) => {
    await api.selectCareer({
      domainId: rec.domainId,
      careerId: rec.careerId,
      careerTitle: rec.title
    });
    await updateUser({
      domainId: rec.domainId,
      careerId: rec.careerId,
      careerTitle: rec.title
    });
    showToast(`Career Path set to: ${rec.title} 🚀`);
    onNavigate('/roadmap');
  };

  const radarData = result ? [
    { subject: 'Realistic (R)', score: result.scores.R, fullMark: 30 },
    { subject: 'Investigative (I)', score: result.scores.I, fullMark: 30 },
    { subject: 'Artistic (A)', score: result.scores.A, fullMark: 30 },
    { subject: 'Social (S)', score: result.scores.S, fullMark: 30 },
    { subject: 'Enterprising (E)', score: result.scores.E, fullMark: 30 },
    { subject: 'Conventional (C)', score: result.scores.C, fullMark: 30 }
  ] : [];

  const progressPct = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            Psychometric RIASEC Career Matching
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Discover Your Ideal Career Blueprint
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Based on Dr. John Holland’s Theory of Career Choice, evaluating your cognitive alignment across 6 behavioral dimensions.
          </p>
        </div>

        {/* Assessment Question View */}
        {!result ? (
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8">
            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span className="text-indigo-400 font-bold">{progressPct}% Completed</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-3 py-4">
              <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Dimension: {(currentQ.category || currentQ.type) === 'R' ? 'Realistic' : (currentQ.category || currentQ.type) === 'I' ? 'Investigative' : (currentQ.category || currentQ.type) === 'A' ? 'Artistic' : (currentQ.category || currentQ.type) === 'S' ? 'Social' : (currentQ.category || currentQ.type) === 'E' ? 'Enterprising' : 'Conventional'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id]?.points === opt.points;
                return (
                  <button
                    key={idx}
                    id={`btn-riasec-opt-${idx}`}
                    onClick={() => handleSelectOption(opt.points)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg ring-1 ring-indigo-400'
                        : 'bg-slate-800/70 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-white block">{opt.label || opt.text}</span>
                      {opt.description && <span className="text-[11px] text-slate-400 block mt-0.5">{opt.description}</span>}
                    </div>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                      isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950 font-bold' : 'border-slate-600 text-slate-400'
                    }`}>
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation & Submit Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentStep === questions.length - 1 ? (
                <button
                  id="btn-complete-riasec"
                  onClick={handleCompleteAssessment}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
                >
                  {isSubmitting ? 'Calculating Cognitive Profile...' : 'Generate Career Matches'}
                  <Sparkles className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(questions.length - 1, prev + 1))}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  Next Question
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Assessment Results View */
          <div className="space-y-8 animate-fade-in">
            {/* Top Result Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Holland Code: {result.dominantCode}
                    </span>
                    <span className="text-xs text-slate-400">Match Confidence: 96%</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2.5">
                    {result.personalityTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* Retake test button */}
                <button
                  onClick={() => { setResult(null); setCurrentStep(0); setAnswers({}); }}
                  className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700"
                >
                  Retake Assessment
                </button>
              </div>

              {/* Radar Chart & Key Strengths Grid */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Radar Chart */}
                <div className="lg:col-span-5 h-64 sm:h-72 w-full flex items-center justify-center bg-slate-900/80 rounded-2xl p-2 border border-slate-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                      <PolarRadiusAxis stroke="#475569" angle={30} domain={[0, 30]} />
                      <Radar name="Score" dataKey="score" stroke="#818cf8" fill="#6366f1" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Strengths & Workstyle */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-cyan-400" />
                      Your Cognitive & Professional Strengths
                    </h4>
                    <ul className="space-y-2">
                      {result.strengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20">
                    <span className="text-xs font-bold text-indigo-200">Recommended Work Style:</span>
                    <p className="text-xs text-slate-300 mt-1">{result.workStyle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top 3 Recommended Careers */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-400" />
                  Top 3 AI-Matched Career Roadmaps
                </h3>
                <span className="text-xs text-slate-400">Click any roadmap to activate</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.recommendations.map((rec, i) => (
                  <div
                    key={rec.careerId}
                    className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 p-6 flex flex-col justify-between shadow-xl transition-all group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {rec.field}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {rec.matchScore}% Match
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {rec.reason}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800/70 text-xs space-y-1">
                        <div className="flex justify-between text-slate-400">
                          <span>Avg. Package:</span>
                          <span className="text-emerald-400 font-semibold">{rec.averageSalary}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Industry Growth:</span>
                          <span className="text-cyan-300 font-semibold">{rec.demandGrowth}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Core Competencies
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {rec.keySkills.map((sk, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] text-slate-300 border border-slate-700">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      id={`btn-select-career-${rec.careerId}`}
                      onClick={() => handleSelectCareer(rec)}
                      className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-1.5 transition-all"
                    >
                      Select This Career Roadmap
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
