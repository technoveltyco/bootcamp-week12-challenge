///
// App models.
///
import App from "./src/App.mjs";
import Team from "./src/lib/Team.mjs";
import Employee from "./src/lib/Employee.mjs";
import EmployeeFactory from "./src/lib/EmployeeFactory.mjs";

///
// Node & Utils modules.
///
import inquirer from "inquirer";
import * as cli from "./src/utils/cli-theme.mjs";
import { menu, menuQuestions, questions } from "./src/utils/inquirer-utils.mjs";
import render from "./src/utils/page-template.mjs";
import {
  fileSettings,
  writeToFile,
  compressToFile,
} from "./src/utils/file-utils.mjs";

/**
 * @type {Array}
 *    The allowed employee types.
 */
const employeesTypes = Object.keys(menu).filter((type) => type !== "finish");

/**
 * Prompt the main menu options.
 *
 * @returns {Promise}
 *    The inquirer object.
 */
function promptMenu() {
  // Clear screen each time the menu is prompted.
  cli.clear();

  return inquirer
    .prompt(menuQuestions)
    .then((answers) => answers)
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        throw new Error(
          "Prompt couldn't be rendered in the current environment."
        );
      } else {
        // Something else went wrong
        throw error;
      }
    });
}

/**
 * Prompt employee questions.
 *
 * @param {[Object]} questions
 *    A list of questions.
 * @returns {Promise}
 *    The inquirer object.
 */
function promptEmployeeQuestions(questions, employee = "Employee") {
  cli.clear();
  cli.print(`Please enter the details for the ${cli.em(employee)}:`);

  return inquirer
    .prompt(questions)
    .then((answers) => {
      if (!answers) {
        const noAnswersError = `❌ Sorry I could not fetch the details for the ${employee}.`;
        if (employee === "Team Manager") {
          // Fatal error
          throw new Error(noAnswersError);
        } else {
          // Recoverable error.
          cli.notify(noAnswersError);
        }
      }
      return answers;
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        throw new Error(
          "Prompt couldn't be rendered in the current environment."
        );
      } else {
        // Something else went wrong
        throw error;
      }
    });
}

/**
 * Creates an employee if parameters are validated, and add it to the team.
 * It uses the Employee factory method to create the object.
 *
 * @param {Team} team
 *    The team where the employee is added.
 * @param {String} type
 *    The employee type [manager|engineer|intern]
 * @param {Array} data
 *    The data parameters.
 */
function addEmployeeIntoTeam(team, type, ...data) {
  if (!employeesTypes.includes(type)) {
    throw new TypeError(
      `${type} is not a valid employee type. Allowed: ${employeesTypes}.`
    );
  }

  if (typeof data !== "object") {
    throw new TypeError(
      "The employee data must be an object with the correct keys."
    );
  }

  ///
  // Examples of different ways to initialise employees/manager/engineer/intern.
  // ------------------------------------------------------------------------------
  // - With constructor:
  // const employee = new Employee(...data);
  // - With factory method:
  // const employee = Employee.createEmployee(...data);
  // - With abstract factory method: (the one used here)
  // const employee = EmployeeFactory.createEmployee("manager", ...data);
  const employee = EmployeeFactory.createEmployee(type, ...data);
  if (employee instanceof Employee) {
    team.add(employee);
    cli.notify(`✔️ ${menu[type]} added to the Team!`);
  } else {
    cli.notify(`⚠️ Sorry ${menu[type]} could not be created :-(`);
  }

  // Delay 2 seconds
  cli.sleep(2);
}

/**
 * function to initialize program
 */
async function init() {
  try {
    const app = App.getInstance();
    if (!app) {
      throw TypeError("App not instantiated.");
    }

    // Set file settings.
    // Not really used, but can be used for debugging purposes.
    app.setSettings(fileSettings);

    // Create a new Team
    const team = new Team();
    app.getTeams().add(team);

    // Prompt Team Manager.
    const managerData = await promptEmployeeQuestions(
      questions.manager,
      menu.manager
    );

    // Save Team Manager.
    const { name, id, email, officeNumber } = managerData;
    addEmployeeIntoTeam(team, "manager", name, id, email, officeNumber);

    let option = 0;
    while (option < 3) {
      const { choice } = await promptMenu();

      // Process chosen option.
      switch (choice) {
        // Add an Engineer
        case "Add an Engineer":
          option = 1;

          const engineerData = await promptEmployeeQuestions(
            questions.engineer,
            menu.engineer
          );
          if (engineerData) {
            const { name, id, email, github } = engineerData;
            addEmployeeIntoTeam(team, "engineer", name, id, email, github);
          }
          break;
        // Add an Intern
        case "Add an Intern":
          option = 2;

          const internData = await promptEmployeeQuestions(
            questions.intern,
            menu.intern
          );
          if (internData) {
            const { name, id, email, school } = internData;
            addEmployeeIntoTeam(team, "intern", name, id, email, school);
          }
          break;
        // Finish building the Team
        case "Finish building the Team":
        default:
          option = 3;
          break;
      }
    }

    // Generate and compress HTML report.
    const htmlFilePath = app.getSetting("outputPath"),
      zipFilePath = app.getSetting("outputPathCompress");

    const html = render(team.getAll());
    if (writeToFile(html)) {
      compressToFile([htmlFilePath]);

      // Notify to user of HTML an Zip filepaths.
      cli.print(
        cli.success("✔️ Your files are ready at:") +
          `\n 📂 ${cli.label("HTML format:")} ${htmlFilePath}` +
          `\n 📂 ${cli.label("ZIP format:")} ${zipFilePath}` +
          cli.success("\n\n🙏 Thanks for using our tool!.")
      );
    }
  } catch (error) {
    cli.printError(`❌ ${error}`);
  }
}

///
// Main
///

// function call to initialize program
init();
