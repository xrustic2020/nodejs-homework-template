const Joi = require('joi')
const User = require('../db/userSchema')
const { signupUserSchema } = require('../validations/signupSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
  try {
    Joi.assert(req.body, signupUserSchema)
  } catch (error) {
    return res.json({ message: error.details[0].message }).status(400)
  }
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email }, { __v: 0 })
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) throw new Error('Email or password is wrong')
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET)
    await User.updateOne({ email }, { $set: { token } }, { new: true })
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    })
  } catch (error) {
    res.json({ message: error.message }).status(401)
  }
}

module.exports = {
  signupUser,
  loginUser
}
