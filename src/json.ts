import { ServerResponse, IncomingRequest } from '@frenchpastries/millefeuille'
import { Handler } from './types'

export const body = <Body, Return = any>(handler: Handler<Body, Return>) => {
  return async (request: IncomingRequest<Body>) => {
    const response = await handler(request)
    const body = JSON.stringify(response.body)
    return { ...response, body } as ServerResponse<string>
  }
}

export const contentType = <Body, Return>(handler: Handler<Body, Return>) => {
  return async (request: IncomingRequest<Body>) => {
    const response = await handler(request)
    const headers = { ...response.headers, 'Content-Type': 'application/json' }
    return { ...response, headers } as ServerResponse<Return>
  }
}

export const response = <Body>(handler: Handler<Body, any>) => {
  const withContentType = contentType(handler)
  return body(withContentType)
}

export const parse = (handler: Handler<any, any>) => {
  return async (request: IncomingRequest<string>) => {
    if (request.body && typeof request.body === 'string') {
      const body = JSON.parse(request.body)
      request.body = body
      return handler(request)
    } else {
      return handler(request)
    }
  }
}
