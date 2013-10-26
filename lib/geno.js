//
// # Geno
//
// A small static and opinionated site generator.
//
// **Geno** is a small and opinionated static site generator
// for easily generating a simple project site for your NPM modules.
//
// **License:** MIT  
// **Source:** [GitHub](https://github.com/gummesson/geno)
//

// ## geno.js

// ### Modules
//
// Import the required modules.
//
// - `nunjucks` is the default template engine.
//
var nunjucks = require('nunjucks'),
    Get      = require('./utils/get'),
    get      = new Get(),
    File     = require('./utils/file'),
    file     = new File(),
    Extend   = require('./utils/extend'),
    extend   = new Extend();

// ### Geno
//
// The constructor.
//
var Geno = function() {};

// #### Geno.prototype.build
//
// Run through the configuration, the parsing and the compiling of the site.
//
// - `done` is a function.
//
Geno.prototype.build = function(done) {
  done = (done || function() {});
  this.configure(function(config) {
    this.template(config, function(err, data) {
    if (err) { return done(err); }
      this.compile(config, data, function(err) {
        if (err) { return done(err); }
        return done();
      });
    }.bind(this));
  }.bind(this));
};

// #### Geno.prototype.configure
//
// Return the `config` by reading the project's `package.json` file and
// the project's `geno.json` file, if it exists.
//
// - `callback` is a function.
//
Geno.prototype.configure = function(callback) {
  var pkgPath = get.path(process.cwd(), 'package.json'),
      pkgInfo = require(pkgPath),
      genPath = get.path(process.cwd(), 'geno.json');
  file.exists(genPath, function(exists) {
    if (exists) {
      var genInfo = require(genPath),
          config  = extend.obj(pkgInfo, genInfo);
      return callback(config);
    } else {
      return callback(pkgInfo);
    }
  });
};

// #### Geno.prototype.template
//
// Return the template file's `data`.
//
// - `config`   is an object.
// - `callback` is a function.
//
Geno.prototype.template = function(config, callback) {
  var index = (config.template || get.lib('template/index.html'));
  file.read(index, function(err, data) {
    if (err) { return callback(err); }
    return callback(null, data);
  });
};

// #### Geno.prototype.compile
//
// Compile the content by running the `data` and `config` through `nunjucks`.
//
// - `config`   is an object.
// - `data`     is a string.
// - `callback` is a function.
//
Geno.prototype.compile = function(config, data, callback) {
  var content = nunjucks.renderString(data, config),
      style   = (config.stylesheet || get.lib('template/style.css')),
      output  = (config.output || get.path(process.cwd(), 'site'));
  this.generate(content, output, style, function(err) {
      if (err) { return callback(err); }
      return callback(null);
  });
};

// #### Geno.prototype.generate
//
// Generate the site by creating the `output` directory, saving
// the `index.html` file and copying the `style.css` file.
//
// - `content`  is a string.
// - `output`   is a string.
// - `style`    is a string.
// - `callback` is a function.
//
Geno.prototype.generate = function(content, output, style, callback) {
  var index = get.path(output, 'index.html'),
      css   = get.path(output, 'style.css');
  file.mkDir(output, function(err) {
    if (err) { return callback(err); }
    file.save(index, content, function() {
      if (err) { return callback(err); }
      file.copy(style, css, function(err) {
        if (err) { return callback(err); }
        return callback(null);
      });
    });
  });
};

// ### Exports
//
// Export `Geno`.
//
module.exports = Geno;
