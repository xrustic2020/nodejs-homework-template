const MongoClient = require('mongodb').MongoClient
const collections = {}

const getCollections = () => collections

const mongoConnection = async () => {
  const client = await MongoClient.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = client.db()
  console.log('Database connection is success')
  collections.contacts = db.collection('contacts')
}

module.exports = {
  mongoConnection,
  getCollections
}
