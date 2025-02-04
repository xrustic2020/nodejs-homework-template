const Joi = require('joi')
const { signupUserSchema } = require('../../validations/schemas/signupSchema')

const authUserValidations = (req, res, next) => {
  try {
    Joi.assert(req.body, signupUserSchema)
    next()
  } catch (error) {
    return res.json({ message: error.details[0].message }).status(400)
  }
}

module.exports = authUserValidations
