let Student = require('../models/Student');

class StudentController {
  static getStudent(req, res) {
    Student.getAllStudents()
    .then(response => {
      res.send(response);
    })
    .catch(err => res.send(err))
  }

  static createStudent(req, res) {
    res.send("create Student Page");
  }

  static getId(req, res) {
    const id = Number(req.params.id);
    Student.getInformation(id)
    .then(response => {
      res.send(response);
    })
    .catch(err => res.send(err))
  }
}

module.exports = StudentController;
