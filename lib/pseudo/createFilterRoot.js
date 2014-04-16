define(function() {
    'use strict';
    return function createFilterRoot() {
        var results = [];
        function _getResult() {
            return results;
        }
        var filterRoot = function filterRoot(stack) {
            if(1 === stack.length) {
                results.push(stack);
            }
            return {
                ok: _getResult
            };
        };
        filterRoot.toString = function() {
            return 'root()';
        };
        return filterRoot;
    };
});