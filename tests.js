// tests.js
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: 5000, // set a reasonable timeout
  bail: false,   // bail on the first test failure
  reporter: 'nyan', // choose a reporter (e.g., 'spec', 'nyan', 'dot', etc.)
});



 mocha.addFile('./components/lnsy-edit/lnsy-edit.tests.js');
// Run the tests
mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0; // exit with non-zero status if there are failures
});