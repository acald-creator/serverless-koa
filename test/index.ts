import {
  APIGatewayProxyEvent,
  APIGatewayEventRequestContext,
  APIGatewayProxyHandler
} from 'aws-lambda'
import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as bodyParser from 'koa-bodyparser'
import { HttpWarmup } from '../lib/http-warmup'
import serverlessHttp = require('serverless-http')

/**
 * This type definition allows us to update the Koa.ParameterizedContext with
 * the custom request mapping defined below.
 */

interface CustomRequestContext {
    req: {
        event: APIGatewayProxyEvent
        context: APIGatewayEventRequestContext
    }
}

const app = new Koa<any, CustomRequestContext>()

app.use(cors({ keepHeadersOnError: true }))
app.use(bodyParser({
  detectJSON: function (ctx) {
    return /\.json$/i.test(ctx.path)
  }
}))

app.use(HttpWarmup)

app.use(async ctx => {
  const { } = ctx.request.body

  try {
    ctx.request.body = { data: 'hello world' }
  } catch (error) {
    console.error('error', error)
    ctx.throw(400, error.description)
  }
})

export const post = (serverlessHttp(app, {
  request: (
    request,
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext
  ) => {
    request.event = event
    request.context = context
  }
}) as unknown) as APIGatewayProxyHandler
