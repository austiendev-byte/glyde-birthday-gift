import { memo, useMemo } from 'react'
import { motion } from 'motion/react'

const rand = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

const KINDS = ['petal', 'petal', 'heart', 'sparkle', 'petal', 'sparkle']
const COLORS = ['#EBA8C5', '#F8DCE8', '#F2BCD3', '#874B63', '#FCEEF4']

function Shape({ kind, color }) {
  if (kind === 'heart')
    return (
      <svg viewBox="0 0 24 22" className="h-full w-full">
        <path d="M12 21C5 15.6 1 11.8 1 7.1 1 3.7 3.6 1 6.9 1 9 1 10.9 2.1 12 3.9 13.1 2.1 15 1 17.1 1 20.4 1 23 3.7 23 7.1 23 11.8 19 15.6 12 21Z" fill={color} />
      </svg>
    )
  if (kind === 'sparkle')
    return (
      <svg viewBox="-10 -10 20 20" className="h-full w-full">
        <path d="M0-10C1-3 3-1 10 0 3 1 1 3 0 10-1 3-3 1-10 0-3-1-1-3 0-10Z" fill="#FFE3A3" />
      </svg>
    )
  return (
    <svg viewBox="-8 -16 16 18" className="h-full w-full">
      <path d="M0 0C-5.2-4-6.4-11-2.2-14.4L0-12.2 2.2-14.4C6.4-11 5.2-4 0 0Z" fill={color} />
    </svg>
  )
}

/** A one-time burst of petals, hearts and sparkles from the cake. */
function Celebration({ count = 42 }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = rand(i + 1) * Math.PI * 2
        const dist = 120 + rand(i + 7) * 260
        return {
          kind: KINDS[i % KINDS.length],
          color: COLORS[i % COLORS.length],
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist * 0.75 - 90,
          fall: 140 + rand(i + 3) * 160,
          size: 10 + rand(i + 11) * 14,
          rotate: (rand(i + 5) - 0.5) * 540,
          delay: rand(i + 13) * 0.25,
          dur: 2.2 + rand(i + 17) * 1.4,
        }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" aria-hidden="true">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ width: b.size, height: b.size }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.6, rotate: 0 }}
          animate={{
            x: [0, b.x, b.x * 1.08],
            y: [0, b.y, b.y + b.fall],
            opacity: [0, 1, 0],
            scale: [0.6, 1, 0.9],
            rotate: [0, b.rotate * 0.6, b.rotate],
          }}
          transition={{ duration: b.dur, delay: b.delay, ease: [0.23, 1, 0.32, 1], times: [0, 0.35, 1] }}
        >
          <Shape kind={b.kind} color={b.color} />
        </motion.span>
      ))}
    </div>
  )
}

export default memo(Celebration)
