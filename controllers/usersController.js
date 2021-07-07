const Joi = require('joi')
const User = require('../db/userSchema')
const { signupUserSchema } = require('../validations/signupSchema')
const { subscriptionUserSchema } = require('../validations/subscriptionSchema')
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

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { $set: { token: null } }, { new: true })
    res.sendStatus(204)
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' })
  }
}

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }, { email: 1, subscription: 1, _id: 0 })
    res.status(200).json(user)
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' })
  }
}

const updateSubscription = async (req, res) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'missing fields "subscription"' })
  try {
    Joi.assert(req.body, subscriptionUserSchema)
  } catch (error) {
    return res.status(400).json({ message: 'Subscription must be one of the values: "starter", "pro" or "business"' })
  }
  const { subscription } = req.body
  try {
    const updatedUserSubscription = await User.findOneAndUpdate({ _id: req.user.id }, { $set: { subscription } }, { new: true })
    return res.status(200).json({ email: updatedUserSubscription.email, subscription: updatedUserSubscription.subscription })
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription
}
