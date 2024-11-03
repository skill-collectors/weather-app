import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        "name": "weather-app",
        "short_name": "weather-app",
        "icons": [
          {
            "src": "./img/icons/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "./img/icons/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
        "start_url": "./index.html",
        "display": "standalone",
        "background_color": "#000000",
        "theme_color": "#FFFFFF"
      }
    }
  )],
  base: process.env.NODE_ENV === 'production'
      ? '/weather-app/'
      : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
