///
// Inquirer utils and helpers.
///

import { bold, italic, em, label, link, warning } from "./cli-theme.mjs";

/**
 * The filter functions.
 *
 * @type {Object}
 */
const filters = {};

/**
 * The transformers functions.
 *
 * @type {Object}
 */
const transformers = {};

/**
 * The validator error messages.
 *
 * @type {Object}
 */
const validatorConstraints = {
  isNotEmpty: "The @field should be a non empty @type value.",
  isCharMin: "The @field should be at least @min characters.",
  isCharMax: "The @field should be up to @max characters.",
  isNum: "The @field should be a valid number.",
  isNumInt: "The @field should be a integer number.",
  isNumMin: "The @field should be a number of at least @min digits.",
  isNumMax: "The @field should be a number of up to @max digits.",
  isId: "The @field should be with the correct formatting." + "@constraints",
  isEmail:
    "The @field should be a valid email format.\n" +
    `To learn more about a valid email address, please check it out at ${link(
      "Email Standard RFC 5321",
      "https://en.wikipedia.org/wiki/Email_address"
    )}.`,
};

/**
 * Validates the input is not empty.
 *
 * @param {String} input
 *    The inquirer input.
 * @param {String} fieldName
 *    The field name.
 * @param {Sgtring} fieldType
 *    The field data type.
 * @returns {boolean|String}
 *    The validation flag, or validation error message.
 */
function isNotEmpty(input, fieldName = "field", fieldType = "") {
  if (input.length === 0) {
    const message = validatorConstraints.isNotEmpty
      .replace("@field", fieldName)
      .replace("@type", fieldType);
    return warning(message);
  }
  return true;
}

/**
 * Validates the input has min characters or more.
 *
 * @param {String} input
 *    The inquirer input.
 * @param {Number} min
 *    The minimun number of characters.
 * @param {String} fieldName
 *    The field name.
 * @returns {boolean|String}
 *    The validation flag, or validation error message.
 */
function isCharMin(input, min = 1, fieldName = "field") {
  if (input.length < min) {
    const message = validatorConstraints.isCharMin
      .replace("@field", fieldName)
      .replace("@min", min);
    return warning(message);
  }
  return true;
}

/**
 * Validates the input has max characters or less.
 *
 * @param {String} input
 *    The inquirer input.
 * @param {Number} max
 *    The max number of characters.
 * @param {String} fieldName
 *    The field name.
 * @returns {boolean}
 *    The validation flag, or validation error message.
 */
function isCharMax(input, max = 1, fieldName = "field") {
  if (input.length > max) {
    const message = validatorConstraints.isCharMax
      .replace("@field", fieldName)
      .replace("@max", max);
    return warning(message);
  }
  return true;
}

/**
 * Validates the input can be parsed as a valid Number object.
 *
 * @param {String} input
 *    The inquirer input.
 * @param {String} fieldName
 *    The field name.
 * @returns {boolean}
 *    The validation flag, or validation error message.
 */
function isNum(input, fieldName = "field") {
  if (typeof Number(input) !== "number") {
    const message = validatorConstraints.isNum.replace("@field", fieldName);
    return warning(message);
  }
  return true;
}

/**
 * Validates the input can be parsed as a valid integer number.
 *
 * @param {String} input
 *    The inquirer input.
 * @param {String} fieldName
 *    The field name.
 * @returns {boolean}
 *    The validation flag, or validation error message.
 */
function isNumInt(input, fieldName = "field") {
  if (typeof Number.parseInt(input) !== "number") {
    const message = validatorConstraints.isNumInt.replace("@field", fieldName);
    return warning(message);
  }
  return true;
}

/**
 * Validates the input is a number with min digits or more.
 *
 * @param {String} input
 *    The inquirer input.
 * @param {Number} min
 *    The minimun number of digits.
 * @param {String} fieldName
 *    The field name.
 * @returns {boolean|String}
 *    The validation flag, or validation error message.
 */
