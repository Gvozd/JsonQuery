function createFilterAny() {
    'use strict';
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
}