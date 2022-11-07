/**
 * for WebStorm grammar hint
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.scss', '.jsx'],
    alias: {
      '@': resolve('src')
    }
  }
};
