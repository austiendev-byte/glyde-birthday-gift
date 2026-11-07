/**
 * Hand-drawn SVG florals: cherry blossoms, garden roses, leaves and branches.
 * Everything is decorative (aria-hidden) and scales with its container.
 */

const PETAL = 'M0 0C-5.2-4-6.4-11-2.2-14.4L0-12.2 2.2-14.4C6.4-11 5.2-4 0 0Z'

export function Blossom({ x = 0, y = 0, size = 1, rotate = 0, tone = 'light' }) {
  const fill = tone === 'deep' ? '#EBA8C5' : tone === 'white' ? '#FFFDFD' : '#F8DCE8'
  const vein = tone === 'deep' ? '#D98DAF' : '#EBA8C5'
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
      {[0, 72, 144, 216, 288].map((r) => (
        <g key={r} transform={`rotate(${r})`}>
          <path d={PETAL} fill={fill} stroke={vein} strokeWidth="0.5" />
          <path d="M0-1.5V-9" stroke={vein} strokeWidth="0.45" strokeLinecap="round" opacity="0.7" />
        </g>
      ))}
      <circle r="2.6" fill="#874B63" opacity="0.85" />
      {[20, 92, 164, 236, 308].map((r) => (
        <circle key={r} cx={Math.cos((r * Math.PI) / 180) * 4.2} cy={Math.sin((r * Math.PI) / 180) * 4.2} r="0.75" fill="#874B63" />
      ))}
    </g>
  )
}

export function Bud({ x = 0, y = 0, size = 1, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
      <path d="M0 0C-3.4-3-3.6-8 0-11 3.6-8 3.4-3 0 0Z" fill="#EBA8C5" />
      <path d="M0 1.5C-2 0-2.6-2 -2.2-3.4L0-1.8 2.2-3.4C2.6-2 2 0 0 1.5Z" fill="#B9C9B1" />
    </g>
  )
}

export function Leaf({ x = 0, y = 0, size = 1, rotate = 0, tone = 'sage' }) {
  const fill = tone === 'rose' ? '#F8DCE8' : '#B9C9B1'
  const vein = tone === 'rose' ? '#EBA8C5' : '#9DB295'
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
      <path d="M0 0C6-6 18-7 26 0 18 7 6 6 0 0Z" fill={fill} />
      <path d="M1 0H24" stroke={vein} strokeWidth="0.7" strokeLinecap="round" />
    </g>
  )
}

/** A soft garden rose built from layered petals, seen from above. */
export function Rose({ x = 0, y = 0, size = 1, rotate = 0, tone = 'soft' }) {
  const outer = tone === 'deep' ? '#E39BBB' : tone === 'pale' ? '#FCEEF4' : '#F2BCD3'
  const mid = tone === 'deep' ? '#EBA8C5' : tone === 'pale' ? '#F8DCE8' : '#F8DCE8'
  const line = tone === 'deep' ? '#B76A8B' : '#D88FAF'
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}>
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <path key={r} transform={`rotate(${r})`} d="M0-4C-7-6-12-13-6-17.5 0-21 6-18.5 7.5-14 9.5-9 5.5-4.5 0-4Z" fill={outer} stroke={line} strokeWidth="0.5" />
      ))}
      <circle r="11.5" fill={mid} />
      <path d="M-9.5 2.5C-8 8.5-2 10.5 3 9.5 7.5 8.5 10 5 10 1" fill="none" stroke={line} strokeWidth="0.75" strokeLinecap="round" opacity="0.9" />
      <path d="M-7.5-1.5C-7.5-7 -3-9.5 1.5-9 6-8.5 8.5-5 8-1" fill="none" stroke={line} strokeWidth="0.75" strokeLinecap="round" opacity="0.9" />
      <path d="M-5 3C-5.5-1.5-3-4.5 0.5-4.5S5.5-2 5 1.5C4.5 4.5 1.5 5.5-1 4.5" fill="none" stroke={line} strokeWidth="0.75" strokeLinecap="round" opacity="0.9" />
      <path d="M-1.8 0.8C-1.8-1 -0.6-1.9 0.8-1.6S2.4 0 1.6 1" fill="none" stroke={line} strokeWidth="0.75" strokeLinecap="round" opacity="0.9" />
    </g>
  )
}

