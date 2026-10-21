const jwt = require('jsonwebtoken');
const User = require('../models/User');

function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
}

// POST /api/auth/register — 201 on success, 400 on bad input, 409 on duplicate
async function register(req, res, next) {
  try {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
      const error = new Error('username, email, and password are all required');
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const error = new Error('A user with that username or email already exists');
      error.statusCode = 409;
      return next(error);
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, username: user.username, email: user.email },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login — 200 on success, 400 on missing fields, 401 on bad credentials
async function login(req, res, next) {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      const error = new Error('username and password are required');
      error.statusCode = 400;
      return next(error);
    }

    // password has `select: false` in the schema, so it must be explicitly requested
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      return next(error);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      return next(error);
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      data: {
        user: { id: user._id, username: user.username, email: user.email },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
