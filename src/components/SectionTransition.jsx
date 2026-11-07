import { Blossom, Leaf } from './FloralDecorations'

/** A small floral flourish that stitches one section to the next. */
export default function SectionTransition({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-6 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose/70 sm:w-28" />
      <svg viewBox="-40 -16 80 32" className="h-8 w-20">
        <Leaf x={-6} y={4} size={0.9} rotate={175} />
        <Leaf x={6} y={4} size={0.9} rotate={5} />
        <Blossom x={-14} y={2} size={0.55} tone="deep" rotate={-20} />
        <Blossom x={14} y={2} size={0.55} tone="deep" rotate={20} />
        <Blossom x={0} y={0} size={0.85} />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-rose/70 sm:w-28" />
    </div>
  )
}
