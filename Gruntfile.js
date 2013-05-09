/*global module:false*/
module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: [
                    'lib/intro.js',
                    'lib/grammar.js',
                    'lib/filtering.js',
                    'lib/filters/*.js',
                    'lib/union/*.js',
                    'lib/combinator/*.js',
                    'lib/pseudo/*.js',
                    'lib/utility/*.js',
                    'lib/exports.js',
                    'lib/outro.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                boss: true,
                eqnull: true,
                node:true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: [
                    'lib/filters/*.js',
                    'lib/union/*.js',
                    'lib/combinator/*.js',
                    'lib/pseudo/*.js',
                    'lib/utility/*.js',
                    'lib/exports.js',
                    'lib/filtering.js',
                    'tests/selectors.js'
                ]
            }
        },
        nodeunit: {
            files: [
                'tests/selectors.js',
                'tests/options.js'
            ]
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'nodeunit']
            }
        },
        exec: {
            jison: {
                cmd: 'cd lib && jison grammar.jison'
            }
        },
        clean: [
            'lib/grammar.js'
        ]
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');

    // Default task.
    grunt.registerTask('default', ['jshint', 'exec', 'concat', 'clean', 'nodeunit', 'uglify']);

};
