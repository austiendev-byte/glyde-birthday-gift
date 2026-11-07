import { memo, useState } from 'react'
import { Blossom } from './FloralDecorations'

/**
 * A photo in a fixed-ratio frame (no layout shift), with a graceful placeholder
 * when the file is missing.
 *
 * frame: 'plain' | 'polaroid' | 'arch' | 'oval' | 'mat'
 */
function PhotoCard({
  photo,
  frame = 'plain',
  rotate = 0,
  eager = false,
  caption,
  className = '',
  imgClassName = '',
  sizes,
}) {
  const [failed, setFailed] = useState(!photo?.src)
  const fileName = photo?.src ? photo.src.split('/').pop() : 'photo'

  const shape =
    frame === 'arch'
      ? 'rounded-t-[999px] rounded-b-[14px]'
      : frame === 'oval'
        ? 'rounded-[50%]'
        : frame === 'polaroid' || frame === 'mat'
          ? 'rounded-[2px]'
          : 'rounded-[6px]'

  const media = (
    <div className={`relative overflow-hidden bg-mist ${shape}`} style={{ aspectRatio: photo?.aspect || '4 / 5' }}>
      {!failed ? (
        <img
          src={photo.src}
          alt={photo.alt || ''}
          loading="eager"
          fetchPriority={eager ? 'high' : undefined}
          decoding="async"
          sizes={sizes}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          style={{ objectPosition: photo.focus || 'center' }}
        />
      ) : (
        <Placeholder fileName={fileName} />
      )}
    </div>
  )

  const frameClass =
    frame === 'polaroid'
      ? 'bg-snow p-2 pb-9 sm:p-2.5 sm:pb-11 shadow-[0_18px_40px_-18px_rgba(135,75,99,0.35),0_2px_6px_rgba(135,75,99,0.08)]'
      : frame === 'mat'
        ? 'bg-snow p-1.5 shadow-[0_14px_30px_-16px_rgba(135,75,99,0.35)]'
        : frame === 'arch'
          ? 'p-1.5 bg-snow rounded-t-[999px] rounded-b-[18px] shadow-[0_24px_60px_-28px_rgba(135,75,99,0.45)] ring-1 ring-blush'
          : frame === 'oval'
            ? 'p-1 bg-snow rounded-[50%] ring-1 ring-blush shadow-[0_14px_30px_-18px_rgba(135,75,99,0.4)]'
            : ''

  return (
    <figure className={`relative ${frameClass} ${className}`} style={rotate ? { rotate: `${rotate}deg` } : undefined}>
      {media}
      {caption ? (
        <figcaption
          className={
            frame === 'polaroid'
              ? 'type-caption absolute inset-x-0 bottom-1.5 text-center sm:bottom-2.5'
              : 'type-caption absolute -bottom-3 left-3 rounded-[3px] bg-snow/95 px-2.5 py-1 text-[1.15rem] shadow-sm'
          }
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export function Placeholder({ fileName }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-mist via-blush/70 to-mist p-3 text-center">
      <svg viewBox="-16 -16 32 32" className="h-7 w-7 opacity-80" aria-hidden="true">
        <Blossom size={1} tone="deep" />
      </svg>
      <span className="font-sans text-[0.62rem] leading-snug font-medium tracking-wide text-dusty/80">
        Add photo
        <br />
        <span className="font-normal break-all">{fileName}</span>
      </span>
    </div>
  )
}

export default memo(PhotoCard)
