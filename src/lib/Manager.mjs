import Employee from "./Employee.mjs";

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this._role = "Manager";
  }

  static createEmployee(name, id, email, officeNumber) {
    const instance = new Manager(name, id, email, officeNumber);
    return instance;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
}

export default Manager;
