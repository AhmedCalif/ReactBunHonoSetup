import { Hono } from 'hono'
import { expensesRoute } from '../server/routes/expenses'
import { serveStatic } from '@hono/node-server/serve-static'
import { logger } from 'hono/logger'

const app = new Hono()


app.use('*', logger())

app.route("/api/expenses", expensesRoute)


app.use('/*', serveStatic({ root: './dist' }))
app.get('*', serveStatic({ path: './dist/index.html' }))

export default app