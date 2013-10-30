var tests = [
    'JsonQuery'
].concat(Object.keys(window.__karma__.files).filter(function (filename) {
    return /^\/base\/tests\//.test(filename) && '/base/tests/main.js' !== filename;
}));

requirejs.config({
    baseUrl: '/base/lib',
    deps: tests,
    callback: window.__karma__.start
});
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