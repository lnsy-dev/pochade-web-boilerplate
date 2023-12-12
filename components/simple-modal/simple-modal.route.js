/*

  simpleModal Server Code

  endpoint is available at /simple-modal 

*/

// Importing metadata from a JSON file (assuming metadata.json is in the same directory as this script)
const metadata = require('./metadata.json');

// Defining an async function with a placeholder name (simpleModal)
async function simpleModal() {
  // This function simply returns the metadata, but it could be more complex in a real application.
  return metadata;
}

// Exporting a function that takes an Express.js app as a parameter
module.exports = function (app) {
  // Setting up a route handler for POST requests on a dynamic endpoint (simple-modal)
  app.post('/simple-modal', async function (req, res) {
    // Extracting the request data from the request body
    const request_data = req.body;

    // Calling the simpleModal async function to retrieve metadata
    const data = await simpleModal();

    // Sending the retrieved metadata as a JSON response
    res.json(data);
  });
};