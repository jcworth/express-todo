const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../helpers/auth');

// const Task = require('../models/Task');
const taskController = require('../controllers/taskController');

// Index
router.get('/', ensureAuth, taskController.task_list)

module.exports = router;
