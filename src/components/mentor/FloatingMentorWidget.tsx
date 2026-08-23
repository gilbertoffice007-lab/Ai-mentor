import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, X, Minimize2, Maximize2, Compass, ChevronRight, User, HelpCircle, CheckCircle2, Flame, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { MentorMessage } from '../../types';

export const FloatingMentorWidget: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      id: 'm-welcome',
      sender: 'ai',
      text: `Hello ${user?.fullName || 'Gilbert'}! 👋 I am your **CareerPath AI Mentor** tracking your journey in **${user?.careerTitle || 'Full Stack Development'}** (Stage ${user?.currentStage || 2}).

How can I accelerate your learning, review your code, or plan your next milestone today?`,
      timestamp: 'Just now',
      suggestions: [
        'What should I learn today?',
        'Am I ready for Stage 3?',
        'How do I prepare for technical interviews?',
        'Review my resume highlights'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: MentorMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

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
          text: 'I am experiencing a momentary latency. Here is your Stage guidance: focus on completing your daily React memoization tasks and practicing two pointers on LeetCode!',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          id="btn-floating-ai-mentor"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-semibold shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-105 active:scale-95 transition-all group"
        >
          <div className="relative">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-indigo-900" />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5">
            <span className="hidden sm:inline">AI Career Mentor</span>
            <span className="sm:hidden">Mentor</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          </span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div
          id="panel-ai-mentor-drawer"
          className={`fixed bottom-20 lg:bottom-6 right-3 left-3 sm:left-auto sm:right-6 z-50 bg-slate-900/95 border border-indigo-500/30 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col transition-all overflow-hidden ${
            isExpanded
              ? 'w-auto sm:w-[580px] h-[80vh]'
              : 'w-auto sm:w-[420px] h-[72vh] sm:h-[560px]'
          }`}
        >
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 border-b border-indigo-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">CareerPath AI Mentor</h3>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">24/7 Live</span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span>{user?.careerTitle || 'Full Stack'}</span>
                  <span>•</span>
                  <span className="text-indigo-300">Stage {user?.currentStage || 2} ({user?.overallProgress || 72}%)</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                id="btn-mentor-expand"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                id="btn-mentor-close"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Student Live Context Pill */}
          <div className="px-4 py-2 bg-indigo-950/40 border-b border-indigo-500/10 flex items-center justify-between text-[11px] text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Holland Code: <strong className="text-indigo-300">{user?.riasecResult?.dominantCode || 'I-E-S'}</strong></span>
            </div>
            <div className="flex items-center gap-1 text-amber-300 font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{user?.currentStreakDays || 14} Day Streak</span>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/80 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs shadow">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className={`text-[10px] mt-1.5 font-medium ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {msg.timestamp}
                  </div>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sugg, i) => (
                        <button
                          key={i}
                          id={`btn-sugg-${i}`}
                          onClick={() => handleSend(sugg)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 transition-colors text-left"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 items-center text-slate-400 text-xs py-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600/80 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-slate-800/90 border border-slate-700/60 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>Analyzing career roadmap & formulating advice...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] uppercase font-bold text-slate-500 whitespace-nowrap">Ask:</span>
            {[
              'What should I learn today?',
              'Why am I behind?',
              'Explain React hooks',
              'Review my resume'
            ].map((prompt, idx) => (
              <button
                key={idx}
                id={`btn-quick-prompt-${idx}`}
                onClick={() => handleSend(prompt)}
                className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-700 hover:border-indigo-500/40 whitespace-nowrap transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-indigo-500/20 flex items-center gap-2">
            <input
              id="input-mentor-chat"
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about skills, projects, interviews, or your roadmap..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700/80 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button
              id="btn-send-mentor-chat"
              onClick={() => handleSend()}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-medium shadow-md shadow-indigo-500/30 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
