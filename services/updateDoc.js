const User = require('../db/userSchema')

const updateDoc = async (searchQuery, settings) => {
  await User.updateOne(searchQuery, { $set: settings }, { new: true })
}

module.exports = updateDoc
