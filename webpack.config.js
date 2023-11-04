const path = require('path');
const dotenv = require("dotenv")
dotenv.config()

let PROJECT_NAME = process.env.PROJECT_NAME
if(!PROJECT_NAME){
  PROJECT_NAME = 'bundle'
}

module.exports = {
  entry: ['./index.js','./index.css'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${PROJECT_NAME}.js`
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

