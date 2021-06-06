import {
  ServerResponse,
  Handler,
  IncomingRequest,
} from '@frenchpastries/millefeuille'

const jsonBodyHelp = (
  response: ServerResponse<any>
): ServerResponse<string> => {
  const body = JSON.stringify(response.body)
  return { ...response, body }
}

export const jsonBody = <Type>(
  handler: Handler<IncomingRequest, ServerResponse<Type>>
) => {
  return (request: IncomingRequest) => {
    const response = handler(request)
    if (response instanceof Promise) {
      return response.then(jsonBodyHelp)
    } else {
      return jsonBodyHelp(response)
    }
  }
}

const jsonContentTypeHelp = <Type>(
  response: ServerResponse<Type>
): ServerResponse<Type> => {
  const headers = { ...response.headers, 'Content-Type': 'application/json' }
  return { ...response, headers }
}

export const jsonContentType = <Type>(
  handler: Handler<IncomingRequest, ServerResponse<Type>>
) => {
  return (request: IncomingRequest) => {
    const response = handler(request)
    if (response instanceof Promise) {
      return response.then(jsonContentTypeHelp)
    } else {
      return jsonContentTypeHelp(response)
    }
  }
}

export const jsonResponse = <Type>(
  handler: Handler<IncomingRequest, ServerResponse<Type>>
) => {
  return jsonBody(jsonContentType(handler))
}

export const parseJSONBody = <Type>(
  handler: Handler<IncomingRequest, ServerResponse<Type>>
) => {
  return (request: IncomingRequest) => {
    if (request.body && typeof request.body === 'string') {
      const body = JSON.parse(request.body)
      return handler({ ...request, body })
    } else {
      return handler(request)
    }
  }
}
