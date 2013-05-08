function createFilterLastChild() {
    'use strict';
    var filterLastChild = function filterLastChild(stack) {
        if (stack.length < 2) {
            return {ok: false, next: null};
        }
        return {
            ok: Array.isArray(stack[stack.length - 2].obj) &&
                parseInt(stack[stack.length - 1].key, 10) === stack[stack.length - 2].obj.length - 1,
            next: null
        };
    };
    filterLastChild.toString = function () {
        return 'lastChild()';
    };
    return filterLastChild;
}