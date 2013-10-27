/* Modules */

var must     = require('must'),
    fs       = require('fs'),
    fsExists = require('./helpers/fs-exists'),
    Geno     = require('../lib/geno'),
    geno     = new Geno();

/* Tests */

describe('Geno', function() {
  describe('.build()', function() {
    it('must build the site', function(done) {
      geno.build(function(err) {
        if (err) { throw err; }
        fsExists('site/index.html').must.be.true();
        fsExists('site/style.css').must.be.true();
        done();
      });
    });

    // Since `nunjucks` affects the whitespace formatting 
    // the test unfortunately has to check for template tags 
    // instead of comparing the actual content.
    it('must generate the content', function(done) {
      fs.readFile('site/index.html', {encoding: 'utf8'}, function(err, data) {
        var pattern = /\{(\{|%-?)\s+.*\s+(-?%|\})\}/g,
            tags    = pattern.test(data);
        if (err) { throw err; }
        data.must.exist();
        tags.must.be.false();
        done();
      });
    });
  });
});
