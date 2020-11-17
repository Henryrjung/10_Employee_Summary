// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email, officeNumber);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return 'manager';
    }
}

module.exports = Manager;