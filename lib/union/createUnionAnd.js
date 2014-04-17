define(function() {
    'use strict';
    return function createUnionAnd() {
        var unionAnd, args, argsList;
        args = Array.prototype.filter.call(arguments, function(filter) {
            return 'function' === typeof filter;
        });
        if (args.length === 0) {
            return null;
        } else if (args.length === 1) {
            return args[0];
        }
        unionAnd = function unionAnd(stack) {
            var filtered = [], next = [], i;
            for(i = 0; i < args.length; i++) {
                filtered[i] = args[i](stack.slice());
                next[i] = filtered[i].next;
            }
            for(i = 0; i < args.length; i++) {
                if(!filtered[i].ok) {
                    return {
                        ok: false,
                        next: createUnionAnd.apply(null, next)
                    };
                }
            }
            return {
                ok: true,
                next: createUnionAnd.apply(null, next)
            };
        };
        argsList = args.join(', ');
        unionAnd.toString = function() {
            return 'unionAnd(' + argsList + ')';
        };
        return unionAnd;
    };
});