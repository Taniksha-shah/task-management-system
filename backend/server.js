require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Task Management API is running' });
});

// Public — no token required
app.use('/api/auth', authRoutes);

// Protected — every route inside requires a valid JWT (see routes/taskRoutes.js)
app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
