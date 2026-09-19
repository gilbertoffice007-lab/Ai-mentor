import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { RoadmapStage } from '../types';
import { WindingRoad } from '../components/roadmap/WindingRoad';
import {
  Milestone,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Lock,
  ArrowRight,
  FolderGit2,
  Layers,
  Check
} from 'lucide-react';

interface RoadmapProps {
  onNavigate: (route: string) => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ onNavigate }) => {
  const { user, showToast } = useAuth();
  const [stages, setStages] = useState<RoadmapStage[]>([]);
  const [expandedStage, setExpandedStage] = useState<number>(user?.currentStage || 1);
  const [overallProgress, setOverallProgress] = useState(user?.overallProgress ?? 0);

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        const res = await api.getRoadmap();
        setStages(res.stages || []);
        if (res.overallProgress) setOverallProgress(res.overallProgress);
      } catch (e) {
        console.error(e);
      }
    };
    loadRoadmap();
  }, []);

  const toggleTask = (stageNum: number, taskIndex: number) => {    setStages(prev => {
      const copy = [...prev];
      const stage = copy.find(s => s.stageNumber === stageNum);
      if (stage && stage.tasks && stage.tasks[taskIndex]) {
        stage.tasks[taskIndex].completed = !stage.tasks[taskIndex].completed;
        const total = stage.tasks.length;
        const completed = stage.tasks.filter(t => t.completed).length;
        stage.progressPercentage = Math.round((completed / total) * 100);
        if (stage.progressPercentage === 100) stage.status = 'completed';
      }
      return copy;
    });
    showToast('Task updated in your career roadmap ✨');
  };

  const detailStage =
    stages.find((s) => s.stageNumber === expandedStage) ||
    stages.find((s) => s.stageNumber === (user?.currentStage || 1));

  const handleOpenDetails = (stageNumber: number) => {
    setExpandedStage(stageNumber);
    setTimeout(() => {
      document.getElementById('road-detail')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);
  };

  const renderStageDetail = () => {
    const st = detailStage;
    if (!st) return null;
    const isCurrent = st.stageNumber === (user?.currentStage || 1);
    const isCompleted = st.status === 'completed';
    return (
      <div
        id="road-detail"
        className={`rounded-3xl border transition-all overflow-hidden scroll-mt-24 ${
          isCurrent
            ? 'bg-[#11141D] border-indigo-500/50 shadow-xl'
            : 'bg-[#11141D] border-slate-800'
        }`}
      >
        <div className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base shadow-md shrink-0 ${
                isCompleted
                  ? 'bg-emerald-500 text-white'
                  : isCurrent
                  ? 'bg-indigo-600 text-white shadow-indigo-500/30'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}
            >
              {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : `0${st.stageNumber}`}
            </div>
            <div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isCompleted
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : isCurrent
                    ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                Stage {st.stageNumber} • {st.durationWeeks || 6} Weeks
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{st.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{st.description}</p>
            </div>
          </div>
          <button
            onClick={() => setExpandedStage(0)}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
            aria-label="Collapse stage details"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-2 border-t border-slate-800 space-y-6">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Core Competencies in Stage {st.stageNumber}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(st.skillsCovered || st.keyTopics || ['Modern Architecture', 'APIs', 'Databases']).map((sk, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/80 text-xs font-medium text-slate-200 border border-slate-700/60"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              Stage Modules & Verification Checklist
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(st.tasks || []).map((task, tIdx) => (
                <div
                  key={task.id || tIdx}
                  id={`stage-task-row-${task.id}`}
                  onClick={() => toggleTask(st.stageNumber, tIdx)}
                  className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    task.completed
                      ? 'bg-slate-900/80 border-slate-800 text-slate-500'
                      : 'bg-slate-800/40 border-slate-800 hover:border-indigo-500/30 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs ${
                        task.completed ? 'bg-indigo-600 border-indigo-500 text-white font-bold' : 'border-slate-600'
                      }`}
                    >
                      {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                    <div>
                      <p className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                        {task.title}
                      </p>
                      <span className="text-[10px] text-slate-500">{task.estimatedHours || 4} hrs workload</span>
                    </div>
                  </div>

                  {task.module && (
                    <span className="text-[10px] font-semibold text-indigo-300 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                      {task.module}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {(st.requiredProject || (st.projects && st.projects[0])) && (
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Stage Capstone Project</span>
                  <h5 className="text-sm font-bold text-white">{st.requiredProject || (st.projects && st.projects[0])}</h5>
                </div>
              </div>
              <button
                onClick={() => onNavigate('/projects')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shrink-0"
              >
                View Project
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Title Bento Banner */}
      <div className="bg-[#11141D] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2">
            <Milestone className="w-3.5 h-3.5" />
            Visual Career Roadmap
          </div>
          <h1 className="text-2xl sm:text-4xl font-light text-slate-100">
            {user?.careerTitle || 'Full-Stack AI Developer'} <span className="font-bold text-white">Roadmap</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            6 progressive developmental stages taking you from computer science fundamentals to high-tier product engineering placement.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">Active Stage</span>
            <p className="text-sm font-bold text-indigo-300">Stage {user?.currentStage || 1} Active</p>
          </div>
          <button
            onClick={() => onNavigate('/tasks')}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
          >
            Daily Tasks
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Global Timeline Progress Bento Card */}
      <div className="bg-[#11141D] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400 uppercase tracking-widest text-[10px]">Overall Roadmap Progress</span>
          <span className="text-indigo-400 font-bold">{overallProgress}% Completed</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        {/* 6 Stage Mini Bento Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2 text-center text-xs">
          {stages.map((st) => {
            const isCompleted = st.status === 'completed';
            const isCurrent = st.stageNumber === (user?.currentStage || 1);
            return (
              <div
                key={st.id}
                onClick={() => setExpandedStage(st.stageNumber)}
                className={`cursor-pointer p-2.5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-slate-800/40 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className="font-bold text-[11px]">Stage {st.stageNumber}</div>
                <div className="text-[10px] truncate">{st.title.split(' ')[0]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Winding XP road journey — tap any stage card for its checklist */}
      <div className="bg-[#11141D]/60 border border-slate-800/60 rounded-3xl p-3 sm:p-6 shadow-lg overflow-hidden">
        <WindingRoad
          stages={stages}
          currentStage={user?.currentStage || 1}
          expandedStage={expandedStage}
          onSelect={(n) => setExpandedStage(n)}
          onOpenDetails={handleOpenDetails}
        />
      </div>

      {/* Selected stage detail (skills, checklist, capstone) */}
      {detailStage && renderStageDetail()}
    </div>
  );
};
