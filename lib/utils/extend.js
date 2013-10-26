// ## utils/extend.js

// ### Extend
//
// The constructor.
//
var Extend = function() {};

// #### Extend.prototype.obj
//
// Return a single object by combining two into one.
//
// - `target`  is an object.
// - `options` is an object.
//
Extend.prototype.obj = function(target, options) {
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      if (options[key] !== undefined) {
        target[key] = options[key];
      }
    }
  }
  return target;
};

// ### Exports
//
// Export `Extend`.
//
module.exports = Extend;
