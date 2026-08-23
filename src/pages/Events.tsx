import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { CareerEvent } from '../types';
import { useAuth } from '../context/AuthContext';
import { Calendar, Sparkles, MapPin, Users, ExternalLink, Trophy, CheckCircle2 } from 'lucide-react';

export const Events: React.FC = () => {
  const { showToast } = useAuth();
  const [events, setEvents] = useState<CareerEvent[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getEvents();
        setEvents(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const handleRegister = (title: string) => {
    showToast(`Registered for ${title}! Calendar invite dispatched 📅`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <Calendar className="w-4 h-4" />
          Hackathons, Conferences & Hiring Sprints
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Upcoming Career Events</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Compete in global hackathons, attend tech symposiums, and connect with technical recruiters.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/40 shadow-xl transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {ev.type}
                </span>
                <span className="text-xs text-indigo-400 font-semibold">{ev.date}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{ev.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{ev.organizer}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{ev.description}</p>

              {ev.prizePool && (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Prize Pool: {ev.prizePool}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {ev.location}
              </span>

              <button
                onClick={() => handleRegister(ev.title)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
