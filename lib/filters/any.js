function createFilterAny() {
    'use strict';
    return function filterAny() {
        return {
            ok: true,
            next: null
        };
    };
}