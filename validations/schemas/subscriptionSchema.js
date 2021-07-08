const Joi = require('joi')

const subscriptionUserSchema = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .required(),
})

module.exports = {
  subscriptionUserSchema
}
