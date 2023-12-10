module.exports = function(app, server) {  
  /* BEGIN GENERATED MODULES */ 
  const generateComponent = require('./dev-components/generate-new-component/generate-new-component.route.js')(app);

  const lnsyEdit = require('./components/lnsy-edit/lnsy-edit.route.js')(app);

  const fileClerk = require('./components/file-clerk/file-clerk.route.js')(app);

  const chatGpt = require('./components/chat-gpt/chat-gpt.route.js')(app);
}