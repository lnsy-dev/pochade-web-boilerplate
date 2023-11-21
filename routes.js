module.exports = function(app, server) {  
  /* BEGIN GENERATED MODULES */ 
  const generateComponent = require('./dev-components/generate-new-component/generate-new-component.route.js')(app);

  const testComponent = require('./components/test-component/test-component.route.js')(app);

  const secondTest = require('./components/second-test/second-test.route.js')(app);
}