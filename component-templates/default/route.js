/*

  ${ComponentName} Server Code

  To create an end point, open up hans-js and add... blah

  @todo: write tutorial 


*/


const metadata = require('./metadata.json');

async function ${ComponentName}(){
  return metadata
}

module.exports = function(app) {
  app.post('/${component-id}', async function(req, res) {
    const request_data = req.body;
    const data = await ${ComponentName}();
    res.json(data);
  });
};
