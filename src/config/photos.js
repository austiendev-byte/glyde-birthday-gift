/**
 * PHOTO CONFIGURATION — the only file you need to touch to manage photos.
 *
 * How to replace a photo:
 *   1. Drop your image into the matching folder under public/assets/images/
 *   2. Either give it the exact filename listed below, or change the filename here.
 *
 * Missing photos never break the site: a soft pink placeholder labelled with the
 * expected filename is shown instead, so you can see exactly what is still missing.
 *
 * `alt` is read aloud by screen readers. Describe the moment in a few words.
 * `aspect` is width / height of the frame. The photo is cropped to fill it.
 * `focus` (optional) moves the crop, e.g. 'center top' keeps faces in view.
 */

const root = `${import.meta.env.BASE_URL}assets/images`
const img = (folder, file) => `${root}/${folder}/${file}`

export const photos = {
  // SECTION 01 — HERO (public/assets/images/hero/)
  hero: {
    // Large arched portrait beside the heading. Best: portrait, 4:5, 1200 × 1500.
    main: {
      src: img('hero', 'hero-main.jpg'),
      alt: 'Glyde and me together',
      aspect: '4 / 5',
      focus: 'center 30%',
    },
    // Polaroid that overlaps the main photo. Best: square, 1:1, 900 × 900.
    secondary: {
      src: img('hero', 'hero-secondary.jpg'),
      alt: 'A sweet moment of us',
      aspect: '1 / 1',
    },
    // Small oval vignette near the flowers. Best: portrait, 3:4, 600 × 800.
    decoration: {
      src: img('hero', 'hero-decoration.jpg'),
      alt: 'Glyde smiling',
      aspect: '3 / 4',
    },
  },

  // SECTION 02 — MEMORIES GALLERY
  // Add or remove entries freely; each row loops forever. 6–10 photos per row looks best.
  // Captions are optional — leave '' for none. Keep them short.
  gallery: {
    // Row 1 moves right → left (public/assets/images/gallery/row-1/)
    row1: [
      { file: 'memory-01.jpg', alt: 'A memory of us', aspect: '4 / 5', caption: '' },
      { file: 'memory-02.jpg', alt: 'A memory of us', aspect: '1 / 1', caption: 'my favorite view' },
      { file: 'memory-03.jpg', alt: 'A memory of us', aspect: '3 / 2', caption: '' },
      { file: 'memory-04.jpg', alt: 'A memory of us', aspect: '3 / 4', caption: '' },
      { file: 'memory-05.jpg', alt: 'A memory of us', aspect: '4 / 3', caption: 'always you' },
      { file: 'memory-06.jpg', alt: 'A memory of us', aspect: '4 / 5', caption: '' },
      { file: 'memory-07.jpg', alt: 'A memory of us', aspect: '1 / 1', caption: '' },
    ].map((p) => ({ ...p, src: img('gallery/row-1', p.file) })),

    // Row 2 moves left → right (public/assets/images/gallery/row-2/)
    row2: [
      { file: 'memory-08.jpg', alt: 'A memory of us', aspect: '3 / 2', caption: '' },
      { file: 'memory-09.jpg', alt: 'A memory of us', aspect: '3 / 4', caption: 'us' },
      { file: 'memory-10.jpg', alt: 'A memory of us', aspect: '1 / 1', caption: '' },
      { file: 'memory-11.jpg', alt: 'A memory of us', aspect: '4 / 5', caption: '' },
      { file: 'memory-12.jpg', alt: 'A memory of us', aspect: '4 / 3', caption: 'my home' },
      { file: 'memory-13.jpg', alt: 'A memory of us', aspect: '3 / 4', caption: '' },
      { file: 'memory-14.jpg', alt: 'A memory of us', aspect: '3 / 2', caption: '' },
    ].map((p) => ({ ...p, src: img('gallery/row-2', p.file) })),
  },

  // SECTION 03 — LETTER (public/assets/images/letters/)
  letters: {
    // Polaroid beside the letter. Best: portrait, 4:5, 900 × 1125.
    beside: {
      src: img('letters', 'letter-photo-1.jpg'),
      alt: 'Glyde and me',
      aspect: '4 / 5',
    },
    // Small framed photo by the signature. Best: square, 1:1, 600 × 600.
    signature: {
      src: img('letters', 'letter-photo-2.jpg'),
      alt: 'Us, together',
      aspect: '1 / 1',
    },
  },

  // SECTION 04 — CAKE (public/assets/images/cake/)
  cake: {
    // Two polaroids that frame the cake. Best: portrait, 4:5, 800 × 1000.
    left: {
      src: img('cake', 'cake-photo-1.jpg'),
      alt: 'Celebrating together',
      aspect: '4 / 5',
    },
    right: {
      src: img('cake', 'cake-photo-2.jpg'),
      alt: 'Glyde on a happy day',
      aspect: '4 / 5',
    },
  },

  // OPTIONAL — custom floral artwork (public/assets/images/decorations/)
  // Leave as null to use the built-in illustrated flowers.
  // Use transparent PNG or SVG files, e.g. img('decorations/pink-roses', 'corner.png').
  decorations: {
    heroCornerTop: null,
    heroCornerBottom: null,
  },
}
