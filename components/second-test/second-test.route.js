/*

  secondTest Server Code

  endpoint is available at /second-test 

*/

// Importing metadata from a JSON file (assuming metadata.json is in the same directory as this script)
const metadata = require('./metadata.json');

// Defining an async function with a placeholder name (secondTest)
async function secondTest() {
  // This function simply returns the metadata, but it could be more complex in a real application.
  return metadata;
}

// Exporting a function that takes an Express.js app as a parameter
module.exports = function (app) {
  // Setting up a route handler for POST requests on a dynamic endpoint (second-test)
  app.post('/second-test', async function (req, res) {
    // Extracting the request data from the request body
    const request_data = req.body;

    // Calling the secondTest async function to retrieve metadata
    const data = await secondTest();

    // Sending the retrieved metadata as a JSON response
    res.json(data);
  });
};