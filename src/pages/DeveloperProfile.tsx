import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DeveloperProfileData } from '../types';
import {
  UserCheck,
  Award,
  Github,
  Linkedin,
  Globe,
  MapPin,
  Flame,
  CheckCircle2,
  FolderGit2,
  ExternalLink,
  Edit3,
  Sparkles,
  Layers,
  Code
} from 'lucide-react';

interface DeveloperProfileProps {
  onNavigate: (route: string) => void;
}

export const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ onNavigate }) => {
  const { user, showToast } = useAuth();
  const [profile, setProfile] = useState<DeveloperProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bioInput, setBioInput] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await api.getDevProfile();
        setProfile(data);
        setBioInput(data.bio);
      } catch (e) {
        console.error(e);
      }
    };
    loadProfile();
  }, []);

  const handleSaveBio = async () => {
    if (!profile) return;
    try {
      const res = await api.updateDevProfile({ bio: bioInput });
      if (res.success) {
        setProfile(res.profile);
        setIsEditing(false);
        showToast('Developer profile bio updated ✨');
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Banner Card */}
      <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-cyan-400 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{profile.fullName}</h1>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Stage 4 Verified
                </span>
              </div>
              <p className="text-sm font-semibold text-indigo-300">{profile.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {profile.location}
                </span>
                <span>{profile.education}</span>
              </div>
            </div>
          </div>

          {/* Social Links & Action */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`https://github.com/${profile.githubHandle}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`https://linkedin.com/in/${profile.linkedinHandle}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={() => onNavigate('/resume')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-1.5 transition-all min-h-[40px]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              View ATS Resume
            </button>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Professional Bio</span>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs text-indigo-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? 'Cancel' : 'Edit Bio'}
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSaveBio}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
              >
                Save Bio
              </button>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Main Grid: Heatmap + Top Skills + Badges */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Heatmap & Skills (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* GitHub-Style Activity Contribution Heatmap */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce" />
                <h3 className="text-base font-bold text-white">90-Day Learning Activity Heatmap</h3>
              </div>
              <span className="text-xs text-slate-400">{profile.stats.tasksCompleted} Verified Tasks Completed</span>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[500px]">
                {profile.activityHeatmap.map((cell, idx) => {
                  const intensity = cell.count === 0 ? 'bg-slate-800/80' :
                    cell.count <= 2 ? 'bg-indigo-900' :
                    cell.count <= 4 ? 'bg-indigo-600' :
                    cell.count <= 6 ? 'bg-cyan-500' : 'bg-emerald-400';
                  return (
                    <div
                      key={idx}
                      title={`${cell.date}: ${cell.count} contributions`}
                      className={`w-3.5 h-3.5 rounded-sm ${intensity} transition-all hover:scale-125 cursor-pointer`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span>Less</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-800" />
                <span className="w-3 h-3 rounded-sm bg-indigo-900" />
                <span className="w-3 h-3 rounded-sm bg-indigo-600" />
                <span className="w-3 h-3 rounded-sm bg-cyan-500" />
                <span className="w-3 h-3 rounded-sm bg-emerald-400" />
              </div>
              <span>More Active</span>
            </div>
          </div>

          {/* Technical Skills Taxonomy */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Verified Technical Skill Proficiencies
              </h3>
              <span className="text-xs text-indigo-400 font-semibold">Stage 2 Audited</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.topSkills.map((sk, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white">{sk.name}</span>
                    <span className="text-cyan-300">{sk.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1.5 rounded-full"
                      style={{ width: `${sk.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Badges & Quick Stats (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Achievement Badges Card */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Career Achievement Badges</h3>
            </div>

            <div className="space-y-3">
              {profile.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{badge.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{badge.description}</p>
                    <span className="text-[10px] text-indigo-300 mt-1 block">Unlocked {badge.unlockedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
