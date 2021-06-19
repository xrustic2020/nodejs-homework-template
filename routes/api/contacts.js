const express = require('express')
const router = express.Router()
const actions = require('../../model');
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(2)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),

  phone: Joi.required([
    Joi.string(),
    Joi.number()
  ])
})

router.get('/', async (_, res) => {
  try {
    const data = await actions.listContacts()
    return res.status(200).json(data)
  } catch (error) {
    return res.sendStatus(500).json({ message: "Some thing wrongs... Try again with 5 min" })
  }
})

router.get('/:contactId', async (req, res) => {
  const id = req.params.contactId;
  try {
    const data = await actions.getContactById(id);
    if (!data) throw Error();
    return res.status(200).json(data)
  } catch (error) {
    return res.status(404).json({ message: "Not found" })
  }
})

router.post('/', async (req, res) => {
  try {
    Joi.assert(req.body, schema);
    const createdContact = await actions.addContact(req.body);
    return res.status(201).json(createdContact);
  } catch (error) {
    res.status(400).json({ "message": "missing required name field" })
  }
})

router.delete('/:contactId', async (req, res) => {
  const id = req.params.contactId;
  try {
    const data = await actions.removeContact(id);
    if (!data) throw Error();
    return res.status(200).json({ message: "contact deleted" })
  } catch (error) {
    return res.status(404).json({ message: "Not found" })
  }
})

router.put('/:contactId', async (req, res) => {
  const id = req.params.contactId;
  if (!req.body) return res.status(400).json({ message: "missing fields" });
  try {
    const updateContact = await actions.updateContact(id, req.body);
    if (!updateContact) throw Error();
    return res.status(200).json(updateContact)
  } catch (error) {
    return res.status(404).json({ message: "Not found" })
  }
})

module.exports = router
