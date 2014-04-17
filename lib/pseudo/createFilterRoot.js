define(function() {
    'use strict';
    return function createFilterRoot() {
        var filterRoot = function filterRoot(stack) {
            return {ok: 1 === stack.length};
        };
        filterRoot.toString = function() {
            return 'root()';
        };
        return filterRoot;
    };
});