const jsonBodyHelp = response => ({
  ...response,
  body: JSON.stringify(response.body),
})

const jsonBody = handler => request => {
  const response = handler(request)
  if (response.then) {
    return response.then(jsonBodyHelp)
  } else {
    return jsonBodyHelp(response)
  }
}

const jsonContentTypeHelp = response => ({
  ...response,
  headers: {
    ...response.headers,
    'Content-Type': 'application/json',
  }
})

const jsonContentType = handler => request => {
  const response = handler(request)
  if (response.then) {
    return response.then(jsonContentTypeHelp)
  } else {
    return jsonContentTypeHelp(response)
  }
}

const jsonResponse = handler => (
  jsonBody(
    jsonContentType(
      handler
    )
  )
)

const parseJSONBody = handler => request => {
  return handler({
    ...request,
    body: JSON.parse(request.body),
  })
}

module.exports = {
  jsonBody,
  jsonContentType,
  jsonResponse,
  parseJSONBody,
}
