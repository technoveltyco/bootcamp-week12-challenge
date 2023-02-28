import Manager from "./Manager.mjs";
import Engineer from "./Engineer.mjs";
import Intern from "./Intern.mjs";
import Employee from "./Employee.mjs";

/**
 * The EmployeeFactory class.
 *
 * @class
 * @classdesc this class is abstract factory pattern to create Employee classes.
 */
class EmployeeFactory {
  /**
   * Create an instance of the employee given type.
   *
   * @param {String} type
   *    The type of employee.
   * @param  {...any} params
   *    The data parameters to initialise the employee.
   * @returns {Employee}
   *    An Employee object.
   * @public
   * @static
   */
  static createEmployee(type, ...params) {
    let instance = null;
    switch (type.toLowerCase()) {
      case "manager":
        instance = Manager.createEmployee(...params);
        break;
      case "engineer":
        instance = Engineer.createEmployee(...params);
        break;
      case "intern":
        instance = Intern.createEmployee(...params);
        break;
      case "employee":
      default:
        instance = Employee.createEmployee(...params);
        break;
    }
    return instance;
  }
}

export default EmployeeFactory;
