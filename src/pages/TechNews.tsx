import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { TechNewsItem } from '../types';
import { Newspaper, ExternalLink, Sparkles, Clock, Tag } from 'lucide-react';

export const TechNews: React.FC = () => {
  const [news, setNews] = useState<TechNewsItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getNews();
        setNews(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <Newspaper className="w-4 h-4" />
          Industry Intelligence & Trends
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Curated Daily Tech News</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Stay ahead of algorithmic shifts, new web frameworks, and AI developments.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/40 shadow-xl transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/30">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {item.publishedAt}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">{item.source}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                Read Article
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
