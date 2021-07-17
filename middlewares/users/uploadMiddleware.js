const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('tmp'))
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.')
    req.avatar = {
      tmpPath: `tmp/${file.originalname}`,
      extension
    }
    cb(null, file.originalname)
  }
})

const uploadMiddleware = multer({ storage })

module.exports = uploadMiddleware
