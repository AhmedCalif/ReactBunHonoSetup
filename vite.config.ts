import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import devServer from '@hono/vite-dev-server'

export default defineConfig({
  plugins: [
    react(),
    devServer({
      entry: './src/server/app.ts', 
      exclude: [/^(?!\/api).*$/],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})