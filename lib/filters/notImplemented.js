/*global define*/
define(function() {
    'use strict';
    function notImplemented(args) {
        return function notImplemented() {
            throw new Error('Not implemented: ' + JSON.stringify(args));
        };
    }

    return notImplemented;
});