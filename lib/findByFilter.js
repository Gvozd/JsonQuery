define(function() {
    return function findByFilter(filter, data, options, stack, result) {
        'use strict';
        if (3 === arguments.length) {
            return findByFilter(filter, {':root': data}, options, [], []);
        }
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
            filtered = filter(newStack.slice());
            if ('function' === typeof filtered.next && 'object' === typeof data[key] && null !== data[key]) {
                findByFilter(filtered.next, data[key], options, newStack.slice(), result);
            }
            if (filtered.ok) {
                result.push(newStack.slice());
            }
        });
        return result;
    };
});