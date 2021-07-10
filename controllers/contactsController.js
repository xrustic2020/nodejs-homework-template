const { getContacts, findContact, deleteContact, createNewContact, updateContactFields } = require('../services')

const listContacts = async (req, res) => {
  const { page = 1, limit = 5, favorite } = req.query
  try {
    const { docs, totalDocs } = await getContacts({ owner: req.user.id, favorite }, { page, limit })
    return res.status(200).json({ contacts: docs, totalDocs, limit, page })
  } catch (error) {
    return res.status(500).json({ message: 'Some thing wrongs... Try again with 5 min' })
  }
}

const getContactById = async (req, res) => {
  const id = req.params.contactId
  try {
    const contact = await findContact(id, req.user.id)
    if (!contact) throw new Error()
    return res.status(200).json({ contact })
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

const removeContact = async (req, res) => {
  const id = req.params.contactId
  try {
    await deleteContact(id, req.user.id)
    return res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

const addContact = async (req, res) => {
  try {
    const createdContact = await createNewContact(req.body, req.user.id)
    return res.status(201).json(createdContact)
  } catch (error) {
    res.status(400).json({ message: 'missing required fields' })
  }
}

const updateContact = async (req, res) => {
  const id = req.params.contactId
  const { name, email, phone, favorite } = req.body
  try {
    const updatedContact = await updateContactFields({ _id: id, owner: req.user.id }, { name, email, phone, favorite })
    return res.status(200).json(updatedContact)
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId
  if (req.body.favorite === undefined) return res.status(400).json({ message: 'missing field favorite' })
  const { favorite } = req.body
  try {
    const updatedContact = await updateContactFields({ _id: id, owner: req.user.id }, { favorite })
    return res.status(200).json(updatedContact)
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
