define(function() {
    'use strict';
    return function createUnionOr() {
        var results = [],
            unionOr,
            args,
            argsList;
        function _getResult() {
            return results.reduce(function(results, getResult) {
                results = results.concat(getResult());
                return results;
            }, []);
        }
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
                filtered[i] = args[i](stack);
                next[i] = filtered[i].next;
                results.push(filtered[i].ok);
            }
            return {
                ok: _getResult,
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