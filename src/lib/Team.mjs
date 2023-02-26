import Employee from "./Employee.mjs";

class Team {
  #employees;

  constructor(employees = []) {
    this.init(employees);
  }

  init(employees) {
    this.#employees = [];

    if (employees instanceof Array) {
      for (let index = 0; index < employees.length; index++) {
        const employee = employees[index];
        if (employee instanceof Employee) {
          this.#employees.push(employee);
        }
      }
    }

    return this;
  }

  getAll() {
    return this.#employees;
  }

  get(index) {
    let employee = undefined;
    if (Number.isInteger(index) && index >= this.#employees.length) {
      employee = this.#employees[index];
    }
    return employee;
  }

  add(employee) {
    if (employee instanceof Employee) {
      this.#employees.push(employee);
    }
    return this;
  }

  remove(employee) {
    if (employee instanceof Employee) {
      this.#employees = this.#employees.filter(
        (employeeArr) => employeeArr !== employee
      );
    }
    return this;
  }

  clear() {
    this.#employees = [];
    return this;
  }

  [Symbol.iterator]() {
    let [current, end, employees] = [
      0,
      this.#employees.length,
      this.#employees,
    ];
    return {
      next() {
        if (current < end) {
          return { value: employees[current++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

export default Team;
