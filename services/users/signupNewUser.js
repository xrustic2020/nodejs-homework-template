const User = require('../../db/userModel')

const signupNewUser = async (user, password) => {
  const newUser = new User({ ...user, password })
  return await newUser.save()
}

module.exports = signupNewUser
