import React from 'react';
import { Check } from 'lucide-react';
import type { RoadmapStage } from '../../data/careersData';

interface RoadmapTrackerProps {
  stages: RoadmapStage[];
  active: number;
  onSelect: (i: number) => void;
}

export const RoadmapTracker: React.FC<RoadmapTrackerProps> = ({ stages, active, onSelect }) => {
  const pct = stages.length > 1 ? (active / (stages.length - 1)) * 100 : 0;

  return (
    <section aria-label="Learning roadmap" className="flex flex-col gap-5">
      {/* Rail */}
      <div className="relative pt-1">
        <div
          aria-hidden
          className="absolute top-[18px] right-1 left-1 h-px"
          style={{ background: 'color-mix(in oklab, var(--accent) 26%, transparent)' }}
        />
        <div
          aria-hidden
          className="absolute top-[17px] left-1 h-[3px] rounded-full"
          style={{
            width: `${pct}%`,
            maxWidth: 'calc(100% - 8px)',
            background:
              'linear-gradient(90deg, color-mix(in oklab, var(--accent) 40%, transparent), var(--accent))',
            boxShadow: '0 0 18px var(--accent)',
            transition: 'width 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        <ol
          className="relative grid gap-1"
          style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
        >
          {stages.map((s, i) => {
            const done = i < active;
            const now = i === active;
            return (
              <li key={s.title} className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-current={now ? 'step' : undefined}
                  className="relative grid w-9 h-9 place-items-center rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    border: `1px solid color-mix(in oklab, var(--accent) ${now || done ? 85 : 32}%, transparent)`,
                    background:
                      now || done
                        ? 'color-mix(in oklab, var(--accent) 24%, transparent)'
                        : 'color-mix(in oklab, var(--shell) 80%, transparent)',
                    boxShadow: now ? '0 0 26px -4px var(--accent)' : undefined,
                    color: now || done ? 'var(--hud)' : 'var(--hud-dim)',
                  }}
                >
                  {done ? (
                    <Check className="w-4 h-4" strokeWidth={2.4} />
                  ) : (
                    <span className="font-display text-[10px] font-bold">{String(i + 1).padStart(2, '0')}</span>
                  )}
                  {now && (
                    <span
                      aria-hidden
                      className="absolute w-9 h-9 anim-pulse-glow rounded-full pointer-events-none"
                      style={{ boxShadow: '0 0 0 1px var(--accent)' }}
                    />
                  )}
                </button>
                <span
                  className="hidden text-center font-display text-[8px] leading-tight tracking-[0.14em] uppercase sm:block"
                  style={{ color: now ? 'var(--hud)' : 'var(--hud-dim)' }}
                >
                  {s.title}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Active stage detail */}
      <div key={active} className="anim-enter holo-panel holo-corner relative flex flex-col gap-2 p-4 rounded-xl">
        <div className="flex items-baseline gap-3">
          <span
            className="font-display text-2xl font-bold leading-none"
            style={{ color: 'color-mix(in oklab, var(--accent) 60%, transparent)' }}
          >
            {String(active + 1).padStart(2, '0')}
          </span>
          <h4
            className="holo-text font-display text-sm font-bold tracking-[0.18em] uppercase"
            style={{ color: 'var(--hud)' }}
          >
            {stages[active].title}
          </h4>
        </div>
        <p className="text-[14px] leading-relaxed text-slate-200">{stages[active].desc}</p>
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {stages[active].skills.map((sk) => (
            <li
              key={sk}
              className="holo-chip px-2 py-0.5 font-display text-[9px] tracking-[0.14em] uppercase rounded"
            >
              {sk}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
