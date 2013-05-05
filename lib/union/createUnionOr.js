function createUnionOr(filter1, filter2) {
    'use strict';
    var unionOr, i, args;
    if (arguments.length === 1) {
        return filter1;
    } else if (arguments.length > 2) {
        unionOr = createUnionOr(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            unionOr = createUnionOr(unionOr, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        unionOr.toString = function () {
            return 'unionOr(' + args + ')';
        };
        return unionOr;
    }
    if ('function' === typeof filter1 && 'function' !== typeof filter2) {
        return filter1;
    }
    if ('function' !== typeof filter1 && 'function' === typeof filter2) {
        return filter2;
    }
    if ('function' !== typeof filter1 && 'function' !== typeof filter2) {
        return null;
    }
    unionOr = function unionOr(stack) {
        var filtered1, filtered2;
        filtered1 = filter1(stack.slice());
        filtered2 = filter2(stack.slice());
        if (filtered1.ok || filtered2.ok) {
            return {
                ok: true,
                next: createUnionOr(filtered1.next, filtered2.next)
            };
        } else {
            return {
                ok: false,
                next: createUnionOr(filtered1.next, filtered2.next)
            };
        }
    };
    unionOr.toString = function() {
        return 'unionOr(' + filter1 + ',' + filter2 + ')';
    };
    return unionOr;
}