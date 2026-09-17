import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  BarChart3,
  TrendingUp,
  Flame,
  Clock,
  Zap,
  Award,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getAnalytics();
        setData(res);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <BarChart3 className="w-4 h-4" />
          Student Learning Telemetry & Velocity
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Analytics Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Monitor your study volume, skill proficiency growth curves, and stage completion velocity.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Total Study Hours
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">{user?.totalHoursLearned ?? 0} hrs</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+18.5 hrs this week</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Study Streak
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{user?.currentStreakDays ?? 0} Days</p>
          <span className="text-[10px] text-slate-400 font-medium">Personal Record: 21 Days</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            Total XP Points
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300">{user?.xpPoints || 2450}</p>
          <span className="text-[10px] text-indigo-400 font-semibold">Tier 4 Engineer Rank</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            Roadmap Velocity
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-cyan-300">{user?.overallProgress ?? 0}%</p>
          <span className="text-[10px] text-emerald-400 font-semibold">Ahead of Semester Plan</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Study Hours (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Weekly Study Volume Distribution (Hours)
            </h3>
            <span className="text-xs text-slate-400">Target: 3.0 hrs/day</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.weeklyLearningHours}>
                <XAxis dataKey="day" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }}
                />
                <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                  {data.weeklyLearningHours.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#38bdf8' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Proficiency Radar (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Verified Skill Competency Radar
          </h3>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.skillProficiencies}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                <PolarRadiusAxis stroke="#475569" angle={30} domain={[0, 100]} />
                <Radar name="Proficiency" dataKey="A" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
