import App from "./src/App.mjs";
import Manager from "./src/lib/Manager.mjs";
import Engineer from "./src/lib/Engineer.mjs";
import Intern from "./src/lib/Intern.mjs";
import inquirer from "inquirer";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import * as fsPromises from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_DIR = resolve(__dirname, "output");
const outputPath = join(OUTPUT_DIR, "team.html");

import render from "./src/utils/page-template.mjs";

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const app = App.getInstance();
console.log(app, app.getSettings(), app.getTeams());
