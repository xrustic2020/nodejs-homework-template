const Contact = require('../../db/contactsModel')

const createNewContact = async (contact, owner) => {
  const newContact = new Contact({ ...contact, owner })
  return await newContact.save()
}

module.exports = createNewContact
