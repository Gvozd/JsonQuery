function createFilterRoot() {
    'use strict';
    return function filterRoot(stack) {
        return {ok: 1 === stack.length};
    };
}