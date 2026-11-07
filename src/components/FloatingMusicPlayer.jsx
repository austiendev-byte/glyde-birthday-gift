import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { music } from '../config/music'
import { MusicIcon, PauseIcon, PlayIcon } from './Icons'

/**
 * Floating, optional background music. Never forces sound:
 * it tries once (if allowed) and otherwise invites a tap.
 */
export default function FloatingMusicPlayer() {
  const audioRef = useRef(null)
  const [available, setAvailable] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = music.volume

    const onPlay = () => {
      setPlaying(true)
      setShowHint(false)
    }
    const onPause = () => setPlaying(false)
    const onError = () => setAvailable(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)

    let hintTimer
    if (music.tryAutoplay) {
      audio.play().catch(() => {
        // Autoplay blocked (normal). Offer a gentle invitation instead.
        setShowHint(true)
        hintTimer = setTimeout(() => setShowHint(false), 9000)
      })
    }

    return () => {
      clearTimeout(hintTimer)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => setAvailable(false))
    else audio.pause()
  }

  return (
    <>
      <audio ref={audioRef} src={music.file} loop={music.loop} preload="metadata" />
      {available ? (
        <div
          className="fixed z-50 flex items-center gap-3"
          style={{
            right: 'max(1rem, env(safe-area-inset-right))',
            bottom: 'max(1rem, env(safe-area-inset-bottom))',
          }}
        >
          <AnimatePresence>
            {showHint && !playing ? (
              <motion.button
                type="button"
                onClick={toggle}
                initial={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 6, transition: { duration: 0.18 } }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="pressable rounded-full border border-blush bg-snow/95 px-4 py-2 font-serif text-[1.02rem] italic text-ink shadow-[0_10px_30px_-12px_rgba(135,75,99,0.4)] backdrop-blur"
              >
                Tap to play our song
              </motion.button>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? `Pause ${music.title}` : `Play ${music.title}`}
            className="pressable group flex h-14 items-center gap-3 rounded-full border border-blush bg-snow/95 py-2 pr-2 pl-4 shadow-[0_14px_36px_-14px_rgba(135,75,99,0.45)] backdrop-blur"
          >
            <span className="flex items-center gap-2 text-dusty">
              <MusicIcon className="h-4 w-4" />
              <span className="hidden text-left sm:block">
                <span className="block font-serif text-[1.02rem] leading-none italic text-ink">{music.title}</span>
                <span className="mt-1 block font-sans text-[0.62rem] tracking-wide text-dusty/80">
                  {playing ? 'Now playing' : music.artist || 'Our song'}
                </span>
              </span>
              <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`w-[3px] rounded-full bg-rose ${playing ? 'eq-bar h-full' : 'h-1'}`}
                  />
                ))}
              </span>
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dusty text-snow transition-colors group-hover:bg-[#764055]">
              {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="ml-0.5 h-4 w-4" />}
            </span>
          </button>
        </div>
      ) : null}
    </>
  )
}
