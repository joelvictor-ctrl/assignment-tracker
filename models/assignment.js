const mongoose = require('mongoose');

// Define the fields stored for each assignment.
const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  course: { type: String, required: true, trim: true },
dueDate: { type: Date, required: true },
status: {
  type: String,
  enum: ['To do', 'In progress', 'Done'],
  default: 'To do'
},
notes: { type: String, trim: true }
});

module.exports = mongoose.model('Assignment', assignmentSchema);