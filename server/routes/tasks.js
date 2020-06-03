const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../helpers/auth');

// const Task = require('../models/Task');
const taskController = require('../controllers/taskController');

// Create
router.get('/new', ensureAuth, taskController.task_new);
router.post('/new', ensureAuth, taskController.task_create);

// Read
router.get('/', ensureAuth, taskController.task_index)

// Update

// Delete

module.exports = router;
