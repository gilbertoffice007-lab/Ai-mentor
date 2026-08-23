import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  Milestone,
  CheckSquare,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  FolderGit2,
  Calendar,
  CheckCircle2,
  Building2,
  Bot,
  Zap,
  Check,
  Lock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface DashboardProps {
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user, completeDailyTask } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [dailyData, setDailyData] = useState<any>(null);
  const [stages, setStages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [an, dTasks, rd, projs, evs] = await Promise.all([
          api.getAnalytics(),
          api.getDailyTasks(),
          api.getRoadmap(),
          api.getProjects(),
          api.getEvents()
        ]);
        setAnalytics(an);
        setDailyData(dTasks);
        setStages(rd.stages || []);
        setProjects(projs || []);
        setEvents(evs || []);
      } catch (e) {
        console.error(e);
      }
    };
    loadDashboardData();
  }, []);

  const currentStageNum = user?.currentStage || 2;
  const progressPct = user?.overallProgress || 72;
  const circumference = 2 * Math.PI * 58; // 364.42
  const strokeOffset = circumference - (circumference * progressPct) / 100;

  const currentStageInfo = stages.find(s => s.stageNumber === currentStageNum) || stages[1];

  const roadmapStagesList = [
    { num: 1, label: 'Foundation', status: currentStageNum > 1 ? 'done' : currentStageNum === 1 ? 'active' : 'locked' },
    { num: 2, label: 'Development', status: currentStageNum > 2 ? 'done' : currentStageNum === 2 ? 'active' : 'locked' },
    { num: 3, label: 'Systems & AI', status: currentStageNum > 3 ? 'done' : currentStageNum === 3 ? 'active' : 'locked' },
    { num: 4, label: 'Profile & ATS', status: currentStageNum > 4 ? 'done' : currentStageNum === 4 ? 'active' : 'locked' },
    { num: 5, label: 'Placement Prep', status: currentStageNum > 5 ? 'done' : currentStageNum === 5 ? 'active' : 'locked' },
    { num: 6, label: 'Job Launch', status: currentStageNum > 6 ? 'done' : currentStageNum === 6 ? 'active' : 'locked' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Bento Grid Layout Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Bento Hero Box (Col 8) */}
        <div className="md:col-span-8 bg-gradient-to-br from-indigo-600/20 via-indigo-900/10 to-purple-600/5 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
                Active Track
              </span>
              <span className="text-xs text-slate-400">
                {user?.currentYear || 'Year 3, CS'} • {user?.semesterName || 'Fall 2026'}
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-light text-slate-100">
              Good morning, <span className="font-bold text-white">{user?.fullName?.split(' ')[0] || 'Gilbert'}</span>
            </h2>
            <p className="text-slate-400 mt-2 text-xs sm:text-sm max-w-xl leading-relaxed">
              You are {progressPct}% through Stage {currentStageNum}: <strong className="text-white">{currentStageInfo?.title || 'Development Phase'}</strong>. Your next milestone is the <strong>Backend API Masterclass</strong>.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-indigo-500/20 relative z-10">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">Current Path</p>
              <p className="text-xs sm:text-sm font-bold text-white truncate">{user?.careerTitle || 'Full-Stack AI Developer'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">Daily Goal</p>
              <p className="text-xs sm:text-sm font-bold text-white">{user?.availableHoursPerDay || 3.5} Hours Target</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">RIASEC Match</p>
              <p className="text-xs sm:text-sm font-bold text-emerald-400">{user?.riasecResult?.dominantCode || 'I-E-S'} (94%)</p>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Bento Circular Progress Gauge (Col 4) */}
        <div className="md:col-span-4 bg-[#11141D] border border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-800"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="text-indigo-500 transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white tracking-tight">{progressPct}%</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Progress</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs font-semibold text-white">Stage {currentStageNum}: Development Phase</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{user?.totalHoursLearned || 148} total hours completed</p>
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              {user?.currentStreakDays || 14}d Streak
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1 text-cyan-400 font-bold">
              <Zap className="w-3.5 h-3.5" />
              {user?.xpPoints || 2450} XP
            </span>
          </div>
        </div>

        {/* Bento Visual Career Roadmap Rail (Col 12) */}
        <div className="md:col-span-12 bg-[#11141D] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Visual Career Roadmap</h3>
              <p className="text-sm font-bold text-white mt-0.5">Stage 1 through 6 Developmental Rail</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/20">
                Stage 1 Done
              </span>
              <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded-lg border border-indigo-500/20">
                Stage 2 Active
              </span>
              <button
                onClick={() => onNavigate('/roadmap')}
                className="ml-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                View Full Map
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Visual Rail */}
          <div className="relative pt-3 pb-2 px-2 sm:px-6">
            {/* Background Rail Line */}
            <div className="absolute top-8 left-6 right-6 h-[2px] bg-slate-800 z-0" />
            {/* Active Rail Highlight */}
            <div
              className="absolute top-8 left-6 h-[2px] bg-indigo-500 z-0 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-700"
              style={{ width: `${Math.min(100, Math.max(16, (currentStageNum / 6) * 100))}%` }}
            />

            <div className="relative z-10 grid grid-cols-3 sm:grid-cols-6 gap-3">
              {roadmapStagesList.map((stage) => {
                const isCompleted = stage.status === 'done';
                const isActive = stage.status === 'active';

                return (
                  <div
                    key={stage.num}
                    onClick={() => onNavigate('/roadmap')}
                    className={`cursor-pointer flex flex-col items-center text-center group transition-all ${
                      stage.status === 'locked' ? 'opacity-40 hover:opacity-60' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                          : isActive
                          ? 'bg-indigo-600 border-4 border-[#0A0C10] text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      ) : isActive ? (
                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                      ) : (
                        <Lock className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {stage.label}
                    </p>
                    <span className="text-[9px] text-slate-500">Stage {stage.num}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bento Today's Tasks (Col 4) */}
        <div className="md:col-span-4 bg-[#11141D] border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Today's Tasks</h3>
              <button
                onClick={() => onNavigate('/tasks')}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                Schedule <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {(dailyData?.tasks || []).slice(0, 3).map((task: any) => {
                const isDone = task.status === 'completed';
                return (
                  <div
                    key={task.id}
                    className={`flex items-center p-3 rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-indigo-500/5 border-indigo-500/20 text-slate-300'
                        : 'bg-slate-800/30 border-slate-700/30 hover:border-slate-600 text-slate-400'
                    }`}
                  >
                    <button
                      id={`btn-bento-task-${task.id}`}
                      onClick={() => completeDailyTask(task.id)}
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center mr-3 shrink-0 transition-colors ${
                        isDone
                          ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                          : 'border-slate-600 hover:border-indigo-400 text-transparent'
                      }`}
                    >
                      <Check className="w-3 h-3 text-indigo-400 stroke-[3]" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs truncate ${isDone ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}`}>
                        {task.title}
                      </p>
                      <span className="text-[10px] text-slate-500">{task.estimatedMinutes}m • {task.difficulty}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('/tasks')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700/50 transition-all"
            >
              Open Daily Planner
            </button>
          </div>
        </div>

        {/* Bento Upcoming Events (Col 4) */}
        <div className="md:col-span-4 bg-[#11141D] border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Upcoming Events</h3>
              <button
                onClick={() => onNavigate('/events')}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                All Events <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3.5">
              {(events.length > 0 ? events.slice(0, 2) : [
                { id: '1', title: 'Global AI Hackathon', date: 'OCT 12', location: 'Online • 14:00 GMT', tag: 'Live' },
                { id: '2', title: 'Google Internships Launch', date: 'OCT 15', location: 'Application Deadline', tag: 'High Match' }
              ]).map((evt: any, i: number) => (
                <div key={evt.id || i} className="flex items-start space-x-3.5">
                  <div className="bg-slate-800/80 rounded-xl p-2 text-center w-12 shrink-0 border border-slate-700/40">
                    <p className="text-[9px] text-slate-400 font-bold uppercase">{evt.date?.split(' ')[0] || 'OCT'}</p>
                    <p className="text-base font-bold leading-none text-white mt-0.5">{evt.date?.split(' ')[1] || (12 + i * 3)}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-200 truncate">{evt.title}</p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">{evt.location || 'Online Webinar'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('/events')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700/50 transition-all"
            >
              Browse Hackathons
            </button>
          </div>
        </div>

        {/* Bento Mentor Insight (Col 4) */}
        <div className="md:col-span-4 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-lg">
          <div className="relative z-10">
            <div className="flex items-center space-x-2.5 mb-3.5">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow">
                AI
              </div>
              <h3 className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Mentor Insight</h3>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-300 italic">
              "{user?.fullName?.split(' ')[0] || 'Gilbert'}, based on your current project velocity, you're 2 days ahead of schedule. Consider exploring 'Framer Motion' and Dockerizing your portfolio next week."
            </p>
          </div>

          <div className="relative z-10 mt-5">
            <button
              id="btn-bento-ask-mentor"
              onClick={() => onNavigate('/mentor')}
              className="w-full py-2.5 bg-white text-[#0A0C10] rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors shadow-md"
            >
              Ask AI Mentor
            </button>
          </div>

          {/* Ambient Glow Orb */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Bento Bottom Row: Active Portfolio Projects (Col 8) */}
        <div className="md:col-span-8 bg-[#11141D] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Portfolio Projects</h3>
              <p className="text-sm font-bold text-white mt-0.5">Stage-Aligned Capstone Implementations</p>
            </div>
            <button
              onClick={() => onNavigate('/projects')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              Project Hub <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.slice(0, 2).map((proj) => (
              <div
                key={proj.id}
                onClick={() => onNavigate('/projects')}
                className="cursor-pointer p-4 rounded-2xl bg-slate-800/30 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {proj.tier || 'Capstone'}
                    </span>
                    <span className="text-xs font-semibold text-indigo-400">{proj.progressPercentage}%</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    {proj.milestones?.filter((m: any) => m.completed).length || 2}/{proj.milestones?.length || 3} Milestones
                  </span>
                  <span className="font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Bottom Row: Weekly Learning Analytics (Col 4) */}
        <div className="md:col-span-4 bg-[#11141D] border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Weekly Study Time</h3>
              <span className="text-[11px] text-emerald-400 font-bold">+18% vs Last Wk</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Daily hours allocated across target topics</p>

            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.weeklyLearningHours || []}>
                  <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#11141D', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }}
                  />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                    {(analytics?.weeklyLearningHours || []).map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={index === 5 ? '#6366f1' : '#334155'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/analytics')}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700/50 transition-all text-center"
          >
            Full Analytics Breakdown
          </button>
        </div>

      </div>
    </div>
  );
};
