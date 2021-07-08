const Joi = require('joi')

const addedContactSchema = Joi.object({
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

module.exports = {
  addedContactSchema
}
