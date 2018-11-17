const jsonBody = handler => request => {
  const response = handler(request)
  return Promise.resolve(response)
    .then(response => ({
      ...response,
      body: JSON.stringify(response.body)
    }))
}

const jsonContentType = handler => request => {
  const response = handler(request)
  return Promise.resolve(response)
    .then(response => ({
      ...response,
      headers: {
        ...response.headers,
        'Content-Type': 'application/json'
      }
    }))
}

module.exports = {
  jsonBody,
  jsonContentType
}
