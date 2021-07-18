const express = require('express')
const router = express.Router()
const { signupUser, loginUser, logoutUser, getCurrentUser, updateSubscription, updateAvatar, emailVerification } = require('../../controllers')
const { authTokenCheck, authUserValidations, subscriptionUserValidation, uploadMiddleware, checkMissingFields } = require('../../middlewares')

router.post('/signup', authUserValidations, signupUser)
router.post('/login', authUserValidations, loginUser)
router.post('/logout', authTokenCheck, logoutUser)
router.get('/current', authTokenCheck, getCurrentUser)
router.patch('/', checkMissingFields, subscriptionUserValidation, authTokenCheck, updateSubscription)
router.patch('/avatars', authTokenCheck, uploadMiddleware.single('avatar'), updateAvatar)
router.get('/verify/:verificationToken', emailVerification)

module.exports = router
