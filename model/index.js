const ObjectID = require('mongodb').ObjectID
const Joi = require('joi')
const { schema } = require('../validations/contactsSchema')

const listContacts = async (req, res) => {
  try {
    const contacts = await req.db.contacts.find({}).toArray()
    return res.status(200).json({ contacts })
  } catch (error) {
    return res.status(500).json({ message: 'Some thing wrongs... Try again with 5 min' })
  }
}

const getContactById = async (req, res) => {
  const id = req.params.contactId
  try {
    const contact = await req.db.contacts.findOne({ _id: ObjectID(id) })
    return res.status(200).json({ contact })
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: 'Not found' })
  }
}

const removeContact = async (req, res) => {
  const id = req.params.contactId
  try {
    await req.db.contacts.deleteOne({ _id: ObjectID(id) })
    return res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

const addContact = async (req, res) => {
  try {
    Joi.assert(req.body, schema)
    const createdContact = await req.db.contacts.insertOne(req.body)
    return res.status(201).json(...createdContact.ops)
  } catch (error) {
    res.status(400).json({ message: 'missing required name field' })
  }
}

const updateContact = async (req, res) => {
  const id = req.params.contactId
  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'missing fields' })
  const { name, email, phone, favorite } = req.body
  try {
    const updateContact = await req.db.contacts.findOneAndUpdate({ _id: ObjectID(id) }, { $set: { name, email, phone, favorite } }, { returnNewDocument: true })
    return res.status(200).json(updateContact.value)
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
}
