const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../helpers/auth');

const Task = require('../models/Task');

router.get('/', ensureAuth, (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) {
      console.log(err);
    } else {
      res.render('tasks', {data: tasks, test: 'hi'})
    };
  })
})

module.exports = router;
