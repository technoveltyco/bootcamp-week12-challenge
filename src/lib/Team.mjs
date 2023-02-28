import Employee from "./Employee.mjs";

/**
 * The Team class.
 *
 * @class
 * @classdesc This class contains an array of Employee objects,
 * and implements the Iterator API to allow be accessed using loops.
 */
class Team {
  /**
   * @private
   * @type {Array}
   *    The employees container iterator.
   */
  #employees;

  /**
   * The Team constructor.
   *
   * @param {Array} employees
   *    A employees container to initialise with.
   */
  constructor(employees = []) {
    this.init(employees);
  }

  /**
   * Initialise the employees container.
   *
   * @param {Array}
   *    A employees container to initialise.
   * @returns {this}
   *    this reference.
   */
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

  /**
   * Gets the employees container.
   *
   * @returns {Array}
   *    The employees container.
   */
  getAll() {
    return this.#employees;
  }

  /**
   * Gets access to an Employee element in the container by a given index.
   *
   * @param {integer} index
   *    The index in the employees array.
   * @returns {Employee}
   *    The correspondent Employee object.
   */
  get(index) {
    let employee = undefined;
    if (Number.isInteger(index) && index < this.#employees.length) {
      employee = this.#employees[index];
    }
    return employee;
  }

  /**
   * Add a given Employee at the end of the container.
   *
   * @param {Employee} employee
   *    A team object to add.
   * @returns {this}
   *    this reference.
   */
  add(employee) {
    if (employee instanceof Employee) {
      this.#employees.push(employee);
    }
    return this;
  }

  /**
   * Removes a given Employee from the container.
   *
   * @param {Employee} employee
   *    An Employee object to remove.
   * @returns {this}
   *    this reference.
   */
  remove(employee) {
    if (employee instanceof Employee) {
      this.#employees = this.#employees.filter(
        (employeeArr) => employeeArr !== employee
      );
    }
    return this;
  }

  /**
   * Clears the container, leaving it empty.
   *
   * @returns {this}
   *    this reference.
   */
  clear() {
    this.#employees = [];
    return this;
  }

  /**
   * Implements the iterator for the container.
   *
   * @returns {{done: boolean, value?: Team}}
   *    An object to be used by Symbol.iterator API.
   */
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
