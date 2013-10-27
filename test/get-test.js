/* Modules */

var must = require('must'),
    join = require('path').join,
    Get  = require('../lib/utils/get'),
    get  = new Get();

/* Tests */

describe('Get', function() {
  var test = {
    json   : 'geno.json',
    index  : 'assets/index.html',
    script : 'assets/js/script.js'
  };

  describe('.path()', function() {
    it('must get the path to the project', function() {
      var filePath = get.path(process.cwd(), test.json),
          realPath = join(process.cwd(), '/', 'geno.json');
      filePath.must.be(realPath);
    });
  });

  describe('.lib()', function() {
    it('must get the path to the library', function() {
      var filePath = get.lib(test.index),
          realPath = join(__dirname, '../', 'assets/index.html');
      filePath.must.be(realPath);
    });
  });

  describe('.name()', function() {
    it('must get the basename of the file', function() {
      var filename = get.name(test.script);
      filename.must.be('script.js');
    });
  });
});
