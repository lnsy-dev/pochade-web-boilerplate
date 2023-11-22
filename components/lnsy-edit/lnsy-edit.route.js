/*

  lnsyEdit Server Code

  endpoint is available at /lnsy-edit 

*/

// Importing metadata from a JSON file (assuming metadata.json is in the same directory as this script)
const metadata = require('./metadata.json');

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
    const request_data = req.body;

  })
};