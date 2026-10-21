// Global error handler — converts raw Mongoose errors into clean, structured
// JSON instead of leaking Mongoose's internal error objects to the client.
// Must be registered LAST in server.js.

function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let details;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    details = Object.values(err.errors).map((fieldError) => fieldError.message);
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field: ${field}`;
  }

  console.error(`[ERROR] ${new Date().toISOString()} — ${statusCode} — ${message}`);

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(details && { details }),
  });
}

module.exports = errorHandler;