define(function() {
    'use strict';
    return function createFilterFirstChild() {
        var filterFirstChild = function filterFirstChild(stack) {
            if (stack.length < 2) {
                return {ok: false, next: null};
            }
            return {
                ok: Array.isArray(stack[stack.length - 2].obj) &&
                    parseInt(stack[stack.length - 1].key, 10) === 0,
                next: null
            };
        };
        filterFirstChild.toString = function () {
            return 'firstChild()';
        };
        return filterFirstChild;
    };
});