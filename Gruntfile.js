/*global module */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! \n * <%= pkg.name %> - version <%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy HH:MM") %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %>\n' +
            ' * <%= pkg.author %>\n */\n',
        directories: {
            sass: {
                dev: 'dev/sass',
                dist: 'styles/temp/css'
            },
            css: {
                dev: 'styles/temp/css',
                dist: 'styles'
            },
            html: {
                dev: 'dev/html',
                dist: 'partials'
            },
            js: {
                dev: 'dev/js',
                dist: 'scripts'
            },
            clean: {
                temp: 'styles/temp/'
            }
        },
        sass: {
            tocss: {
                files: [{
                    expand: true,
                    cwd: '<%= directories.sass.dev %>',
                    src: [
                        '*.scss',
                        '!{boot,var,mix,$}*.scss'
                    ],
                    dest: '<%= directories.sass.dist %>',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            minify: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= directories.css.dev %>',
                    src: [
                        '*.css',
                        '!*.min.css'
                    ],
                    dest: '<%= directories.css.dist %>',
                    ext: '.min.css'
                }]
            }
        },
        clean: {
            temporary: {
                src: [
                    '<%= directories.clean.temp %>'
                ]
            }
        },
        htmlmin: {
            minify: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '<%= directories.html.dev %>',
                src: [
                    '**/*.html'
                ],
                dest: '<%= directories.html.dist %>'
            }
        },
        move: {
            index: {
                src: '<%= directories.html.dist %>/index.html',
                dest: 'index.html'
            }
        },
        concat: {
            options: {
                stripBanners: false,
                banner: '<%= banner %>'
            },
            components: {
                files: {
                    'scripts/ie.min.js': [
                        'components/html5shiv/dist/html5shiv.min.js'
                    ],
                    'scripts/components.min.js': [
                        'components/angular/angular.min.js',
                        'components/angular-filter/dist/angular-filter.js'
                    ],
                    'styles/components.min.css': [
                        'components/bootstrap/dist/css/bootstrap.min.css'
                    ]
                }
            },
            applicationComponents: {
                src: [
                    'scripts/app.min.js',
                    'scripts/controllers/*.min.js',
                    'scripts/directives/*.min.js',
                    'scripts/filters/*.min.js',
                    'scripts/services/*.min.js'
                ],
                dest: 'scripts/app.min.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                mangle: false,
                compress: {
                    drop_console: true
                }
            },
            scripts: {
                files: [{
                    expand: true,
                    cwd: '<%= directories.js.dev %>',
                    src: '**/*.js',
                    dest: '<%= directories.js.dist %>',
                    ext: '.min.js'
                }]
            },
            controllers: {
                files: [{
                    expand: true,
                    cwd: '<%= directories.js.dev %>/controllers',
                    src: '**/*.js',
                    dest: '<%= directories.js.dist %>/controllers',
                    ext: '.min.js'
                }]
            },
            directives: {
                files: [{
                    expand: true,
                    cwd: '<%= directories.js.dev %>/directives',
                    src: '**/*.js',
                    dest: '<%= directories.js.dist %>/directives',
                    ext: '.min.js'
                }]
            },
            services: {
                files: [{
                    expand: true,
                    cwd: '<%= directories.js.dev %>/services',
                    src: '**/*.js',
                    dest: '<%= directories.js.dist %>/services',
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            sass: {
                files: '<%= directories.sass.dev %>/**/*.scss',
                tasks: [
                    'sass',
                    'cssmin',
                    'clean'
                ],
                options: {
                    livereload: true
                }
            },
            html: {
                files: '<%= directories.html.dev %>/**/*.html',
                tasks: [
                    'htmlmin',
                    'move',
                    'replace'
                ],
                options: {
                    livereload: true
                }
            },
            js: {
                files: [
                    '<%= directories.js.dev %>/**/*.js',
                    '<%= directories.js.dev %>/controllers/**/*.js',
                    '<%= directories.js.dev %>/directives/**/.js',
                    '<%= directories.js.dev %>/services/**/*.js'
                ],
                tasks: [
                    'uglify',
                    'concat'
                ],
                options: {
                    livereload: true
                }
            },
            replace: {
                files: '<%= directories.html.dev %>/**/*.html',
                tasks: [
                    'replace'
                ]
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'renderVersion',
                            replacement: '<%= grunt.template.today("ddmmyyyyHHMM") %>'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'index.html'
                        ],
                        dest: ''
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-move');

    grunt.registerTask('default', [
        'sass',
        'cssmin',
        'clean',
        'htmlmin',
        'uglify',
        'replace',
        'concat',
        'move'
    ]);

    grunt.registerTask('full', [
        'sass',
        'cssmin',
        'clean',
        'htmlmin',
        'uglify',
        'move',
        'replace',
        'concat',
        'watch'
    ]);
};
