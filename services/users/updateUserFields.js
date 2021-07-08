const User = require('../../db/userModel')

const updateUserFields = async (searchQuery, settings) => {
  const { email, subscription } = await User.findOneAndUpdate(searchQuery, { $set: settings }, { new: true })
  return { email, subscription }
}

module.exports = updateUserFields
