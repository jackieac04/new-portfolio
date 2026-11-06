import { writeFile } from 'node:fs/promises'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only: the art page's "arrange" mode POSTs the new gallery order here and
// it is written to src/data/art-order.json. Never part of a production build.
function saveArtOrder() {
  return {
    name: 'save-art-order',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__art-order', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end()
        }
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', async () => {
          try {
            const order = JSON.parse(body)
            if (!Array.isArray(order) || !order.every((t) => typeof t === 'string')) {
              throw new Error('expected a list of titles')
            }
            const file = new URL('./src/data/art-order.json', import.meta.url)
            await writeFile(file, JSON.stringify(order, null, 2) + '\n')
            res.statusCode = 204
            res.end()
          } catch (err) {
            res.statusCode = 400
            res.end(String(err.message))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), saveArtOrder()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
