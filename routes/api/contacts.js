const express = require('express')
const router = express.Router()
const actions = require('../../model')
const getCollectionsMiddleware = require('../../middlewares/databaseConnection')

router.use(getCollectionsMiddleware)

router.get('/', actions.listContacts)
router.get('/:contactId', actions.getContactById)
router.post('/', actions.addContact)
router.delete('/:contactId', actions.removeContact)

router.put('/:contactId', actions.updateContact)

module.exports = router
