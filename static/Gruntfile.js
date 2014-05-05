module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['app/html/*'], dest: 'dest/html/', filter: 'isFile', flatten: true},

                    // includes files within path and its sub-directories
                    {expand: true, src: ['res/**'], dest: 'dest', cwd: 'app', flatten: false}
                ]
            },
            bower: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['bower_components/**'], dest: 'dest/'}
                ]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['dest/js/**/*.js'],
                dest: 'dest/js/app.js'
            }
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
            livereload: {
                files: ['app/html/*.html', 'app/less/{,*/}*.less'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8008,
                    base: './dest',
                    livereload: true
                }
            }
        }
    });

    // register plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-install');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'copy:bower', 'bowerInstall', 'compile']);

    // build and run server
    grunt.registerTask('server', ['default', 'connect', 'watch']);

    // task for all the compiling
    grunt.registerTask('compile', ['typescript']);

};
