import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ProjectItem } from '../types';
import {
  FolderGit2,
  Sparkles,
  CheckCircle2,
  Circle,
  ExternalLink,
  Github,
  Layers,
  Clock,
  Award,
  ArrowRight,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectsProps {
  onNavigate: (route: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  const { user, showToast } = useAuth();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [githubUrlInput, setGithubUrlInput] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projs = await api.getProjects();
        setProjects(projs);
        if (projs.length > 0) setSelectedProject(projs[0]);
      } catch (e) {
        console.error(e);
      }
    };
    loadProjects();
  }, []);

  const handleStart = async (id: string) => {
    try {
      const res = await api.startProject(id);
      if (res.success) {
        setProjects(prev => prev.map(p => p.id === id ? res.project : p));
        setSelectedProject(res.project);
        showToast('Project started! Track milestones below 🚀');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleMilestone = async (projectId: string, milestoneId: string) => {
    try {
      const res = await api.completeProjectMilestone(projectId, milestoneId);
      if (res.success) {
        setProjects(prev => prev.map(p => p.id === projectId ? res.project : p));
        setSelectedProject(res.project);
        if (res.project.progressPercentage === 100) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          showToast('Project 100% Completed! +500 XP Earned 🎉');
        } else {
          showToast('Milestone checked off ✨');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <FolderGit2 className="w-4 h-4" />
            Stage-Aligned Portfolio Projects
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Build Industry-Grade Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Each project has step-by-step milestone schedules, architectural requirements, and direct integration with your verified developer profile.
          </p>
        </div>
      </div>

      {/* Main Grid: Projects List + Inspector */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Project Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {projects.map((proj) => {
            const isSelected = selectedProject?.id === proj.id;
            const isDone = proj.status === 'completed';
            const inProgress = proj.status === 'in_progress';

            return (
              <div
                key={proj.id}
                id={`card-project-${proj.id}`}
                onClick={() => setSelectedProject(proj)}
                className={`cursor-pointer p-5 rounded-3xl border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/20 ring-1 ring-indigo-500'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Stage {proj.stageNumber} • {proj.tier}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isDone ? 'bg-emerald-500/20 text-emerald-300' :
                    inProgress ? 'bg-cyan-500/20 text-cyan-300 animate-pulse' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isDone ? 'Completed' : inProgress ? 'In Progress' : 'Not Started'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mt-1">{proj.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{proj.description}</p>

                {/* Progress bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Progress</span>
                    <span className="text-cyan-300 font-bold">{proj.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1.5 rounded-full"
                      style={{ width: `${proj.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Project Milestone & Architecture Inspector (7 cols) */}
        {selectedProject && (
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/90 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/30">
                  Stage {selectedProject.stageNumber} Capstone
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Estimated: {selectedProject.estimatedDays} Days ({selectedProject.estimatedDays * 2} hrs)
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-2.5">{selectedProject.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">{selectedProject.description}</p>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-400" />
                Required Tech Stack & Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Milestone Roadmap Schedule */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Milestone Execution Schedule
                </h4>
                <span className="text-xs text-slate-400">
                  {selectedProject.milestones.filter(m => m.completed).length} / {selectedProject.milestones.length} Done
                </span>
              </div>

              <div className="space-y-2.5">
                {selectedProject.milestones.map((ms, idx) => (
                  <div
                    key={ms.id}
                    id={`btn-milestone-toggle-${ms.id}`}
                    onClick={() => handleToggleMilestone(selectedProject.id, ms.id)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      ms.completed
                        ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                        : 'bg-slate-800/70 border-slate-700 hover:border-indigo-500/40 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs ${
                          ms.completed ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold' : 'border-slate-600'
                        }`}
                      >
                        {ms.completed && <CheckCircle2 className="w-4 h-4 fill-current" />}
                      </button>
                      <div>
                        <p className={`text-xs font-semibold ${ms.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                          Phase {idx + 1}: {ms.title}
                        </p>
                        <span className="text-[10px] text-slate-400">{ms.deliverable}</span>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 shrink-0">Day {ms.dayTarget} Target</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: Start / GitHub URL */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              {selectedProject.status === 'not_started' ? (
                <button
                  id="btn-start-project"
                  onClick={() => handleStart(selectedProject.id)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Building This Project
                </button>
              ) : (
                <div className="w-full flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={githubUrlInput}
                      onChange={(e) => setGithubUrlInput(e.target.value)}
                      placeholder="https://github.com/username/my-project"
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500"
                    />
                  </div>
                  <button
                    onClick={() => showToast('GitHub repo linked to your verified developer portfolio! 🚀')}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 whitespace-nowrap"
                  >
                    Link Repository
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
