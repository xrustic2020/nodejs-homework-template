const User = require('../db/userSchema')

const findOneDoc = async (searchQuery, settings) => {
  if (!settings) return await User.findOne(searchQuery, { __v: 0 })
  return await User.findOne(searchQuery, { __v: 0, ...settings })
}

module.exports = findOneDoc
