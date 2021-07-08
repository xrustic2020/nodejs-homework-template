const jwt = require('jsonwebtoken')

const decodeToken = (token) => {
  return jwt.decode(token, process.env.JWT_SECRET)
}

module.exports = decodeToken
