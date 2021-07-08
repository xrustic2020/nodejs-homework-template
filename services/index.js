const hashingPassword = require('./hashingPassword')
const signupNewUser = require('./signupNewUser')
const findOneDoc = require('./findOneDoc')
const comparePassword = require('./comparePassword')
const signToken = require('./signToken')
const updateDoc = require('./updateDoc')

module.exports = {
  hashingPassword,
  signupNewUser,
  findOneDoc,
  comparePassword,
  signToken,
  updateDoc
}
