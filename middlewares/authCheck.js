const jwt = require('jsonwebtoken')
const User = require('../db/userSchema')

const checkedAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const [, token] = authorization.split(' ')
    const user = jwt.decode(token, process.env.JWT_SECRET)
    if (!user) throw new Error()

    const foundedUser = await User.findOne({ _id: user.id })
    if (foundedUser.token !== token) throw new Error()
    const { email, _id: id, subscription } = foundedUser
    req.user = { email, id, subscription }
    next()
  } catch (error) {
    res.json({ message: 'Not authorized' }).status(401)
  }
}

module.exports = checkedAuth
