const jwt = require('jsonwebtoken');

// Verifies a Bearer JWT on protected routes. On success, attaches the
// decoded payload (id, username) to req.user for downstream handlers.
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('No token provided. Access denied.');
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const error = new Error(
      err.name === 'TokenExpiredError'
        ? 'Token has expired. Please log in again.'
        : 'Invalid token. Access denied.'
    );
    error.statusCode = 401;
    next(error);
  }
}

module.exports = authenticate;
