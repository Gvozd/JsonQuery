define(function() {
    'use strict';
    return function notImplemented(args) {
        throw new Error('Not implemented: ' + JSON.stringify(args));
    };
});