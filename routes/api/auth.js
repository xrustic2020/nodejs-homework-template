const express = require('express')
const router = express.Router()
const { signupUser, loginUser, logoutUser, getCurrentUser, updateSubscription } = require('../../model')
const { authTokenCheck, authUserValidations, subscriptionUserValidation, checkMissingFields } = require('../../middlewares')

router.post('/signup', authUserValidations, signupUser)
router.post('/login', authUserValidations, loginUser)
router.post('/logout', authTokenCheck, logoutUser)
router.get('/current', authTokenCheck, getCurrentUser)
router.patch('/', checkMissingFields, subscriptionUserValidation, authTokenCheck, updateSubscription)

module.exports = router
