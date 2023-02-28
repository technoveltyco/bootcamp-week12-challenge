import Employee from "./Employee.mjs";

/**
 * The Engineer class.
 *
 * @class
 * @classdesc this is the model of an engineer.
 * @extends Employee
 */
class Engineer extends Employee {
  /**
   * The Engineer constructor.
   *
   * @param {String} name
   *    The engineer name.
   * @param {Number} id
   *    The engineer identifier.
   * @param {String} email
   *    The engineer email address.
   * @param {String} github
   *    The engineer github account.
   * @constructor
   */
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    this._role = "Engineer";
  }

  /**
   * Create an instance of an engineer.
   *
   * @param {String} name
   *    The engineer name.
   * @param {Number} id
   *    The engineer identifier.
   * @param {String} email
   *    The engineer email address.
   * @param {String} github
   *    The engineer github account.
   * @returns {Engineer}
   *    An Engineer object.
   * @constructor
   */
  static createEmployee(name, id, email, github) {
    const instance = new Engineer(name, id, email, github);
    return instance;
  }

  /**
   * GitHub getter.
   *
   * @returns {String}
   *    The GitHub account property value.
   * @public
   */
  getGithub() {
    return this.github;
  }
}

export default Engineer;
