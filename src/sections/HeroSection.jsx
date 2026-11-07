import { motion, useReducedMotion } from 'motion/react'
import { content } from '../config/content'
import { photos } from '../config/photos'
import PhotoCard from '../components/PhotoCard'
import FloatingPetals from '../components/FloatingPetals'
import ScrollIndicator from '../components/ScrollIndicator'
import { BlossomSprig, FloralSlot, RoseCluster } from '../components/FloralDecorations'

const ease = [0.23, 1, 0.32, 1]

export default function HeroSection() {
  const reduce = useReducedMotion()
  const { hero } = content

  // One orchestrated entrance: words first, then photographs, then flowers.
  const rise = (delay, y = 18) => ({
    initial: { opacity: 0, y: reduce ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.4 : 1.1, delay: reduce ? 0 : delay, ease },
  })
  const photoIn = (delay, rotate) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28, rotate: reduce ? rotate : rotate - 4, scale: reduce ? 1 : 0.96 },
    animate: { opacity: 1, y: 0, rotate, scale: 1 },
    transition: { duration: reduce ? 0.4 : 1.3, delay: reduce ? 0 : delay, ease },
  })
  const bloom = (delay) => ({
    initial: { opacity: 0, scale: reduce ? 1 : 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: reduce ? 0.4 : 1.6, delay: reduce ? 0 : delay, ease },
  })

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-snow"
    >
      {/* soft light washes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 82% 20%, rgba(248,220,232,0.55), transparent 70%), radial-gradient(50% 45% at 8% 92%, rgba(252,238,244,0.9), transparent 70%)',
        }}
      />
      <FloatingPetals count={14} seed={3} className="-z-10" />

      {/* corner florals */}
      <motion.div {...bloom(0.9)} className="pointer-events-none absolute -top-6 -left-8 w-40 origin-top-left sm:w-56 lg:-top-4 lg:-left-6 lg:w-72">
        <FloralSlot src={photos.decorations.heroCornerTop} className="w-full">
          <RoseCluster className="w-full" />
        </FloralSlot>
      </motion.div>
      <motion.div
        {...bloom(1.1)}
        className="pointer-events-none absolute -right-8 -bottom-6 w-40 origin-bottom-right sm:w-56 lg:-right-6 lg:w-72"
      >
        <FloralSlot src={photos.decorations.heroCornerBottom} className="w-full">
          <RoseCluster className="w-full rotate-180" />
        </FloralSlot>
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-12 px-6 pt-28 pb-32 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-24">
        {/* words */}
        <div className="text-center lg:col-span-6 lg:text-left">
          <motion.p {...rise(0.15)} className="type-display">
            {hero.greeting}
          </motion.p>
          <motion.h1 id="hero-title" {...rise(0.35, 24)} className="type-script-xl mt-1 -ml-1 text-balance lg:mt-2">
            {hero.name}
          </motion.h1>
          <motion.div
            {...rise(0.7, 10)}
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-rose to-transparent lg:mx-0 lg:from-rose lg:via-rose/60"
          />
          <motion.p {...rise(0.8, 12)} className="type-lede mx-auto mt-6 max-w-[30ch] text-pretty lg:mx-0">
            {hero.subtitle}
          </motion.p>
        </div>

        {/* photographs */}
        <div className="relative mx-auto w-[min(84vw,25rem)] lg:col-span-6 lg:mr-0 lg:ml-auto lg:w-[min(40vw,30rem)]">
          <motion.div {...photoIn(0.55, 0)} className="ml-auto w-[68%]">
            <PhotoCard photo={photos.hero.main} frame="arch" eager sizes="(min-width:1024px) 20rem, 60vw" />
          </motion.div>

          <motion.div {...photoIn(0.85, -6)} className="absolute -bottom-[8%] left-0 w-[44%]">
            <PhotoCard photo={photos.hero.secondary} frame="polaroid" eager sizes="12rem" />
          </motion.div>

          <motion.div {...photoIn(1.05, 5)} className="absolute top-[4%] left-[6%] w-[23%]">
            <PhotoCard photo={photos.hero.decoration} frame="oval" eager sizes="7rem" />
          </motion.div>

          <motion.div {...bloom(1.3)} className="pointer-events-none absolute -top-[14%] -left-[14%] w-[52%]" aria-hidden="true">
            <BlossomSprig className="w-full" />
          </motion.div>
        </div>
      </div>

      <motion.div {...rise(1.6, 0)} className="absolute inset-x-0 bottom-5 flex justify-center">
        <ScrollIndicator label={hero.scrollLabel} target="#memories" />
      </motion.div>
    </section>
  )
}
