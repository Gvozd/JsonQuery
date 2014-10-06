/*global define*/
define(function() {
    'use strict';
    return function getNotImplemented(args) {
        debugger;
        return function notImplemented() {
            throw new Error('Not implemented: ' + JSON.stringify(args));
        };
    };
});