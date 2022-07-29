const fs = require("fs");

class Student {
  constructor(id, name, major, semester, city) {
    this.id = id;
    this.name = name;
    this.major = major;
    this.semester = semester;
    this.city = city;
  }

  static getAllStudents(){
    return new Promise((resolve, reject) => {
        fs.readFile('./students.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let students = JSON.parse(data);
                resolve(students);
            }
        });
    });
  }
  
  static getInformation(id){
    return new Promise((resolve, reject) => {
        this.getAllStudents()
        .then(res => {
            let filterData = res.filter(data => data.id === id);
            if (filterData.length != 0) {
                resolve(filterData);
            } else {
                throw {
                    "message" : `id ${id} tidak ada datanya`
                }
            }
        }).catch(err => reject(err));
    });
  }
}

module.exports = Student;
