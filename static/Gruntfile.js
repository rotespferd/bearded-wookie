module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['app/html/*'], dest: 'dist/html/', filter: 'isFile', flatten: true},

                    //{expand: true, src: ['app/js/*'], dest: 'dist/js/', filter: 'isFile', flatten: true},

                    // includes files within path and its sub-directories
                    {expand: true, src: ['res/**'], dest: 'dist', cwd: 'app', flatten: false}
                ]
            },
            bower: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['bower_components/**'], dest: 'dist/'}
                ]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/js/**/*.js'],
                dest: 'dist/js/main.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app/js/**/*.js']
        },
        bowerInstall: {
            target: {
                src: 'app/html/index.html' // point to your HTML file.
            }
        },
        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['default']
            },
            lessCompile: {
                files: ['app/less/{,*/}*.less'],
                tasks: ['compile']
            },
            copy: {
                files: ['app/html/*.html'],
                tasks: ['copy']
            },
            javascript: {
                files: ['app/js/{,*/}*.js'],
                tasks: ['javascript']
            },
            livereload: {
                files: ['app/html/*.html', 'app/less/{,*/}*.less', 'app/js/{,*/}*.js'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8008,
                    base: './dist',
                    livereload: true
                }
            }
        }
    });

    // register plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-install');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'copy', 'copy:bower', 'bowerInstall', 'concat']);

    // build and run server
    grunt.registerTask('javascript', ['jshint', 'concat']);

    // build and run server
    grunt.registerTask('server', ['default', 'connect', 'watch']);

};
