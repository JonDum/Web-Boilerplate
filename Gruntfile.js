/*global module:false*/
module.exports = function(grunt) {

    //timing
    require('time-grunt')(grunt);

    //handles plugins
    require('jit-grunt')(grunt, {
        'webpack-dev-server': 'grunt-webpack'
    });

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
                plugins: [
                    new webpack.DefinePlugin({
                        DEBUG: true,
                        PRODUCTION: false
                    })
                ],
			},
            staging: {
                plugins: [
                    new webpack.DefinePlugin({
                        DEBUG: false,
                        PRODUCTION: true
                    }),
                ]
            },
			production: {
                debug: false,
                production: true,
                devtool: 'none',
                output: {
                    pathinfo: false,
                },
                plugins: [
                    new webpack.DefinePlugin({
                        DEBUG: false,
                        PRODUCTION: true
                    }),
                    new webpack.optimize.UglifyJsPlugin({
                        output: {
                            comments: false,
                        }
                    })
                ]
			},
		},

        'webpack-dev-server': {

            options: {
				webpack: require('./webpack.config.js'),
                contentBase: './build',
                historyApiFallback: true,
                stats: {
                    hash: true,
                    colors: true,
                    timings: true,
                    chunks: true,
                    chunkModules: true,
                    modules: true,
                    reasons: true,
                    children: true,
                }
			},

            start: {
				keepAlive: false,
				webpack: {
					devtool: 'eval',
					debug: true
				}
			}
        },

        rsync: {
            options: {
                args: ['-vPc'],
                exclude: excludedFiles,
                recursive: true
            },

            static: {
                options: {
                    src: 'static/',
                    dest: 'build/'
                }
            }

        },

        preprocess: {

            development: {
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

        cacheBust: {
            options: {
                baseDir: './build/',
                rename: false,
            },
            assets: {
              files: {
                src: ['build/**/*.html']
              }
            }
        },

        stylus: {
            options: {
                compress: false,
            },

            development: {
                options: {
                    sourcemap: {inline: true},
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


        csso: {
            production: {
                report: 'min',
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['*.css'],
                    dest: 'build/css/',
                }]
            }
        },


        imageEmbed: {
            options: {
                baseDir: 'build/',
                deleteAfterEncoding: true
            },
            css: {
                options: {
                    deleteAfterEncoding: false
                },
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['*.css'],
                    dest: 'build/css/',
                }]
            }
        },

                watch: {
            options: {
                spawn: true,
            },
            livereload: {
                files: ['build/**/*'],
                options: {
                    livereload: true,
                }
            },
            html: {
                files: ['pages/**/*.html', 'templates/**/*.html'],
                tasks: ['preprocess:development'],
            },
            stylus: {
                files: ['css/**/*.styl'],
                tasks: ['stylus:development'],
            },
            static: {
                files: ['static/**/*'],
                tasks: ['rsync:static']
            }
        }


    });

    var r = grunt.registerTask;

    r('common:all', ['clean', 'rsync']);

    //dev
    r('common:d', ['common:all', 'preprocess:development', 'stylus:development', 'webpack:development']);

    //staging
    r('common:s', ['common:all', 'preprocess:production', 'stylus:development', 'webpack:staging']);

    //production
    r('common:p', ['common:all', 'preprocess:production', 'stylus:production', 'webpack:production']);


    r('build:development', ['common:d', 'cacheBust']);
    r('build:staging', ['common:s', 'csso', 'imageEmbed', 'cacheBust']);
    r('build:production', ['common:p', 'csso', 'imageEmbed', 'cacheBust']);
    r('build', [process.env.NODE_ENV === 'production' ? 'build:production' : 'build:development']);

    r('serve', ['webpack-dev-server:start', 'watch']);

    //aliases
    r('webpack:dev', ['webpack:development']);
    r('webpack:prod', ['webpack:production']);
    r('and', []); // ==> `grunt build and serve` neato
    r('default', ['build']);

    //legacy
    r('dev', ['build:development'])
    r('staging', ['build:staging'])
    r('production', ['build:production'])
};

