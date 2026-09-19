import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Code2,
  Cpu,
  Rocket,
  Briefcase,
  Trophy,
  Check,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { RoadmapStage } from '../../types';

interface WindingRoadProps {
  stages: RoadmapStage[];
  currentStage: number;
  expandedStage: number;
  onSelect: (stageNumber: number) => void;
  onOpenDetails: (stageNumber: number) => void;
}

const STAGE_ICONS = [BookOpen, Code2, Cpu, Rocket, Briefcase, Trophy];

/** Catmull-Rom → cubic bezier smooth path through points. */
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

export const WindingRoad: React.FC<WindingRoadProps> = ({
  stages,
  currentStage,
  expandedStage,
  onSelect,
  onOpenDetails,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [track, setTrack] = useState('');
  const [size, setSize] = useState({ w: 0, h: 0 });

  const measure = () => {
    const wrap = wrapRef.current;
    if (!wrap || stages.length === 0) return;
    const wb = wrap.getBoundingClientRect();
    if (wb.width === 0 || wb.height === 0) return;
    const pts: { x: number; y: number }[] = [];
    nodeRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      pts.push({ x: r.left - wb.left + r.width / 2, y: r.top - wb.top + r.height / 2 });
    });
    if (pts.length < 2) return;
    const extended = [
      { x: pts[0].x, y: Math.max(0, pts[0].y - 48) },
      ...pts,
      { x: pts[pts.length - 1].x, y: pts[pts.length - 1].y + 72 },
    ];
    setTrack(smoothPath(extended));
    setSize({ w: wb.width, h: wb.height });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    const t1 = setTimeout(measure, 350);
    const t2 = setTimeout(measure, 1200);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages]);

  if (stages.length === 0) return null;

  return (
    <div ref={wrapRef} className="relative">
      {/* Winding road track (measured through the real node positions) */}
      {track && size.w > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(180deg,transparent,black_6%,black_94%,transparent)]"
          viewBox={`0 0 ${size.w} ${size.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={track}
            fill="none"
            className="road-track"
            stroke="#141d31"
            strokeWidth={17}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={0.95}
          />
          <path
            d={track}
            fill="none"
            className="road-dashes"
            stroke="#22d3ee"
            strokeWidth={3}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.85))' }}
          />
        </svg>
      )}

      {/* Stage rows */}
      <div className="relative">
        {stages.map((st, i) => {
          const done = st.status === 'completed' || st.stageNumber < currentStage;
          const active = st.stageNumber === currentStage;
          const isLast = i === stages.length - 1;
          const Icon = STAGE_ICONS[i % STAGE_ICONS.length];
          const xp = Math.max(250, (st.tasks?.length || 0) * 250);
          const doneCount = st.tasks?.filter((t: any) => t.completed).length || 0;
          const totalCount = st.tasks?.length || 0;
          const leftSide = i % 2 === 0;
          const selected = expandedStage === st.stageNumber;

          const tileCls = done
            ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.35)]'
            : active
              ? 'bg-cyan-500/15 border-cyan-300/70 text-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.45)]'
              : isLast
                ? 'bg-amber-500/15 border-amber-400/50 text-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.3)]'
                : 'bg-slate-800/70 border-slate-700 text-slate-500';

          const cardCls = active
            ? 'road-card-active bg-indigo-950/60 border-cyan-400/50 shadow-[0_0_28px_-6px_rgba(34,211,238,0.4)]'
            : done
              ? 'road-card bg-[#11141D] border-emerald-500/25'
              : 'road-card bg-[#11141D]/80 border-slate-800';

          const statusPill = done ? (
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[9px] font-extrabold tracking-wide whitespace-nowrap">
              CLEARED ✓
            </span>
          ) : active ? (
            <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[9px] font-extrabold tracking-wide whitespace-nowrap">
              IN PROGRESS
            </span>
          ) : isLast ? (
            <span className="px-2 py-0.5 rounded-md bg-violet-500/15 text-violet-300 border border-violet-500/30 text-[9px] font-extrabold tracking-wide whitespace-nowrap">
              GRAND GOAL
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 text-[9px] font-extrabold tracking-wide whitespace-nowrap">
              LOCKED
            </span>
          );

          return (
            <div key={st.id} className="relative flex min-h-[132px] items-center py-4 sm:py-5">
              {/* Card */}
              <div className={`w-[calc(50%-30px)] sm:w-[calc(50%-36px)] shrink-0 ${leftSide ? 'order-1' : 'order-3'}`}>
                <button
                  onClick={() => onSelect(st.stageNumber)}
                  className={`w-full cursor-pointer rounded-2xl border p-2.5 sm:p-4 text-left transition-all hover:-translate-y-0.5 ${cardCls} ${
                    selected ? 'ring-2 ring-indigo-500/60' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-slate-400 uppercase truncate">
                      Stage {st.stageNumber} • {st.durationWeeks || 6} Wks
                    </span>
                    <span className="text-[10px] sm:text-xs font-extrabold text-amber-300 whitespace-nowrap">
                      +{xp.toLocaleString()} XP
                    </span>
                  </div>
                  <h4 className="mt-1 text-xs sm:text-sm font-extrabold leading-snug text-white">
                    {st.title}
                  </h4>
                  <p className="mt-0.5 line-clamp-2 text-[10px] sm:text-[11px] leading-snug text-slate-400">
                    {st.subtitle || st.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-1 border-t border-slate-800/80 pt-2">
                    <span className="truncate text-[9px] text-slate-500">
                      {doneCount}/{totalCount} modules
                    </span>
                    {statusPill}
                  </div>
                  {active && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetails(st.stageNumber);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') onOpenDetails(st.stageNumber);
                      }}
                      className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl bg-cyan-500/15 py-1.5 text-[10px] font-bold text-cyan-300 transition-colors hover:bg-cyan-500/25"
                    >
                      Open Details <ArrowRight className="h-3 w-3" />
                    </span>
                  )}
                </button>
              </div>

              {/* Node on the road */}
              <div className="order-2 flex w-[60px] shrink-0 items-center justify-center sm:w-[72px]">
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className={`relative flex h-11 w-11 items-center justify-center rounded-2xl border-2 backdrop-blur-sm transition-transform sm:h-12 sm:w-12 ${tileCls} ${
                    leftSide ? '-translate-x-[13px] sm:-translate-x-[16px]' : 'translate-x-[13px] sm:translate-x-[16px]'
                  }`}
                >
                  {done ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                  ) : !active && !isLast && st.stageNumber > currentStage ? (
                    <Lock className="h-4 w-4" />
                  ) : isLast && !done && !active ? (
                    <Trophy className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                  <span
                    className={`absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black ${
                      done
                        ? 'bg-emerald-500 text-white'
                        : active
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {st.stageNumber}
                  </span>
                  {active && (
                    <span className="absolute top-full mt-1.5 whitespace-nowrap rounded-full bg-cyan-400 px-2 py-0.5 text-[8px] font-black tracking-widest text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.7)]">
                      ● YOU ARE HERE
                    </span>
                  )}
                </div>
              </div>

              {/* Spacer keeps the alternating rhythm */}
              <div className={`w-[calc(50%-30px)] shrink-0 sm:w-[calc(50%-36px)] ${leftSide ? 'order-3' : 'order-1'}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