function isNumMin(input, min = 1, fieldName = "field") {
  const isNumResult = isNum(input, fieldName);
  if (isNumResult !== true) {
    return isNumResult;
  } else if (input.length < min) {
    const message = validatorConstraints.isNumMin
      .replace("@field", fieldName)
      .replace("@min", min);
    return warning(message);
  }
  return true;
}

/**
 * Validates the input is a number with max digits or less.
 *
 * @param {String} input
 *    The inquirer input.
 * @param {Number} max
 *    The max number of digits.
 * @param {String} fieldName
 *    The field name.
 * @returns {boolean}
 *    The validation flag, or validation error message.
 */
function isNumMax(input, max = 1, fieldName = "field") {
  const isNumResult = isNum(input, fieldName);
  if (isNumResult !== true) {
    return isNumResult;
  } else if (input.length > max) {
    const message = validatorConstraints.isNumMax
      .replace("@field", fieldName)
      .replace("@max", max);
    return warning(message);
  }
  return true;
}

/**
 * Validates the input has the given ID formatting.
 *
 * @param {String} input
 *    The inquirer input.
 * @param {String|RegExp} regex
 *    The regex to validate the id format.
 * @param {String} fieldName
 *    The field name.
 * @param {String} fieldConstraints
 *    The field formatting constraints.
 * @returns {boolean}
 *    The validation flag, or validation error message.
 */
function isId(input, regex, fieldName = "field", fieldConstraints = "") {
  const idRegex = new RegExp(regex, "gm");
  const valid = idRegex.test(input);
  if (!valid) {
    const message = validatorConstraints.isId
      .replace("@field", fieldName)
      .replace("@constraints", fieldConstraints);
    return warning(message);
  }
  return true;
}

/**
 * Validates the input has the given email formatting.
 *
 * @param {String} input
 *    The inquirer input.
 * @param {String} fieldName
 *    The field name.
 * @param {String|RegExp} regex
 *    The regex to validate the email format.
 * @returns {boolean}
 *    The validation flag, or validation error message.
 */
function isEmail(
  input,
  fieldName = "field",
  regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
) {
  const idRegex = new RegExp(regex, "gm");
  const valid = idRegex.test(input);
  if (!valid) {
    const message = validatorConstraints.isEmail.replace("@field", fieldName);
    return warning(message);
  }
  return true;
}

/**
 * The validator functions.
 *
 * @type {Object}
 */
const validators = {
  isNotEmpty,
  isCharMin,
  isCharMax,
  isNum,
  isNumInt,
  isNumMin,
  isNumMax,
  isId,
  isEmail,
};

/**
 * The common questions for all employees.
 *
 * @type {[Object]}
 */
const employeeQuestions = [
  // Name
  {
    type: "input",
    name: "name",
    message: label("Name 📛:"),
    validate: function (input) {
      const min = 3,
        max = 100,
        fieldNameFormatted = bold("Name");

      const notEmptyResult = validators.isNotEmpty(
        input,
        fieldNameFormatted,
        "string"
      );
      const isCharMinResult = validators.isCharMin(
        input,
        min,
        fieldNameFormatted
      );
      const isCharMaxResult = validators.isCharMax(
        input,
        max,
        fieldNameFormatted
      );

      if (notEmptyResult !== true) {
        return notEmptyResult;
      } else if (isCharMinResult !== true) {
        return isCharMinResult;
      } else if (isCharMaxResult !== true) {
        return isCharMaxResult;
      }

      return true;
    },
  },
  // Employee ID
  {
    type: "input",
    name: "id",
    message: label("Identifier 🆔:"),
    validate: function (input) {
      const regex = /^\d{3,6}$/,
        fieldNameFormatted = bold("ID"),
        fieldConstraintsFormatted =
          bold("\nConstraints:") +
          italic("\n- The ID should be a valid integer number.") +
          italic("\n- The ID should be a number of at least 3 digits.") +
          italic("\n- The ID should be a number up to 6 digits.");

      const isIdResult = validators.isId(
        input,
        regex,
        fieldNameFormatted,
        fieldConstraintsFormatted
      );
      if (isIdResult !== true) {
        return isIdResult;
      }

      return true;
    },
  },
  // Email address
  {
    type: "input",
    name: "email",
    message: label("Email 📧:"),
    validate: function (input) {
      const fieldNameFormatted = bold("Email");

      const isEmailResult = validators.isEmail(input, fieldNameFormatted);
      if (isEmailResult !== true) {
        return isEmailResult;
      }

      return true;
    },
  },
];

