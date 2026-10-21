const express = require('express');
const authenticate = require('../middleware/auth');
const validateTaskInput = require('../middleware/validateTask');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// Every route below requires a valid JWT
router.use(authenticate);

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', validateTaskInput, createTask);
router.put('/:id', validateTaskInput, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
