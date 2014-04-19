/*global define*/
define(function(require, exports, module) {
    'use strict';
    var parseNthChildExpression = require('utils').parseNthChildExpression;
    return function createFilterNthChild(expression) {
        // [":nth-child\\((odd|even|-?\\d+|-?\\d+n(?=[+\\-]|$)(\\+?-?\\d+)?)\\)", "return 'nth-child';"],
        var __ret = parseNthChildExpression(expression),
            a = __ret.a,
            b = __ret.b;

        var filterNthChild = function filterNthChild(stack) {
            var array,
                i;
            if (stack.length < 2) {
                return false;
            }
            array = stack[stack.length - 2].value;
            if (Array.isArray(array)) {
                for (i = b; i < array.length && i >= 0; i += a) {
                    if (parseInt(stack[stack.length - 1].property, 10) === i) {
                        return true;
                    }
                    if (0 === a) {
                        return false;
                    }
                }
            }
            return false;
        };
        filterNthChild.toString = function () {
            return 'nthChild(' + expression + ')';
        };
        return filterNthChild;
    };
});