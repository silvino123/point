var path = require('path');
var saveLicense = require('uglify-save-license');

module.exports = config();

///////

function config() {

    // MAIN PATHS
    var paths = {
        app: './app/',
        dist: '../dist/',
        npm: './node_modules/',
        components: './app/components/'
    }

    var config = {

        paths: paths,

        // SOURCES CONFIG
        source: {
            scripts: [
                paths.app + 'app.js',
                paths.components + '**/*.js'
            ],
            templates: {
                views: [
                    paths.components + '**/*.html',
                    paths.components + '**/*.pug',
                    '!' + paths.components + '*/*.layout.pug',
                    '!' + paths.components + '*/*.tpl.pug'
                ],
                watch: [
                    paths.components + '**/*.html',
                    paths.components + '**/*.pug'
                ]
            },
            styles: {
                app: [
                    paths.app + 'app.scss',
                    paths.components + 'common/preloader.scss',
                    paths.components + '**/*.scss'
                ]
            },
            images: [
                paths.app + 'images/**/*'
            ],
            fonts: [
            ],
            vendor: [
                paths.npm + 'bootstrap-colorpicker/dist/img/**/*',
                paths.npm + 'datatables/media/images/**/*',
                paths.npm + 'x-editable/dist/bootstrap3-editable/img/**/*',
                paths.npm + 'multiselect/img/**/*',
                // - All font files
                // paths.npm + '**/*.{eot,svg,ttf,woff,woff2}'
                // - Font Awesome
                // paths.npm + 'font-awesome/fonts/' + '**/*.{eot,svg,ttf,woff,woff2}',
                paths.npm + 'ionicons/fonts/' + '**/*.{eot,svg,ttf,woff,woff2}',
                paths.npm + 'summernote/dist/font/' + '**/*.{eot,svg,ttf,woff,woff2}',
                paths.npm + 'footable/css/fonts' + '**/*.{eot,svg,ttf,woff,woff2}'
            ],
            static: [
                paths.app + 'static/**/*',
            ]
        },

        // BUILD TARGET CONFIG
        build: {
            scripts: paths.dist + 'js',
            styles: paths.dist + 'css',
            templates: {
                index: '../',
                views: paths.dist
            },
            images: paths.dist + 'img',
            fonts: paths.dist + 'fonts',
            static: paths.dist + 'static',
            vendor: paths.dist + 'vendor'
        },

        // PLUGINS OPTIONS

        prettifyOpts: {
            indent_char: ' ',
            indent_size: 3,
            unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u', 'pre', 'code']
        },

        pugOpts: {
            pretty: true
        },

        uglify: {
            output: {
                comments: saveLicense
            }
        },

        uglifyVendor: {
            output: {
                comments: false,
            },
            mangle: {
                reserved: ['$super'] // rickshaw requires this
            }
        },

        cleanCss: {
            rebase: false
        }

    }

    return config;
} // config()