const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = (req, res, next) => {
  // Get token
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];
  // Check if token exists
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ msg: 'Token is invalid' });
  }
};

module.exports = verifyToken;
