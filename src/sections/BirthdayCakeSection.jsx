import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { content } from '../config/content'
import { photos } from '../config/photos'
import Cake from '../components/Cake'
import Celebration from '../components/Celebration'
import FloatingPetals from '../components/FloatingPetals'
import PhotoCard from '../components/PhotoCard'
import { ReplayIcon } from '../components/Icons'
import { BlossomSprig, RoseCluster } from '../components/FloralDecorations'

const ease = [0.23, 1, 0.32, 1]

export default function BirthdayCakeSection() {
  const reduce = useReducedMotion()
  const { cake } = content
  const [lit, setLit] = useState(true)
  const [burst, setBurst] = useState(0)

  const blowOut = () => {
    if (!lit) return
    setLit(false)
    setBurst((n) => n + 1)
  }

  const relight = () => setLit(true)

  return (
    <section
      id="cake"
      aria-labelledby="cake-title"
      className="relative isolate overflow-hidden bg-snow pt-20 pb-32 sm:pt-28 sm:pb-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(55% 45% at 50% 52%, rgba(248,220,232,0.6), rgba(255,253,253,0) 72%)' }}
      />
      {!lit ? <FloatingPetals count={18} seed={9} className="-z-10" /> : null}

      <header className="px-6 text-center">
        <h2 id="cake-title" className="type-script-lg text-balance">
          {cake.heading}
        </h2>
        <p className="type-lede mx-auto mt-2 max-w-[34ch] text-pretty">{cake.message}</p>
      </header>

      {/* cake flanked by two photographs */}
      <div className="relative mx-auto mt-10 grid max-w-5xl grid-cols-1 items-center gap-6 px-6 sm:mt-14 md:grid-cols-[1fr_minmax(0,22rem)_1fr] md:gap-10">
        <div className="hidden justify-end md:flex">
          <PhotoCard photo={photos.cake.left} frame="polaroid" rotate={-6} className="w-44 lg:w-52" sizes="13rem" />
        </div>

        <div className="relative mx-auto w-[min(80vw,21rem)]">
          <BlossomSprig className="pointer-events-none absolute -top-6 -left-16 w-40 opacity-90" />
          <BlossomSprig flip className="pointer-events-none absolute -top-6 -right-16 w-40 opacity-90" />

          <motion.button
            type="button"
            onClick={blowOut}
            disabled={!lit}
            aria-label={lit ? cake.button : 'The candles are out'}
            initial={{ opacity: 0, y: reduce ? 0 : 30, scale: reduce ? 1 : 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduce ? 0.4 : 1.1, ease }}
            className={`relative block w-full rounded-[2rem] ${lit ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Cake lit={lit} />
          </motion.button>

          {burst > 0 && !reduce ? <Celebration key={burst} /> : null}
        </div>

        <div className="hidden justify-start md:flex">
          <PhotoCard photo={photos.cake.right} frame="polaroid" rotate={5} className="w-44 lg:w-52" sizes="13rem" />
        </div>
      </div>

      {/* prompt → final message */}
      <div className="relative mx-auto mt-8 max-w-3xl px-6 text-center">
        <AnimatePresence mode="wait" initial={false}>
          {lit ? (
            <motion.div
              key="wish"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col items-center"
            >
              <p className="type-script-md">{cake.prompt}</p>
              <p className="mt-2 max-w-[36ch] font-serif text-lg text-ink/85 italic">{cake.instruction}</p>
              <button
                type="button"
                onClick={blowOut}
                className="pressable mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-dusty px-7 py-3 font-sans text-[0.82rem] font-medium tracking-wide text-snow shadow-[0_14px_30px_-12px_rgba(135,75,99,0.6)] hover:bg-[#764055]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 3C9 7 8 9 8 11.5a4 4 0 0 0 8 0C16 9 15 7 12 3Z" fill="currentColor" />
                  <path d="M12 16v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                {cake.button}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.4 : 1.2, delay: reduce ? 0 : 0.9, ease }}
              className="relative"
            >
              <div className="relative px-4 py-10 sm:px-16">
                <RoseCluster className="pointer-events-none absolute -top-10 -left-10 w-28 sm:-left-16 sm:w-40" />
                <RoseCluster className="pointer-events-none absolute -right-10 -bottom-12 w-28 rotate-180 sm:-right-16 sm:w-40" />
                <div className="space-y-4">
                  {cake.finalMessage.map((line, i) => (
                    <p key={i} className={i === 0 ? 'type-lede text-pretty' : 'type-display text-balance'}>
                      {line}
                    </p>
                  ))}
                </div>
                <p className="type-script-md mt-8">{cake.signature}</p>
              </div>

              <div className="mt-10 flex justify-center gap-4 md:hidden">
                <PhotoCard photo={photos.cake.left} frame="polaroid" rotate={-5} className="w-36" sizes="9rem" />
                <PhotoCard photo={photos.cake.right} frame="polaroid" rotate={4} className="w-36" sizes="9rem" />
              </div>

              <button
                type="button"
                onClick={relight}
                className="pressable mt-10 inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 font-sans text-[0.75rem] font-medium tracking-wide text-dusty/80 hover:text-dusty"
              >
                <ReplayIcon className="h-3.5 w-3.5" />
                {cake.replay}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
