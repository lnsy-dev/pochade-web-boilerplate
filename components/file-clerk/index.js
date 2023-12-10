const fileProcessor = require('./index-files');
const path = require('path');

function hasBeenIndexed(obj) {
  // Check if both "last-indexed" and "last-updated" properties exist
  if (!obj.hasOwnProperty("last-indexed") || !obj.hasOwnProperty("last-updated")) {
    return false;
  }

  const lastIndexed = obj["last-indexed"];
  const lastUpdated = obj["last-updated"];

  // Check if both values are valid Date objects
  if (!(lastIndexed instanceof Date) || !(lastUpdated instanceof Date)) {
    throw new Error('Invalid date object provided');
  }

  // Check if "last-updated" is later than "last-indexed"
  return lastUpdated >= lastIndexed;
}

function parseJSONFrontmatter(markdownContent) {
  // Regular expression to match YAML or JSON frontmatter
  const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+/;

  // Check if frontmatter exists in the markdown content
  const match = markdownContent.match(frontmatterRegex);

  if(match === null){
    return {}
  }

  if (match && match[1]) {
    // Extract the frontmatter string
    const frontmatterString = match[1];

    try {
      // Parse the frontmatter string into a JavaScript object
      const frontmatterObject = JSON.parse(frontmatterString);

      return frontmatterObject;
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
      return {};
    }
  }

  // If no frontmatter is found, return null
  return null;
}

// Function to remove YAML front matter from a string
function removeFrontMatter(content) {
    const yamlRegex = /^---\n([\s\S]*?)\n---/;
    return content.replace(yamlRegex, '').trim();
}


// Example process function that converts all text to uppercase
function processFunction(content) {
  const metadata = parseJSONFrontmatter(content);
  const bare_content = removeFrontMatter(content);
  console.log(metadata);

  return content
}


// Specify the directory you want to process
const directoryPath = path.join(__dirname, '../../notebooks');

// Call the function to process files in the directory
fileProcessor.processFilesInDirectory(directoryPath, processFunction);
