/*global unionOr */
function createChildrenUnion(filter1, filter2) {// E > F
    'use strict';
    var childrenUnion, i, args;
    if (arguments.length > 2) {
        childrenUnion = createChildrenUnion(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            childrenUnion = createChildrenUnion(childrenUnion, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        childrenUnion.toString = function () {
            return 'childrenUnion(' + args + ')';
        };
        return childrenUnion;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    childrenUnion = function childrenUnion(stack) {
        var filtered1 = filter1(stack.slice());
        if (!filtered1.ok) {
            if ('function' === typeof filtered1.next) {
                return {
                    ok: false,
                    next: createChildrenUnion(filtered1.next, filter2)
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
                    next: createUnionOr(createChildrenUnion(filtered1.next, filter2), filter2)
                };
            } else {
                return {
                    ok: false,
                    next: filter2
                };
            }
        }
    };
    childrenUnion.toString = function() {
        return 'childrenUnion(' + filter1 + ', ' + filter2 + ')';
    };
    return childrenUnion;
}