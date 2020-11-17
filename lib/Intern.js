// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./employee');

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email, github);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'intern';
    }
}

module.exports = Intern;