module.exports = function(app, server) {  
  /* BEGIN GENERATED MODULES */ 
  const generateComponent = require('./components/generate-new-component/generate-new-component.route.js')(app);

  const lnsyEdit = require('./components/lnsy-edit/lnsy-edit.route.js')(app);

  const fileClerk = require('./components/file-clerk/file-clerk.route.js')(app);

  const chatGpt = require('./components/chat-gpt/chat-gpt.route.js')(app);

  const graphData = require('./components/graph-data/graph-data.route.js')(app);

  const geoMap = require('./components/geo-map/geo-map.route.js')(app);

  const simpleModal = require('./components/simple-modal/simple-modal.route.js')(app);

  const controlPanel = require('./components/control-panel/control-panel.route.js')(app);
}