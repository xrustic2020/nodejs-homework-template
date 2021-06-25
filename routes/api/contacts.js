const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../../model')

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', addContact)
router.patch('/:contactId/favorite', updateStatusContact)
router.delete('/:contactId', removeContact)
router.put('/:contactId', updateContact)

module.exports = router
