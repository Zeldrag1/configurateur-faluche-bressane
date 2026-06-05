import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/configurateur-faluche-bressane/',
  define: {
    // react-draggable (dépendance de react-rnd) référence process.env.NODE_ENV
    // qui n'existe pas nativement dans le navigateur — on le polyfille ici.
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
})
