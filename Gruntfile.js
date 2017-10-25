'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    browserSync: {
      server: {
        bsFiles: {
          src: [
            'build/css/*.css',
            'build/js/*.js',
            'build/*.html'
          ]
        },
        options: {
          server: 'build',
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    clean: {
      build: ['build'],
      icons: ['build/img/icons']
    },

    concat: {
      build: {
        src: ['node_modules/picturefill/dist/picturefill.js',
              'node_modules/svg4everybody/dist/svg4everybody.js',
              'src/js/index.js'],
        dest: 'build/js/index.js'
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              'fonts/**/*.{woff,woff2}',
              'img/**/*.{jpg,png,svg}',
              '*.html'
            ],
            dest: 'build'
          }
        ]
      },
      dev: {
        files: [
          {
            expand: true,
            src: ['*.html'],
            dest: 'build'
          }
        ]
      }
    },

    csso: {
      compress: {
        options: {
          comments: false
        },
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**/*']
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            src: ['build/img/**/*.{jpg,png}']
          }
        ]
      }
    },

    less: {
      style: {
        files: {
          'build/css/style.css': ['src/less/style.less']
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require('autoprefixer')()
          ]
        },
        src: 'build/css/*.css'
      }
    },

    svgmin: {
      default: {
        files: [{
          expand: true,
          src: 'build/img/**/*.svg',
        }]
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false
      },
      default: {
        files: {
          'build/img/symbols.svg': ['build/img/icons/*.svg']
        }
      }
    },

    uglify: {
      default: {
        files: {
          'build/js/index.min.js': ['build/js/index.js']
        }
      }
    },

    watch: {
      html: {
        files: ['src/*.html'],
        tasks: ['copy:dev']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify']
      },
      style: {
        files: ['src/less/**/*.less'],
        tasks: ['less', 'postcss', 'csso']
      }
    }
  });

  // Load the plugins that provide necessary tasks.
  require('load-grunt-tasks')(grunt);

  // Default tasks.
  grunt.registerTask('serve', ['browserSync', 'watch']);
  grunt.registerTask('symbols', ['svgmin', 'svgstore']);
  grunt.registerTask('build', ['clean:build', 'copy:build', 'less', 'postcss', 'csso', 'concat', 'uglify', 'symbols', 'clean:icons', 'imagemin']);
};
