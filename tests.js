// tests.js
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: 5000, // set a reasonable timeout
  bail: false,   // bail on the first test failure
  reporter: 'nyan', // choose a reporter (e.g., 'spec', 'nyan', 'dot', etc.)
});



 mocha.addFile('./components/lnsy-edit/lnsy-edit.tests.js');

 mocha.addFile('./components/file-clerk/file-clerk.tests.js');

 mocha.addFile('./components/chat-gpt/chat-gpt.tests.js');

 mocha.addFile('./components/graph-data/graph-data.tests.js');

 mocha.addFile('./components/geo-map/geo-map.tests.js');

 mocha.addFile('./components/simple-modal/simple-modal.tests.js');

 mocha.addFile('./components/simple-modal/simple-modal.tests.js');

 mocha.addFile('./components/control-panel/control-panel.tests.js');
// Run the tests
mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0; // exit with non-zero status if there are failures
});