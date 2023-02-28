///
// CLI console and theme utils.
///

import inquirer from "inquirer";
import chalkPipe from "chalk-pipe";
import terminalLink from "terminal-link";

/**
 * Instance of inquirer bottom bar ui.
 *
 * @type {inquirer.ui.BottomBar}
 */
const ui = new inquirer.ui.BottomBar();

/**
 * Print to the inquirer bottom bar.
 *
 * @param {String} message
 *    The message to notify.
 */
const notify = (message) => {
  ui.updateBottomBar(highlight(message));
};

/**
 * Delay the execution.
 *
 * @param {Number} seconds
 *    Number of seconds to delay.
 */
const sleep = (seconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < seconds * 1000);
};

/**
 * Clear the screen.
 *
 * @type {Console.clear}
 */
const clear = console.clear;

/**
 * Print to the standard output.
 *
 * @type {Console.log}
 */
const print = console.log;

/**
 * Print to the standard output.
 *
 * @type {Console.info}
 */
const printInfo = (output) => {
  console.info(info(output));
};

/**
 * Print to the standard error.
 *
 * @type {Console.warn}
 */
const printWarning = (output) => {
  console.warn(warning(output));
};

/**
 * Print to the standard error.
 *
 * @type {Console.error}
 */
const printError = (output) => {
  console.error(error(output));
};

///
// CLI Theme.
///

/**
 * Text style modifier.
 *
 * @type {ChalkInstance}
 */
const txt = chalkPipe("reset");

/**
 * Underline style modifier.
 *
 * @type {ChalkInstance}
 */
const underline = chalkPipe("underline");

/**
 * Overline style modifier.
 *
 * @type {ChalkInstance}
 */
const overline = chalkPipe("overline");

/**
 * Bold style modifier.
 *
 * @type {ChalkInstance}
 */
const bold = chalkPipe("bold");

/**
 * Italic style modifier.
 *
 * @type {ChalkInstance}
 */
const italic = chalkPipe("italic");

/**
 * Bold style modifier.
 *
 * @type {ChalkInstance}
 */
const strong = chalkPipe("bold");

/**
 * Emphasys style modifier.
 *
 * @type {ChalkInstance}
 */
const em = chalkPipe("bgWhiteBright.black");

/**
 * Strikethrough style modifier.
 *
 * @type {ChalkInstance}
 */
const strike = chalkPipe("strikethrough");

/**
 * Inverse style modifier.
 *
 * @type {ChalkInstance}
 */
const inverse = chalkPipe("inverse");

/**
 * Hidden style modifier.
 *
 * @type {ChalkInstance}
 */
const hidden = chalkPipe("hidden");

/**
 * Visible style modifier.
 *
 * @type {ChalkInstance}
 */
const visible = chalkPipe("visible");

/**
 * Active behaviour style modifier.
 *
 * @type {ChalkInstance}
 */
const active = chalkPipe("reset");

/**
 * Inactive behaviour style modifier.
 *
 * @type {ChalkInstance}
 */
const inactive = chalkPipe("dim.#ffffff");

/**
 * Highlight behaviour style modifier.
 *
 * @type {ChalkInstance}
 */
const highlight = chalkPipe("bgCyan.black");

/**
 * Link behaviour style modifier.
 *
 * @type {ChalkInstance}
 */
const link = (href, text = "") => terminalLink(text || href, href);

/**
 * Quote behaviour style modifier.
 *
 * @type {ChalkInstance}
 */
const quote = chalkPipe("italic");

/**
 * Label behaviour style modifier.
 *
 * @type {ChalkInstance}
 */
const label = chalkPipe("whiteBright.bold");

/**
 * Button behaviour style modifier.
 *
 * @type {ChalkInstance}
 */
const button = chalkPipe("overline.underline");

/**
 * Console log style modifier.
 *
 * @type {ChalkInstance}
 */
const log = chalkPipe("reset");

/**
 * Console success style modifier.
 *
 * @type {ChalkInstance}
 */
const success = chalkPipe("green.bold");

/**
 * Console info style modifier.
 *
 * @type {ChalkInstance}
 */
const info = chalkPipe("white.bold");

/**
 * Console warning style modifier.
 *
 * @type {ChalkInstance}
 */
const warning = chalkPipe("orange.bold");

/**
 * Console error style modifier.
 *
 * @type {ChalkInstance}
 */
const error = chalkPipe("bgRed.#cccccc");

export {
  ui,
  notify,
  sleep,
  clear,
  print,
  printInfo,
  printWarning,
  printError,
  txt,
  underline,
  overline,
  bold,
  italic,
  strong,
  em,
  strike,
  inverse,
  hidden,
  visible,
  active,
  inactive,
  highlight,
  link,
  quote,
  label,
  button,
  log,
  success,
  info,
  warning,
  error,
};
