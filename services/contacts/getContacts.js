const Contact = require('../../db/contactsModel')

const getContacts = async (searchQuery, paginateSettings) => {
  const { owner, favorite } = searchQuery
  if (!favorite) return await Contact.paginate({ owner }, paginateSettings)
  return await Contact.paginate({ owner, favorite }, paginateSettings)
}

module.exports = getContacts
