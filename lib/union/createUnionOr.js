define(function() {
    'use strict';
    return function createUnionOr() {
        var unionOr, args, argsList;
        args = Array.prototype.filter.call(arguments, function(filter) {
            return 'function' === typeof filter;
        });
        if (args.length === 0) {
            return null;
        } else if (args.length === 1) {
            return args[0];
        }
        unionOr = function unionOr(stack) {
            var filtered = [], next = [], i;
            for(i = 0; i < args.length; i++) {
                filtered[i] = args[i](stack.slice());
                next[i] = filtered[i].next;
            }
            for(i = 0; i < args.length; i++) {
                if(filtered[i].ok) {
                    return {
                        ok: true,
                        next: createUnionOr.apply(null, next)
                    };
                }
            }
            return {
                ok: false,
                next: createUnionOr.apply(null, next)
            };
        };
        argsList = args.join(', ');
        unionOr.toString = function() {
            return 'unionOr(' + argsList + ')';
        };
        return unionOr;
    };
});