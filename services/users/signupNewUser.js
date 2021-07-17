const gravatar = require('gravatar')
const User = require('../../db/userModel')

const signupNewUser = async (user, password) => {
  const avatarURL = gravatar.url(user.email, { s: '200', r: 'g', d: 'mp' }, true)
  const newUser = new User({ ...user, password, avatarURL })
  return await newUser.save()
}

module.exports = signupNewUser
