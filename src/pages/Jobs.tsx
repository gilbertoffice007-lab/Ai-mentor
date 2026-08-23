import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { JobListing } from '../types';
import {
  Briefcase,
  Sparkles,
  MapPin,
  DollarSign,
  CheckCircle2,
  Bookmark,
  Send,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface JobsProps {
  onNavigate: (route: string) => void;
}

export const Jobs: React.FC<JobsProps> = ({ onNavigate }) => {
  const { user, showToast } = useAuth();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await api.getJobs();
        setJobs(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadJobs();
  }, []);

  const handleApply = async (id: string) => {
    try {
      const res = await api.applyJob(id);
      if (res.success) {
        setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'applied' } : j));
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        showToast('Application & verified developer portfolio sent! 💼');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (id: string) => {
    try {
      const res = await api.saveJob(id);
      if (res.success) {
        setJobs(prev => prev.map(j => j.id === id ? res.job : j));
        showToast('Job listing saved', 'info');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Briefcase className="w-4 h-4" />
            Stage 6 Full-Time Graduate Roles
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Full-Time Career Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Positions curated for your {user?.careerTitle || 'Full Stack Developer'} roadmap with verified placement readiness.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles, companies..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((job) => {
          const isApplied = job.status === 'applied';
          const isSaved = job.status === 'saved';

          return (
            <div
              key={job.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                isApplied
                  ? 'bg-slate-900/50 border-emerald-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-2xl shadow-xl'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-700 shadow"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{job.company}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{job.title}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                    {job.matchScore}% Match
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{job.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-800/60 flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/60 flex items-center gap-1.5 text-emerald-300 font-semibold">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{job.salaryRange}</span>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Required Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skillsRequired.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  id={`btn-save-job-${job.id}`}
                  onClick={() => handleSave(job.id)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isSaved
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>

                <button
                  id={`btn-apply-job-${job.id}`}
                  onClick={() => handleApply(job.id)}
                  disabled={isApplied}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isApplied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-lg shadow-indigo-500/20'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Application Sent
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Apply via Verified Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
