import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PlacementQuestion } from '../types';
import {
  GraduationCap,
  Sparkles,
  Play,
  CheckCircle2,
  XCircle,
  Terminal,
  Code,
  Layers,
  HelpCircle,
  Clock,
  RotateCcw,
  Loader2,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlacementPrepProps {
  onNavigate: (route: string) => void;
}

export const PlacementPrep: React.FC<PlacementPrepProps> = ({ onNavigate }) => {
  const { user, showToast } = useAuth();
  const [questions, setQuestions] = useState<PlacementQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<PlacementQuestion | null>(null);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'coding' | 'behavioral' | 'aptitude'>('coding');

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await api.getPlacementQuestions();
        setQuestions(data);
        if (data.length > 0) {
          setSelectedQuestion(data[0]);
          setCode(data[0].codeTemplate);
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadQuestions();
  }, []);

  const handleSelectQuestion = (q: PlacementQuestion) => {
    setSelectedQuestion(q);
    setCode(q.codeTemplate);
    setTestResult(null);
  };

  const handleRunCode = async () => {
    if (!selectedQuestion) return;
    setIsRunning(true);
    try {
      const res = await api.submitPlacementCode(selectedQuestion.id, code);
      setTestResult(res);
      if (res.passed) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        showToast('All Test Cases Passed! 🚀 Code verified.');
      } else {
        showToast('Test cases did not pass. Check logic and return values.', 'warning');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <GraduationCap className="w-4 h-4" />
            Stage 5 Placement & Technical Interview Arena
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Placement Coding & Mock Preparation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Practice FAANG/Top-Product company interview algorithms with live test cases and time complexity analysis.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold overflow-x-auto w-full sm:w-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('coding')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${activeTab === 'coding' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            DSA Sandbox
          </button>
          <button
            onClick={() => setActiveTab('behavioral')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${activeTab === 'behavioral' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Behavioral (STAR)
          </button>
          <button
            onClick={() => setActiveTab('aptitude')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${activeTab === 'aptitude' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Aptitude & Core CS
          </button>
        </div>
      </div>

      {/* Main Coding Arena Layout */}
      {activeTab === 'coding' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question List Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Curated DSA Challenges</h3>
            {questions.map((q) => {
              const isSelected = selectedQuestion?.id === q.id;
              return (
                <div
                  key={q.id}
                  id={`btn-select-question-${q.id}`}
                  onClick={() => handleSelectQuestion(q)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      q.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' :
                      q.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">{q.category}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-1">{q.title}</h4>

                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {q.companies.map((comp, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Code Editor & Test Case Runner (8 cols) */}
          {selectedQuestion && (
            <div className="lg:col-span-8 rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6">
              {/* Problem Description */}
              <div className="space-y-2 pb-4 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">{selectedQuestion.title}</h2>
                  <span className="text-xs text-slate-400">Target Time: &lt; 25 mins</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedQuestion.description}</p>
              </div>

              {/* Code Editor Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono">
                    <Terminal className="w-4 h-4" />
                    <span>TypeScript / JavaScript Runtime</span>
                  </div>
                  <button
                    onClick={() => setCode(selectedQuestion.codeTemplate)}
                    className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[11px]"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Code
                  </button>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 font-mono text-xs overflow-hidden shadow-inner">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={12}
                    spellCheck={false}
                    className="w-full bg-transparent text-emerald-400 placeholder-slate-600 focus:outline-none leading-relaxed resize-none font-mono"
                  />
                </div>
              </div>

              {/* Action: Run Code */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  {testResult && (
                    <span className="text-cyan-300">Runtime: {testResult.runtimeMs}ms • Memory: {testResult.memoryMb}MB</span>
                  )}
                </div>

                <button
                  id="btn-run-code-test"
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
                >
                  {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                  {isRunning ? 'Executing Test Cases...' : 'Run & Validate Solution'}
                </button>
              </div>

              {/* Test Case Execution Output Box */}
              {testResult && (
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 space-y-3 animate-fade-in font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className={`font-bold flex items-center gap-1.5 ${testResult.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {testResult.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {testResult.passed ? 'Accepted (3/3 Test Cases Passed)' : 'Wrong Answer / Runtime Check'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {testResult.testResults?.map((tr: any) => (
                      <div key={tr.testCase} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-[11px]">
                        <div>
                          <span className="text-slate-400">Case {tr.testCase}: </span>
                          <span className="text-slate-200">{tr.input}</span>
                        </div>
                        <span className={`font-bold ${tr.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {tr.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Behavioral & STAR Preparation Tab */}
      {activeTab === 'behavioral' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white">The STAR Interview Method Guide</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Top tech companies evaluate your leadership, resilience, and teamwork using behavioral prompts. Structure every response using:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
                <strong className="text-cyan-300 block text-xs">S — Situation</strong>
                <span className="text-[11px] text-slate-400">Set the scene and context with specific parameters.</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
                <strong className="text-indigo-300 block text-xs">T — Task</strong>
                <span className="text-[11px] text-slate-400">Identify the exact challenge and deliverable.</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
                <strong className="text-emerald-300 block text-xs">A — Action</strong>
                <span className="text-[11px] text-slate-400">Detail what YOU specifically implemented.</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
                <strong className="text-amber-300 block text-xs">R — Result</strong>
                <span className="text-[11px] text-slate-400">Quantify the business and performance impact.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aptitude & Core CS Tab */}
      {activeTab === 'aptitude' && (
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
          <h3 className="text-xl font-bold text-white">Core Computer Science Drill Tracks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {['Operating Systems & Concurrency', 'Database Management & SQL Tuning', 'Computer Networks & HTTP Protocols'].map((topic, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-2">
                <h4 className="text-sm font-bold text-white">{topic}</h4>
                <p className="text-xs text-slate-400">50 essential university placement questions with explanations.</p>
                <button
                  onClick={() => showToast(`Starting ${topic} track 🚀`)}
                  className="mt-2 text-xs text-cyan-300 font-semibold flex items-center gap-1"
                >
                  Start Quiz
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
