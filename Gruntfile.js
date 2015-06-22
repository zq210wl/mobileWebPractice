/**
 * Gruntfile.js for website
 */

module.exports = function(grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*'],
    config: 'package.json',
    scope: 'devDependencies'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    proj: {
      homepage: 'https://clarity.cloud.tibco.com/console/landing', // for generating sitemap
      host: 'clarity.cloud.tibco.com', // for generating robot.txt
      src: {
        root: 'src',
        resource: '<%= proj.src.root %>/resource',
        img: '<%= proj.src.resource %>/img',
        video: '<%= proj.src.resource %>/video',
        scripts: '<%= proj.src.root %>/scripts',
        js: '<%= proj.src.scripts %>/js',
        style: '<%= proj.src.root %>/style',
        sass: '<%= proj.src.style %>/sass',
        css: '<%= proj.src.style %>/css',
        html: '<%= proj.src.root %>/views',
        vendor: '<%= proj.src.root %>/vendor',
        bower: '<%= proj.src.vendor %>/bower_components'
      },
      build: {
        root: 'build',
        resource: '<%= proj.build.root %>/resource',
        style: '<%= proj.build.root %>/style',
        scripts: '<%= proj.build.root %>/scripts',
        vendor: '<%= proj.build.scripts %>/vendor',
        html: '<%= proj.build.root %>',
        template: '<%= proj.build.root %>/partials'
      },
      dist: {
        root: 'dist',
        resource: '<%= proj.dist.root %>/resource',
        style: '<%= proj.dist.root %>/style',
        scripts: '<%= proj.dist.root %>/scripts',
        vendor: '<%= proj.dist.scripts %>/vendor',
        html: '<%= proj.dist.root %>',
        template: '<%= proj.dist.root %>/partials',
        serverConfig: '<%= proj.dist.root %>/server-config'
      }
    },

    clean: {
      options: {
        force: true
      },
      build: {
        dot: true,
        src: ['<%= proj.build.root %>/**/*', '<%= proj.build.root %>/**', '<%= proj.build.root %>', '.tmp', '<%= proj.src.css %>/**/*']
      },
      afterBuild: {
        dot: true,
        src: ['<%= proj.build.template %>/**/*', '<%= proj.build.template %>/**', '<%= proj.build.template %>', '<%= proj.build.vendor %>/jquery.cookie.js']
      },
      dist: {
        dot: true,
        src: ['<%= proj.dist.root %>/**/*', '<%= proj.dist.root %>/**', '<%= proj.dist.root %>', '.tmp']
      },
      afterDist: {
        dot: true,
        src: ['<%= proj.dist.template %>/**/*', '<%= proj.dist.template %>/**', '<%= proj.dist.template %>', '<%= proj.dist.style %>/**/*.css', '!<%= proj.dist.style %>/**/*.min.css', '!**/main.css', '<%= proj.dist.scripts %>/**/*.js', '!<%= proj.dist.scripts %>/**/*.min.js', '<%= proj.dist.vendor %>/jquery.cookie.min.js']
      },
      serverConfig: {
        files: [
          // copy sitemap file
          {
            expand: true, // Enable dynamic expansion.
            cwd: '<%= proj.dist.root %>', // Src matches are relative to this path.
            src: ['sitemap.xml'], // Actual pattern(s) to match.
          }
        ]
      }
    },

    sass: {
      build: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: '<%= proj.src.sass %>',
          // src: ['./**/*.scss'],
          src: ['./**/main.scss', './**/pricing.scss', './**/contact-us.scss', './**/main-static.scss', './**/main-mobile.scss', './**/pricing-mobile.scss', './**/contact-us-mobile.scss', './**/tutorial.scss'],
          dest: '<%= proj.src.css %>',
          ext: '.css'
        }]
      }
    },

    copy: {
      build: {
        files: [
          // copy mock server
          {
            expand: true,
            cwd: '<%= proj.src.root %>',
            src: ['mock/**/*'],
            dest: '<%= proj.build.root %>'
          },
          // copy resource files - image, video, and etc.
          {
            expand: true, // Enable dynamic expansion.
            cwd: '<%= proj.src.resource %>', // Src matches are relative to this path.
            src: ['**/*'], // Actual pattern(s) to match.
            dest: '<%= proj.build.root %>', // Destination path prefix.
          },
          // copy css files
          {
            expand: true,
            cwd: '<%= proj.src.css %>',
            src: ['**/*.css'],
            dest: '<%= proj.build.style %>',
          },
          // copy js files
          {
            expand: true,
            cwd: '<%= proj.src.js %>',
            src: ['**/*.js', '!components/**/*.js'],
            dest: '<%= proj.build.scripts %>',
          },
          // copy html files
          {
            expand: true,
            cwd: '<%= proj.src.html %>',
            src: ['**/*.html'],
            dest: '<%= proj.build.html %>',
          },
          // jquery
          {
            src: '<%= proj.src.bower %>/jquery/dist/jquery.js',
            dest: '<%= proj.build.vendor %>/jquery.js'
          },
          // jquery.cookie
          {
            src: '<%= proj.src.bower %>/jquery-cookie/jquery.cookie.js',
            dest: '<%= proj.build.vendor %>/jquery.cookie.js'
          },
          // skrollr
          {
            src: '<%= proj.src.bower %>/skrollr/src/skrollr.js',
            dest: '<%= proj.build.vendor %>/skrollr.js'
          },
          // skrollr-menu
          {
            src: '<%= proj.src.bower %>/skrollr-menu/src/skrollr.menu.js',
            dest: '<%= proj.build.vendor %>/skrollr.menu.js'
          },
          // skrollr-stylesheets
          {
            src: '<%= proj.src.bower %>/skrollr-stylesheets/src/skrollr.stylesheets.js',
            dest: '<%= proj.build.vendor %>/skrollr.stylesheets.js'
          },
          // D3
          {
            src: '<%= proj.src.bower %>/d3/d3.js',
            dest: '<%= proj.build.vendor %>/d3.js'
          },
        ]
      },
      dist: {
        files: [
          // copy resource files - image, video, and etc.
          {
            expand: true, // Enable dynamic expansion.
            cwd: '<%= proj.src.resource %>', // Src matches are relative to this path.
            src: ['**/*'], // Actual pattern(s) to match.
            dest: '<%= proj.dist.root %>', // Destination path prefix.
          },
          // copy css files
          {
            expand: true,
            cwd: '<%= proj.src.css %>',
            src: ['**/*.css'],
            dest: '<%= proj.dist.style %>',
          },
          // copy js files
          {
            expand: true,
            cwd: '<%= proj.src.js %>',
            src: ['**/*.js', '!components/**/*.js'],
            dest: '<%= proj.dist.scripts %>',
          },
          // copy html files
          {
            expand: true,
            cwd: '<%= proj.src.html %>',
            src: ['**/*.html'],
            dest: '<%= proj.dist.html %>',
          },
          // jquery
          {
            src: '<%= proj.src.bower %>/jquery/dist/jquery.min.js',
            dest: '<%= proj.dist.vendor %>/jquery.min.js'
          },
          // jquery.cookie
          {
            src: '<%= proj.src.bower %>/jquery-cookie/jquery.cookie.js',
            dest: '<%= proj.dist.vendor %>/jquery.cookie.js'
          },
          // skrollr
          {
            src: '<%= proj.src.bower %>/skrollr/dist/skrollr.min.js',
            dest: '<%= proj.dist.vendor %>/skrollr.min.js'
          },
          // skrollr-menu
          {
            src: '<%= proj.src.bower %>/skrollr-menu/dist/skrollr.menu.min.js',
            dest: '<%= proj.dist.vendor %>/skrollr.menu.min.js'
          },
          // skrollr-stylesheets
          {
            src: '<%= proj.src.bower %>/skrollr-stylesheets/dist/skrollr.stylesheets.min.js',
            dest: '<%= proj.dist.vendor %>/skrollr.stylesheets.min.js'
          },
          // D3
          {
            src: '<%= proj.src.bower %>/d3/d3.min.js',
            dest: '<%= proj.dist.vendor %>/d3.min.js'
          },
        ]
      },
      serverConfig: {
        files: [
          // copy sitemap file
          {
            expand: true, // Enable dynamic expansion.
            cwd: '<%= proj.dist.root %>', // Src matches are relative to this path.
            src: ['sitemap.xml'], // Actual pattern(s) to match.
            dest: '<%= proj.dist.serverConfig %>', // Destination path prefix.
          }
        ]
      }
    },

    htmlbuild: {
      build: {
        files: [{
          src: '<%= proj.build.template %>/story/story.html',
          dest: '<%= proj.build.template %>/story',
        }, {
          src: '<%= proj.build.html %>/index.html',
          dest: '<%= proj.build.html %>',
        }, {
          src: '<%= proj.build.html %>/index-static.html',
          dest: '<%= proj.build.html %>',
        }, {
          src: '<%= proj.build.html %>/pricing.html',
          dest: '<%= proj.build.html %>',
        }, {
          src: '<%= proj.build.html %>/contact-us.html',
          dest: '<%= proj.build.html %>',
        }, {
          src: '<%= proj.build.html %>/index-mobile.html',
          dest: '<%= proj.build.html %>',
        }, {
          src: '<%= proj.build.html %>/pricing-mobile.html',
          dest: '<%= proj.build.html %>',
        }, {
          src: '<%= proj.build.html %>/contact-us-mobile.html',
          dest: '<%= proj.build.html %>',
        }, {
          src: '<%= proj.build.html %>/tutorial.html',
          dest: '<%= proj.build.html %>',
        }],
        options: {
          beautify: true,
          logOptions: true,
          scripts: {
            d3: '<%= proj.build.vendor %>/d3.js',
            jquery: '<%= proj.build.vendor %>/jquery.js',
            skrollr: '<%= proj.build.vendor %>/skrollr.js',
            skrollrMenu: '<%= proj.build.vendor %>/skrollr.menu.js',
            skrollrStylesheets: '<%= proj.build.vendor %>/skrollr.stylesheets.js',
            index: '<%= proj.build.scripts %>/index.js',
            indexStatic: '<%= proj.build.scripts %>/index-static.js',
            indexMobile: '<%= proj.build.scripts %>/index-mobile.js',
            sec4ani: '<%= proj.build.scripts %>/sec4ani.js',
            login: '<%= proj.build.scripts %>/login.js',
            components: '<%= proj.build.scripts %>/components.js',
            tutorial: '<%= proj.build.scripts %>/tutorial.js'
          },
          sections: {
            storySections: ['<%= proj.build.template %>/story/sections/*.html'],
            story: '<%= proj.build.template %>/story/story.html',
            header: '<%= proj.build.template %>/common/header.html',
            headerMobile: '<%= proj.build.template %>/common/header-mobile.html',
            footer: '<%= proj.build.template %>/common/footer.html',
            footerMobile: '<%= proj.build.template %>/common/footer-mobile.html',
            bookmark: '<%= proj.build.template %>/common/bookmark.html',
          },
          styles: {
            main: '<%= proj.build.style %>/main.css',
            mainStatic: '<%= proj.build.style %>/main-static.css',
            pricing: '<%= proj.build.style %>/pricing.css',
            contactUs: '<%= proj.build.style %>/contact-us.css',
            mainMobile: '<%= proj.build.style %>/main-mobile.css',
            pricingMobile: '<%= proj.build.style %>/pricing-mobile.css',
            contactUsMobile: '<%= proj.build.style %>/contact-us-mobile.css',
            tutorial: '<%= proj.build.style %>/tutorial.css'
          }
        }
      },
      dist: {
        files: [{
          src: '<%= proj.dist.template %>/story/story.html',
          dest: '<%= proj.dist.template %>/story',
        }, {
          src: '<%= proj.dist.html %>/index.html',
          dest: '<%= proj.dist.html %>',
        }, {
          src: '<%= proj.dist.html %>/index-static.html',
          dest: '<%= proj.dist.html %>',
        }, {
          src: '<%= proj.dist.html %>/pricing.html',
          dest: '<%= proj.dist.html %>',
        }, {
          src: '<%= proj.dist.html %>/contact-us.html',
          dest: '<%= proj.dist.html %>',
        }, {
          src: '<%= proj.dist.html %>/index-mobile.html',
          dest: '<%= proj.dist.html %>',
        }, {
          src: '<%= proj.dist.html %>/pricing-mobile.html',
          dest: '<%= proj.dist.html %>',
        }, {
          src: '<%= proj.dist.html %>/contact-us-mobile.html',
          dest: '<%= proj.dist.html %>',
        }, {
          src: '<%= proj.dist.html %>/tutorial.html',
          dest: '<%= proj.dist.html %>',
        }],
        options: {
          beautify: true,
          logOptions: true,
          scripts: {
            d3: '<%= proj.dist.vendor %>/d3.min.js',
            jquery: '<%= proj.dist.vendor %>/jquery.min.js',
            skrollr: '<%= proj.dist.vendor %>/skrollr.min.js',
            skrollrMenu: '<%= proj.dist.vendor %>/skrollr.menu.min.js',
            skrollrStylesheets: '<%= proj.dist.vendor %>/skrollr.stylesheets.min.js',
            index: '<%= proj.dist.scripts %>/index.min.js',
            indexStatic: '<%= proj.dist.scripts %>/index-static.min.js',
            indexMobile: '<%= proj.dist.scripts %>/index-mobile.min.js',
            sec4ani: '<%= proj.dist.scripts %>/sec4ani.min.js',
            login: '<%= proj.dist.scripts %>/login.min.js',
            components: '<%= proj.dist.scripts %>/components.min.js',
            tutorial: '<%= proj.dist.scripts %>/tutorial.min.js',
          },
          sections: {
            storySections: ['<%= proj.dist.template %>/story/sections/*.html'],
            story: '<%= proj.dist.template %>/story/story.html',
            header: '<%= proj.dist.template %>/common/header.html',
            headerMobile: '<%= proj.dist.template %>/common/header-mobile.html',
            footer: '<%= proj.dist.template %>/common/footer.html',
            footerMobile: '<%= proj.dist.template %>/common/footer-mobile.html',
            bookmark: '<%= proj.dist.template %>/common/bookmark.html',
          },
          styles: {
            // main: '<%= proj.dist.style %>/main.min.css',
            mainStatic: '<%= proj.dist.style %>/main-static.min.css',
            pricing: '<%= proj.dist.style %>/pricing.min.css',
            contactUs: '<%= proj.dist.style %>/contact-us.min.css',
            mainMobile: '<%= proj.dist.style %>/main-mobile.min.css',
            pricingMobile: '<%= proj.dist.style %>/pricing-mobile.min.css',
            contactUsMobile: '<%= proj.dist.style %>/contact-us-mobile.min.css',
            tutorial: '<%= proj.dist.style %>/tutorial.min.css',
          }
        }
      }
    },

    watch: {
      dev: {
        files: '<%= proj.src.root %>/**/*',
        tasks: ['build'],
        options: {
          livereload: true
        },
      },
    },

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= proj.build.root %>'
          ]
        }
      },
      dev: {
        options: {
          port: 9002,
          open: true,
          keepalive: true,
          debug: true,
          base: [
            '<%= proj.build.root %>'
          ]
        }
      },
      dist: {
        options: {
          port: 9001,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: 'localhost',
          open: true,
          keepalive: true,
          debug: true,
          base: [
            '<%= proj.dist.root %>'
          ]
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['connect:dev', 'watch:dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    concat: {
      options: {
        separator: ';\n',
      },
      build: {
        // combine jquery with jquery.cookie
        src: ['<%= proj.build.vendor %>/jquery.js', '<%= proj.build.vendor %>/jquery.cookie.js'],
        dest: '<%= proj.build.vendor %>/jquery.js'
      },
      buildComponents: {
        src: ['<%= proj.src.js %>/components/**/*.js'],
        dest: '<%= proj.build.scripts %>/components.js'
      },
      dist: {
        // combine jquery with jquery.cookie
        src: ['<%= proj.dist.vendor %>/jquery.min.js', '<%= proj.dist.vendor %>/jquery.cookie.min.js'],
        dest: '<%= proj.dist.vendor %>/jquery.min.js'
      },
      distComponents: {
        src: ['<%= proj.src.js %>/components/**/*.js'],
        dest: '<%= proj.dist.scripts %>/components.js'
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= proj.dist.scripts %>',
          src: ['**/*.js', '!**/*.min.js', '!**/*/*.cookie.js', '!**/*/*.cookie.min.js'],
          dest: '<%= proj.dist.scripts %>',
          ext: '.min.js'
        }, {
          '<%= proj.dist.vendor %>/jquery.cookie.min.js': '<%= proj.dist.vendor %>/jquery.cookie.js'
        }]
      }
    },

    cssmin: {
      dist: {
        banner: "/* Copyright 2014 TIBCO Software Inc. */",
        expand: true,
        cwd: '<%= proj.dist.style %>',
        src: ['*.css', '!*.min.css', '!**/main.css'],
        dest: '<%= proj.dist.style %>',
        ext: '.min.css'
      }
    },

    sitemap: {
      dist: {
        siteRoot: '<%= proj.dist.root %>',
        pattern: './*.html',
        homepage: '<%= proj.homepage %>',
        priority: '0.7'
      }
    },

    robotstxt: {
      dist: {
        dest: '<%= proj.dist.serverConfig %>',
        policy: [{
          ua: '*',
          disallow: '/',
          allow: ['/console/landing/']
        }, {
          sitemap: ['<%= proj.homepage %>/sitemap.xml']
        }, {
          crawldelay: 100
        }, {
          host: '<%= proj.host %>'
        }]
      }
    }
  });


  grunt.registerTask('dev', ['build', 'concurrent:dev']);
  grunt.registerTask('serve', ['build', 'connect:dist']);

  grunt.registerTask('build', ['clean:build', 'sass', 'copy:build', 'concat:build', 'concat:buildComponents', 'htmlbuild:build', 'clean:afterBuild', 'dist']);

  grunt.registerTask('dist', ['clean:dist', 'sass', 'copy:dist', 'cssmin:dist', 'concat:distComponents', 'uglify:dist', 'concat:dist', 'htmlbuild:dist', 'clean:afterDist', 'sitemap:dist', 'robotstxt:dist', 'copy:serverConfig', 'clean:serverConfig']);

  grunt.registerTask('default', ['serve']);

};