const bcrypt = require('bcrypt')

const hashingPassword = async (password) => {
  return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
}

module.exports = hashingPassword
