const Contact = require('../../db/contactsModel')

const updateContactFields = async (searchQuery, updateFields) => {
  const { name, email, phone, favorite } = await Contact.findOneAndUpdate(searchQuery, { $set: updateFields }, { new: true })
  return {
    name,
    email,
    phone,
    favorite
  }
}

module.exports = updateContactFields
