import Manager from "./Manager.mjs";
import Engineer from "./Engineer.mjs";
import Intern from "./Intern.mjs";
import Employee from "./Employee.mjs";

class EmployeeFactory {
  /**
   * Create an instance of the employee given type.
   *
   * @param {String} type
   * @param  {...any} params
   * @returns {Employee}
   *    A Employee object.
   */
  static createEmployee(type, ...params) {
    let instance = null;
    switch (type.toLowerCase()) {
      case "manager":
        instance = Manager.createEmployee(...params);
        break;
      case "engineer":
        instance = new Engineer(...params);
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
