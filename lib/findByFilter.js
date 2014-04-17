define(function(require, exports, module) {
    'use strict';
    var utils = require('utils');
    function findByFilter(filter, data, options) {
        var results = [];
        filter = utils.convertSyncToAsync(filter);
        _findByFilter(filter, {':root': data}, options, [], results);
        return results
            .reduce(function(results, getResult) {
                results = results.concat(getResult());
                return results;
            }, [])
            .reduce(function(array, stack) {
                if(array.indexOf(stack) === -1) {
                    array.push(stack);
                }
                return array;
            }, []);
    }

    function _findByFilter(filter, data, options, stack, results) {
        if (5 !== arguments.length) {
            throw new Error('Need 3 or 5 arguments');
        }
        Object.keys(data).forEach(function (key) {
            var newStack, filtered;
            newStack = stack.slice();
            newStack.push({obj: data[key], key: key});
            var qwe = function(element) {
                return element(newStack.slice());
            };
            if(options.excludeFilters.some(qwe)) {
                return;
            }
            filtered = filter(newStack);
            if ('function' === typeof filtered.next && 'object' === typeof data[key] && null !== data[key]) {
                _findByFilter(filtered.next, data[key], options, newStack, results);
            }
            if (filtered.ok) {
                results.push(filtered.ok);
            }
        });
    }

    return findByFilter;
});