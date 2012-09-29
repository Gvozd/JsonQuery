function unionAnd(filter1, filter2) {
    'use strict';
    var filter, i;
    if (arguments.length > 2) {
        filter = unionAnd(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            filter = unionAnd(filter, arguments[i]);
        }
        return filter;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    return function filter(stack) {
        var filtered1, filtered2;
        filtered1 = filter1(stack.slice());
        filtered2 = filter2(stack.slice());
        if (filtered1.ok && filtered2.ok) {
            return {
                ok: true,
                next: unionAnd(filtered1.next, filtered2.next)
            };
        } else {
            return {
                ok: false,
                next: unionAnd(filtered1.next, filtered2.next)
            };
        }
    };
}