import { Hono } from 'hono'
import authRouter from './auth.router.js'
const app = new Hono()


app.get('/', (c) => c.text('Hello from Hono!'))
app.route('/api', authRouter)

export default app
