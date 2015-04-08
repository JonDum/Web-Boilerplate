/*global module:false*/
module.exports = function(grunt) {

    //timing
    require('time-grunt')(grunt);

    //handles plugins
    require('jit-grunt')(grunt);

    var webpack = require('webpack');

    var excludedFiles = ['!node_modules/**', '!build/**', '!Gruntfile.js', '!package.json', '!README','!.git','!.git/**'];

    // Project configuration.
    grunt.initConfig({

        clean: {
            build: ['build/'],
        },

        webpack: {
			options: require('./webpack.config.js'),
			development: {
				devtool: "sourcemap",
				debug: true,
                production: false,
                plugins: [
                    new webpack.DefinePlugin({
                        DEBUG: true,
                        PRODUCTION: false
                    })
                ]
			},
			production: {
                plugins: [
                    new webpack.DefinePlugin({
                        DEBUG: false,
                        PRODUCTION: true
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin()
                ]
			},
		},

        rsync: {
            options: {
                args: ["-vPc"],
                exclude: excludedFiles,
                recursive: true
            },

            static: {
                options: {
                    src: "static/",
                    dest: "build/"
                }
            }

        },

        preprocess: {

            html: {
                files: [
                    {expand: true, cwd: 'pages/', src: ['**/*.html'], dest: 'build/'},
                ],
                options: {
                    context : {
                        debug: true,
                        development: true
                    }
                }
            },

            production: {
                files: [
                    {expand: true, cwd: 'pages/', src: ['**/*.html'], dest: 'build/'},
                ],
                options: {
                    context : {
                        production: true,
                        PRODUCTION: true
                    }
                }
            },

        },

        stylus: {
            options: {
                compress: false
            },

            development: {
                options: {
                    sourcemap: {inline: true}
                },
                files: [
                    {expand: true, cwd: 'css/', src: ['*.styl'], dest: 'build/css', ext:'.css'},
                ]
            },

            production: {
                options: {
                    compress: true
                },
                files: [
                    {expand: true, cwd: 'css/', src: ['*.styl'], dest: 'build/css', ext:'.css'},
                ]
            }
        },

        imageEmbed: {
            options: {
                baseDir: 'build/',
                deleteAfterEncoding: true
            },
            common: {
                src: [ "build/css/common.css" ],
                dest: "build/css/common.css",
                options: {
                    deleteAfterEncoding : false
                }
            }
        },

        csso: {
            production: {
                report: 'min',
                files: {'build/css/common.css': ['build/css/common.css']}
            }
        },

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['pages/**/*.html', 'templates/**/*.html'],
                tasks: ['preprocess:html']
            },
            stylus: {
                files: ['css/**/*.styl'],
                tasks: ['stylus:development']
            },
            js: {
                files: ['js/**/*.js', 'templates/**/*'],
                tasks: ['webpack:development']
            },
            static: {
                files: ['static/**/*'],
                tasks: ['rsync:static']
            }
        }
    });


    grunt.registerTask('preprocess:development', ['preprocess:html']);

    grunt.registerTask('dev', ['clean', 'preprocess:development', 'rsync:static', 'stylus:development', 'webpack:development']);

    grunt.registerTask('debug', ['default', 'watch']);

    grunt.registerTask('default', ['dev']);

    // Staging is production preprocessing without minifiaction/obfuscation
    grunt.registerTask('staging', ['preprocess:production', 'rsync:static']);

    // production environment
    grunt.registerTask('production', ['clean', 'preprocess:production', 'rsync:static', 'stylus:production', 'imageEmbed', 'csso', 'webpack:production']);

    //aliases
    grunt.registerTask('webpack:dev', ['webpack:development']);
    grunt.registerTask('webpack:prod', ['webpack:production']);

};

