import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import router from './routes/index.js'
const app = new Hono()

app.route('/', router)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
