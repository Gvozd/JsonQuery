define(function() {
    'use strict';
    return function createFilterDeeperAny() {
        var filterDeeperAny = function filterDeeperAny() {
            return {
                ok: true,
                next: filterDeeperAny
            };
        };
        filterDeeperAny.toString = function() {
            return 'filterDeeperAny()';
        };
        return filterDeeperAny;
    };
});