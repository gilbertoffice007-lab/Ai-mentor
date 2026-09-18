import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { MentorMessage } from '../types';
import { Markdown } from '../components/common/Markdown';
import {
  Bot,
  Sparkles,
  Send,
  User,
  Flame,
  Milestone,
  Brain,
  Layers,
  Award,
  Loader2,
  Terminal,
  HelpCircle
} from 'lucide-react';

export const AIMentorRoom: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Welcome to your dedicated **AI Career Mentor Room**, ${user?.fullName || 'there'}! 🎯

I am synchronized with your live academic status:
* **Target Career:** ${user?.careerTitle || 'Not selected yet — pick one from your Career Result page'}
* **Current Stage:** Stage ${user?.currentStage ?? 1} (${user?.overallProgress ?? 0}% Progress)
* **Personality Profile:** Holland RIASEC \`${user?.riasecResult?.dominantCode || 'assessment pending'}\`
* **Study Velocity:** ${user?.totalHoursLearned ?? 0} hrs learned with a ${user?.currentStreakDays ?? 0}-day streak.

How would you like to level up today?`,
      timestamp: 'Just now',
      suggestions: [
        'What should I learn today?',
        'Run a technical mock interview',
        'Am I ready for Stage 3 capstone?',
        'Explain React memoization patterns'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [geminiKey, setGeminiKey] = useState(() =>
    typeof localStorage !== 'undefined' ? localStorage.getItem('careerpath_gemini_key') || '' : ''
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const envKeyPresent =
    typeof import.meta !== 'undefined' && Boolean((import.meta as any)?.env?.VITE_GEMINI_API_KEY);
  const liveAi = envKeyPresent || geminiKey.trim().length > 0;

  const handleSaveKey = () => {
    try {
      if (geminiKey.trim()) {
        localStorage.setItem('careerpath_gemini_key', geminiKey.trim());
      } else {
        localStorage.removeItem('careerpath_gemini_key');
      }
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const text = customText || input;
    if (!text.trim() || loading) return;

    const userMsg: MentorMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const res = await api.askMentor(text);
      const aiMsg: MentorMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.reply,
        timestamp: res.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: res.suggestions
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'I am right here with you! Focus today on completing Day 17 tasks: React 19 memoization and FastAPI request validation.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Bot className="w-4 h-4" />
            <span>24/7 Cognitive Career Mentorship</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold normal-case tracking-normal border ${
                liveAi
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}
            >
              {liveAi ? '● Live Gemini AI' : '● Local Guide Mode'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">AI Mentor Command Room</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deep technical assistance, mock interview simulations, architectural reviews, and schedule guidance.
          </p>
        </div>
        {!envKeyPresent && (
          <div className="w-full md:w-80 rounded-2xl bg-slate-900 border border-slate-800 p-3.5 space-y-2">
            <label className="block text-[11px] font-semibold text-slate-300">
              Gemini API key <span className="text-slate-500 font-normal">(optional, unlocks live AI)</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Paste AIza… key"
                className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleSaveKey}
                className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
            <p className="text-[10px] text-slate-500 leading-snug">
              Free key from Google AI Studio. Stored only in this browser, never sent anywhere except Google.
            </p>
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Live Student Telemetry (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">CareerPath AI</h3>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Online & Tailored
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Target Career:</span>
                <span className="font-semibold text-white">{user?.careerTitle || 'Not set'}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Active Stage:</span>
                <span className="font-semibold text-cyan-300">Stage {user?.currentStage || 1} ({user?.overallProgress ?? 0}%)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">RIASEC Code:</span>
                <span className="font-semibold text-indigo-300">{user?.riasecResult?.dominantCode || 'Pending'}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Daily Study Time:</span>
                <span className="font-semibold text-amber-300">{user?.availableHoursPerDay || 3} hrs/day</span>
              </div>
            </div>
          </div>

          {/* Conversation Presets */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Quick Mentorship Prompts
            </h4>
            <div className="space-y-2 text-xs">
              {[
                'What should I learn today on Day 17?',
                'Conduct a technical mock interview for Full Stack',
                'Why am I behind on my roadmap?',
                'Explain React 19 performance memoization',
                'Review my Stage 2 project architecture'
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/80 hover:border-indigo-500/40 text-slate-200 hover:text-white transition-all leading-snug"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Chat Stream (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col h-[520px] sm:h-[620px] lg:h-[700px] overflow-hidden">
          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 sm:gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
                <div
                  className={`max-w-[92%] sm:max-w-[85%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none shadow-md'
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {msg.sender === 'ai' ? <Markdown text={msg.text} /> : msg.text}
                  </div>
                  <span className={`text-[10px] mt-2 block font-medium ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {msg.timestamp}
                  </span>

                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap gap-1.5 sm:gap-2">
                      {msg.suggestions.map((sugg, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(sugg)}
                          className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-cyan-300 border border-indigo-500/30 transition-all text-left"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 sm:gap-3 items-center text-slate-400 text-xs py-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                </div>
                <div className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-slate-800 border border-slate-700 flex items-center gap-2 text-xs">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Synthesizing tailored mentorship guidance...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2.5 sm:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about coding, interview questions, projects, or schedule adjustments..."
              className="flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-40 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all shrink-0 min-h-[42px] min-w-[42px] flex items-center justify-center"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
