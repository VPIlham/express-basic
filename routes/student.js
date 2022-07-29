const routeStudent = require("express").Router();

const StudentController = require('../controllers/StudentController');

routeStudent.get("/", StudentController.getStudent);

routeStudent.get("/create", StudentController.createStudent); 

routeStudent.get("/information/:id", StudentController.getId);

module.exports = routeStudent;
