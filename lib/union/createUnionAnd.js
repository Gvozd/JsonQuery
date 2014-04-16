define(function(require, exports, module) {
    'use strict';
    var utils = require('utils');

    return function createUnionAnd() {
        var results = [],
            unionAnd,
            args,
            argsList;
        function _getResult() {
            var firstResult;
            results = results.map(function(getResult) {
                return getResult();
            });
            firstResult = results.shift();
            return firstResult.filter(function(stack) {
                return results.every(function(result) {
                    return result.indexOf(stack) !== -1;
                });
            });
        }
        args = Array.prototype.filter.call(arguments, function(filter) {
            return 'function' === typeof filter;
        });
        if (args.length === 0) {
            return null;
        } else if (args.length === 1) {
            return args[0];
        }
        unionAnd = function unionAnd(stack) {
            var filtered = [],
                next = [],
                allOk = true,
                i;
            for(i = 0; i < args.length; i++) {
                filtered[i] = args[i](stack);
                next[i] = filtered[i].next;
                results.push(filtered[i].ok);
            }
            return {
                ok: _getResult,
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