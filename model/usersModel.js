const Joi = require('joi')
const User = require('../db/userSchema')
const { signupUserSchema } = require('../validations/signupSchema')
const bcrypt = require('bcrypt')

const saltRounds = 10

const signupUser = async (req, res) => {
  try {
    Joi.assert(req.body, signupUserSchema)
  } catch (error) {
    return res.json({ message: error.details[0].message }).status(400)
  }
  const { password } = req.body
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  try {
    const newUser = new User({ ...req.body, password: hashedPassword })
    const createdUser = await newUser.save({ token: 0 })
    const { subscription, email } = createdUser
    return res.status(201).json({ user: { email, subscription } })
  } catch (error) {
    res.json({
      message: 'Email in use'
    }).status(409)
  }
}

const loginUser = async (req, res) => {
  //
}

module.exports = {
  signupUser,
  loginUser
}

// "{\n  \"password\": \"example3password\",\n  \"email\" [31m[1][0m: \"example3@example.ru\"\n}\n[31m\n[1] \"email\" must be a valid email[0m
