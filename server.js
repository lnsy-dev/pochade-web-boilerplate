/*
  *** begin ascii art ***

          ,a8a,
         ,8" "8,                       8I
         d8   8b                       8I
         88   88                       8I
         88   88                       8I
         Y8   8P  ,ggg,,ggg,     ,gggg,8I   ,ggg,      ,gg,   ,gg
         `8, ,8' ,8" "8P" "8,   dP"  "Y8I  i8" "8i    d8""8b,dP"
    8888  "8,8"  I8   8I   8I  i8'    ,8I  I8, ,8I   dP   ,88"
    `8b,  ,d8b, ,dP   8I   Yb,,d8,   ,d8b, `YbadP' ,dP  ,dP"Y8,
      "Y88P" "Y88P'   8I   `Y8P"Y8888P"`Y8888P"Y8888"  dP"   "Y88

  *** end ascii art ***

  index.js,

  This is to wire together components and prototype quick ideas, not run the 
  business logic.

  Software is, above all things, a human / computer interface. This bundle of 
  text is your interface between the server and you: keep it clear and humane.

*/

const express = require( 'express' )
const app = express()
const server = require( 'http' ).Server( app )

const dotenv = require("dotenv")
dotenv.config()

let PORT = process.env.PORT
if(!PORT){
  PORT = 3000
}

app.use(express.json());
app.use('/', express.static('./components'));
app.use('/components', express.static('./components'));
app.use("/", express.static(__dirname + '/assets'));
app.use("/index.css", express.static(__dirname + '/index.css'));
app.use("/index.js", express.static(__dirname + '/index.js'));

const routes = require('./routes.js')(app);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
