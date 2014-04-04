var _ = require('lodash');

module.exports = function(grunt){
    var srcFolder = [
        './src/**/*.js',
        './src/*.js',
        './*.js'
    ];
    var testFolder = [
        './test/**/*.js',
        './test/*.js'
    ];
    var folder = _.union(srcFolder, testFolder);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    ui: 'tdd'
                },
                src: testFolder
            }
        },

        watch: {
            test: {
                files: testFolder,
                tasks: 'mochaTest'
            },
            src: {
                files: srcFolder,
                tasks: 'mochaTest'
            }
        },

        jshint: {
            all: folder
        }
    });

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['mochaTest', 'jshint', 'watch']);
};