/* Modules */

var must = require('must'),
    join = require('path').join,
    Get  = require('../lib/utils/get'),
    get  = new Get();

/* Tests */

describe('Get', function() {
  var test = {
    json  : 'geno.json',
    index : 'assets/index.html'
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
});
