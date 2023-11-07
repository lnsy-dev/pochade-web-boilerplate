const path = require('path');
const dotenv = require("dotenv")
dotenv.config()

// To change the name of the output bundle set the
// PROJECT_NAME variable in an .env file
let PROJECT_NAME = process.env.PROJECT_NAME
if(!PROJECT_NAME){
  PROJECT_NAME = 'bundle'
}

module.exports = {
  entry: ['./index.js','./index.css'],
  // Allow external ES6 Module imports
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${PROJECT_NAME}.js`,
    // External ES6 Modules
    module: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use:['style-loader','css-loader']
     }
    ]
  }
};

