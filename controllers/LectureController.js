const Lecture = require('../models/Lecture');

class LectureController {
  static getLecture(req, res) {
    Lecture.getAllLectures()
    .then(result => {
        res.send(result);

    }).catch(err => res.send(err));
  }

  static createLecture(req, res) {
    res.send("create Lecture Page");
  }

  static getId(req, res) {
    const id = Number(req.params.id);

    Lecture.getInformation(id)
    .then(result => {
        res.send(result);
    }).catch(err => res.send(err));

  }

}

module.exports = LectureController;
