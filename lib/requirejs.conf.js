if (typeof define !== 'function' && typeof require === 'function') {
    define = require('amdefine')(module);
}
define(function (require, exports, module) {
    module.exports = {
        // Karma serves files from '/base'
        baseUrl: '.'
    };
});
