import { memo, useMemo } from 'react'

// Deterministic pseudo-random so petals don't jump between renders.
const rand = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const COLORS = ['#F8DCE8', '#EBA8C5', '#FCEEF4', '#F2BCD3']

/** Slow falling petals. Pure CSS animation; hidden for reduced motion. */
function FloatingPetals({ count = 14, seed = 1, className = '' }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (n) => rand(seed * 100 + i * 7 + n)
        return {
          x: `${Math.round(r(1) * 100)}%`,
          size: `${10 + Math.round(r(2) * 12)}px`,
          dur: `${14 + Math.round(r(3) * 12)}s`,
          delay: `${-Math.round(r(4) * 24)}s`,
          drift: `${Math.round((r(5) - 0.5) * 220)}px`,
          spin: `${Math.round(180 + r(6) * 360)}deg`,
          alpha: (0.55 + r(7) * 0.4).toFixed(2),
          color: COLORS[i % COLORS.length],
        }
      }),
    [count, seed],
  )

  return (
    <div className={`petal-layer ${className}`} aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            '--x': p.x,
            '--size': p.size,
            '--dur': p.dur,
            '--delay': p.delay,
            '--drift': p.drift,
            '--spin': p.spin,
            '--alpha': p.alpha,
          }}
        >
          <svg viewBox="-8 -12 16 14">
            <path d="M0 0C-5.2-4-6.4-11-2.2-14.4L0-12.2 2.2-14.4C6.4-11 5.2-4 0 0Z" transform="translate(0 2)" fill={p.color} />
          </svg>
        </span>
      ))}
    </div>
  )
}

export default memo(FloatingPetals)
