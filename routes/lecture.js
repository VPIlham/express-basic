const lectureRoute = require("express").Router();

const LectureController = require('../controllers/LectureController');

lectureRoute.get("/", LectureController.getLecture);

lectureRoute.get("/create", LectureController.createLecture); 

lectureRoute.get("/information/:id", LectureController.getId);

module.exports = lectureRoute;
