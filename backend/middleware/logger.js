// Logs method, URL, and timestamp for every incoming request.
// Registered globally in server.js so it runs before any route handler.

function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = requestLogger;