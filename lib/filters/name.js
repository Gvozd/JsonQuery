define(function() {
    'use strict';
    return function createFilterName(name) {
        var filterName = function filterName(stack) {
            return {
                ok: stack.pop().key === name,
                next: null
            };
        };
        filterName.toString = function() {
            return 'filterName(' + JSON.stringify(name) + ')';
        };
        return filterName;
    };
});