var tests = [
    'JsonQuery'
].concat(Object.keys(window.__karma__.files).filter(function (filename) {
    return /^\/base\/tests\//.test(filename) && '/base/tests/main.js' !== filename;
}));

requirejs(['/base/lib/requirejs.conf.js'], function (config) {
    config.baseUrl = '/base/lib';
    config.deps = tests;
    config.callback = window.__karma__.start;
    requirejs.config(config);
    requirejs(['JsonQuery'], function (JsonQuery) {
        'use strict';
        var __toString = Object.prototype.toString;
        Object.prototype.toString = function () {
            //fix for assert.deepEqual type comparison
            if (this instanceof JsonQuery) {
                return "[object Array]";
            }
            return __toString.apply(this, arguments);
        }
    });
});