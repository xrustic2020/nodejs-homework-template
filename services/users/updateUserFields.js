const User = require('../../db/userModel')

const updateUserFields = async (searchQuery, settings) => {
  const { email, subscription, avatarURL } = await User.findOneAndUpdate(searchQuery, { $set: settings }, { new: true })
  return { email, subscription, avatarURL }
}

module.exports = updateUserFields
