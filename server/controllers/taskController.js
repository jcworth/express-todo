const Task = require('../models/Task');

exports.task_list = function(req, res) {
  // Task.find({}, (err, tasks) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render('tasks/index', { data: tasks, test: 'hi' })
  //   };
  // })
};

exports.task_detail = function(req, res) {
  // Task.findById(req.params.id)
}

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

exports.task_update_get = function(req, res) {

}

exports.task_update_post = function(req, res) {

}

exports.task_delete_get = function(req, res) {

}

exports.task_delete_post = function (req, res) {

}
