import { memo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { content } from '../config/content'
import { photos } from '../config/photos'
import { Placeholder } from '../components/PhotoCard'
import { BlossomSprig, HeartMark } from '../components/FloralDecorations'

const ease = [0.23, 1, 0.32, 1]

// Editorial rhythm: a repeating pattern of slight tilts, heights and corner styles.
const RHYTHM = [
  { rotate: -1.2, height: '100%', round: true },
  { rotate: 0, height: '86%', round: false },
  { rotate: 0.9, height: '94%', round: true },
  { rotate: 0, height: '100%', round: false },
  { rotate: -0.7, height: '88%', round: true },
]

export default function MemoriesSection() {
  const reduce = useReducedMotion()
  const { memories } = content

  return (
    <section id="memories" aria-labelledby="memories-title" className="relative overflow-hidden bg-snow py-20 sm:py-28">
      <BlossomSprig className="pointer-events-none absolute -top-2 -left-10 w-48 opacity-90 sm:w-64" />
      <BlossomSprig flip className="pointer-events-none absolute -right-10 -bottom-2 w-48 rotate-180 opacity-90 sm:w-64" />

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: reduce ? 0.4 : 1.2, ease }}
      >
        <MarqueeRow items={photos.gallery.row1} direction="left" duration={70} tall />

        {/* heading floats between the rows */}
        <div className="relative z-10 -my-3 px-6 text-center sm:-my-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[150%] max-w-3xl -translate-y-1/2"
            style={{ background: 'radial-gradient(closest-side, rgba(255,253,253,0.97) 55%, rgba(255,253,253,0))' }}
          />
          <div className="flex items-center justify-center gap-3 text-rose" aria-hidden="true">
            <HeartMark className="h-3 w-3" />
            <HeartMark className="h-2 w-2 text-blush" />
            <HeartMark className="h-3 w-3" />
          </div>
          <h2 id="memories-title" className="type-script-lg mt-2 text-balance">
            {memories.heading}
          </h2>
          <p className="type-lede mx-auto mt-2 max-w-[34ch] text-pretty">{memories.message}</p>
        </div>

        <MarqueeRow items={photos.gallery.row2} direction="right" duration={80} />
      </motion.div>
    </section>
  )
}

const MarqueeRow = memo(function MarqueeRow({ items, direction, duration, tall = false }) {
  const height = tall ? 'h-44 sm:h-60 lg:h-72' : 'h-40 sm:h-52 lg:h-64'
  return (
    <div className="marquee py-4" role="list" aria-label="Photographs of us">
      <div
        className={`marquee-track items-center ${height}`}
        data-direction={direction}
        style={{ '--marquee-dur': `${duration}s` }}
      >
        {items.map((p, i) => (
          <Tile key={p.file} photo={p} index={i + (tall ? 0 : 2)} />
        ))}
        {/* duplicate set for a seamless loop — hidden from assistive tech */}
        {items.map((p, i) => (
          <Tile key={`${p.file}-clone`} photo={p} index={i + (tall ? 0 : 2)} clone />
        ))}
      </div>
    </div>
  )
})

const Tile = memo(function Tile({ photo, index, clone = false }) {
  const [failed, setFailed] = useState(false)
  const r = RHYTHM[index % RHYTHM.length]
  return (
    <figure
      role={clone ? undefined : 'listitem'}
      aria-hidden={clone || undefined}
      data-clone={clone || undefined}
      className="group relative shrink-0 scroll-mx-4 snap-center"
      style={{ height: r.height, aspectRatio: photo.aspect, rotate: `${r.rotate}deg` }}
    >
      <div
        className={`relative h-full w-full overflow-hidden bg-mist transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.04] ${
          r.round ? 'rounded-[10px]' : 'rounded-[2px]'
        }`}
      >
        {!failed ? (
          <img
            src={photo.src}
            alt={clone ? '' : photo.alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: photo.focus || 'center' }}
          />
        ) : (
          <Placeholder fileName={photo.file} />
        )}
      </div>
      {photo.caption ? (
        <figcaption className="type-caption absolute bottom-2 left-2 rounded-[3px] bg-snow/92 px-2.5 py-1 text-[1.1rem] shadow-sm">
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  )
})
