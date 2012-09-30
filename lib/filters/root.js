function createFilterRoot() {
    'use strict';
    var filterRoot = function filterRoot(stack) {
        return {ok: 1 === stack.length};
    };
    filterRoot.toString = function() {
        return 'filterRoot()';
    };
    return filterRoot;
}