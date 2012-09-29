function createFilterDeeperAny() {
    'use strict';
    return function filterDeeperAny() {
        return {
            ok: true,
            next: filterDeeperAny
        };
    };
}