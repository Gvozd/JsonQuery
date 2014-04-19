/*global define */
define(function(require, exports, module) {
    'use strict';
    var parseNthChildExpression = require('utils').parseNthChildExpression;
    return function createFilterNthLastChild(expression) {
        // [":nth-child\\((odd|even|-?\\d+|-?\\d+n(?=[+\\-]|$)(\\+?-?\\d+)?)\\)", "return 'nth-child';"],
        var __ret = parseNthChildExpression(expression),
            a = __ret.a,
            b = __ret.b;

        var filterNthLastChild = function filterNthLastChild(stack) {
            var array,
                i;
            if (stack.length < 2) {
                return false;
            }
            array = stack[stack.length - 2].value;
            if (Array.isArray(array)) {
                for (i = array.length - 1 - b; i < array.length && i >= 0; i -= a) {
                    if (parseInt(stack[stack.length - 1].property, 10) === i) {
                        return true;
                    }
                    if(0 === a) {
                        return false;
                    }
                }
            }
            return false;
        };
        filterNthLastChild.toString = function () {
            return 'nthLastChild(' + expression + ')';
        };
        return filterNthLastChild;
    };
});