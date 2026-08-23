'use client'

import { X } from 'lucide-react'
import type { Field } from '@/lib/careers-data'

type Overview = Field['overview']

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-display text-[9px] font-bold tracking-[0.24em] uppercase" style={{ color: 'var(--hud)' }}>
        {title}
      </h3>
      <ul className="flex flex-col gap-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-[14.5px] leading-relaxed text-foreground/85">
            <span aria-hidden className="mt-2 size-1 shrink-0 rotate-45" style={{ background: 'var(--accent)' }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function OverviewOverlay({
  eyebrow,
  title,
  data,
  onClose,
}: {
  eyebrow: string
  title: string
  data: Overview
  onClose: () => void
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} overview`}
      className="anim-enter fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-8"
      style={{ background: 'color-mix(in oklab, var(--shell) 82%, transparent)', backdropFilter: 'blur(6px)' }}
    >
      <div className="holo-panel holo-corner relative flex max-h-full w-full max-w-4xl flex-col">
        <div className="flex items-start justify-between gap-4 border-b p-5" style={{ borderColor: 'color-mix(in oklab, var(--accent) 24%, transparent)' }}>
          <div className="min-w-0">
            <p className="font-display text-[9px] tracking-[0.28em] uppercase" style={{ color: 'var(--hud-dim)' }}>
              {eyebrow}
            </p>
            <h2 className="holo-text font-display text-lg font-bold tracking-wide text-balance sm:text-2xl" style={{ color: 'var(--hud)' }}>
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close overview"
            className="grid size-9 shrink-0 place-items-center transition-transform active:scale-90"
            style={{
              border: '1px solid color-mix(in oklab, var(--accent) 40%, transparent)',
              color: 'var(--hud)',
            }}
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="holo-scroll flex min-h-0 flex-col gap-6 overflow-y-auto p-5">
          <p className="text-base leading-relaxed text-foreground/90 text-pretty">{data.what}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            <List title="What you learn" items={data.learn} />
            <List title="Career opportunities" items={data.careers} />
            <List title="Core skills" items={data.skills} />
            <List title="Industries" items={data.industries} />
            <List title="Higher education" items={data.higher} />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-[9px] font-bold tracking-[0.24em] uppercase" style={{ color: 'var(--hud)' }}>
                  General roadmap
                </h3>
                <p className="text-[14.5px] leading-relaxed text-foreground/85">{data.roadmap}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-[9px] font-bold tracking-[0.24em] uppercase" style={{ color: 'var(--hud)' }}>
                  Suitable for
                </h3>
                <p className="text-[14.5px] leading-relaxed text-foreground/85">{data.suitable}</p>
              </div>
            </div>
          </div>
        </div>

        <p
          className="border-t px-5 py-3 text-center font-display text-[8.5px] tracking-[0.22em] uppercase"
          style={{ borderColor: 'color-mix(in oklab, var(--accent) 24%, transparent)', color: 'var(--hud-dim)' }}
        >
          Press ESC to close
        </p>
      </div>
    </div>
  )
}
