function createFilterType(type) {
    'use strict';
    return function filterType(stack) {
        return {
            ok: typeof stack.pop().obj === type,
            next: null
        };
    };
}