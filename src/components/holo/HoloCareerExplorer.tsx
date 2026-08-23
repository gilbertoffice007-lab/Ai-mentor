import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Compass } from 'lucide-react';
import { FIELDS, ROOT_OVERVIEW, ROOT_SHAPE, resolveRoadmap, Field, Sub } from '../../data/careersData';
import { getIcon } from '../../lib/iconMap';
import { DetailPanel } from './DetailPanel';
import { HologramCore } from './HologramCore';
import { HudFrame, NavControls, TopBar } from './Hud';
import { OrbitCarousel } from './OrbitCarousel';
import { OverviewOverlay } from './OverviewOverlay';
import { ParticleField } from './ParticleField';

type Level = 0 | 1 | 2; // 0 = FIELDS, 1 = field, 2 = career path

interface HoloCareerExplorerProps {
  onSelectCareerGoal?: (careerTitle: string, domainName: string, skills: string[]) => void;
  onBackToApp?: () => void;
}

export const HoloCareerExplorer: React.FC<HoloCareerExplorerProps> = ({
  onSelectCareerGoal,
}) => {
  const [level, setLevel] = useState<Level>(0);
  const [fieldIdx, setFieldIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [stage, setStage] = useState(0);
  const [overview, setOverview] = useState(false);

  const field = FIELDS[fieldIdx] || FIELDS[0];
  const sub = field.subs[subIdx] || field.subs[0];
  const stages = resolveRoadmap(field, sub);

  /* Dynamic theme styling following the selected field */
  const themeStyle = useMemo(
    () =>
      ({
        '--accent': field.theme.accent,
        '--accent-2': field.theme.accent2,
        '--shell': field.theme.bg,
        '--shell-2': field.theme.bg2,
      } as React.CSSProperties),
    [field]
  );

  /* Navigation steps */
  const step = useCallback(
    (dir: 1 | -1) => {
      if (overview) return;
      if (level === 0) {
        setFieldIdx((i) => (i + dir + FIELDS.length) % FIELDS.length);
        setSubIdx(0);
      } else if (level === 1) {
        setSubIdx((i) => (i + dir + field.subs.length) % field.subs.length);
      } else {
        setStage((s) => Math.min(stages.length - 1, Math.max(0, s + dir)));
      }
    },
    [level, overview, field.subs.length, stages.length]
  );

  const enter = useCallback(() => {
    if (overview) return;
    if (level === 0) {
      setLevel(1);
      setSubIdx(0);
    } else if (level === 1) {
      setLevel(2);
      setStage(0);
    } else {
      setStage((s) => (s + 1) % stages.length);
    }
  }, [level, overview, stages.length]);

  const back = useCallback(() => {
    if (overview) {
      setOverview(false);
      return;
    }
    setLevel((l) => (l === 0 ? 0 : ((l - 1) as Level)));
  }, [overview]);

  const home = useCallback(() => {
    setOverview(false);
    setLevel(0);
  }, []);

  const jump = useCallback((l: number) => {
    setOverview(false);
    setLevel(l as Level);
  }, []);

  /* Keyboard controls */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Avoid capturing keystrokes if focused in input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          step(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          step(1);
          break;
        case 'Enter':
          e.preventDefault();
          enter();
          break;
        case 'Escape':
          e.preventDefault();
          back();
          break;
        case 'Home':
          e.preventDefault();
          home();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, enter, back, home]);

  /* Touch swipe handler */
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      step(dx < 0 ? 1 : -1);
    }
  };

  /* Breadcrumb trail */
  const trail = useMemo(() => {
    const t = [{ label: '12 Fields', level: 0 }];
    if (level >= 1) t.push({ label: field.name, level: 1 });
    if (level >= 2) t.push({ label: sub.name, level: 2 });
    return t;
  }, [level, field.name, sub.name]);

  const status =
    level === 0
      ? `Level 01 · ${FIELDS.length} fields indexed`
      : level === 1
      ? `Level 02 · ${field.subs.length} career paths`
      : 'Level 03 · interactive roadmap active';

  const hint =
    level === 0
      ? '← → rotate orbit · enter opens field · click the core for ecosystem overview'
      : level === 1
      ? '← → rotate career paths · enter opens pathway · esc returns to fields'
      : '← → cycle roadmap stages · select career goal to launch AI journey';

  const FieldIcon = getIcon(field.icon);

  return (
    <div
      style={themeStyle}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="holo-shell relative min-h-[640px] lg:min-h-[720px] rounded-3xl border border-indigo-500/20 shadow-2xl flex flex-col overflow-hidden select-none"
    >
      <div aria-hidden className="holo-grid absolute inset-0 opacity-45 pointer-events-none" />
      <div aria-hidden className="holo-scan absolute inset-0 opacity-25 pointer-events-none" />
      <ParticleField />
      <HudFrame />

      <TopBar trail={trail} onJump={jump} status={status} />

      {level === 2 ? (
        <DetailPanel
          key={`${field.id}-${sub.id}`}
          field={field}
          sub={sub}
          index={subIdx}
          stage={stage}
          onStage={setStage}
          onBack={back}
          onSelectCareerGoal={(f, s) => {
            if (onSelectCareerGoal) {
              onSelectCareerGoal(s.name, f.name, s.skills);
            }
          }}
        />
      ) : (
        <div key={`orbit-${level}-${field.id}`} className="anim-enter relative min-h-0 flex-1 min-h-[380px]">
          <div className="absolute top-[34%] left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            {level === 0 ? (
              <HologramCore
                label="ECOSYSTEM"
                title="12 MAJOR FIELDS"
                shape={ROOT_SHAPE}
                Icon={Compass}
                onOpen={() => setOverview(true)}
                hint="Open ecosystem overview"
              />
            ) : (
              <HologramCore
                label="FIELD"
                title={field.name}
                shape={field.shape}
                Icon={FieldIcon}
                onOpen={() => setOverview(true)}
                hint="Open field overview"
              />
            )}
          </div>

          <p
            className="absolute bottom-2 left-1/2 w-full -translate-x-1/2 text-center font-display text-[9px] tracking-[0.35em] uppercase font-semibold"
            style={{ color: 'var(--hud-dim)' }}
          >
            {level === 0
              ? 'Choose your domain · Explore 120+ career tracks'
              : `${field.tag} · ${field.subs.length} specialized career paths`}
          </p>

          <OrbitCarousel
            items={level === 0 ? FIELDS : field.subs}
            selected={level === 0 ? fieldIdx : subIdx}
            onSelect={level === 0 ? setFieldIdx : setSubIdx}
            onOpen={enter}
            kindLabel={level === 0 ? 'Field' : 'Path'}
          />
        </div>
      )}

      <NavControls
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        onEnter={enter}
        onBack={back}
        onHome={home}
        enterLabel={level === 2 ? 'Next Stage' : 'Select'}
        canBack={level > 0}
        showStep={hint}
      />

      {overview && (
        <OverviewOverlay
          eyebrow={level === 0 ? 'Ecosystem overview · Level 01' : 'Field overview · Level 02'}
          title={level === 0 ? 'The Global Career Field Ecosystem' : field.name}
          data={level === 0 ? ROOT_OVERVIEW : field.overview}
          onClose={() => setOverview(false)}
        />
      )}
    </div>
  );
};
