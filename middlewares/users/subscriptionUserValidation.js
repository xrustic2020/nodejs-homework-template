const Joi = require('joi')
const { subscriptionUserSchema } = require('../../validations/schemas/subscriptionSchema')

const subscriptionUserValidation = (req, res, next) => {
  try {
    Joi.assert(req.body, subscriptionUserSchema)
    next()
  } catch (error) {
    return res.status(400).json({ message: 'Subscription must be one of the values: [starter, pro, business]' })
  }
}

module.exports = subscriptionUserValidation
