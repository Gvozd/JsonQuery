define(function() {
    'use strict';
    return function createFilterDeeperAny() {
        var results = [];
        function _getResult() {
            return results;
        }
        var filterDeeperAny = function filterDeeperAny(stack) {
            results.push(stack);
            return {
                ok: _getResult,
                next: filterDeeperAny
            };
        };
        filterDeeperAny.toString = function() {
            return 'filterDeeperAny()';
        };
        return filterDeeperAny;
    };
});