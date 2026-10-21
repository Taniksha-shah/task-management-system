const Task = require('../models/Task');

// GET /api/tasks — 200 on success
async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    next(err);
  }
}

// GET /api/tasks/:id — 200 on success, 404 if not found
async function getTaskById(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      const error = new Error(`Task with id ${req.params.id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

// POST /api/tasks — 201 on creation, 400 on validation failure
async function createTask(req, res, next) {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

// PUT /api/tasks/:id — 200 on success, 404 if not found, 400 on validation failure
async function updateTask(req, res, next) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      const error = new Error(`Task with id ${req.params.id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/tasks/:id — 200 on success, 404 if not found
async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      const error = new Error(`Task with id ${req.params.id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};