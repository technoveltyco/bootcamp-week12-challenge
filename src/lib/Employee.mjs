class Employee {
  _role;

  constructor(name = "", id = 0, email = "") {
    this.name = name;
    this.id = id;
    this.email = email;
    this._role = "Employee";
  }

  static createEmployee(name, id, email) {
    const instance = new Employee(name, id, email);
    return instance;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return this._role;
  }
}

export default Employee;
