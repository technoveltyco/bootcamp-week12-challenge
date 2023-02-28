import Employee from "./Employee.mjs";

/**
 * The Intern class.
 *
 * @class
 * @classdesc this is the model of an intern.
 * @extends Employee
 */
class Intern extends Employee {
  /**
   * The Intern constructor.
   *
   * @param {String} name
   *    The intern name.
   * @param {Number} id
   *    The intern identifier.
   * @param {String} email
   *    The intern email address.
   * @param {String} school
   *    The intern school.
   * @constructor
   */
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this._role = "Intern";
  }

  /**
   * Create an instance of an intern.
   *
   * @param {String} name
   *    The intern name.
   * @param {Number} id
   *    The intern identifier.
   * @param {String} email
   *    The intern email address.
   * @param {String} school
   *    The intern school.
   * @returns {Intern}
   *    An Intern object.
   * @public
   * @static
   */
  static createEmployee(name, id, email, school) {
    const instance = new Intern(name, id, email, school);
    return instance;
  }

  /**
   * School getter.
   *
   * @returns {String}
   *    The school property value.
   * @public
   */
  getSchool() {
    return this.school;
  }
}

export default Intern;
