const mongoose = require('mongoose')

const mongoConnection = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL, {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  console.log('Database connection successful')
}

module.exports = {
  mongoConnection
}
