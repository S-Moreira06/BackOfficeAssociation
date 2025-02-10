import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { verify } from 'hono/jwt'
import env from '../config/env.js'
import { authGuard } from '../middlewares/authguard.js'
import authRouter from './auth.router.js'
import requestRouter from './request.router.js'
import beneficiaryRouter from './beneficiary.router.js'
import organisationRouter from "./organisation.router.js";
import availabilityRouter from "./availability.router.js";
import optionRouter from "./option.router.js";
const app = new Hono()


app.get('api/', (c) => c.text('Hello from Hono!'))
app.route('/api', authRouter)
app.route('api/organisation', organisationRouter)
app.route('api/option',optionRouter)
app.route('/api/request', requestRouter)
app.route('/api/availability', availabilityRouter)
app.route('/api/beneficiary', beneficiaryRouter)

app.get(
  '/authenticated',
  authGuard(),
  (c) => {
    const user = c.get('user')
    return c.text('Authenticated route, hi ' + user.email)
  }
)
export default app
