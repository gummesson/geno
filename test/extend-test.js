/* Modules */

var must   = require('must'),
    Extend = require('../lib/utils/extend'),
    extend = new Extend();

/* Tests */

describe('Extend', function() {
  describe('.obj()', function() {
    it('must get combine two objects into one', function() {
      var target = {
        title : 'Test',
        info  : 'This is a test.'
      };

      var options = {
        info : 'This is NOT a test.',
        url  : 'http://www.example.com/'
      };

      var obj = extend.obj(target, options);
      obj.must.eql({
        title : 'Test',
        info  : 'This is NOT a test.',
        url   : 'http://www.example.com/'
      });
    });
  });
});
