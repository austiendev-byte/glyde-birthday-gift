# To My Forever, Glyde

A single-page birthday love story for Glyde: floral hero, sliding memories,
a letter that opens from its envelope, and a cake whose candles she can blow out.

Built with React + Vite, Tailwind CSS v4 and Motion.

## Run it

```bash
npm install        # first time only
npm run dev        # local preview at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build
```

Requires Node.js 20 or newer.

## Make it yours (no component editing needed)

| What | Where |
|---|---|
| Every word, including the letter | `src/config/content.js` |
| Which photo goes where | `src/config/photos.js` |
| The song | `src/config/music.js` |
| Colors and fonts | `src/styles/global.css` (`@theme` block) |

### Photos

1. Copy your photos into the matching folder under `public/assets/images/`:
   - `hero/` — 3 photos for the opening screen
   - `gallery/row-1/` and `gallery/row-2/` — the two sliding rows (6–10 each)
   - `letters/` — 2 photos beside the letter
   - `cake/` — 2 polaroids next to the cake
2. Use the filenames listed in each folder's `README.md`, **or** change the filenames
   in `src/config/photos.js`.
3. In `photos.js` you can also set each photo's frame shape (`aspect`), crop focus
   (`focus: 'center top'`), description (`alt`) and gallery `caption`.

Missing photos show a soft pink "Add photo: filename.jpg" placeholder, so
open the site before sending it and make sure none are left.

Tip: compress photos first (e.g. squoosh.app). Under ~300 KB each keeps the site fast on mobile data.

### The letter

Open `src/config/content.js` → `letter.paragraphs`. Each string is one paragraph;
add, remove or rewrite them. The draft is intentionally general — a memory only
you two share will make it hers.

### Music — "Panaginip"

1. Put your copy of the song (one you own or have permission to use) at
   `public/assets/audio/panaginip.mp3`.
2. Optional: set the artist or a different filename in `src/config/music.js`.

Browsers block sound until the visitor taps something, so the site tries once and
otherwise shows a "Tap to play our song" hint. If the file is missing, the music
button stays hidden.

## Publishing

Any static host works (`npm run build` → upload `dist/`).

- **GitHub Pages:** set `base: '/glyde-birthday-gift/'` in `vite.config.js`, build,
  and publish `dist/` (e.g. with the official "Deploy static content to Pages" action).
  Note: Pages from a private repo needs a paid GitHub plan, and the published site
  itself is public to anyone with the link.
- **Vercel / Netlify:** import the repo; build command `npm run build`, output `dist`.

## Project structure

```
public/assets/
  images/hero | gallery/row-1 | gallery/row-2 | letters | cake | decorations
  audio/
src/
  config/      photos.js · content.js · music.js
  sections/    HeroSection · MemoriesSection · LoveLetterSection · BirthdayCakeSection
  components/  FloralDecorations (SVG roses & blossoms) · PhotoCard · FloatingPetals ·
               FloatingMusicPlayer · Cake · Celebration · ScrollIndicator · SectionTransition
  styles/      global.css (theme tokens) · typography.css · animations.css
```

## Accessibility & performance

- Respects "reduce motion": petals hide, the gallery stops and becomes swipeable,
  and the letter opens without the envelope animation.
- Photos below the first screen lazy-load; every frame reserves its space (no layout jumps).
- The gallery loop is pure CSS transforms and pauses on hover on desktop.
- All controls are real buttons with keyboard focus styles.
