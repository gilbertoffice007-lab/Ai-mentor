'use client'

import { getIcon } from '@/lib/icon-map'
import { pad } from '@/lib/careers-data'

export type OrbitItem = {
  id: string
  name: string
  icon: string
}

type Props = {
  items: OrbitItem[]
  selected: number
  onSelect: (i: number) => void
  onOpen: (i: number) => void
  kindLabel: string
}

/**
 * Elliptical orbit carousel. Every card is placed with a single transform
 * derived from its signed distance to the selected index, so moving the
 * selection animates the whole ring with pure GPU transforms.
 */
export function OrbitCarousel({ items, selected, onSelect, onOpen, kindLabel }: Props) {
  const n = items.length

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[64%] z-30"
      style={
        {
          '--rx': 'clamp(120px, 34vw, 470px)',
          '--ry': 'clamp(58px, 9vw, 128px)',
        } as React.CSSProperties
      }
    >
      <div className="relative mx-auto h-0 w-0">
        {/* dashed orbit ring */}
        <div
          aria-hidden
          className="absolute top-0 left-0 rounded-[50%] border border-dashed"
          style={{
            width: 'calc(var(--rx) * 2)',
            height: 'calc(var(--ry) * 2)',
            transform: 'translate(-50%, -50%)',
            borderColor: 'color-mix(in oklab, var(--accent) 30%, transparent)',
            boxShadow: '0 0 60px -18px color-mix(in oklab, var(--accent) 70%, transparent) inset',
          }}
        />
        <div
          aria-hidden
          className="absolute top-0 left-0 rounded-[50%] border"
          style={{
            width: 'calc(var(--rx) * 1.34)',
            height: 'calc(var(--ry) * 1.34)',
            transform: 'translate(-50%, -50%)',
            borderColor: 'color-mix(in oklab, var(--accent) 14%, transparent)',
          }}
        />

        {items.map((item, i) => {
          // shortest signed distance around the ring
          let d = i - selected
          if (d > n / 2) d -= n
          if (d < -n / 2) d += n

          const t = (d / n) * Math.PI * 2
          const sin = Math.sin(t)
          const cos = Math.cos(t)
          const depth = (cos + 1) / 2 // 1 = front, 0 = back
          const isSel = d === 0

          const scale = 0.52 + depth * 0.48
          const opacity = 0.22 + depth * 0.78
          const blur = (1 - depth) * 2.4

          const Icon = getIcon(item.icon)

          return (
            <button
              key={item.id}
              type="button"
              aria-current={isSel ? 'true' : undefined}
              onClick={() => (isSel ? onOpen(i) : onSelect(i))}
              className="pointer-events-auto absolute top-0 left-0 origin-center"
              style={{
                width: 'clamp(112px, 15vw, 178px)',
                zIndex: 100 + Math.round(cos * 90),
                transform: `translate(-50%, -50%) translate3d(calc(${sin.toFixed(4)} * var(--rx)), calc(${cos.toFixed(4)} * var(--ry)), 0) scale(${scale.toFixed(3)})`,
                opacity,
                filter: blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : undefined,
                transition:
                  'transform 720ms cubic-bezier(0.22, 1, 0.36, 1), opacity 720ms ease, filter 720ms ease',
              }}
            >
              <span
                className="holo-corner relative flex flex-col gap-1.5 px-2.5 py-2.5 text-left"
                style={{
                  border: `1px solid color-mix(in oklab, var(--accent) ${isSel ? 78 : 30}%, transparent)`,
                  background: isSel
                    ? 'linear-gradient(155deg, color-mix(in oklab, var(--accent) 26%, transparent), color-mix(in oklab, var(--shell) 86%, transparent))'
                    : 'color-mix(in oklab, var(--shell) 74%, transparent)',
                  boxShadow: isSel
                    ? '0 0 0 1px color-mix(in oklab, var(--accent) 30%, transparent), 0 18px 48px -14px var(--accent), inset 0 0 34px -12px var(--accent)'
                    : '0 10px 30px -22px var(--accent)',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 400ms ease, box-shadow 400ms ease, background 400ms ease',
                }}
              >
                <span className="flex items-center justify-between gap-2">
                  <Icon
                    className="size-4 shrink-0"
                    strokeWidth={1.7}
                    style={{
                      color: isSel ? 'var(--hud)' : 'color-mix(in oklab, var(--accent) 72%, transparent)',
                      filter: isSel ? 'drop-shadow(0 0 8px var(--accent))' : 'drop-shadow(0 0 3px var(--accent))',
                    }}
                  />
                  <span
                    className="font-display text-[9px] tracking-[0.2em]"
                    style={{ color: 'color-mix(in oklab, var(--accent) 62%, transparent)' }}
                  >
                    {pad(i)}
                  </span>
                </span>
                <span
                  className="font-display text-[10.5px] leading-tight font-semibold tracking-wide text-pretty"
                  style={{
                    color: isSel ? 'var(--hud)' : 'color-mix(in oklab, var(--accent) 55%, oklch(0.86 0.01 240))',
                    textShadow: isSel ? '0 0 14px color-mix(in oklab, var(--accent) 60%, transparent)' : undefined,
                  }}
                >
                  {item.name}
                </span>
                {isSel && (
                  <span
                    aria-hidden
                    className="absolute inset-x-2 -bottom-px h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
                  />
                )}
              </span>
              <span className="sr-only">
                {kindLabel} {pad(i)}: {item.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
