const checkMissingFields = (req, res, next) => {
  console.log('Missing fileds validation middleware - - -') // for testing only

  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'missing fields' })
  next()
}

module.exports = checkMissingFields
