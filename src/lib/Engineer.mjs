import Employee from "./Employee.mjs";

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    this._role = "Engineer";
  }

  static createEmployee(name, id, email, github) {
    const instance = new Engineer(name, id, email, github);
    return instance;
  }

  getGithub() {
    return this.github;
  }
}

export default Engineer;
