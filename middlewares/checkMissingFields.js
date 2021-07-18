const checkMissingFields = (req, res, next) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'missing required fields' })
  next()
}

module.exports = checkMissingFields
