import Employee from "./Employee.mjs";

/**
 * The Manager class.
 *
 * @class
 * @classdesc this is the model of a manager.
 * @extends Employee
 */
class Manager extends Employee {
  /**
   * The Manager constructor.
   *
   * @param {String} name
   *    The manager name.
   * @param {Number} id
   *    The manager identifier.
   * @param {String} email
   *    The manager email address.
   * @param {Number} officeNumber
   *    The manager office number.
   * @constructor
   */
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this._role = "Manager";
  }

  /**
   * Create an instance of a manager.
   *
   * @param {String} name
   *    The manager name.
   * @param {Number} id
   *    The manager identifier.
   * @param {String} email
   *    The manager email address.
   * @param {Number} officeNumber
   *    The manager office number.
   * @returns {Manager}
   *    A Manager object.
   * @public
   * @static
   */
  static createEmployee(name, id, email, officeNumber) {
    const instance = new Manager(name, id, email, officeNumber);
    return instance;
  }

  /**
   * Office number getter.
   *
   * @returns {Number}
   *    The office number property value.
   * @public
   */
  getOfficeNumber() {
    return this.officeNumber;
  }
}

export default Manager;
