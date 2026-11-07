# Decorations (optional)

The site already draws its own pink roses and cherry blossoms, so this folder can stay empty.

If you want to use custom floral artwork instead:

- `pink-roses/` — rose illustrations
- `cherry-blossoms/` — blossom branches
- `floral-elements/` — leaves, petals, small accents

Use **transparent PNG or SVG** files (about 800 px wide), then set the paths in
`src/config/photos.js` → `decorations`, for example:

```js
heroCornerTop: img('decorations/pink-roses', 'corner-top.png'),
```
