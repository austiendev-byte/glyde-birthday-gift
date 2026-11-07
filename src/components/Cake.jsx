import { memo } from 'react'
import { Blossom, Leaf, Rose } from './FloralDecorations'

/**
 * A two-tier celebration cake drawn in SVG with soft 3D shading:
 * white frosting with drips, pearl borders, a blush ribbon, pink roses and
 * three tall candles. `lit` toggles flames ↔ smoke.
 */

const CANDLES = [134, 160, 186]

// Points along the front half of an ellipse, left → right.
const arc = (cx, cy, rx, ry, from = 180, to = 360, step = 10) => {
  const pts = []
  for (let a = from; a <= to; a += step) {
    const t = (a * Math.PI) / 180
    pts.push([cx + rx * Math.cos(t), cy - ry * Math.sin(t)])
  }
  return pts
}

// Frosting edge that follows the tier's front rim with soft drips.
function dripPath(cx, cy, rx, ry, drips) {
  const pts = arc(cx, cy, rx, ry, 180, 360, 6)
  let d = `M${cx - rx} ${cy - 4} `
  d += `A${rx} ${ry} 0 0 1 ${cx + rx} ${cy - 4} `
  d += `L${cx + rx} ${cy} `
  for (let i = pts.length - 1; i > 0; i--) {
    const [x1, y1] = pts[i]
    const [x0, y0] = pts[i - 1]
    const len = drips[i % drips.length]
    if (len > 0) {
      const mx = (x0 + x1) / 2
      const my = Math.max(y0, y1)
      d += `L${x1} ${y1} C${x1} ${my + len * 0.6} ${mx + 3.2} ${my + len} ${mx} ${my + len} `
      d += `C${mx - 3.2} ${my + len} ${x0} ${my + len * 0.6} ${x0} ${y0} `
    } else {
      d += `L${x0} ${y0} `
    }
  }
  return d + 'Z'
}

