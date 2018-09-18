var path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  target: "node",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'robot.js'
  }
};