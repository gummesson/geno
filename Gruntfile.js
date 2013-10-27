module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.util.linefeed = '\n';

  var project = {
    js: {
      hint: [
        'Gruntfile.js',
        'bin/**/*.js',
        'lib/**/*.js',
        'test/**/*.js'
      ],

      test: [
        'test/get-test.js',
        'test/extend-test.js',
        'test/file-test.js',
        'test/geno-test.js'
      ],

      tmp: {
        test: ['test/tmp'],
        site: ['site']
      }
    },

    sass: {
      src: 'assets/geno-template/sass/geno.scss',
      dest: 'template/style.css'
    },

    njs: {
      src: [
        'assets/geno-template/njs/head.html',
        'assets/geno-template/njs/intro.html',
        'assets/geno-template/njs/info.html',
        'assets/geno-template/njs/install.html',
        'assets/geno-template/njs/usage.html',
        'assets/geno-template/njs/foot.html'
      ],
      dest: 'template/index.html'
    },

    docs: {
      src: [
        'lib/geno.js',
        'lib/utils/get.js',
        'lib/utils/extend.js',
        'lib/utils/file.js'
      ],

      dest: 'tmp/index.js',
      build: 'docco --output site/docs tmp/index.js'
    },

    site: {
      build: 'geno',
      dest: '../gh-pages'
    }
  };

  grunt.initConfig({
    project: project,

    jshint: {
      files: project.js.hint
    },

    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'spec'
      },

      all: {
        src: project.js.test
      }
    },

    clean: {
      test: {
        src: project.js.tmp.test
      },

      site: {
        src: project.js.tmp.site
      }
    },

    sass: {
      build: {
        options: {
          style: 'compressed'
        },

        files: {
          '<%= project.sass.dest %>' : '<%= project.sass.src %>'
        }
      }
    },

    concat: {
      js: {
        src: project.docs.src,
        dest: project.docs.dest,
        nonull: true
      },

      njs: {
        src: project.njs.src,
        dest: project.njs.dest,
        nonull: true
      }
    },

    shell: {
      docs: {
        options: {
          stdout: true
        },
        command: project.docs.build
      },

      site: {
        options: {
          stdout: true
        },
        command: project.site.build
      }
    },

    copy: {
      site: {
        files: [{
          expand: true,
          cwd:'site/',
          src: ['**'],
          dest: '<%= project.site.dest %>'
        }]
      }
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'clean:site',
    'simplemocha',
    'clean:test'
  ]);

  grunt.registerTask('tmpl', [
    'concat:njs',
    'sass:build'
  ]);

  grunt.registerTask('site', [
    'concat:js',
    'shell:docs',
    'shell:site',
    'copy:site'
  ]);

  grunt.registerTask('default', [
    'test'
  ]);

};
