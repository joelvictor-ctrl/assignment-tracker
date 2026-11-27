var express = require('express');
var router = express.Router();
const assignmentsController = require('../controllers/assignments');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// Load saved assignments from MongoDB and display them.
router.get('/assignments', assignmentsController.listAssignments);
router.get('/assignments/new', assignmentsController.showNewAssignmentForm);
router.get('/assignments/:id/edit', assignmentsController.showEditAssignmentForm);
router.post('/assignments/:id/edit', assignmentsController.updateAssignment);
router.post('/assignments', assignmentsController.createAssignment);
router.get('/assignments/:id/delete', assignmentsController.showDeleteAssignmentForm);
router.post('/assignments/:id/delete', assignmentsController.deleteAssignment);
module.exports = router;
