define(function() {
    'use strict';
    return function createFilterName(name) {
        var results = [];
        function _getResult() {
            return results;
        }
        var filterName = function filterName(stack) {
            if(stack.pop().key === name) {
                results.push(stack);
            }
            return {
                ok: _getResult,
                next: null
            };
        };
        filterName.toString = function() {
            return 'filterName(' + JSON.stringify(name) + ')';
        };
        return filterName;
    };
});