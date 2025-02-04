import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import authRouter from './auth.router.js'
import { verify } from 'hono/jwt'
import requestRouter from "./request.router.js";
import authService from '../services/auth.service.js'
import env from '../config/env.js'
import { authGuard } from '../middlewares/authguard.js'
import organisationRouter from "./organisation.router.js";
import optionRouter from "./option.router.js";
const app = new Hono()


app.get('api/', (c) => c.text('Hello from Hono!'))
app.route('/api', authRouter)
app.route('api/organisation', organisationRouter)
app.route('api/option',optionRouter)
app.get(
  '/authenticated',
  authGuard(),
  (c) => {
    const user = c.get('user')
    return c.text('Authenticated route, hi ' + user.email)
  }
)
export default app
