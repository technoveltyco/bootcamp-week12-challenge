import EmployeeFactory from "./EmployeeFactory.mjs";

class Employee {
  static ROLE_ID = "Employee";
  #role;

  constructor(name = "", id = 0, email = "") {
    this.name = name;
    this.id = id;
    this.email = email;
    this.#role = Employee.ROLE_ID;
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
    return this.#role;
  }
}

export default Employee;
