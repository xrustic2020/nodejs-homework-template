const bcrypt = require('bcrypt')

const comparePassword = async (sendingPassword, passwordInDB) => {
  return await bcrypt.compare(sendingPassword, passwordInDB)
}

module.exports = comparePassword
