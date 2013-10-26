// ## utils/file.js

// ### Modules
//
// Import the required modules.
//
// - `fs-extra` enables some extra `fs` goodies, like `copy` and `mkdirp`.
//
var fs = require('fs-extra');

// ### File
//
// The constructor.
//
var File = function() {};

// #### File.prototype.read
//
// Read the `file` (synchronously) and return the data.
//
// - `file`     is a string.
// - `callback` is a function.
//
File.prototype.read = function(file, callback) {
  try {
    var data = fs.readFileSync(file, { encoding: 'utf8' });
    return callback(null, data);
  } catch(err) {
    return callback(err);
  }
};

// #### File.prototype.save
//
// Save the `file` and `content` (synchronously).
//
// - `file`     is a string.
// - `content`  is a string.
// - `callback` is a function.
//
File.prototype.save = function(file, content, callback) {
  try {
    fs.writeFileSync(file, content, { encoding: 'utf8' });
    return callback(null);
  } catch(err) {
    return callback(err);
  }
};

// #### File.prototype.copy
//
// Copy the `target` to the `destination` (synchronously).
//
// - `target`      is a string.
// - `destination` is a string.
// - `callback`    is a function.
//
File.prototype.copy = function(target, destination, callback) {
  try {
    fs.copySync(target, destination);
    return callback(null);
  } catch(err) {
    return callback(err);
  }
};

// #### File.prototype.exists
//
// Check if the `path` exists (synchronously).
//
// - `path` is a string.
// - `callback` is a function.
//
File.prototype.exists = function(path, callback) {
  var exists = fs.existsSync(path);
  return callback(exists);
};

// #### File.prototype.mkDir
//
// Create the `path` (synchronously).
//
// - `path`     is a string.
// - `callback` is a function.
//
File.prototype.mkDir = function(path, callback) {
  try {
    this.exists(path, function(exists) {
      if (!exists) { fs.mkdirpSync(path); }
      return callback(null);
    });
  } catch(err) {
    return callback(err);
  }
};

// ### Exports
//
// Export `File`.
//
module.exports = File;
