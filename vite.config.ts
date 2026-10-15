import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    emptyOutDir: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.indexOf('node_modules/three') !== -1) {
            return 'vendor-three';
          }
          if (id.indexOf('node_modules/@svg-maps') !== -1) {
            return 'vendor-maps';
          }
          if (id.indexOf('node_modules/lucide-react') !== -1) {
            return 'vendor-lucide';
          }
          if (id.indexOf('node_modules/react') !== -1 || id.indexOf('node_modules/react-dom') !== -1) {
            return 'vendor-react';
          }
        }
      }
    }
  },
})
