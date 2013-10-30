define(function() {
    'use strict';
    return function createFilterAny() {
        var filterAny = function filterAny() {
            return {
                ok: true,
                next: null
            };
        };
        filterAny.toString = function() {
            return 'filterAny()';
        };
        return filterAny;
    };
});