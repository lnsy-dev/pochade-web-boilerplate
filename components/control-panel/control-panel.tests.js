const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');

const app = require('express')();  // Assuming Express is properly set up in your project

const server = require('http').Server(app);  // Create an HTTP server using the Express app
const routes = require('../../routes.js')(app);


chai.use(chaiHttp);
const expect = chai.expect;

// Describe block for the test suite
describe('controlPanel Endpoint', () => {
  // Before block to set up any necessary configurations or resources
  before(() => {
    // Perform any setup needed before running the tests
    // For example, you might initialize a test database or start a server
  });

  // After block to clean up after the tests
  after(() => {
    // Perform cleanup tasks, like closing database connections or stopping a server
  });

  // Test case for the /test-component endpoint
  it('should return metadata when POST request is made to /control-panel', async () => {
    // Define a sample request body
    const requestBody = { /* your sample data here */ };

    // Make a POST request to the test-component endpoint
    const response = await chai.request(app)
      .post('/control-panel')
      .send(requestBody);

    // Assert that the response status is 200 (OK)
    expect(response).to.have.status(200);

    // Assert that the response body is equal to the expected metadata
    expect(response.body).to.deep.equal(require('./metadata.json'));  // Replace with the actual path to your metadata.json file
  });

  // Add more test cases as needed
});
