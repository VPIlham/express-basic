const route = require('express').Router();

route.get("/", (req, res) => {
  res.send("Hello World!");
});

const lectureRoutes = require('./lecture');
const studentRoutes = require('./student');

route.use('/lecturers', lectureRoutes);
route.use('/students', studentRoutes);


module.exports = route;