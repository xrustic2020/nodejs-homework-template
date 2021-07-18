const { hashingPassword, signupNewUser, findUser, comparePassword, signToken, updateUserFields, saveUserAvatar } = require('../services')

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
    if (!user.verify) throw new Error('Please, verify you email')
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
  const { email, subscription } = req.user
  try {
    res.status(200).json({ email, subscription })
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

const updateAvatar = async (req, res) => {
  const { id } = req.user
  const { tmpPath, extension } = req.avatar
  const avatarURL = `public/avatars/${id}.${extension}`
  try {
    saveUserAvatar(tmpPath, avatarURL)
    const updateUser = await updateUserFields({ _id: id }, { avatarURL })
    return res.status(200).json(updateUser)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

const emailVerification = async (req, res) => {
  const verifyToken = req.params.verificationToken
  try {
    await updateUserFields({ verifyToken }, { verifyToken: null, verify: true })
    return res.status(200).json({ message: 'Verification successful' })
  } catch (error) {
    return res.status(404).json({ message: 'User not found' })
  }
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  emailVerification
}
