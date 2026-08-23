'use client'

/**
 * Deterministic, GPU-cheap ambient layer: a sparse star grid plus a handful of
 * rising motes. Values are precomputed from a seeded LCG so SSR and client
 * markup match and no work happens on the main thread at runtime.
 */

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const rand = seeded(20260823)

const STARS = Array.from({ length: 46 }, () => ({
  left: rand() * 100,
  top: rand() * 100,
  size: 1 + Math.round(rand()),
  opacity: 0.18 + rand() * 0.45,
  delay: rand() * 6,
}))

const MOTES = Array.from({ length: 16 }, () => ({
  left: 8 + rand() * 84,
  drift: Math.round(rand() * 60 - 30),
  dur: 7 + rand() * 7,
  delay: rand() * 9,
  size: 2 + Math.round(rand() * 2),
}))

export function ParticleField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map((s, i) => (
        <span
          key={`s${i}`}
          className="absolute rounded-full anim-pulse-glow"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            background: 'var(--hud)',
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-2/3">
        {MOTES.map((m, i) => (
          <span
            key={`m${i}`}
            className="absolute bottom-0 rounded-full anim-rise"
            style={
              {
                left: `${m.left}%`,
                width: m.size,
                height: m.size,
                background: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent)',
                '--drift': `${m.drift}px`,
                '--dur': `${m.dur}s`,
                '--delay': `${m.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  )
}
