import Employee from "./Employee.mjs";

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this._role = "Intern";
  }

  static createEmployee(name, id, email, school) {
    const instance = new Intern(name, id, email, school);
    return instance;
  }

  getSchool() {
    return this.school;
  }
}

export default Intern;
