import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  define: {
    global: 'globalThis'
  },

  resolve: {
    alias: {
      // ❗REMOVE Node polyfills unless 100% required
      // simple-peer only needs 'global' shim which we already define above
    },
    dedupe: ['simple-peer']
  },

  build: {
    commonjsOptions: {
      include: [/node_modules/, 'simple-peer']
    }
  },

  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
