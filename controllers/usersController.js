const { hashingPassword, signupNewUser, findUser, comparePassword, signToken, updateUserFields } = require('../services')

const signupUser = async (req, res) => {
  const password = await hashingPassword(req.body.password)
  try {
    const { subscription, email } = await signupNewUser(req.body, password)
    return res.status(201).json({ user: { email, subscription } })
  } catch (error) {
    res.json({
      message: 'Email in use'
    }).status(409)
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await findUser({ email })
    if (!user) throw new Error('Email or password is wrong')
    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) throw new Error('Email or password is wrong')
    const token = signToken(user.email, user._id)
    const updatedUser = await updateUserFields({ email }, { token })

    res.status(200).json({ token, user: updatedUser })
  } catch (error) {
    res.json({ message: error.message }).status(401)
  }
}

const logoutUser = async (req, res) => {
  try {
    await updateUserFields({ _id: req.user.id }, { token: null })
    res.sendStatus(204)
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' })
  }
}

const getCurrentUser = async (req, res) => {
  try {
    const user = await findUser({ _id: req.user.id }, { email: 1, subscription: 1, _id: 0 })
    res.status(200).json(user)
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' })
  }
}

const updateSubscription = async (req, res) => {
  const { subscription } = req.body
  try {
    const updateUser = await updateUserFields({ _id: req.user.id }, { subscription })
    return res.status(200).json(updateUser)
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
