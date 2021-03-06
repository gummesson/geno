// ## utils/get.js

// ### Modules
//
// Import the required modules.
//
var path = require('path');

// ### Get
//
// The constructor.
//
var Get = function() {};

// #### Get.prototype.path
//
// Return the full path of the `filename`.
//
// - `directory` is a string.
// - `filename` is a string.
//
Get.prototype.path = function(directory, filename) {
  return path.join(directory, '/', filename);
};

// #### Get.prototype.lib
//
// Return the full path to the module library.
//
// - `filename` is a string.
//
Get.prototype.lib = function(filename) {
  return path.join(__dirname, '../../', filename);
};

// #### Get.prototype.name
//
// Return the base name of the `filename`.
//
// - `filename` is a string.
//
Get.prototype.name = function(filename) {
  return path.basename(filename);
};

// ### Exports
//
// Export `Get`.
//
module.exports = Get;
