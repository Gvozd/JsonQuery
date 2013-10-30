if (typeof define !== 'function' && typeof require === 'function') {
    define = require('amdefine')(module);
}
define(function(require, exports, module) {
    module.exports = {
        // Karma serves files from '/base'
        baseUrl: '.',

        paths: {
            //'jquery': '../lib/jquery',
            //'underscore': '../lib/underscore',
        }

        // ask Require.js to load these files (all our tests)
        //deps: tests,

        // start test run, once Require.js is done
        //callback: window.__karma__.start
    };
});
