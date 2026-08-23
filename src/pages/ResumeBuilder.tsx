import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ResumeData } from '../types';
import {
  FileText,
  Sparkles,
  Award,
  CheckCircle2,
  Download,
  Printer,
  Edit3,
  Bot,
  Layers,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Loader2
} from 'lucide-react';

interface ResumeBuilderProps {
  onNavigate: (route: string) => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onNavigate }) => {
  const { user, showToast } = useAuth();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [atsScore, setAtsScore] = useState(92);
  const [isAuditing, setIsAuditing] = useState(false);
  const [aiAuditFeedback, setAiAuditFeedback] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await api.getResume();
        setResume(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadResume();
  }, []);

  const handleAuditWithAI = async () => {
    setIsAuditing(true);
    try {
      const res = await api.reviewResumeAI();
      setAiAuditFeedback(res);
      if (res.atsScore) setAtsScore(res.atsScore);
      showToast('AI ATS Audit completed! Recommendations below ✨');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuditing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!resume) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <FileText className="w-4 h-4" />
            Stage 4 ATS Resume Architecture
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            ATS-Optimized Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Engineered to bypass applicant tracking systems and highlight verified Stage 1-4 projects.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-audit-resume-ai"
            onClick={handleAuditWithAI}
            disabled={isAuditing}
            className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all min-h-[42px]"
          >
            {isAuditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
            <span>{isAuditing ? 'Auditing...' : 'Audit with Gemini'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-all min-h-[42px]"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden max-w-7xl mx-auto flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-2 rounded-xl transition-all ${activeTab === 'editor' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400'}`}
        >
          ATS Score & Audit ({atsScore}%)
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2 rounded-xl transition-all ${activeTab === 'preview' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400'}`}
        >
          Resume Document
        </button>
      </div>

      {/* Main Grid: Editor / Live Preview + ATS Scorecard */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: ATS Score & AI Feedback (4 cols) */}
        <div className={`lg:col-span-4 space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          {/* ATS Gauge Card */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ATS Match Score</span>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Top 5% Tier
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-500/30">
                {atsScore}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Highly ATS Compatible</h4>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Matches standard job parser filters for {user?.careerTitle || 'Full Stack Engineering'}.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Action Verb Strength:</span>
                <span className="text-emerald-400 font-semibold">96%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Quantified Metrics:</span>
                <span className="text-emerald-400 font-semibold">90%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Keyword Density:</span>
                <span className="text-cyan-300 font-semibold">92%</span>
              </div>
            </div>
          </div>

          {/* AI Audit Feedback Card */}
          {aiAuditFeedback && (
            <div className="rounded-3xl bg-indigo-950/40 border border-indigo-500/30 p-6 shadow-xl space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-cyan-300">
                <Sparkles className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Gemini ATS Feedback</h4>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-200 block mb-1">Key Strengths:</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {aiAuditFeedback.strengths?.map((str: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-bold text-amber-300 block mb-1">Recommended Revisions:</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {aiAuditFeedback.improvementTips?.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Printable Resume Document (8 cols) */}
        <div className={`lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-10 shadow-2xl space-y-6 text-slate-200 ${activeTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
          {/* Header */}
          <div className="border-b border-slate-800 pb-5 text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{resume.personalInfo.fullName}</h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 pt-1">
              <span>{resume.personalInfo.email}</span>
              <span>•</span>
              <span>{resume.personalInfo.phone}</span>
              <span>•</span>
              <span>{resume.personalInfo.location}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-cyan-400 pt-0.5">
              <a href={resume.personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
              <span>•</span>
              <a href={resume.personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
              <span>•</span>
              <a href={resume.personalInfo.portfolio} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-1">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{resume.summary}</p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-1">
              Education
            </h3>
            {resume.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start text-xs">
                <div>
                  <h4 className="font-bold text-white">{edu.institution}</h4>
                  <p className="text-slate-300">{edu.degree} in {edu.field}</p>
                </div>
                <div className="text-right text-slate-400">
                  <p>{edu.startYear} – {edu.endYear}</p>
                  <p className="text-cyan-300 font-semibold">{edu.grade}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-1">
              Technical Skills
            </h3>
            <div className="space-y-1 text-xs">
              {resume.skills.map((sk, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-semibold text-white min-w-[110px]">{sk.category}:</span>
                  <span className="text-slate-300">{sk.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-1">
              Work Experience
            </h3>
            {resume.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white">{exp.title} — <span className="text-cyan-300">{exp.company}</span></h4>
                  <span className="text-slate-400">{exp.startDate} – {exp.endDate}</span>
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-800 pb-1">
              Key Engineering Projects
            </h3>
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5 text-xs">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white">{proj.name}</h4>
                  <span className="text-indigo-400">{proj.techStack}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
