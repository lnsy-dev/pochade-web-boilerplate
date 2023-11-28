/*

  lnsyEdit Server Code

  endpoint is available at /lnsy-edit 

*/

// Importing metadata from a JSON file (assuming metadata.json is in the same directory as this script)
const metadata = require('./metadata.json');
const path = require('path');
const fs = require('fs');


// Defining an async function with a placeholder name (lnsyEdit)
async function lnsyEdit() {
  // This function simply returns the metadata, but it could be more complex in a real application.
  return metadata;
}

// Exporting a function that takes an Express.js app as a parameter
module.exports = function (app) {
  // Setting up a route handler for POST requests on a dynamic endpoint (lnsy-edit)
  app.post('/lnsy-edit', async function (req, res) {
    // Extracting the request data from the request body
    const request_data = req.body;

    // Calling the lnsyEdit async function to retrieve metadata
    const data = await lnsyEdit();

    // Sending the retrieved metadata as a JSON response
    res.json(data);
  });

  app.post('/save-file', async function (req, res) {
    if (!req.body.content || !req.body.file_path) {
        return res.status(400).json({ error: 'Both content and file_path are required in the request body' });
    }
    // Construct the file path based on the provided file_path
    const filePath = path.join(__dirname, '../../notebooks', req.body.file_path);

    // Write the content to the file
    fs.writeFile(filePath, req.body.content, 'utf8', (err) => {
      if (err) {
          return res.status(500).json({ error: 'Error saving the file' });
      }
      res.json({ message: 'File saved successfully' });
    });

  });

  app.post('/load-file', async function (req, res) {
    const request_data = req.body;
    if (!req.body.file_path) {
      return res.status(400).json({ error: 'file_path is required in the request body' });
    }
    const filePath = path.join(__dirname, '../../notebooks', req.body.file_path);
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          const new_file = 
`---
{"date-created":"${new Date()}"}
---
`;
          fs.writeFile(filePath, new_file, 'utf8', (err) => {
            if (err) {return res.status(500)}
          });

          return res.send(new_file)
        }
        // Send the file content in the response
        res.send(data);
    });
  });
};