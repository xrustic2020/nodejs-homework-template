const express = require('express')
const router = express.Router()
const { signupUser, loginUser, logoutUser, getCurrentUser, updateSubscription } = require('../../model')
const authCheck = require('../../middlewares/authCheck')

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', authCheck, logoutUser)
router.get('/current', authCheck, getCurrentUser)
router.patch('/', authCheck, updateSubscription)

module.exports = router
