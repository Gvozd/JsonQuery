function createFilterDeeperAny() {
    'use strict';
    var filterDeeperAny = function filterDeeperAny() {
        return {
            ok: true,
            next: filterDeeperAny
        };
    }
    filterDeeperAny.toString = function() {
        return 'filterDeeperAny()';
    };
    return filterDeeperAny;
}