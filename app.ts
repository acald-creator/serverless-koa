import {
  APIGatewayProxyEvent,
  APIGatewayEventRequestContext
} from 'aws-lambda'
import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as bodyParser from 'koa-bodyparser'
import * as Router from '@koa/router'
import * as compress from 'koa-compress'
import { HttpWarmup } from './lib/http-warmup'

interface CustomRequestContext {
    req: {
        event: APIGatewayProxyEvent
        context: APIGatewayEventRequestContext
    }
}

const app = new Koa<any, CustomRequestContext>()

const router = Router()

if (process.env.NODE_ENV === 'test') {
  router.use('/sam', compress())
} else {
  router.use(compress())
}

router.use(cors({ keepHeadersOnError: true }))
router.use(bodyParser({
  detectJSON: function (ctx) {
    return /\.json$/i.test(ctx.path)
  }
}))
router.use(HttpWarmup)

app.use(async ctx => {
  const { } = ctx.request.body
  try {
    ctx.response.body = { data: 'hello world' }
  } catch (error) {
    console.error('error', error)
    ctx.throw(400, error.description)
  }
})

export default app
