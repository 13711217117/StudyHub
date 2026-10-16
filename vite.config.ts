import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  // 部署到 GitHub Pages 项目页：https://<user>.github.io/StudyHub/
  // 静态资源与 PWA 作用域都需带上该子路径前缀
  base: '/StudyHub/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'StudyHub 学习空间',
        short_name: 'StudyHub',
        description: '个人学习空间：刷题、错题本、收藏与间隔重复复习',
        theme_color: '#2f855a',
        background_color: '#f7f4ee',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/StudyHub/',
        scope: '/StudyHub/',
        lang: 'zh-CN',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 5173
  }
})
