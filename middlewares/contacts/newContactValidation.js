const Joi = require('joi')
const { addedContactSchema } = require('../../validations/schemas/contactsSchema')

const newContactValidation = (req, res, next) => {
  try {
    Joi.assert(req.body, addedContactSchema)
    next()
  } catch (error) {
    res.status(400).json({ message: error.details[0].message })
  }
}

module.exports = newContactValidation
