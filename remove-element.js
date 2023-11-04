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



function removeComponent(component_name){
  if(component_name.split(' ').length < 2){
    component_name = component_name + '-component';
  }
  const ComponentName = toCamelCase(component_name);
  const component_id = toDashCase(component_name);
  const folderPath = `./components/${component_name}`;

  fs.rm(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error deleting folder: ${err.message}`);
    } else {
      console.log(`Folder "${folderPath}" has been deleted.`);
    }
  });

  const css_import = `@import "./components/${component_id}/${component_id}.css";`
  removeLineFromFile(`./index.css`, css_import);
  
  const js_import = `import "./components/${component_id}/${component_id}.js";`
  removeLineFromFile('./index.js', js_import);

  const route_import = `const ${ComponentName} = require('./components/${component_id}/${component_id}-route.js')(app);`
  removeLineFromFile(`./routes.js`, route_import);
}

if (require.main === module) {

    const readline = require('readline');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    function processString(inputString) {
      // Replace this with the actual function you want to run with the input string
      console.log(`You entered: ${inputString}`);
    }

    rl.question('Please enter a two-word name for this element, if you enter only a single word, the component will be renamed blah-component: ', (inputString) => {
      removeComponent(inputString);
      rl.close();
    });


    // // get the name from the argument
    // const name = process.argv[2];
    // console.log(`Creating a new component called ${name}!`);
    // createNewComponent(name);

}
