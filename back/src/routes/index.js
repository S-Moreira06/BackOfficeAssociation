import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import authRouter from './auth.router.js'
import requestRouter from './request.router.js'
import beneficiaryRouter from './beneficiary.router.js'
import reservationRouter from './reservation.router.js'
import { verify } from 'hono/jwt'
import authService from '../services/auth.service.js'
import env from '../config/env.js'
import { authGuard } from '../middlewares/authguard.js'
import organisationRouter from "./organisation.router.js";

const app = new Hono()

app.get('/', (c) => c.text('Hello from Hono!'))
app.route('/api', authRouter)
app.route('/api/request', requestRouter)
app.route('/api/beneficiary', beneficiaryRouter)
app.route('/organisation', organisationRouter)
app.route('/api/reservation', reservationRouter)
app.get(
  '/authenticated',
  authGuard(),
  (c) => {
    const user = c.get('user')
    return c.text('Authenticated route, hi ' + user.email)
  }
)

export default app
