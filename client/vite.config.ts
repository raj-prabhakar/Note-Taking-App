import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// When using PostCSS plugins in Vite, we need to call them as functions
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),  // Call as function
        autoprefixer()  // Call as function
      ],
    },
  },
})