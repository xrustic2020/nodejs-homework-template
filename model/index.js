const Joi = require('joi')
const { addedContactSchema } = require('../validations/contactsSchema')
const Contact = require('../db/contactsModel')
const { signupUser, loginUser, logoutUser, getCurrentUser } = require('./usersModel')

// TODO: Вынести логику с контактами в отдельный файл, а в индекс оставить только ипорты всего

const listContacts = async (req, res) => {
  const { page = 1, limit = 5 } = req.query
  try {
    const contacts = await Contact.paginate({ owner: req.user.id }, { page, limit })
    const { docs, totalDocs } = contacts
    return res.status(200).json({ contacts: docs, totalDocs, limit, page })
  } catch (error) {
    return res.status(500).json({ message: 'Some thing wrongs... Try again with 5 min' })
  }
}

const getContactById = async (req, res) => {
  const id = req.params.contactId
  try {
    const contact = await Contact.findOne({ _id: id, owner: req.user.id })
    if (!contact) throw new Error()
    return res.status(200).json({ contact })
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

const removeContact = async (req, res) => {
  const id = req.params.contactId
  try {
    await Contact.findOneAndDelete({ _id: id, owner: req.user.id })
    return res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

const addContact = async (req, res) => {
  try {
    Joi.assert(req.body, addedContactSchema)

    const newContact = new Contact({ ...req.body, owner: req.user.id })
    const createdContact = await newContact.save()
    return res.status(201).json(createdContact)
  } catch (error) {
    res.status(400).json({ message: 'missing required name field' })
  }
}

const updateContact = async (req, res) => {
  const id = req.params.contactId
  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'missing fields' })
  const { name, email, phone, favorite } = req.body
  try {
    const updateContact = await Contact.findOneAndUpdate({ _id: id, owner: req.user.id }, { $set: { name, email, phone, favorite } }, { new: true })
    const updatedData = {
      name: updateContact.name,
      email: updateContact.email,
      phone: updateContact.phone,
      favorite: updateContact.favorite
    }
    return res.status(200).json(updatedData)
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId
  if (req.body.favorite === undefined) return res.status(400).json({ message: 'missing field favorite' })
  const { favorite } = req.body
  try {
    const updatedContact = await Contact.findOneAndUpdate({ _id: id, owner: req.user.id }, { $set: { favorite } }, { new: true })
    const updatedData = {
      name: updatedContact.name,
      email: updatedContact.email,
      phone: updatedContact.phone,
      favorite: updatedContact.favorite
    }
    return res.status(200).json(updatedData)
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
  updateStatusContact,
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser
}
