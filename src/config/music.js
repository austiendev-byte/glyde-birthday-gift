/**
 * MUSIC CONFIGURATION
 *
 * Put the "Panaginip" recording you own (or have permission to use) at:
 *   public/assets/audio/panaginip.mp3
 * or change `file` below. MP3 or M4A work in every modern browser.
 *
 * If the file is missing, the music button simply stays hidden and the
 * rest of the site works normally.
 */

export const music = {
  file: `${import.meta.env.BASE_URL}assets/audio/panaginip.mp3`,
  title: 'Panaginip',
  artist: '', // e.g. the artist of the version you chose — shown under the title
  volume: 0.55, // 0 to 1
  loop: true,
  // Browsers usually block sound until the visitor taps something.
  // When true, the site tries once on load; if blocked, it shows a gentle
  // "tap to play" hint instead of forcing playback.
  tryAutoplay: true,
}
