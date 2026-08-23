import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface HologramCoreProps {
  label: string;
  title: string;
  shape: string;
  Icon: LucideIcon;
  onOpen: () => void;
  hint?: string;
}

export const HologramCore: React.FC<HologramCoreProps> = ({
  label,
  title,
  shape,
  Icon,
  onOpen,
  hint = 'Open overview',
}) => {
  const long = title.length > 22;

  return (
    <div className="pointer-events-none relative flex flex-col items-center">
      <div className="relative grid place-items-center">
        {/* Orbit rings behind the shape */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 anim-spin-slow rounded-full border border-dashed"
          style={{
            width: 'clamp(240px, 34vw, 380px)',
            height: 'clamp(240px, 34vw, 380px)',
            borderColor: 'color-mix(in oklab, var(--accent) 32%, transparent)',
          }}
        />
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 anim-spin-rev rounded-full border"
          style={{
            width: 'clamp(190px, 27vw, 300px)',
            height: 'clamp(190px, 27vw, 300px)',
            borderColor: 'color-mix(in oklab, var(--accent) 18%, transparent)',
          }}
        />

        <button
          type="button"
          onClick={onOpen}
          title={hint}
          className="pointer-events-auto group relative grid place-items-center outline-none cursor-pointer"
          style={{
            width: 'clamp(168px, 24vw, 266px)',
            height: 'clamp(168px, 24vw, 266px)',
          }}
        >
          {/* Glow halo */}
          <span
            aria-hidden
            className="absolute inset-[-14%] anim-pulse-glow rounded-full blur-2xl pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, color-mix(in oklab, var(--accent) 55%, transparent), transparent 66%)',
            }}
          />

          {/* Outer clipped frame */}
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: shape,
              background: 'color-mix(in oklab, var(--accent) 60%, transparent)',
              transition: 'clip-path 600ms ease',
            }}
          />

          {/* Glass interior */}
          <span
            aria-hidden
            className="absolute inset-[3px] overflow-hidden backdrop-blur-md pointer-events-none"
            style={{
              clipPath: shape,
              background:
                'linear-gradient(165deg, color-mix(in oklab, var(--accent) 26%, transparent), color-mix(in oklab, var(--shell) 88%, transparent) 62%)',
              transition: 'clip-path 600ms ease',
            }}
          >
            <span className="absolute inset-0 holo-grid opacity-70" style={{ backgroundSize: '22px 22px' }} />
            <span className="absolute inset-0 holo-scan opacity-40" />
            <span
              className="absolute top-0 h-full w-1/3 anim-sweep"
              style={{
                background:
                  'linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 22%, transparent), transparent)',
              }}
            />
          </span>

          {/* Content */}
          <span className="relative z-10 flex w-[72%] flex-col items-center gap-1.5 text-center">
            <Icon
              className="w-5 h-5 sm:w-6 sm:h-6"
              style={{ color: 'var(--hud)', filter: 'drop-shadow(0 0 10px var(--accent))' }}
              strokeWidth={1.6}
            />
            <span
              className="font-display text-[9px] tracking-[0.34em] font-semibold"
              style={{ color: 'color-mix(in oklab, var(--accent) 70%, white 30%)' }}
            >
              {label}
            </span>
            <span
              className={`holo-text font-display font-bold leading-[1.08] text-balance ${
                long ? 'text-[13px] sm:text-base' : 'text-lg sm:text-2xl'
              }`}
              style={{ color: 'var(--hud)' }}
            >
              {title}
            </span>
            <span
              className="mt-0.5 font-display text-[8px] tracking-[0.22em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ color: 'var(--hud-dim)' }}
            >
              {hint.toUpperCase()}
            </span>
          </span>
        </button>
      </div>

      {/* Projection beam + base */}
      <div aria-hidden className="pointer-events-none absolute top-full -z-10 -mt-1 flex w-full flex-col items-center">
        <div
          className="anim-beam blur-[2px]"
          style={{
            width: 'clamp(150px, 22vw, 240px)',
            height: 'clamp(120px, 16vw, 190px)',
            clipPath: 'polygon(41% 0%, 59% 0%, 100% 100%, 0% 100%)',
            background:
              'linear-gradient(to bottom, color-mix(in oklab, var(--accent) 55%, transparent), transparent 88%)',
          }}
        />
        <div
          className="-mt-2 rounded-[50%] blur-md"
          style={{
            width: 'clamp(190px, 28vw, 320px)',
            height: 'clamp(18px, 3vw, 34px)',
            background:
              'radial-gradient(50% 50%, color-mix(in oklab, var(--accent) 70%, transparent), transparent 72%)',
          }}
        />
      </div>
    </div>
  );
};
