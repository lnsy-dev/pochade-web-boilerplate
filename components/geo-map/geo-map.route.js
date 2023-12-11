/*

  geoMap Server Code

  endpoint is available at /geo-map 

*/

// Importing metadata from a JSON file (assuming metadata.json is in the same directory as this script)
const metadata = require('./metadata.json');

// Defining an async function with a placeholder name (geoMap)
async function geoMap() {
  // This function simply returns the metadata, but it could be more complex in a real application.
  return metadata;
}

// Exporting a function that takes an Express.js app as a parameter
module.exports = function (app) {
  // Setting up a route handler for POST requests on a dynamic endpoint (geo-map)
  app.post('/geo-map', async function (req, res) {
    // Extracting the request data from the request body
    const request_data = req.body;

    // Calling the geoMap async function to retrieve metadata
    const data = await geoMap();

    // Sending the retrieved metadata as a JSON response
    res.json(data);
  });
};