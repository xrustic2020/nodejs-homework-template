const jwt = require('jsonwebtoken')

const signToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET)
}

module.exports = signToken
