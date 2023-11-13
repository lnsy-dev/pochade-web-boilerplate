//   const css_import = `\n@import "./components/${component_id}/${component_id}.css";`
//   ./index.css
//   
//   
//  const js_import = `\nimport "./components/${component_id}/${component_id}.js";`
//  ./index.js

// `\nconst ${ComponentName} = require('./components/${component_id}/${component_id}-route.js')(app);// ./routes.js
// 



const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();

/**
 * @param  {string} -- String to convert to Camel Case
 * @return {string} -- Converted string in CamelCase
 */

function toCamelCase(str) {
  return str.replace(/[-_ ](.)/g, function(match, group1) {
    return group1.toUpperCase();
  });
}

/**
 * @param  {string} -- String to convert to Dash Case
 * @return {string} -- Converted String in dash-case
 */
function toDashCase(str) {
  // Remove leading and trailing spaces
  str = str.trim();
  // Replace spaces with dashes
  str = str.replace(/\s+/g, '-');
  // Convert to lowercase
  str = str.toLowerCase();
  return str;
}

function removeLineFromFile(filePath, lineToRemove) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    // Split the file content into an array of lines
    const lines = data.split('\n');

    // Filter out the line to remove
    const filteredLines = lines.filter(line => line !== lineToRemove);

    // Join the lines back together into a single string
    const updatedContent = filteredLines.join('\n');

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
        return;
      }

      console.log('Line removed and file saved successfully.');
    });
  });
}


/**
 * Takes a two word name, generates a new component from the 
 * component-template folder
 * @param  {string} -- a two word string with the new components name
 * @return {undefined} -- generates a new folder
*/


// Import required modules
function removeComponent(component_name) {
  // Check if the component name consists of two or more words; if not, append '-component'
  if (component_name.split(' ').length < 2) {
    component_name = component_name + '-component';
  }
  
  // Convert component_name to CamelCase (e.g., 'my-component' becomes 'MyComponent')
  const ComponentName = toCamelCase(component_name);
  
  // Convert component_name to dash-case (e.g., 'MyComponent' becomes 'my-component')
  const component_id = toDashCase(component_name);
  
  // Define the path to the folder to be removed
  const folderPath = `${ROOT}/components/${component_name}`;

  // Remove the folder recursively
  fs.rm(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error deleting folder: ${err.message}`);
    } else {
      console.log(`Folder "${folderPath}" has been deleted.`);
    }
  });

  // Generate CSS import statement and remove it from 'index.css'
  const css_import = `@import "./components/${component_id}/${component_id}.css";`
  removeLineFromFile(`./index.css`, css_import);
  
  // Generate JavaScript import statement and remove it from 'index.js'
  const js_import = `import "./components/${component_id}/${component_id}.js";`
  removeLineFromFile('./index.js', js_import);

  // Generate route import statement and remove it from 'routes.js'
  const route_import = `const ${ComponentName} = require('./components/${component_id}/${component_id}-route.js')(app);`
  removeLineFromFile(`./routes.js`, route_import);
}

// Check if the script is the main module
if (require.main === module) {
  // Import 'readline' module for user input
  const readline = require('readline');

  // Create a readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Function to process user input
  function processString(inputString) {
    // Replace this with the actual function you want to run with the input string
    console.log(`You entered: ${inputString}`);
  }

  // Prompt the user for input and execute 'removeComponent' when a name is provided
  rl.question('Please enter a two-word name for this element, if you enter only a single word, the component will be renamed blah-component: ', (inputString) => {
    removeComponent(inputString);
    rl.close(); // Close the readline interface
  });
}
