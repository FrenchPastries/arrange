import { IncomingRequest, ServerResponse } from '@frenchpastries/millefeuille'
import { Handler } from './types'

const defaultHeaders = (urls?: string[] | string) => {
  const CORS = process.env.CORS
  const _urls = [urls ?? CORS ?? ''].flat()
  return {
    'Access-Control-Allow-Origin': _urls,
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': true,
  }
}

export const origin = <Body, Return>(
  handler: Handler<Body, Return>,
  urls?: string[] | string
) => {
  return async (request: IncomingRequest<Body>) => {
    if (request.method === 'OPTIONS') {
      const headers = defaultHeaders(urls)
      return { statusCode: 200, headers, body: 'OK' } as ServerResponse<string>
    } else {
      const response = await handler(request)
      const headers = { ...response.headers, ...defaultHeaders(urls) }
      return { ...response, headers } as ServerResponse<Return>
    }
  }
}
