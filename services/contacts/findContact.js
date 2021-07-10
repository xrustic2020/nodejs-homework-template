const Contact = require('../../db/contactsModel')

const findContact = async (_id, owner) => {
  return await Contact.findOne({ _id, owner })
}

module.exports = findContact