/** A curved cherry-blossom branch. `flip` mirrors it horizontally. */
export function BlossomSprig({ className = '', flip = false, style }) {
  return (
    <svg viewBox="0 0 240 120" className={className} style={style} aria-hidden="true" focusable="false">
      <g transform={flip ? 'translate(240 0) scale(-1 1)' : undefined}>
        <path d="M4 112C40 96 70 70 112 58S190 36 236 10" fill="none" stroke="#B48A98" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M84 72C92 56 96 44 94 30" fill="none" stroke="#B48A98" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M150 48C160 60 172 66 186 66" fill="none" stroke="#B48A98" strokeWidth="1.4" strokeLinecap="round" />
        <Leaf x={58} y={86} size={0.8} rotate={-40} />
        <Leaf x={128} y={54} size={0.7} rotate={-120} />
        <Leaf x={204} y={28} size={0.65} rotate={-30} />
        <Blossom x={94} y={28} size={1.05} rotate={12} />
        <Blossom x={40} y={96} size={0.8} rotate={-18} tone="deep" />
        <Blossom x={186} y={66} size={0.95} rotate={30} />
        <Blossom x={226} y={14} size={0.7} rotate={-8} tone="deep" />
        <Blossom x={140} y={50} size={0.6} rotate={50} tone="white" />
        <Bud x={112} y={56} size={0.9} rotate={-20} />
        <Bud x={168} y={42} size={0.8} rotate={20} />
        <Bud x={70} y={78} size={0.7} rotate={-50} />
      </g>
    </svg>
  )
}

/** A loose cluster of roses with leaves and a few blossoms — used in corners. */
export function RoseCluster({ className = '', style, variant = 'a' }) {
  if (variant === 'b') {
    return (
      <svg viewBox="0 0 200 160" className={className} style={style} aria-hidden="true" focusable="false">
        <Leaf x={70} y={96} size={1.5} rotate={160} />
        <Leaf x={120} y={92} size={1.4} rotate={-20} />
        <Leaf x={100} y={70} size={1.1} rotate={-80} />
        <Leaf x={92} y={120} size={1.2} rotate={110} tone="rose" />
        <Rose x={88} y={92} size={1.55} rotate={10} />
        <Rose x={128} y={110} size={1.05} rotate={-30} tone="deep" />
        <Rose x={58} y={118} size={0.85} rotate={40} tone="pale" />
        <Blossom x={140} y={70} size={0.9} rotate={10} />
        <Blossom x={44} y={84} size={0.7} rotate={-20} tone="deep" />
        <Bud x={150} y={128} size={1} rotate={100} />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 220 200" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M0 40C40 52 70 70 96 96" fill="none" stroke="#B48A98" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M40 0C52 34 70 60 96 96" fill="none" stroke="#B48A98" strokeWidth="1.6" strokeLinecap="round" />
      <Leaf x={96} y={96} size={1.6} rotate={20} />
      <Leaf x={96} y={96} size={1.5} rotate={70} />
      <Leaf x={70} y={70} size={1.2} rotate={-10} tone="rose" />
      <Leaf x={60} y={110} size={1.1} rotate={100} />
      <Rose x={96} y={96} size={1.8} rotate={-15} />
      <Rose x={146} y={112} size={1.1} rotate={30} tone="deep" />
      <Rose x={88} y={148} size={1.2} rotate={60} tone="pale" />
      <Rose x={52} y={64} size={0.9} rotate={0} tone="pale" />
      <Blossom x={20} y={44} size={0.9} rotate={10} />
      <Blossom x={44} y={14} size={0.75} rotate={30} tone="deep" />
      <Blossom x={150} y={70} size={0.8} rotate={-10} />
      <Blossom x={128} y={156} size={0.65} rotate={40} tone="deep" />
      <Bud x={176} y={98} size={1.1} rotate={70} />
      <Bud x={110} y={182} size={0.9} rotate={160} />
    </svg>
  )
}

export function HeartMark({ className = '', filled = true }) {
  return (
    <svg viewBox="0 0 24 22" className={className} aria-hidden="true" focusable="false">
      <path
        d="M12 21C5 15.6 1 11.8 1 7.1 1 3.7 3.6 1 6.9 1 9 1 10.9 2.1 12 3.9 13.1 2.1 15 1 17.1 1 20.4 1 23 3.7 23 7.1 23 11.8 19 15.6 12 21Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.4}
      />
    </svg>
  )
}

/** Renders custom artwork from config when provided, otherwise the built-in florals. */
export function FloralSlot({ src, className, children }) {
  if (src) return <img src={src} alt="" aria-hidden="true" className={className} loading="lazy" decoding="async" />
  return children
}
