import Team from "../lib/Team.mjs";
import Employee from "../lib/Employee.mjs";

function toBeStrictEmployeesEqual(receivedEmployees, expectedEmployees) {
  expect(receivedEmployees.length).toBe(expectedEmployees.length);

  let index = 0;
  for (const receivedEmployee of receivedEmployees) {
    const expectedEmployee = expectedEmployees[index++];

    expect(receivedEmployee).toBeInstanceOf(Employee);
    expect(receivedEmployee).toStrictEqual(expectedEmployee);
  }
}

describe("Team", () => {
  it("should initialise employees as empty array in default contructor", () => {
    const expectedEmployees = [];
    const receivedEmployees = new Team().getAll();

    expect(receivedEmployees).toStrictEqual(expectedEmployees);
  });

  it("should initialise employees as empty when given array does not contain Employee objects in contructor per value", () => {
    const inputEmployees = [1, 2, 3, 4, 5];
    const expectedEmployees = [];
    const receivedEmployees = new Team(inputEmployees).getAll();

    expect(receivedEmployees).toStrictEqual(expectedEmployees);
  });

  it("should initialise employees with given array of Employee objects in contructor per value", () => {
    const inputEmployees = [new Employee(), new Employee(), new Employee()],
      expectedEmployees = inputEmployees;
    const receivedEmployees = new Team(inputEmployees).getAll();

    toBeStrictEmployeesEqual(receivedEmployees, expectedEmployees);
  });

  it("should get the Employee object at the given index position, when index is integer and inside the array length", () => {
    const inputEmployees = [new Employee(), new Employee(), new Employee()],
      expectedEmployees = inputEmployees,
      numItems = inputEmployees.length;
    const employees = new Team(inputEmployees);
    const receivedEmployees = [];
    for (let index = 0; index < numItems; index++) {
      receivedEmployees.push(employees.get(index));
    }

    toBeStrictEmployeesEqual(receivedEmployees, expectedEmployees);
  });

  it("should not get a Employee object when the given index position is out of boundary of the array length", () => {
    const inputEmployees = [new Employee(), new Employee(), new Employee()],
      indexOutOfBoundary = inputEmployees.length;
    const receivedEmployee = new Team(inputEmployees).get(indexOutOfBoundary);

    expect(receivedEmployee).not.toBeInstanceOf(Employee);
    expect(receivedEmployee).toBeUndefined();
  });

  it("should not get a Employee object when the given index position is not an integer", () => {
    const inputEmployees = [new Employee(), new Employee(), new Employee()],
      noValidIndex = "foo";
    const receivedEmployee = new Team(inputEmployees).get(noValidIndex);

    expect(receivedEmployee).not.toBeInstanceOf(Employee);
    expect(receivedEmployee).toBeUndefined();
  });

  it("should add a given Employee object at the end of the array", () => {
    const initEmployees = [new Employee()],
      inputEmployee = new Employee(),
      expectedEmployee = inputEmployee,
      lastIndex = initEmployees.length;
    const receivedEmployee = new Team(initEmployees)
      .add(inputEmployee)
      .get(lastIndex);

    expect(receivedEmployee).toBeInstanceOf(Employee);
    expect(receivedEmployee).toStrictEqual(expectedEmployee);
  });

  it("should not add a given team which is not a Employee object", () => {
    const initEmployees = [new Employee()],
      inputEmployee = 1,
      lastIndex = initEmployees.length;
    const receivedEmployee = new Team(initEmployees)
      .add(inputEmployee)
      .get(lastIndex);

    expect(receivedEmployee).not.toBeInstanceOf(Employee);
    expect(receivedEmployee).toBeUndefined();
  });

  it("should remove a given Employee object that is in the array", () => {
    const inputEmployee = new Employee(),
      initEmployee1 = new Employee(),
      initEmployee2 = new Employee(),
      initEmployees = [initEmployee1, inputEmployee, initEmployee2],
      expectedEmployees = [initEmployee1, initEmployee2];
    const receivedEmployees = new Team(initEmployees)
      .remove(inputEmployee)
      .getAll();

    toBeStrictEmployeesEqual(receivedEmployees, expectedEmployees);
  });

  it("should not remove a given Employee object that is not in the array", () => {
    const inputEmployee = new Employee(),
      initEmployee1 = new Employee(),
      initEmployee2 = new Employee(),
      initEmployees = [initEmployee1, initEmployee2],
      expectedEmployees = [initEmployee1, initEmployee2];
    const receivedEmployees = new Team(initEmployees)
      .remove(inputEmployee)
      .getAll();

    expect(receivedEmployees).not.toContain(inputEmployee);
    toBeStrictEmployeesEqual(receivedEmployees, expectedEmployees);
  });

  it("should not remove a given team which is not a Employee object", () => {
    const inputEmployee = 1,
      initEmployee1 = new Employee(),
      initEmployee2 = new Employee(),
      initEmployees = [initEmployee1, initEmployee2],
      expectedEmployees = [initEmployee1, initEmployee2];
    const receivedEmployees = new Team(initEmployees)
      .remove(inputEmployee)
      .getAll();

    expect(receivedEmployees).not.toContain(inputEmployee);
    toBeStrictEmployeesEqual(receivedEmployees, expectedEmployees);
  });

  it("should set the array empty when called clear()", () => {
    const initEmployees = [new Employee(), new Employee(), new Employee()];
    const expectedEmployees = [];
    const receivedEmployees = new Team(initEmployees).clear().getAll();

    expect(receivedEmployees).toStrictEqual(expectedEmployees);
  });
});
