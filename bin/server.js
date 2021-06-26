const app = require('../app')
require('dotenv').config()
const { mongoConnection } = require('../db/connections')

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await mongoConnection()
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

start()
