// routes/tasks.js

const express = require('express');
const router = express.Router();

// Define routes for tasks
const tasks = [];

// Create a new task
router.post('/', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.json(task);
});

// Get all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// Get a task by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Update a task by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks[index] = { ...tasks[index], ...updatedTask };
  res.json(tasks[index]);
});

// Delete a task by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

module.exports = router;
