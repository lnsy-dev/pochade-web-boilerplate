const path = require('path');
const dotenv = require("dotenv")

// Load environment variables from a .env file
dotenv.config();

// Define the project name for the output bundle
let PROJECT_NAME = process.env.PROJECT_NAME;

// If PROJECT_NAME is not defined in the environment variables, set it to 'bundle'
if (!PROJECT_NAME) {
  PROJECT_NAME = 'bundle';
}

// Webpack configuration
module.exports = {
  // Entry points for the application, including JavaScript and CSS files
  entry: ['./index.js', './index.css'],

  // Enable experimental features, allowing external ES6 module imports
  experiments: {
    outputModule: true,
  },

  // Output configuration, specifying the output file's path and name
  output: {
    path: path.resolve(__dirname, 'dist'),  // Output directory is 'dist'
    filename: `${PROJECT_NAME}.js`,         // Output bundle name, using PROJECT_NAME
    module: true,                           // Enable external ES6 modules
  },

  // Module rules to handle different file types
  module: {
    rules: [
      {
        test: /\.js$/,           // Match JavaScript files
        exclude: /node_modules/, // Exclude files in the 'node_modules' directory
        use: {
          loader: 'babel-loader',  // Use the 'babel-loader' for transpilation
        }
      },
      {
        test: /\.css$/i,         // Match CSS files
        use: ['style-loader', 'css-loader'],  // Use style and CSS loaders
      }
    ]
  }
};
