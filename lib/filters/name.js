function createFilterName(name) {
    'use strict';
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
}