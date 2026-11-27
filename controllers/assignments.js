const Assignment = require('../models/assignment');

// Load assignments in due-date order and send them to the view.
async function listAssignments(req, res, next) {
  try {
    const assignments = await Assignment.find().sort({ dueDate: 1 });
    res.render('assignments', { assignments });
  } catch (error) {
    next(error);
  }
}

// Open the Add Assignment form.
function showNewAssignmentForm(req, res) {
  res.render('new-assignment');
}
// Save the new assignment and return to the list.
async function createAssignment(req, res, next) {
  try {
    await Assignment.create({
      title: req.body.title,
      course: req.body.course,
      dueDate: req.body.dueDate,
      status: req.body.status,
      notes: req.body.notes
    });

    res.redirect('/assignments');
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send('Enter a valid title, course, due date, and status.');
    }

    next(error);
  }
}
// Load the selected assignment into the edit form.
async function showEditAssignmentForm(req, res, next) {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).send('Assignment not found.');
    }

    res.render('edit-assignment', { assignment });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send('Invalid assignment ID.');
    }

    next(error);
  }
}

// Save changes to the selected assignment.
async function updateAssignment(req, res, next) {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).send('Assignment not found.');
    }

    assignment.title = req.body.title;
    assignment.course = req.body.course;
    assignment.dueDate = req.body.dueDate;
    assignment.status = req.body.status;
    assignment.notes = req.body.notes;

    await assignment.save();
    res.redirect('/assignments');
  } catch (error) {
    if (error.name === 'CastError' || error.name === 'ValidationError') {
      return res.status(400).send('Check the assignment ID and form values.');
    }

    next(error);
  }
}
// Load the assignment and show the confirmation page.
async function showDeleteAssignmentForm(req, res, next) {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).send('Assignment not found.');
    }

    res.render('delete-assignment', { assignment });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send('Invalid assignment ID.');
    }
    next(error);
  }
}

// Remove the selected assignment when the confirmation form is submitted.
async function deleteAssignment(req, res, next) {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).send('Assignment not found.');
    }

    res.redirect('/assignments');
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send('Invalid assignment ID.');
    }
    next(error);
  }
}
module.exports = {
  listAssignments,
  showNewAssignmentForm,
  createAssignment,
  showEditAssignmentForm,
  updateAssignment,
  showDeleteAssignmentForm,
  deleteAssignment
};