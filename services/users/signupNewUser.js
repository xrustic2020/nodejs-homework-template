const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid')
const User = require('../../db/userModel')
const sendEmail = require('./sendEmail')

const signupNewUser = async (user, password) => {
  const avatarURL = gravatar.url(user.email, { s: '200', r: 'g', d: 'mp' }, true)
  const verifyToken = uuidv4()
  await sendEmail(user.email, verifyToken)
  const newUser = new User({ ...user, password, avatarURL, verifyToken })
  return await newUser.save()
}

module.exports = signupNewUser
