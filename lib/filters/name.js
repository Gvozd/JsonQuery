function createFilterName(name) {
    'use strict';
    return function filterName(stack) {
        return {
            ok: stack.pop().key === name,
            next: null
        };
    };
}