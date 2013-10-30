var JsonQuery = require('../dist/JsonQuery.js');

exports.excludeFilters = function(test) {
    "use strict";
    var data = {
        a: 'a',
        b: 'b'
    }, options = {
        excludeFilters: [
            function(stack) {
                return 'a' === stack[stack.length - 1].key;
            }
        ]
    };
    test.expect(2);
    test.equal(JsonQuery('string', data).length, 2);
    test.equal(JsonQuery('string', data, options).length, 1);
    test.done();
}