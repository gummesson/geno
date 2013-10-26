/* Modules */

var fs = require('fs');

/* Helpers */

var fsExists = function(filename) {
  return fs.existsSync(filename);
};

/* Exports */

module.exports = fsExists;
