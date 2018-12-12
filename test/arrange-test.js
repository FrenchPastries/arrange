const should = require('chai').should() // eslint-disable-line

const { jsonBody, jsonContentType } = require('../index')

describe('Arrange utility', function() {
  specify('jsonBody should accept a handler and a request, and returns a correct response with body stringified', async function() {
    const handler = () => ({
      statusCode: 200,
      headers: {},
      body: 'Content'
    })
    const response = await jsonBody(handler)()
    response.statusCode.should.equal(200)
    response.body.should.equal('"Content"')
  })
})
