import React, { useState } from 'react';
import { DOMAINS } from '../data/initialData';
import { DomainCategory, CareerPath } from '../types';
import { DomainExplorer3D } from '../components/domain3d/DomainExplorer3D';
import { HoloCareerExplorer } from '../components/holo/HoloCareerExplorer';
import { useAuth } from '../context/AuthContext';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Search,
  Layers,
  TrendingUp,
  CheckCircle,
  Cpu,
  Orbit,
  Grid,
  Globe
} from 'lucide-react';

interface ExploreDomainsProps {
  onNavigate: (route: string) => void;
  onSelectCareer: (career: CareerPath) => void;
}

export const ExploreDomains: React.FC<ExploreDomainsProps> = ({ onNavigate, onSelectCareer }) => {
  const { user, updateUser, showToast } = useAuth();
  const [viewMode, setViewMode] = useState<'holo' | 'three' | 'grid'>('holo');
  const [selectedDomain, setSelectedDomain] = useState<DomainCategory>(DOMAINS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'tech' | 'non-tech'>('all');

  const filteredDomains = DOMAINS.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.careers.some(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.skillsRequired.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    if (activeFilter === 'tech') {
      return (
        matchesSearch &&
        (d.id === 'comp-sci' || d.id === 'electronics' || d.id === 'civil-mech' || d.id === 'biotech')
      );
    }
    if (activeFilter === 'non-tech') {
      return matchesSearch && d.id !== 'comp-sci' && d.id !== 'electronics' && d.id !== 'biotech';
    }
    return matchesSearch;
  });

  const handleSelectHoloCareer = async (careerTitle: string, domainName: string, skills: string[]) => {
    if (user) {
      await updateUser({
        careerTitle,
        skillLevel: 'Intermediate',
      });
      showToast(`Selected '${careerTitle}' as your active career goal! 🚀`, 'success');
    }
    onNavigate('/roadmap');
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Compass className="w-4 h-4" />
            <span>Interactive 3D Field & Career Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Explore 12 Major Domains
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Orbit through engineering, artificial intelligence, healthcare, design, finance, and humanities in real-time 3D.
          </p>
        </div>

        {/* View Switcher & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
            <button
              id="tab-view-holo"
              onClick={() => setViewMode('holo')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'holo'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Holo Orbit</span>
            </button>
            <button
              id="tab-view-three"
              onClick={() => setViewMode('three')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'three'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Galaxy 3D</span>
            </button>
            <button
              id="tab-view-grid"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Card Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="max-w-7xl mx-auto">
        {viewMode === 'holo' ? (
          <div className="space-y-4">
            <HoloCareerExplorer
              onSelectCareerGoal={handleSelectHoloCareer}
            />
          </div>
        ) : viewMode === 'three' ? (
          <div className="space-y-6">
            <DomainExplorer3D
              domain={selectedDomain}
              onSelectCareer={(career) => {
                onSelectCareer(career);
                onNavigate('/personality-test');
              }}
            />

            {/* Sub Domain Node selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {DOMAINS.map((domain) => {
                const isSelected = selectedDomain.id === domain.id;
                return (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomain(domain)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: domain.color }} />
                    <span>{domain.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="space-y-6">
            {/* Search & Filter Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search careers, skills, domains..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All (12)
                </button>
                <button
                  onClick={() => setActiveFilter('tech')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeFilter === 'tech' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  STEM
                </button>
                <button
                  onClick={() => setActiveFilter('non-tech')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeFilter === 'non-tech' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Creative & Biz
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDomains.map((domain) => {
                const isSelected = selectedDomain.id === domain.id;
                return (
                  <div
                    key={domain.id}
                    id={`card-domain-${domain.id}`}
                    onClick={() => {
                      setSelectedDomain(domain);
                      setViewMode('three');
                    }}
                    className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/20 ring-1 ring-indigo-500'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-md"
                          style={{ backgroundColor: domain.color }}
                        >
                          <Cpu className="w-4 h-4" />
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          {domain.careerGrowth}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {domain.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {domain.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{domain.careers.length} Careers</span>
                      <span
                        className={`font-semibold flex items-center gap-1 ${
                          isSelected ? 'text-cyan-300' : 'text-indigo-400'
                        }`}
                      >
                        <span>Launch in 3D</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
