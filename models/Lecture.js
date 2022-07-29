const fs = require('fs');

class Lecture {
    constructor(id, name, subject, age, city){
        this.id = id;
        this.name = name;
        this.subject = subject;
        this.age = age;
        this.city = city;
    }

    static create(lecture){
        return new Promise((resolve, reject) => {
            this.getAllLectures()
            .then(result => {
                let lectures = result;
                const id = lectures[lectures.length - 1].id + 1;
                
                const { name, subject, age, city } = lecture;
                
                let lectureClass = new Lecture(id, name, subject, age, city);
                lectures.push(lectureClass);

                this.save(lectures);
                resolve(lectureClass);
            })
            .catch(err => reject(err));
        })
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

    static update(id, lecture){
        return new Promise((resolve, reject) => {
            this.getAllLectures()
            .then(result => {
                let lectures = result;
                const {name, subject, age, city} = lecture;

                lectures = lectures.map(data => {
                    if (data.id === id) {
                        data.name = name;
                        data.subject = subject;
                        data.age = age;
                        data.city = city;
                    }
                    return data;
                });

                this.save(lectures);
                resolve(`id ${id} telah diupdate!`);
            })
            .catch(err => reject(err));
        });
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            this.getAllLectures()
            .then(result => {
                let lectures = result;
                lectures = lectures.filter(lecture => lecture.id !== id);
                
                this.save(lectures);
                resolve(`id ${id} has been deleted!`);
            })
            .catch(err => reject(err));
        });
    }

    static search(searchQuery){
        return new Promise((resolve, reject) => {
            this.getAllLectures()
            .then(result => {
                let lectures = result;
                const {name} = searchQuery;

                let findSearch = lectures.filter(lecture => lecture.name === name);

                resolve(findSearch);

            })
            .catch(err => reject(err));
        });
    }

    static save(lectures){
        fs.writeFileSync('./lectures.json', JSON.stringify(lectures, null, 3));
    }
}

module.exports = Lecture;