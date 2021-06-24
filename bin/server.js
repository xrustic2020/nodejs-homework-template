const app = require('../app')
require('dotenv').config()
const { mongoConnection } = require('../db/connections')

const PORT = process.env.PORT || 3000

const start = async () => {
  await mongoConnection()

  app.listen(PORT, (err) => {
    if (err) console.log(`Error at server launch ${err}`)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}

start()
