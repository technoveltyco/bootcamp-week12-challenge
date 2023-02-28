///
// File utilities.
///

import path from "path";
import { fileURLToPath } from "url";
import { existsSync, mkdirSync, createReadStream, createWriteStream } from "fs";
import archiver from "archiver";

const timestamp = Date.now();
const outputFolder = "output";
const outputFilename = "team.html";
const outputFilenameCompress = `team-${timestamp}.zip`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, outputFolder);
const outputPath = path.join(OUTPUT_DIR, outputFilename);
const outputPathCompress = path.join(OUTPUT_DIR, outputFilenameCompress);

/**
 * @type {Object}
 *    File settings to set in the App instance.
 */
const fileSettings = {
  outputFolder,
  outputFilename,
  outputFilenameCompress,
  __filename,
  __dirname,
  OUTPUT_DIR,
  outputPath,
  outputPathCompress,
};

/**
 * Writes given html to outputPath.
 *
 * @param {String} html
 *    The HTML content.
 * @returns {boolean}
 *    The file write flag.
 */
function writeToFile(html) {
  // Create output dir if does not exists.
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR);
  }

  // Write the HTML to file.
  return createWriteStream(outputPath).write(html);
}

/**
 * Write the given files to a compressed file.
 *
 * @param {Array} files
 *    The files to compress.
 * @param {String} compress
 *    The compression method [zip|tar].
 */
function compressToFile(files, compress = "zip") {
  // Create output dir if does not exists.
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR);
  }

  const output = createWriteStream(outputPathCompress);
  const archive = archiver(compress, {
    zlib: { level: 9 },
  });

  // Event handlers.
  output.on("close", function () {
    console.log(`${archive.pointer()} total bytes`);
  });
  output.on("end", function () {
    console.log("Data has been drained");
  });
  archive.on("error", (err) => {
    throw err;
  });
  archive.on("warning", function (err) {
    if (err.code === "ENOENT") {
      console.warn(err);
    } else {
      throw err;
    }
  });

  // write data to output file.
  archive.pipe(output);

  // append files.
  for (let i = 0; i < files.length; i++) {
    const filepath = files[i];
    archive.append(createReadStream(filepath), {
      name: outputFilename,
    });
  }

  archive.finalize();
}

export { fileSettings, writeToFile, compressToFile };
