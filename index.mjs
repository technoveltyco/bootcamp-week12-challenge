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
 * @type {boolean}
 *    The generated flag.
 */
let generated = false;

/**
 * @type {Array}
 *    The allowed employee types.
 */
const employeesTypes = ["manager", "engineer", "intern"];

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
 * Creates an employee if parameters are validated.
 * It uses the Employee factory method to create the object.
 *
 * @param {String} type
 *    The employee type [manager|engineer|intern]
 * @param {Array} data
 *    The data parameters.
 * @returns {Manager|Engineer|Intern|TypeError}
 *    The allowed employee object, or TypeError otherwise.
 */
function createEmployee(type, ...data) {
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

  return EmployeeFactory.createEmployee(type, ...data);
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

    if (!managerData) {
      throw new Error("No Team Manager data gathered.");
    }

    // Save Team Manager.
    const { name, id, email } = managerData;

    ///
    // Different ways to initialise employees.
    // ----------------------------------------
    // - With Manager constructor:
    // const manager = new Manager(...managerData);
    // - With Manager factory method:
    // const manager = Manager.createEmployee(...managerData);
    // - With EmployeeFactory abstract method:
    // const manager = EmployeeFactory.createEmployee("manager", managerData);
    const manager = createEmployee("manager", name, id, email);
    if (manager instanceof Employee) {
      team.add(manager);
      cli.print(cli.success("✔️ Team Manager created!"));
    }

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
            const engineer = createEmployee(
              "engineer",
              name,
              id,
              email,
              github
            );
            team.add(engineer);
            cli.print(cli.success("✔️ Engineer created!"));
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
            const intern = createEmployee("intern", name, id, email, school);
            team.add(intern);
            cli.print(cli.success("✔️ Intern created!"));
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
        cli.success(
          "✅ Your files are ready at:" +
            `\n 📂 HTML format: ${htmlFilePath}` +
            `\n 📂 ZIP format: ${zipFilePath}` +
            "\nThanks for using our tool 🙏!."
        )
      );
      generated = true;
    }
  } catch (error) {
    cli.printError(error);
    generated = false;
  } finally {
    if (!generated) {
      const answer = await inquirer.prompt([
        {
          type: "confirm",
          name: "tryAgain",
          message: cli.warning(
            "It seems you could not have your report. Do you want to give another try?"
          ),
          default: false,
        },
      ]);
      if (answer.tryAgain) {
        init();
      }
    }
  }
}

///
// Main
///

// function call to initialize program
init();
