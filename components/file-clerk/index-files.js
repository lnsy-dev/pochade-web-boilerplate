
const fs = require('fs').promises;
const path = require('path');
const util = require('util');

// Function to process each file
async function processFile(filePath, processFunction) {
  try {
    // Read the file
    let content = await fs.readFile(filePath, 'utf-8');

    // Process the file content using the provided function
    content = processFunction(content);

    // Write the modified content back to the file
    await fs.writeFile(filePath, content, 'utf-8');

    console.log(`Processed: ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error.message}`);
  }
}

// Function to recursively process files in a directory
async function processFilesInDirectory(directoryPath, processFunction) {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        // If it's a directory, recursively process its files
        await processFilesInDirectory(filePath, processFunction);
      } else if (path.extname(file).toLowerCase() === '.md') {
        // If it's a .md file, process the file
        await processFile(filePath, processFunction);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}: ${error.message}`);
  }
}

// Module exports
module.exports = {
  processFilesInDirectory,
  processFile,
};