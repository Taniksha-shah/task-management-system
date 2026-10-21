// Rejects malformed task input before it ever reaches the controller or
// the database. This is a first line of defense in addition to the
// Mongoose schema validation from Practical 5 — bad requests are caught
// here with a fast, explicit 400 rather than relying solely on Mongoose.

function validateTaskInput(req, res, next) {
  const body = req.body || {};
  const isUpdate = req.method === 'PUT';

  // On create, title is required. On update, only validate title if the
  // caller actually included it (partial updates, e.g. just { completed: true }, are allowed).
  if (!isUpdate || body.title !== undefined) {
    if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
      const error = new Error('Title is required and must be a non-empty string');
      error.statusCode = 400;
      return next(error);
    }
  }

  if (body.description !== undefined && typeof body.description !== 'string') {
    const error = new Error('Description must be a string');
    error.statusCode = 400;
    return next(error);
  }

  if (body.completed !== undefined && typeof body.completed !== 'boolean') {
    const error = new Error('completed must be a boolean');
    error.statusCode = 400;
    return next(error);
  }

  next();
}

module.exports = validateTaskInput;
