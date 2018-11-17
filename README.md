# Arrange

Arrange is collection of utilites and middlewares to use with the French Pastries suite of software. The first addition is to handle JSON.

Right now, the package contains two main functions: `jsonBody` and `jsonContentType`. The first one transforms the content of a response into a string, if it is a JSON. The second one converts the response into a response containing JSON. Because code is better than words, here's some examples.

# Getting Started

```bash
# For Yarn users
yarn add @frenchpastries/arrange
```

```bash
# For NPM users
npm install --save @frenchpastries/arrange
```

# Usage examples

```javascript
const MilleFeuille = require('@frenchpastries/millefeuille')
const { response } = require('@frenchpastries/millefeuille/response')
const Arrange = require('@frenchpastries/arrange')

const handler = request => {
  return response({ msg: "Friendship is Magic!" })
}

const server = MilleFeuille.create(
  Arrange.jsonBody(
    Arrange.jsonContentType(
      handler
    )
  )
)
```

Here, the `handler` function return a new response object.

```javascript
{
  statusCode: 200,
  headers: {},
  body: {
    msg: "Friendship is Magic!"
  }
}
```

The `Arrange.jsonContentType(handler)` returns a new response object.

```javascript
{
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    msg: "Friendship is Magic!"
  }
}
```

The `Arrange.jsonBody(Arrange.jsonContentType(handler))` returns a new response object too.

```javascript
{
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json'
  },
  body: '{"msg":"Friendship is Magic!"}'
}
```

As you can see, you can use every middleware separately, but also combined!

# Contributing

A middleware or a collection of middleware you always use? An idea to make this repository better? Want to improve the documentation? Open an issue or a Pull Request! Every commitment is welcome!
