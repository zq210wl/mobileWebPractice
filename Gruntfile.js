/**
 * Gruntfile.js for my first mobile web development.
 */

module.exports = function(grunt) {
  // Load all grunt plugins that configure in `package.json`
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    projectCfg: {
      src: {
        root: 'src',
        css: '<%= projectCfg.src.root %>/css',
        img: '<%= projectCfg.src.root %>/img',
        js: '<%= projectCfg.src.root %>/js',
        less: '<%= projectCfg.src.root %>/less',
        lib: '<%= projectCfg.src.root %>/lib',
        template: '<%= projectCfg.src.root %>/template'
      }
    },
    /**
     * `less`: Compile LESS files to CSS
     */
    less:{
      development: {
        options: {
          compress: false
        },
        files: [{
          'src/css/test.css': 'src/less/test.less'
        }]
      },
    },
    /**
     * `connect`: Start a connect web server
     */
    connect: {
      development: {
        options: {
          port: 9000,
          hostname: '*',
          base: '<%= projectCfg.src.root %>',
          open: true,
          livereload: true
        }
      }
    },
    /**
     * `notify`: Automatic Notifications when Grunt tasks fail
     * https://github.com/dylang/grunt-notify
     */
    notify: {
      development: {
        options: {
          title: 'Success',
          message: 'Success'
        }
      }
    },
    watch:{
      options:{
        livereload: true
      },
      development:{
        files:['<%= projectCfg.src.root %>/less/*'],
        tasks:['less:development']
      }
    }
  });

  grunt.registerTask('build', ['less:development']);
  grunt.registerTask('development',['build', 'connect:development', 'watch:development'] );

  //grunt.registerTask('vv', ['notify:development']);

  grunt.registerTask('default', ['development']);

};