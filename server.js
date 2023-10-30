/*

	

*/

import express from "express";

const app = express();

const port = Bun.env.PORT || 3000;

app.use(express.json());
app.use('/', express.static('./components'));
app.use("/index.css", express.static(__dirname + '/index.css'));
app.use("/index.js", express.static(__dirname + '/index.js'));



const routes = require('./routes.js')(app);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
