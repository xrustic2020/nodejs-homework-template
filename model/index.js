const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const listContacts = async () => {
  const data = await fs.readFile(path.join(__dirname, 'contacts.json'));
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const data = JSON.parse(await fs.readFile(path.join(__dirname, 'contacts.json')));
  return data.find(({ id }) => id === contactId)
}

const removeContact = async (contactId) => {
  const data = JSON.parse(await fs.readFile(path.join(__dirname, 'contacts.json')));
  const isFoundContact = data.find(({ id }) => id === contactId);
  if (isFoundContact) {
    const filteredContacts = data.filter(({ id }) => id !== contactId);
    await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(filteredContacts), 'utf-8');
    return true
  } else {
    return false;
  }
}

const addContact = async (body) => {
  const id = uuidv4();
  const newContact = { id, ...body }

  const contacts = JSON.parse(await fs.readFile(path.join(__dirname, 'contacts.json')));

  contacts.push(newContact)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts), 'utf-8')

  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = JSON.parse(await fs.readFile(path.join(__dirname, 'contacts.json')));
  const isFoundContact = contacts.find(({ id }) => id === contactId);
  if (!isFoundContact) return false;
  const index = contacts.indexOf(isFoundContact);
  contacts.splice(index, 1, body)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts), 'utf-8')
  return body;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
