/*

  generateComponent Server Code

  endpoint is available at /generate-component 

*/


const fs = require('fs');
const path = require('path');
const generateComponent = require('./generate-component.js')


// Importing metadata from a JSON file (assuming metadata.json is in the same directory as this script)
const metadata = require('./metadata.json');

/*
  Get Templates
*/

function getTemplates(directoryPath = './components/generate-new-component/component-templates'){
  return new Promise((res, rej) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        rej(err);
      }
      // Filter out only directories
      const folders = files.filter(file => file.isDirectory()).map(folder => folder.name);
      res(folders);
    })
  })
}


// Exporting a function that takes an Express.js app as a parameter
module.exports = function (app) {
  // Setting up a route handler for POST requests on a dynamic endpoint (generate-component)
  app.post('/generate-new-component', async function (req, res) {
    // Extracting the request data from the request body
    const request_data = req.body;
    console.log(request_data);
    // Calling the generateComponent async function to retrieve metadata
    const data = await generateComponent(request_data.title, request_data.template, request_data.description);
    // Sending the retrieved metadata as a JSON response
    res.json(data);
  });

  app.get('/get-component-templates', async function(req, res){
    const templates =  await getTemplates();
    res.json(templates);
  });
};
