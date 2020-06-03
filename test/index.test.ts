import { post } from '../index'
import { Context } from 'aws-lambda'
import * as createEvent from 'aws-event-mocks'

describe('index.ts', () => {
  it('should work', async () => {
    const event = createEvent({
      template: 'aws:apiGateway',
      merge: {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        path: 'testhost:3000/test'
      }
    })

    const response = await post(event, {} as Context, undefined)

    expect(response).toMatchObject({
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: 'hello world' })
    })
  })
})
