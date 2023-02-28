/**
 * The Employee class.
 *
 * @class
 * @abstract
 * @classdesc This is the model of an employee. It was designed to be abstract class,
 * and could be implemented using a private isInternalConstructor flag,
 * as it was done in App class.
 */
class Employee {
  /**
   * @protected
   * @type {String}
   *    The employee role.
   */
  _role;

  /**
   * The Employee constructor.
   *
   * @param {String} name
   *    The employee name.
   * @param {Number} id
   *    The employee identifier.
   * @param {String} email
   *    The emaployee email address.
   * @constructor
   */
  constructor(name = "", id = 0, email = "") {
    this.name = name;
    this.id = id;
    this.email = email;
    this._role = "Employee";
  }

  /**
   * Create an instance of an employee.
   * @param {String} name
   *    The employee name
   * @param {Number} id
   *    The employee identifier.
   * @param {String} email
   *    The employee email address.
   * @returns {Employee}
   *    An Employee object.
   * @public
   * @static
   */
  static createEmployee(name, id, email) {
    const instance = new Employee(name, id, email);
    return instance;
  }

  /**
   * Name getter.
   *
   *
   * @returns {String}
   *    The name property value.
   * @public
   */
  getName() {
    return this.name;
  }

  /**
   * ID getter.
   *
   * @public
   * @returns {Number}
   *    The ID property value.
   */
  getId() {
    return this.id;
  }

  /**
   * Email getter.
   *
   * @public
   * @returns {String}
   *    Tme email property value.
   */
  getEmail() {
    return this.email;
  }

  /**
   * Role getter.
   *
   * @public
   * @returns {String}
   *    The employee role.
   */
  getRole() {
    return this._role;
  }
}

export default Employee;
