const hashingPassword = require('./secure/hashingPassword')
const comparePassword = require('./secure/comparePassword')
const signToken = require('./secure/signToken')
const decodeToken = require('./secure/decodeToken')

const signupNewUser = require('./users/signupNewUser')
const findUser = require('./users/findUser')
const updateUserFields = require('./users/updateUserFields')

const createNewContact = require('./contacts/createNewContact')
const findContact = require('./contacts/findContact')
const getContacts = require('./contacts/getContacts')
const deleteContact = require('./contacts/deleteContact')
const updateContactFields = require('./contacts/updateContactFields')

module.exports = {
  hashingPassword,
  comparePassword,
  signToken,
  decodeToken,

  signupNewUser,
  findUser,
  updateUserFields,

  createNewContact,
  findContact,
  getContacts,
  deleteContact,
  updateContactFields
}
