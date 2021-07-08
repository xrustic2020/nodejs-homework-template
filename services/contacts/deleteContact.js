const Contact = require('../../db/contactsModel')

const deleteContact = async (_id, owner) => {
  return await Contact.findOneAndDelete({ _id, owner })
}

module.exports = deleteContact
