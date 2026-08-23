import React from 'react';
import { ChevronLeft, ChevronRight, CornerDownLeft, Home, Radar, Undo2 } from 'lucide-react';

export const HudFrame: React.FC = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30">
      {(
        [
          'top-3 left-3 border-t border-l',
          'top-3 right-3 border-t border-r',
          'bottom-3 left-3 border-b border-l',
          'bottom-3 right-3 border-b border-r',
        ] as const
      ).map((c) => (
        <span
          key={c}
          className={`absolute w-8 h-8 ${c}`}
          style={{ borderColor: 'color-mix(in oklab, var(--accent) 45%, transparent)' }}
        />
      ))}
    </div>
  );
};

export const Breadcrumb: React.FC<{
  trail: { label: string; level: number }[];
  onJump: (level: number) => void;
}> = ({ trail, onJump }) => {
  return (
    <nav aria-label="Hierarchy" className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
      {trail.map((c, i) => {
        const last = i === trail.length - 1;
        return (
          <span key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              disabled={last}
              onClick={() => onJump(c.level)}
              className="font-display text-[9px] sm:text-[10px] tracking-[0.24em] uppercase transition-colors disabled:cursor-default cursor-pointer"
              style={{
                color: last ? 'var(--hud)' : 'var(--hud-dim)',
                textShadow: last ? '0 0 14px color-mix(in oklab, var(--accent) 60%, transparent)' : undefined,
              }}
            >
              {c.label}
            </button>
            {!last && <ChevronRight className="w-3 h-3 shrink-0" style={{ color: 'var(--hud-dim)' }} />}
          </span>
        );
      })}
    </nav>
  );
};

export const TopBar: React.FC<{
  trail: { label: string; level: number }[];
  onJump: (level: number) => void;
  status: string;
}> = ({ trail, onJump, status }) => {
  return (
    <header className="relative z-30 flex items-start justify-between gap-4 px-4 sm:px-8 pt-4 sm:pt-6">
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center gap-2">
          <Radar className="w-4 h-4 anim-pulse-glow" style={{ color: 'var(--accent)' }} />
          <span className="font-display text-xs font-bold tracking-[0.42em]" style={{ color: 'var(--hud)' }}>
            HOLO EXPLORER
          </span>
        </div>
        <Breadcrumb trail={trail} onJump={onJump} />
      </div>
      <div className="hidden shrink-0 items-center gap-2 sm:flex">
        <span className="w-2 h-2 anim-pulse-glow rounded-full" style={{ background: 'var(--accent)' }} />
        <span
          className="font-display text-[9px] tracking-[0.24em] uppercase"
          style={{ color: 'var(--hud-dim)' }}
        >
          {status}
        </span>
      </div>
    </header>
  );
};

function CtrlButton({
  onClick,
  label,
  children,
  strong,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-transform duration-200 active:scale-95 cursor-pointer"
      style={{
        border: `1px solid color-mix(in oklab, var(--accent) ${strong ? 70 : 34}%, transparent)`,
        background: strong
          ? 'color-mix(in oklab, var(--accent) 20%, transparent)'
          : 'color-mix(in oklab, var(--shell) 70%, transparent)',
        color: 'var(--hud)',
        boxShadow: strong ? '0 0 26px -8px var(--accent)' : undefined,
        backdropFilter: 'blur(6px)',
      }}
    >
      {children}
    </button>
  );
}

export const NavControls: React.FC<{
  onPrev: () => void;
  onNext: () => void;
  onEnter: () => void;
  onBack: () => void;
  onHome: () => void;
  enterLabel: string;
  canBack: boolean;
  showStep: string;
}> = ({
  onPrev,
  onNext,
  onEnter,
  onBack,
  onHome,
  enterLabel,
  canBack,
  showStep,
}) => {
  return (
    <footer className="relative z-30 flex flex-col items-center gap-2.5 px-4 sm:px-8 pb-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <CtrlButton onClick={onPrev} label="Previous">
          <ChevronLeft className="w-4 h-4" />
          <span className="font-display text-[9px] tracking-[0.2em]">PREV</span>
        </CtrlButton>

        <CtrlButton onClick={onEnter} label={enterLabel} strong>
          <CornerDownLeft className="w-4 h-4" />
          <span className="font-display text-[9px] tracking-[0.2em] font-bold">
            {enterLabel.toUpperCase()}
          </span>
        </CtrlButton>

        <CtrlButton onClick={onNext} label="Next">
          <span className="font-display text-[9px] tracking-[0.2em]">NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </CtrlButton>

        <span className="mx-1 hidden h-6 w-px sm:block" style={{ background: 'var(--hud-dim)' }} />

        {canBack && (
          <CtrlButton onClick={onBack} label="Back">
            <Undo2 className="w-4 h-4" />
            <span className="font-display text-[9px] tracking-[0.2em]">BACK</span>
          </CtrlButton>
        )}

        <CtrlButton onClick={onHome} label="Home">
          <Home className="w-4 h-4" />
          <span className="font-display text-[9px] tracking-[0.2em]">HOME</span>
        </CtrlButton>
      </div>

      <p
        className="text-center font-display text-[8.5px] tracking-[0.22em] uppercase"
        style={{ color: 'var(--hud-dim)' }}
      >
        {showStep}
      </p>
    </footer>
  );
};
