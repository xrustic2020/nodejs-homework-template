const Joi = require('joi')

const subscriptionUserSchema = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .required(),

  // password: Joi.string()
  //   .alphanum()
  //   .min(6)
  //   .max(30)
  //   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
  //   .required(),
})
// Joi.

module.exports = {
  subscriptionUserSchema
}
