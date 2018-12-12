import { Handler, Request, Response } from '@frenchpastries/millefeuille'
import { contentType } from '@frenchpastries/millefeuille/response'

const jsonBody = (handler: Handler<any>): Handler<string> => async (request: Request) => {
  const response = await handler(request)
  return {
    ...response,
    body: JSON.stringify(response.body)
  }
}

const jsonContentType = (handler: Handler<any>): Handler<any> => async (request: Request) => {
  const response = await handler(request)
  return contentType(response, 'application/json')
}

export {
  jsonBody,
  jsonContentType
}
