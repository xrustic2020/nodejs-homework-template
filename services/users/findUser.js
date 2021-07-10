const User = require('../../db/userModel')

const findUser = async (searchQuery, settings) => {
  if (!settings) return await User.findOne(searchQuery, { __v: 0 })
  return await User.findOne(searchQuery, { ...settings })
}

module.exports = findUser
