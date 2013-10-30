define(function() {
    'use strict';
    return function createFilterType(type) {
        function getType(object) {
            if (Array.isArray(object)) {
                return 'array';
            } else if (null === object) {
                return 'null';
            } else {
                return typeof object;
            }
        }
        var filterType = function filterType(stack) {
            return {
                ok: getType(stack.pop().obj) === type,
                next: null
            };
        };
        filterType.toString = function () {
            return 'filterType(' + JSON.stringify(type) + ')';
        };
        return filterType;
    };
});