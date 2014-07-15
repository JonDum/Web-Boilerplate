/*global module:false*/
module.exports = function(grunt) {

    //timing
    require('time-grunt')(grunt);

    //handles plugins
    require('jit-grunt')(grunt);

    var webpack = require('webpack');
    var webpackConfig = require("./webpack.config.js");

    var excludedFiles = ['!node_modules/**', '!build/**', '!Gruntfile.js', '!package.json', '!README','!.git','!.git/**'];

    // Project configuration.
    grunt.initConfig({

        clean: {
            build: ['build/'],
        },

        webpack: {
			options: webpackConfig,
			development: {
				devtool: "sourcemap",
				debug: true,
                production: false,
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        DEBUG: true,
                        PRODUCTION: false
                    })
                )
			},
			production: {
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
                        DEBUG: false,
                        PRODUCTION: true
					}),
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.UglifyJsPlugin()
				)
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
            development: {
                options: {
                    compress: false
                },
                files: {
                    'build/css/common.css': 'css/common.styl'
                }
            },

            production: {
                options: {
                    compress: true
                },
                files: {
                    'build/css/common.css': 'css/common.styl'
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
                files: ['js/**/*.js'],
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
    grunt.registerTask('production', ['clean', 'preprocess:production', 'rsync:static', 'stylus:production', 'csso', 'webpack:production']);

};

