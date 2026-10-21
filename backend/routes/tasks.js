const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { cacheTasks, invalidateTasks } = require("../middleware/cache");
const { taskEmitter, sendNotification } = require("../events/taskEvents");

// READ (cached)
router.get("/", cacheTasks, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
// CREATE
router.post("/", invalidateTasks, async (req, res) => {
  try {
    const task = await Task.create(req.body);

    // SYNC demo: POST /tasks?mode=sync -> response waits for the handler
    if (req.query.mode === "sync") {
      await sendNotification(task, "SYNC");
      console.log(`[SYNC]  API response SENT at ${new Date().toISOString()}`);
      return res.status(201).json(task);
    }

    // ASYNC (default): emit the event and respond immediately
    taskEmitter.emit("task-created", task);
    console.log(`[ASYNC] API response SENT at ${new Date().toISOString()}`);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", invalidateTasks, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", invalidateTasks, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;