const pearls = (cx, cy, rx, ry, step) =>
  arc(cx, cy, rx, ry, 186, 354, step).map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.3" fill="url(#pearl)" />)

function Cake({ lit }) {
  return (
    <svg viewBox="0 0 320 360" className="h-auto w-full overflow-visible" role="img" aria-label="A white two-tier birthday cake with pink roses and three candles">
      <defs>
        <linearGradient id="side" x1="0" x2="1">
          <stop offset="0" stopColor="#ECD9E1" />
          <stop offset="0.2" stopColor="#FBF3F6" />
          <stop offset="0.48" stopColor="#FFFFFF" />
          <stop offset="0.78" stopColor="#F8ECF1" />
          <stop offset="1" stopColor="#E4CCD6" />
        </linearGradient>
        <radialGradient id="top" cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F6EAEF" />
        </radialGradient>
        <linearGradient id="ribbon" x1="0" x2="1">
          <stop offset="0" stopColor="#EBB5CC" />
          <stop offset="0.5" stopColor="#F8DCE8" />
          <stop offset="1" stopColor="#E7AFC7" />
        </linearGradient>
        <radialGradient id="pearl" cx="0.35" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EBA8C5" />
        </radialGradient>
        <radialGradient id="flame" cx="0.5" cy="0.75" r="0.75">
          <stop offset="0" stopColor="#FFFBEF" />
          <stop offset="0.45" stopColor="#FFE3A3" />
          <stop offset="1" stopColor="#F5A6C4" />
        </radialGradient>
        <radialGradient id="halo">
          <stop offset="0" stopColor="#FFE6B8" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFE6B8" stopOpacity="0" />
        </radialGradient>
        <pattern id="stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="8" height="8" fill="#FFFDFD" />
          <rect width="3" height="8" fill="#F3B9D0" />
        </pattern>
        <filter id="soft" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* plate */}
      <ellipse cx="160" cy="338" rx="138" ry="14" fill="#874B63" opacity="0.14" filter="url(#soft)" />
      <ellipse cx="160" cy="328" rx="150" ry="22" fill="#FFF9F7" stroke="#F3D2DF" strokeWidth="1.2" />
      <ellipse cx="160" cy="325" rx="132" ry="16" fill="#FFFDFD" />

      {/* bottom tier */}
      <path d="M50 244 V314 A110 20 0 0 0 270 314 V244 Z" fill="url(#side)" />
      <path d="M50 290 V302 A110 20 0 0 0 270 302 V290 A110 20 0 0 1 50 290 Z" fill="url(#ribbon)" />
      {pearls(160, 314, 110, 20, 9)}
      <ellipse cx="160" cy="244" rx="110" ry="22" fill="url(#top)" />
      <path d={dripPath(160, 244, 110, 22, [0, 14, 0, 9, 18, 0, 11, 0, 16, 7, 0, 13])} fill="#FFFDFD" stroke="#F1E1E8" strokeWidth="0.8" />

      {/* roses on the lower ledge */}
      <Leaf x={70} y={258} size={0.7} rotate={160} />
      <Leaf x={250} y={258} size={0.7} rotate={20} />
      <Rose x={72} y={256} size={0.62} rotate={-10} />
      <Rose x={248} y={256} size={0.62} rotate={20} tone="deep" />
      <Blossom x={96} y={262} size={0.42} tone="deep" />
      <Blossom x={224} y={262} size={0.42} />

      {/* top tier */}
      <path d="M96 166 V238 A64 13 0 0 0 224 238 V166 Z" fill="url(#side)" />
      {pearls(160, 238, 64, 13, 12)}
      <ellipse cx="160" cy="166" rx="64" ry="14" fill="url(#top)" />
      <path d={dripPath(160, 166, 64, 14, [0, 10, 0, 15, 0, 8, 12, 0, 9, 0])} fill="#FFFDFD" stroke="#F1E1E8" strokeWidth="0.8" />

      {/* front rose on the bottom tier */}
      <Leaf x={150} y={272} size={0.55} rotate={150} />
      <Leaf x={170} y={272} size={0.55} rotate={30} />
      <Rose x={160} y={268} size={0.5} tone="pale" />

      {/* candles */}
      {CANDLES.map((x, i) => (
        <g key={x}>
          <rect x={x - 4} y={i === 1 ? 100 : 110} width="8" height={i === 1 ? 66 : 56} rx="2.5" fill="url(#stripes)" stroke="#F1D2DF" strokeWidth="0.6" />
          <path d={`M${x} ${i === 1 ? 100 : 110} v-6`} stroke="#6B4453" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      ))}

      {/* roses on the top tier (in front of the candle bases) */}
      <Leaf x={120} y={172} size={0.5} rotate={170} />
      <Leaf x={200} y={172} size={0.5} rotate={10} />
      <Rose x={124} y={170} size={0.48} tone="deep" />
      <Rose x={196} y={170} size={0.48} />
      <Blossom x={160} y={176} size={0.4} />

      {/* flames or smoke */}
      {CANDLES.map((x, i) => {
        const top = i === 1 ? 94 : 104
        return lit ? (
          <g key={`f${x}`}>
            <circle className="flame-glow" cx={x} cy={top - 12} r="17" fill="url(#halo)" />
            <path className="flame" d={`M${x} ${top} C${x - 6} ${top - 5} ${x - 5.5} ${top - 15} ${x} ${top - 24} C${x + 5.5} ${top - 15} ${x + 6} ${top - 5} ${x} ${top}Z`} fill="url(#flame)" />
            <path d={`M${x} ${top - 2} C${x - 2} ${top - 4} ${x - 2} ${top - 8} ${x} ${top - 12} C${x + 2} ${top - 8} ${x + 2} ${top - 4} ${x} ${top - 2}Z`} fill="#FFFFFF" opacity="0.85" />
          </g>
        ) : (
          <path
            key={`s${x}`}
            className="smoke"
            style={{ animationDelay: `${i * 0.12}s` }}
            d={`M${x} ${top} C${x - 6} ${top - 8} ${x + 6} ${top - 14} ${x} ${top - 22} S${x - 4} ${top - 34} ${x + 2} ${top - 40}`}
            fill="none"
            stroke="#C9B3BD"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export default memo(Cake)
