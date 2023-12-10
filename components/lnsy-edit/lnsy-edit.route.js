/*

  lnsyEdit Server Code

  endpoint is available at /lnsy-edit 

*/

// Importing metadata from a JSON file (assuming metadata.json is in the same directory as this script)
const metadata = require('./metadata.json');
const path = require('path');
const fs = require('fs');


function removeMdExtension(str) {
  // Check if the string ends with ".md"
  if (str.endsWith('.md')) {
    // Remove the ".md" extension
    return str.slice(0, -3);
  } else {
    // If the string doesn't end with ".md", return the original string
    return str;
  }
}


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

  app.post('/load-file', async function (req, res) {
    const request_data = req.body;
    if (!req.body.file_path) {
      return res.status(400).json({ error: 'file_path is required in the request body' });
    }
    const filePath = path.join(__dirname, '../../notebooks', req.body["file-id"] + '.md');
    const file_id = 
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          const new_file = 
`---
{"date-created":"${new Date()}"
"file-id": "${req.body["file-id"]}"

}

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