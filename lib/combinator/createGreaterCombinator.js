/*global createUnionOr */
function createGreaterCombinator(filter1, filter2) {// E > F
    'use strict';
    var greaterCombinator, i, args;
    if (arguments.length > 2) {
        greaterCombinator = createGreaterCombinator(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            greaterCombinator = createGreaterCombinator(greaterCombinator, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        greaterCombinator.toString = function () {
            return 'greaterCombinator(' + args + ')';
        };
        return greaterCombinator;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    greaterCombinator = function greaterCombinator(stack) {
        var filtered1 = filter1(stack.slice());
        if (!filtered1.ok) {
            if ('function' === typeof filtered1.next) {
                return {
                    ok: false,
                    next: createGreaterCombinator(filtered1.next, filter2)
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
                    next: createUnionOr(createGreaterCombinator(filtered1.next, filter2), filter2)
                };
            } else {
                return {
                    ok: false,
                    next: filter2
                };
            }
        }
    };
    greaterCombinator.toString = function() {
        return 'greaterCombinator(' + filter1 + ', ' + filter2 + ')';
    };
    return greaterCombinator;
}