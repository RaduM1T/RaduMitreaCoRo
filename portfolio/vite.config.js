import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          sanity: ['@sanity/client', '@sanity/image-url', '@portabletext/react'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
