import EmployeeFactory from "../lib/EmployeeFactory";
import Manager from "../lib/Manager";
import Engineer from "../lib/Engineer";
import Intern from "../lib/Intern";
import Employee from "../lib/Employee";

test('createEmployee("manager", ...) should be instance of Manager', () => {
  const type = "manager";
  const params = ["Foo", 1, "test@test.com", 100];
  const expected = Manager;
  const instance = EmployeeFactory.createEmployee(type, ...params);
  expect(instance).toBeInstanceOf(expected);
});

test('createEmployee("engineer", ...) should be instance of Engineer', () => {
  const type = "engineer";
  const params = ["Foo", 1, "test@test.com", "GitHubUser"];
  const expected = Engineer;
  const instance = EmployeeFactory.createEmployee(type, ...params);
  expect(instance).toBeInstanceOf(expected);
});

test('createEmployee("intern", ...) should be instance of Intern', () => {
  const type = "intern";
  const params = ["Foo", 1, "test@test.com", "GitHubUser"];
  const expected = Intern;
  const instance = EmployeeFactory.createEmployee(type, ...params);
  expect(instance).toBeInstanceOf(expected);
});

test('createEmployee("employee", ...) should be instance of Employee', () => {
  const type = "employee";
  const params = ["Foo", 1, "test@test.com"];
  const expected = Employee;
  const instance = EmployeeFactory.createEmployee(type, ...params);
  expect(instance).toBeInstanceOf(expected);
});

test('createEmployee("foo", ...) should be instance of Employee', () => {
  const type = "foo";
  const params = ["Foo", 1, "test@test.com", "GitHubUser", "anotherparam"];
  const expected = Employee;
  const instance = EmployeeFactory.createEmployee(type, ...params);
  expect(instance).toBeInstanceOf(expected);
});
