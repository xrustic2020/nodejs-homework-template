const Jimp = require('jimp')
const path = require('path')
const fs = require('fs').promises

const saveUserAvatar = async (tmpPath, avatarURL) => {
  Jimp.read(path.resolve(tmpPath))
    .then(image => {
      return image
        .resize(250, Jimp.AUTO)
        .quality(60)
        .write(avatarURL)
    })
    .catch(err => {
      console.error(err)
    })
  await fs.unlink(tmpPath)
}

module.exports = saveUserAvatar
