import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { content } from '../config/content'
import { photos } from '../config/photos'
import PhotoCard from '../components/PhotoCard'
import { BlossomSprig, HeartMark, RoseCluster } from '../components/FloralDecorations'

const ease = [0.23, 1, 0.32, 1]
const easeInOut = [0.77, 0, 0.175, 1]

// sealed → opening (flap lifts) → rising (letter slides out) → open (letter shown)
const TIMELINE = { opening: 600, rising: 1500, open: 2900 }

export default function LoveLetterSection() {
  const reduce = useReducedMotion()
  const { letter } = content
  const stageRef = useRef(null)
  const inView = useInView(stageRef, { once: true, amount: 0.55 })
  const [stage, setStage] = useState(reduce ? 'open' : 'sealed')
  const timers = useRef([])

  const play = (from = 0) => {
    timers.current.forEach(clearTimeout)
    timers.current = [
      setTimeout(() => setStage('opening'), Math.max(0, TIMELINE.opening - from)),
      setTimeout(() => setStage('rising'), Math.max(0, TIMELINE.rising - from)),
      setTimeout(() => setStage('open'), Math.max(0, TIMELINE.open - from)),
    ]
  }

  useEffect(() => {
    if (reduce) setStage('open')
  }, [reduce])

  useEffect(() => {
    if (inView && !reduce && stage === 'sealed') play()
    return () => timers.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce])

  return (
    <section
      id="letter"
      aria-labelledby="letter-title"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: 'linear-gradient(180deg, #FFFDFD 0%, #FFF9F7 18%, #FCEEF4 62%, #FFFDFD 100%)' }}
    >
      <header className="relative z-10 px-6 text-center">
        <h2 id="letter-title" className="type-script-lg text-balance">
          {letter.heading}
        </h2>
        <p className="type-lede mx-auto mt-2 max-w-[32ch] text-pretty">{letter.message}</p>
      </header>

      <div ref={stageRef} className="relative mx-auto mt-12 max-w-5xl px-5 sm:mt-16 sm:px-8">
        <AnimatePresence mode="wait" initial={false}>
          {stage !== 'open' ? (
            <motion.div
              key="envelope"
              exit={{ opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.5, ease } }}
              className="flex min-h-[26rem] flex-col items-center justify-center"
            >
              <Envelope
                stage={stage}
                salutation={letter.salutation}
                onOpen={() => stage === 'sealed' && play(TIMELINE.opening)}
              />
              <motion.p
                animate={{ opacity: stage === 'sealed' ? 1 : 0 }}
                className="mt-8 font-serif text-lg text-dusty/90 italic"
              >
                {letter.openHint}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: reduce ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.4 : 1, ease }}
            >
              <LetterSpread reduce={reduce} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function Envelope({ stage, salutation, onOpen }) {
  const flapOpen = stage !== 'sealed'
  const letterOut = stage === 'rising'

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label="Open the letter"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease }}
      className="pressable relative mt-16 block aspect-[3/2] w-[min(82vw,22rem)] cursor-pointer [perspective:900px]"
    >
      {/* back of the envelope */}
      <span className="absolute inset-0 rounded-[6px] bg-[#F3CADB] shadow-[0_30px_60px_-28px_rgba(135,75,99,0.55)]" />

      {/* the letter inside */}
      <motion.span
        className="absolute inset-x-[7%] top-[6%] z-10 flex h-[86%] flex-col items-start gap-2 rounded-[3px] bg-ivory px-[9%] pt-[9%] text-left shadow-sm"
        animate={{ y: letterOut ? '-58%' : '0%' }}
        transition={{ duration: 1.1, ease: easeInOut }}
      >
        <span className="font-script text-[1.35rem] leading-none text-dusty">{salutation}</span>
        <span className="mt-1 h-px w-[85%] bg-blush" />
        <span className="h-px w-[70%] bg-blush" />
        <span className="h-px w-[78%] bg-blush" />
      </motion.span>

      {/* front pocket */}
      <svg viewBox="0 0 300 200" className="absolute inset-0 z-20 h-full w-full" aria-hidden="true">
        <path d="M0 0 L150 112 L0 200Z" fill="#F8DCE8" />
        <path d="M300 0 L150 112 L300 200Z" fill="#F6D3E1" />
        <path d="M0 200 L150 100 L300 200Z" fill="#FCE4EE" />
        <path d="M0 200 L150 100 L300 200" fill="none" stroke="#EBA8C5" strokeWidth="1" />
      </svg>

      {/* top flap */}
      <motion.span
        className="absolute inset-x-0 top-0 h-[60%] origin-top [transform-style:preserve-3d]"
        style={{ zIndex: letterOut ? 5 : 30 }}
        animate={{ rotateX: flapOpen ? 180 : 0 }}
        transition={{ duration: 0.9, ease: easeInOut }}
      >
        <svg viewBox="0 0 300 120" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 H300 L150 116Z" fill="#F1C2D6" />
          <path d="M0 0 L150 116 L300 0" fill="none" stroke="#E7A6C2" strokeWidth="1" />
        </svg>
        {/* wax seal */}
        <motion.span
          animate={{ opacity: flapOpen ? 0 : 1, scale: flapOpen ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[78%] left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-dusty text-blush shadow-[0_4px_10px_rgba(135,75,99,0.45),inset_0_-3px_6px_rgba(0,0,0,0.15)]"
        >
          <HeartMark className="h-5 w-5" />
        </motion.span>
      </motion.span>
    </motion.button>
  )
}

function LetterSpread({ reduce }) {
  const { letter } = content
  const line = (i) => ({
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.3 : 0.9, delay: reduce ? 0 : 0.35 + i * 0.22, ease },
  })

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
      {/* photograph beside the letter */}
      <div className="relative mx-auto w-48 sm:w-56 lg:col-span-4 lg:mx-0 lg:mt-24 lg:w-full lg:max-w-[17rem] lg:justify-self-end">
        <BlossomSprig className="pointer-events-none absolute -top-12 -left-10 z-10 w-40" />
        <PhotoCard photo={photos.letters.beside} frame="polaroid" rotate={-4} sizes="17rem" />
      </div>

      {/* the letter */}
      <article className="relative lg:col-span-8">
        <RoseCluster variant="b" className="pointer-events-none absolute -top-14 -right-6 z-10 w-36 sm:-top-16 sm:-right-10 sm:w-48" />
        <BlossomSprig flip className="pointer-events-none absolute -bottom-10 -left-8 z-10 w-40 rotate-180 sm:w-52" />

        <div className="paper-grain relative rounded-[4px] bg-ivory px-7 py-12 shadow-[0_40px_80px_-40px_rgba(135,75,99,0.45),0_2px_8px_rgba(135,75,99,0.06)] sm:px-14 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[2px] border border-blush sm:inset-4" />

          <motion.p {...line(0)} className="font-script text-[2.1rem] leading-tight text-dusty sm:text-[2.5rem]">
            {letter.salutation}
          </motion.p>

          <div className="type-letter mt-6 max-w-[60ch] space-y-5 text-pretty">
            {letter.paragraphs.map((p, i) => (
              <motion.p key={i} {...line(i + 1)}>
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div {...line(letter.paragraphs.length + 1)} className="mt-10 flex items-end justify-between gap-6">
            <div>
              <p className="font-serif text-xl text-ink italic">{letter.closing}</p>
              <p className="type-script-md mt-1">{letter.signature}</p>
            </div>
            <PhotoCard photo={photos.letters.signature} frame="mat" rotate={5} className="w-20 shrink-0 sm:w-28" sizes="7rem" />
          </motion.div>
        </div>
      </article>
    </div>
  )
}
