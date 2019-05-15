'use strict'

const auth = require('./auth')
const setup = require('./setup')

module.exports = {
  ...auth,
  ...setup,
}
