const fs = require('fs');

class Lecture {
    constructor(id, name, subject, age, city){
        this.id = id;
        this.name = name;
        this.subject = subject;
        this.age = age;
        this.city = city;
    }

    static getAllLectures(){
        return new Promise((resolve, reject) => {
            fs.readFile('./lectures.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let lectures = JSON.parse(data);
                    lectures = lectures.map(lecture => {
                        const {id, name, subject, age, city} = lecture;
                        return new Lecture(id, name, subject, age, city);
                    });
                    resolve(lectures);
                }
            });
        });
    }

    static getInformation(id){
        return new Promise((resolve, reject) => {
            this.getAllLectures()
            .then(result => {
                let lectures = result;
                let findOneLecture = lectures.filter(data => data.id === id);
                
                if (findOneLecture.length !== 0) {
                    resolve(findOneLecture[0]);    
                } else {
                    throw {
                        message : `Lecturer with id ${id} not found!`
                    }
                }
            }).catch(err => {
                reject(err)
            })
        });
    }
}

module.exports = Lecture;