const User = require('../db/userSchema')

const signupNewUser = async (user, password) => {
  const newUser = new User({ ...user, password })
  // const createdUser = await newUser.save()
  // return createdUser
  return await newUser.save()
}

module.exports = signupNewUser
