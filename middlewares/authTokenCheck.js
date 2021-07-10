const { decodeToken, findUser } = require('../services')

const authTokenCheck = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const [, token] = authorization.split(' ')
    const user = decodeToken(token)
    if (!user) throw new Error()

    const foundedUser = await findUser({ _id: user.id })
    if (foundedUser.token !== token) throw new Error()
    const { email, _id: id, subscription } = foundedUser
    req.user = { email, id, subscription }
    next()
  } catch (error) {
    res.json({ message: 'Not authorized' }).status(401)
  }
}

module.exports = authTokenCheck
