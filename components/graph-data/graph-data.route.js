/*

  graphData Server Code

  endpoint is available at /graph-data 

*/

// Importing metadata from a JSON file (assuming metadata.json is in the same directory as this script)
const metadata = require('./metadata.json');

// Defining an async function with a placeholder name (graphData)
async function graphData() {
  // This function simply returns the metadata, but it could be more complex in a real application.
  return metadata;
}

// Exporting a function that takes an Express.js app as a parameter
module.exports = function (app) {
  // Setting up a route handler for POST requests on a dynamic endpoint (graph-data)
  app.post('/graph-data', async function (req, res) {
    // Extracting the request data from the request body
    const request_data = req.body;

    // Calling the graphData async function to retrieve metadata
    const data = await graphData();

    // Sending the retrieved metadata as a JSON response
    res.json(data);
  });
};