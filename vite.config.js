import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// If you publish on GitHub Pages at https://<user>.github.io/glyde-birthday-gift/,
// set base to '/glyde-birthday-gift/'. For a custom domain or Vercel/Netlify keep '/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
