const Joi = require('joi')
const { addedContactSchema } = require('../validations/contactsSchema')
const Contact = require('../db/contactsModel')
const { signupUser, loginUser } = require('./usersModel')

// TODO: Вынести логику с контактами в отдельный файл, а в индекс оставить только ипорты всего

const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
    return res.status(200).json({ contacts })
  } catch (error) {
    return res.status(500).json({ message: 'Some thing wrongs... Try again with 5 min' })
  }
}

const getContactById = async (req, res) => {
  const id = req.params.contactId
  try {
    const contact = await Contact.findById(id)
    return res.status(200).json({ contact })
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

const removeContact = async (req, res) => {
  const id = req.params.contactId
  try {
    await Contact.findByIdAndRemove(id)
    return res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

const addContact = async (req, res) => {
  try {
    Joi.assert(req.body, addedContactSchema)

    const newContact = new Contact({ ...req.body })
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
    const updateContact = await Contact.findByIdAndUpdate(id, { $set: { name, email, phone, favorite } }, { new: true })
    return res.status(200).json(updateContact)
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId
  if (req.body.favorite === undefined) return res.status(400).json({ message: 'missing field favorite' })
  const { favorite } = req.body
  try {
    const updateContactStatus = await Contact.findByIdAndUpdate(id, { $set: { favorite } }, { new: true })
    return res.status(200).json(updateContactStatus)
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
  loginUser
}
