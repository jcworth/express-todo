const Task = require('../models/Task');
const moment = require('moment');

exports.task_index = function(req, res) {
  Task.find({ owner_id : req.user.id }, (err, tasks) => {
    if (err) {
      console.log(err);
    } else {
      res.render('tasks/index', { tasks })
    };
  })
};

exports.task_show = function(req, res) {
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      console.log(err);
    } else {
      res.render('tasks/show', { task });
    };
  })
};

exports.task_new = function(req, res) {
  res.render('tasks/new');
}

exports.task_create = function(req, res) {
  const { title, description, date_due } = req.body;
  const owner_id = req.user.id;
  let errors = [];

  if (!title || !description || !date_due) {
    errors.push({msg: 'Please complete all fields'});
  };

  if (errors.length > 0) {
    res.render('tasks/new', {
      errors,
      title,
      description,
      date_due
    });
  } else {
    let newTask = new Task({
      title,
      description,
      date_due,
      owner_id
    });
    console.log(newTask);
    newTask.save()
      .then(task => {
        res.redirect('/');
      })
      .catch(err => console.log(err));
  };
};

exports.task_edit = function(req, res) {
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      console.log(err);
    } else {
      res.render('tasks/edit', { task, moment });
    };
  });
};

exports.task_update = async function(req, res) {
  // Post edits from form x
  // Save to database x
  // Redirect to updated task view
  try {
    let task = await Task.findById(req.params.id);
    task.title = req.body.title;
    task.description = req.body.description;
    task.date_due = req.body.date_due;
    task.save((err) => {
      if (err) throw err;
    });
    res.redirect(303, '/tasks/' + task.id);
  } catch(err) {
    console.log(err);
  };
};



exports.task_delete = async function (req, res) {
  // console.log(req.params);
  let task;
  try {
    task = await Task.findById(req.params.id);
    await task.remove();
    console.log('Successfully deleted');
    res.redirect('/tasks');
  } catch {
    if (task == null) {
      console.log('Error: Task not found');
      res.redirect('/tasks')
    } else {
      console.log('Error: Unable to remove from database');
      res.redirect('/tasks')
    };
  };
};
