const Joi = require('joi')

const signupUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),

  password: Joi.string()
    .alphanum()
    .min(6)
    .max(30)
    .required(),
})

module.exports = {
  signupUserSchema
}
