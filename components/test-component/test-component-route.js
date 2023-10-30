/*

  testComponent Server Code

  To create an end point, open up hans-js and add... blah

  @todo: write tutorial 


*/


const metadata = require('./metadata.json');

async function testComponent(){
  return metadata
}

module.exports = function(app) {
  app.post('/test-component', async function(req, res) {
    const request_data = req.body;
    const data = await testComponent();
    res.json(data);
  });
};
