function createUnionAnd(filter1, filter2) {
    'use strict';
    var unionAnd, i, args;
    if (arguments.length > 2) {
        unionAnd = createUnionAnd(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            unionAnd = createUnionAnd(unionAnd, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        unionAnd.toString = function () {
            return 'unionAnd(' + args + ')';
        };
        return unionAnd;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    unionAnd = function unionAnd(stack) {
        var filtered1, filtered2;
        filtered1 = filter1(stack.slice());
        filtered2 = filter2(stack.slice());
        if (filtered1.ok && filtered2.ok) {
            return {
                ok: true,
                next: createUnionAnd(filtered1.next, filtered2.next)
            };
        } else {
            return {
                ok: false,
                next: createUnionAnd(filtered1.next, filtered2.next)
            };
        }
    };
    unionAnd.toString = function () {
        return 'unionAnd(' + filter1 + ', ' + filter2 + ')';
    };
    return unionAnd;
}