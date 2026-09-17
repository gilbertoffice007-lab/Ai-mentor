import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { getCurrentSemester } from '../lib/semesterCalculator';
import { DailyTask } from '../types';
import {
  CheckSquare,
  Sparkles,
  Flame,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Calendar,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyTasksProps {
  onNavigate: (route: string) => void;
}

export const DailyTasks: React.FC<DailyTasksProps> = ({ onNavigate }) => {
  const { user, showToast } = useAuth();
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [goalTitle, setGoalTitle] = useState('Master React Performance & FastAPI Architecture');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [missedDays, setMissedDays] = useState(3);
  const [remainingWeeks, setRemainingWeeks] = useState(8);
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Dynamic semester calculation
  const semesterInfo = getCurrentSemester(
    user?.courseStartDate,
    user?.totalSemesters || 8,
    user?.courseDurationMonths || 6
  );
  const dayNumber = semesterInfo.semesterDay || 1;

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await api.getDailyTasks();
        setTasks(res.tasks || []);
        if (res.goalTitle) setGoalTitle(res.goalTitle);
      } catch (e) {
        console.error(e);
      }
    };
    loadTasks();
  }, []);

  const handleComplete = async (taskId: string) => {
    try {
      const res = await api.completeTask(taskId);
      if (res.success) {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        showToast(`Task finished! +${res.task.xpReward} XP earned 🌟`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSkip = async (taskId: string) => {
    try {
      const res = await api.skipTask(taskId);
      if (res.success) {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'skipped' } : t));
        showToast('Task marked for rescheduling', 'info');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleApplyReschedule = async () => {
    setIsRescheduling(true);
    try {
      const res = await api.rescheduleTasks(missedDays, remainingWeeks);
      if (res.success) {
        setTasks(res.tasks || []);
        setShowRescheduleModal(false);
        showToast('Semester schedule smoothly readjusted ⚡');
      }
    } finally {
      setIsRescheduling(false);
    }
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalXP = tasks.reduce((acc, t) => acc + (t.status === 'completed' ? t.xpReward : 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Banner */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <CheckSquare className="w-4 h-4" />
            Semester-Aware Adaptive Planner
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Day {dayNumber} Daily Learning Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Focus Goal: <strong className="text-white">{goalTitle}</strong>
          </p>
        </div>

        {/* Reschedule Button & Streak */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{user?.currentStreakDays ?? 0} Day Streak</span>
          </div>

          <button
            id="btn-open-reschedule"
            onClick={() => setShowRescheduleModal(true)}
            className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all min-h-[38px]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
            Reschedule Coursework
          </button>
        </div>
      </div>

      {/* Daily Progress summary */}
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
          <span className="text-xs text-slate-400">Today's Progress</span>
          <p className="text-xl font-bold text-white mt-0.5">{completedCount} of {tasks.length} Completed</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
          <span className="text-xs text-slate-400">XP Gained Today</span>
          <p className="text-xl font-bold text-amber-400 mt-0.5">+{totalXP} XP</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
          <span className="text-xs text-slate-400">Target Study Duration</span>
          <p className="text-xl font-bold text-cyan-300 mt-0.5">{user?.availableHoursPerDay || 3} Hours</p>
        </div>
      </div>

      {/* Task List Cards */}
      <div className="max-w-5xl mx-auto space-y-4">
        {tasks.map((task) => {
          const isDone = task.status === 'completed';
          const isSkipped = task.status === 'skipped';

          return (
            <div
              key={task.id}
              className={`rounded-3xl border p-6 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone
                  ? 'bg-slate-800/50 border-emerald-500/30'
                  : isSkipped
                  ? 'bg-slate-800/40 border-amber-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-indigo-500/40 shadow-xl'
              }`}
            >
              <div className="flex items-start gap-4 flex-1">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 mt-1 ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950'
                      : isSkipped
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      task.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' :
                      task.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {task.difficulty}
                    </span>
                    <span className="text-[10px] text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {task.category}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDone ? 'text-slate-500' : 'text-slate-300'}`}>{task.description}</p>

                  <div className={`flex items-center gap-4 text-xs pt-1 ${isDone ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {task.estimatedMinutes} mins
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Zap className="w-3.5 h-3.5" />
                      +{task.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {!isDone && (
                  <button
                    id={`btn-skip-task-${task.id}`}
                    onClick={() => handleSkip(task.id)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    Skip
                  </button>
                )}

                <button
                  id={`btn-complete-task-${task.id}`}
                  onClick={() => handleComplete(task.id)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-lg shadow-indigo-500/20'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isDone ? 'Completed' : 'Mark as Done'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Smart Coursework Redistribution</h3>
                <p className="text-xs text-slate-400">Semester-Aware AI schedule adjustments</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              If exams or personal obligations caused you to miss daily tasks, our scheduler will redistribute the workload without exceeding your daily {user?.availableHoursPerDay || 3} hours capacity.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Missed Days Count</label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={missedDays}
                  onChange={(e) => setMissedDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Remaining Weeks in Semester</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={remainingWeeks}
                  onChange={(e) => setRemainingWeeks(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyReschedule}
                disabled={isRescheduling}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
              >
                {isRescheduling ? 'Readjusting...' : 'Redistribute Tasks'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
