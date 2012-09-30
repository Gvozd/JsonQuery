function createFilterType(type) {
    'use strict';
    var filterType = function filterType(stack) {
        return {
            ok: typeof stack.pop().obj === type,
            next: null
        };
    };
    filterType.toString = function() {
        return 'filterType(' + JSON.stringify(type) + ')';
    };
    return filterType;
}