/**
 * The questions by employee type.
 *
 * @type {{ manager: [Object], engineer: [Object], intern: [Object] }}
 */
const questions = {
  manager: [
    // Name, Employee ID, Email address, ...
    ...employeeQuestions,
    // ... and Office Number.
    {
      type: "input",
      name: "officeNumber",
      message: label("Office Number 🏢:"),
      validate: function (input) {
        const regex = /^\d{1,3}$/,
          fieldNameFormatted = bold("Office Number"),
          fieldConstraintsFormatted =
            bold("\nConstraints:") +
            italic("\n- The Office Number should be a valid integer number.") +
            italic(
              "\n- The Office Number should be a number of at least 1 digit."
            ) +
            italic("\n- The Office Number should be a number up to 3 digits.");

        const isIdResult = validators.isId(
          input,
          regex,
          fieldNameFormatted,
          fieldConstraintsFormatted
        );
        if (isIdResult !== true) {
          return isIdResult;
        }

        return true;
      },
    },
  ],
  engineer: [
    // Name, Employee ID, Email address, ...
    ...employeeQuestions,
    // ... and GitHub account.
    {
      type: "input",
      name: "github",
      message: label("GitHub Account 💻:"),
      validate: function (input) {
        const min = 3,
          max = 1024,
          fieldNameFormatted = bold("GitHub Account");

        const notEmptyResult = validators.isNotEmpty(
          input,
          fieldNameFormatted,
          "string"
        );
        const isCharMinResult = validators.isCharMin(
          input,
          min,
          fieldNameFormatted
        );
        const isCharMaxResult = validators.isCharMax(
          input,
          max,
          fieldNameFormatted
        );

        if (notEmptyResult !== true) {
          return notEmptyResult;
        } else if (isCharMinResult !== true) {
          return isCharMinResult;
        } else if (isCharMaxResult !== true) {
          return isCharMaxResult;
        }

        return true;
      },
    },
  ],
  intern: [
    // Name, Employee ID, Email address, ...
    ...employeeQuestions,
    // ... and School.
    {
      type: "input",
      name: "school",
      message: label("School 🏫:"),
      validate: function (input) {
        const min = 3,
          max = 100,
          fieldNameFormatted = bold("School");

        const notEmptyResult = validators.isNotEmpty(
          input,
          fieldNameFormatted,
          "string"
        );
        const isCharMinResult = validators.isCharMin(
          input,
          min,
          fieldNameFormatted
        );
        const isCharMaxResult = validators.isCharMax(
          input,
          max,
          fieldNameFormatted
        );

        if (notEmptyResult !== true) {
          return notEmptyResult;
        } else if (isCharMinResult !== true) {
          return isCharMinResult;
        } else if (isCharMaxResult !== true) {
          return isCharMaxResult;
        }

        return true;
      },
    },
  ],
};

/**
 * @type {{ manager: String, engineer: String, intern: String, finish: String} }}
 *    The menu options key and labels.
 */
const menu = {
  manager: "Team Manager",
  engineer: "Engineer",
  intern: "Intern",
  finish: "Finish the Team",
};

const menuQuestions = [
  {
    type: "rawlist",
    name: "choice",
    message: em("Please choose an option:"),
    choices: Object.values(menu)
      .filter((option) => option !== "Team Manager")
      .map((option) => {
        let menuOption = "";
        if (option !== "Finish the Team") {
          menuOption += "Add";
          menuOption +=
            option === "Engineer" || option === "Intern" ? " an " : " a ";
        }
        menuOption += option;

        return menuOption;
      }),
    default: 4,
  },
];

export {
  menu,
  menuQuestions,
  questions,
  validatorConstraints,
  validators,
  transformers,
  filters,
};
