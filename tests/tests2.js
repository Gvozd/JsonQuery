/**
 * @url https://github.com/lloyd/JSONSelectTests
 */
/*global parser, convertResult, findByFilter, ok, equal, deepEqual */
/*global convertResult2 */
(function () {
    'use strict';
    var data;
    data = {
        "a": 1,
        "b": 2,
        "c": {
            "a": 3,
            "b": 4,
            "c": {
                "a": 5,
                "b": 6
            }
        },
        "d": {
            "a": 7
        },
        "e": {
            "b": 8
        }
    };
    function test(name, selector, filterStringExpected, resultExpected) {
        window.test(name, function () {
            var filter, filterString, result;
            filter = parser.parse(selector);
            filterString = filter.toString();
            result = convertResult(findByFilter(filter, data));
            equal(filterString, filterStringExpected, 'built filter');
            deepEqual(result, resultExpected, 'built result');
        });
    }

    //test('sibling_childof', ':root > .a ~ .b', '', []);//2
    //test('sibling_descendantof', ':root .a ~ .b', '', []);//2,4,6
    //test('sibling_unrooted', '.a ~ .b', '', []);//2,4,6






}());

