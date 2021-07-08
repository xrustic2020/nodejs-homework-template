const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../../controllers')

const { newContactValidation, checkMissingFields } = require('../../middlewares')

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', newContactValidation, addContact)
router.patch('/:contactId/favorite', checkMissingFields, updateStatusContact)
router.delete('/:contactId', removeContact)
router.put('/:contactId', checkMissingFields, updateContact)

module.exports = router
