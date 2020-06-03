import app from './app'
import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyHandler } from '.pnpm/@types/aws-lambda@8.10.52/node_modules/@types/aws-lambda'
import ServerlessHttp = require('.pnpm/serverless-http@2.5.0/node_modules/serverless-http')

exports.handler = (ServerlessHttp(app, {
  request: (
    request,
    event: APIGatewayProxyEvent,
    context: APIGatewayEventRequestContext
  ) => {
    request.event = event
    request.context = context
  }
}) as unknown) as APIGatewayProxyHandler