const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  date_due: {
    type: Date,
    required: true
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
