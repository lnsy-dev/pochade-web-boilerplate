/*

  Create New Component

*/

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

/**
 * Takes a two word name, generates a new component from the 
 * component-template folder
 * @param  {string} -- a two word string with the new components name
 * @return {undefined} -- generates a new folder
*/
function createNewComponent(component_name, component_template = 'default'){
  if(component_name.split(' ').length < 2){
    component_name = component_name + '-component';
  }
  const ComponentName = toCamelCase(component_name);
  const component_id = toDashCase(component_name);
  console.log("Creating new component:", component_name, ComponentName, component_id);
  const new_component_path = path.join(__dirname, 'components/' + component_id + '/');

  // Create the new component's folder
  fs.mkdir(new_component_path, (error) => {
    if (error) {
      return console.error(error);
    } else {
      console.log(`created directory ${new_component_path}`);
    }
  });

  // get the path for the component
  const template_path = path.join(__dirname, `component-templates/${component_template}`);

  // Generate the new components folder from the compoent-template folder
  fs.readdir(template_path, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    files.forEach(function (file) {
      const file_data = fs.readFileSync(template_path + "/" + file, { encoding: 'utf8' });
      let replaced_data = file_data.replace(/\${component-id}/g, component_id);
      replaced_data = replaced_data.replace(/\${ComponentName}/g, ComponentName);
      if(file === 'metadata.json'){
        fs.writeFileSync(new_component_path + 'metadata.json', replaced_data);
      } else if (file === 'route.js') {
        const file_name = `${component_id}-route.js`; 
        const new_file_path = `${new_component_path}/${file_name}`;
        fs.writeFileSync(new_file_path, replaced_data);
      } else {
        const file_suffix = file.split('.').pop();
        const file_name = `${component_id}.${file_suffix}`; 
        const new_file_path = `${new_component_path}/${file_name}`;
        fs.writeFileSync(new_file_path, replaced_data);
      }
    });
  });

  // populate indices and routes files


  // Add css to css index
  const css_import = `\n@import "./components/${component_id}/${component_id}.css";`
  fs.appendFile(`./index.css`, css_import, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Appended ${component_name} to css`);
    }
  });

  // Add javascript to index
  const js_import = `\nimport "./components/${component_id}/${component_id}.js";`
  fs.appendFile(`./index.js`, js_import, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Appended ${component_name} to js`);
    }
  });

  const route_file_location = './routes.js';

  const route = `\nconst ${ComponentName} = require('./components/${component_id}/${component_id}-route.js')(app);
  \n}`
  fs.readFile(route_file_location, 'utf8', function(err, data){
    let splitArray = data.split('\n');
    splitArray = splitArray.slice(0,-1);
    splitArray.push(route);
    fs.writeFile(route_file_location, splitArray.join('\n'), function(err){
      if(err) console.log(err);
    });
  });
} // end Create New Component



if (require.main === module) {

    const readline = require('readline');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`Please enter a two-word name for this component, if you enter only a single word, the component will be renamed blah-component:`, (inputString) => {
      createNewComponent(inputString);
      rl.close();
    });

}

module.exports = {
  createNewComponent,
};