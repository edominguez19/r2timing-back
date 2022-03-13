const { verify } = require('../libs/auth')

module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'] || req.headers['authorization']
  if (!token) return res.status(401).send('Access denied. No token provided.')
  try {
    req.user = verify(token.split(' ')[1])
    next()
  } catch (ex) {
    res.status(401).send('Invalid token.')
  }
}
