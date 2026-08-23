'use client'

import { ArrowLeft, Briefcase, Sparkles, Target, Wrench } from 'lucide-react'
import type { Field, Sub } from '@/lib/careers-data'
import { resolveRoadmap } from '@/lib/careers-data'
import { getIcon } from '@/lib/icon-map'
import { RoadmapTracker } from './roadmap-tracker'

function Block({
  title,
  Icon,
  children,
}: {
  title: string
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  children: React.ReactNode
}) {
  return (
    <section className="holo-panel holo-corner relative flex flex-col gap-3 p-4">
      <h3 className="flex items-center gap-2 font-display text-[10px] font-bold tracking-[0.24em] uppercase" style={{ color: 'var(--hud)' }}>
        <Icon className="size-3.5" strokeWidth={1.8} />
        {title}
      </h3>
      {children}
    </section>
  )
}

function Pills({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((c) => (
        <li key={c} className="holo-chip px-2.5 py-1 text-[13px] leading-tight">
          {c}
        </li>
      ))}
    </ul>
  )
}

export function DetailPanel({
  field,
  sub,
  index,
  stage,
  onStage,
  onBack,
}: {
  field: Field
  sub: Sub
  index: number
  stage: number
  onStage: (i: number) => void
  onBack: () => void
}) {
  const Icon = getIcon(sub.icon)
  const stages = resolveRoadmap(field, sub)

  return (
    <div className="anim-enter relative z-40 flex min-h-0 flex-1 flex-col px-5 pb-2 sm:px-8">
      <div className="holo-scroll min-h-0 flex-1 overflow-y-auto pr-1">
        {/* ---------- title ---------- */}
        <div className="flex flex-wrap items-center gap-4 pb-5">
          <div className="relative grid size-16 shrink-0 place-items-center">
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ clipPath: field.shape, background: 'color-mix(in oklab, var(--accent) 55%, transparent)' }}
            />
            <span
              aria-hidden
              className="absolute inset-[2px] backdrop-blur-sm"
              style={{
                clipPath: field.shape,
                background: 'linear-gradient(160deg, color-mix(in oklab, var(--accent) 24%, transparent), color-mix(in oklab, var(--shell) 90%, transparent))',
              }}
            />
            <Icon
              className="relative size-6"
              strokeWidth={1.6}
              style={{ color: 'var(--hud)', filter: 'drop-shadow(0 0 8px var(--accent))' }}
            />
          </div>

          <div className="min-w-0">
            <p className="font-display text-[9px] tracking-[0.28em] uppercase" style={{ color: 'var(--hud-dim)' }}>
              Path {String(index + 1).padStart(2, '0')} · {field.name}
            </p>
            <h2
              className="holo-text font-display text-xl leading-tight font-bold tracking-wide text-balance sm:text-3xl"
              style={{ color: 'var(--hud)' }}
            >
              {sub.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="ml-auto flex items-center gap-2 px-3 py-2 transition-transform active:scale-95"
            style={{
              border: '1px solid color-mix(in oklab, var(--accent) 40%, transparent)',
              background: 'color-mix(in oklab, var(--shell) 70%, transparent)',
              color: 'var(--hud)',
            }}
          >
            <ArrowLeft className="size-4" />
            <span className="font-display text-[9px] tracking-[0.2em]">BACK</span>
          </button>
        </div>

        {/* ---------- body ---------- */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Block title="Overview" Icon={Target}>
              <p className="text-[15px] leading-relaxed text-foreground/85">{sub.overview}</p>
            </Block>
            <Block title="Why choose it" Icon={Sparkles}>
              <p className="text-[15px] leading-relaxed text-foreground/85">{sub.why}</p>
            </Block>
            <Block title="Career opportunities" Icon={Briefcase}>
              <Pills items={sub.careers} />
            </Block>
          </div>

          <div className="flex flex-col gap-4">
            <Block title="Skills you'll build" Icon={Sparkles}>
              <Pills items={sub.skills} />
            </Block>
            <Block title="Tools & technologies" Icon={Wrench}>
              <Pills items={sub.tools} />
            </Block>
          </div>
        </div>

        {/* ---------- roadmap ---------- */}
        <div className="mt-5 pb-4">
          <div className="mb-4 flex items-center gap-3">
            <h3 className="font-display text-[10px] font-bold tracking-[0.24em] uppercase" style={{ color: 'var(--hud)' }}>
              Learning roadmap
            </h3>
            <span className="h-px flex-1" style={{ background: 'color-mix(in oklab, var(--accent) 26%, transparent)' }} />
            <span className="font-display text-[9px] tracking-[0.2em]" style={{ color: 'var(--hud-dim)' }}>
              STAGE {String(stage + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
            </span>
          </div>
          <RoadmapTracker stages={stages} active={stage} onSelect={onStage} />
        </div>
      </div>
    </div>
  )
}
