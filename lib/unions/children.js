/*global unionOr */
function childrenUnion(filter1, filter2) {// E > F
    'use strict';
    var filter, i;
    if (arguments.length > 2) {
        filter = childrenUnion(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            filter = childrenUnion(filter, arguments[i]);
        }
        return filter;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    return function filter(stack) {
        var filtered1 = filter1(stack.slice());
        if (!filtered1.ok) {
            if ('function' === typeof filtered1.next) {
                return {
                    ok: false,
                    next: childrenUnion(filtered1.next, filter2)
                };
            } else {
                return {
                    ok: false,
                    next: null
                };
            }
        } else {
            if ('function' === typeof filtered1.next) {
                return {
                    ok: false,
                    next: unionOr(childrenUnion(filtered1.next, filter2), filter2)
                };
            } else {
                return {
                    ok: false,
                    next: filter2
                };
            }
        }
    };
}