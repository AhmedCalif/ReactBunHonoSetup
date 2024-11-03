import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { expensesRoute } from './routes/expenses'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()

// API routes first
app.route("/api/expenses", expensesRoute)


app.use('/*', serveStatic({ root: './dist' }))
app.get('*', serveStatic({ path: './dist/index.html' }))


const port = process.env.PORT || 5173
console.log(`Server starting on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port)
})