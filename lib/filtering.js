function findByFilter(filter, data, stack, result) {
    'use strict';
    if (2 === arguments.length) {
        return findByFilter(filter, {':root': data}, [], []);
    }
    if (4 !== arguments.length) {
        throw new Error('Need 2 or 4 arguments');
    }
    Object.keys(data).forEach(function (key) {
        var newStack, filtered;
        newStack = stack.slice();
        newStack.push({obj: data[key], key: key});
        filtered = filter(newStack.slice());
        if (filtered.ok) {
            result.push(newStack.slice());
        }
        if ('function' === typeof filtered.next && 'object' === typeof data[key] && null !== data[key]) {
            findByFilter(filtered.next, data[key], newStack.slice(), result);
        }
    });
    return result;
}

// util
function convertResult(from) {
    'use strict';
    return from.map(function (element) {
        var result, first, path;
        result = element[element.length - 1].obj;
        first = element.shift();
        path = element.reduce(function (path, element) {
            return path + '>.' + element.key;
        }, first.key);
        return [path, result ];
    });
}
function convertResult2(from) {
    'use strict';
    return from.map(function (element) {
        var result, first, path, path2;
        result = element[element.length - 1].obj;
        first = element.shift();
        path = element.reduce(function (path, element) {
            if (!isNaN(element.key)) {
                return path + '[' + element.key + ']';
            } else {
                return path + '.' + element.key;
            }
        }, 'data');
        path2 = element.reduce(function (path, element) {
            return path + '>.' + element.key;
        }, first.key);
        return [path2, path ];
    });
}