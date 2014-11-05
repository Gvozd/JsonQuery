/*global module:false, require:false*/
var path = require('path');
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
                    'lib/findByFilter.js',
                    'lib/filters/*.js',
                    'lib/union/*.js',
                    'lib/combinator/*.js',
                    'lib/pseudo/*.js',
                    'lib/utility/*.js',
                    'lib/JsonQuery.js',
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
            lib: {
                src: [
                    'lib/combinator/*.js',
                    'lib/filters/*.js',
                    'lib/grammar/*.js',
                    'lib/pseudo/*.js',
                    'lib/union/*.js',
                    'lib/utility/*.js',
                    'lib/findByFilter.js',
                    'lib/JsonQuery.js'
                ]
            },
            dist: 'dist/JsonQuery.js'
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
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
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('requirejs', function() {
        var requirejs = require( "requirejs"),
            done = this.async(),
            config = {
                'baseUrl': './lib',
                'name': 'JsonQuery',
                'optimize': 'none',
                'useStrict': true,
                'skipModuleInsertion': true,
                'wrap': {
                    'start': 'var JsonQuery = (function() {\r\n    \'use strict\';\r\n',
                    'end': '    return JsonQuery;\r\n}());'
                },
                'onBuildWrite': function (moduleName, path, contents) {
                    var tmp = contents.split(/((?:['"]use strict['"];)|(?:\s*return))/);
                    tmp.splice(0, 0, '\r\n    /*module: ' + moduleName + '*/\r\n//>>excludeStart("start", true)\r\n');
                    tmp.splice(3, 0, '\r\n//>>excludeEnd("start")');
                    tmp.splice(tmp.length - 2, 0, '\r\n//>>excludeStart("end", true)');
                    tmp.splice(tmp.length, 0, '\r\n//>>excludeEnd("end")');
                    return tmp.join('');
                },
                'out': './dist/JsonQuery.js'
            };
        requirejs.optimize( config, function( response ) {
            grunt.verbose.writeln( response );
            grunt.log.ok( "File '" + config.out + "' created." );
            done();
        }, function( err ) {
            done( err );
        });
    });


    // Default task.
    grunt.registerTask('default', ['jshint:lib', 'requirejs', 'karma', 'uglify', 'jshint:dist']);

};
