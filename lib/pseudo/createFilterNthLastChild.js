define(function() {
    'use strict';
    return function createFilterNthLastChild(expression) {
        // [":nth-child\\((odd|even|-?\\d+|-?\\d+n(?=[+\\-]|$)(\\+?-?\\d+)?)\\)", "return 'nth-child';"],
        var a, b, i, array, exprReg = /^(-?\d*)n(?=[+\-]|\))\+?(-?\d+)?$/, mask;
        if ('even' === expression) {
            a = 2;
            b = 1;
        } else if ('odd' === expression) {
            a = 2;
            b = 0;
        } else if (null !== expression.match(/^-?\d+$/)) {
            a = 0;
            b = parseInt(expression || 0, 10) - 1;
        } else if (null !== expression.match(exprReg)) {
            mask = expression.match(exprReg);
            a = parseInt(mask[1], 10);
            a = !isNaN(a) ? a : parseInt(mask[1] + '1', 10);
            b = parseInt(mask[2] || 0, 10) - 1;
        } else {
            throw new Error('Lexical error on line 1. Unrecognized expression.\n:nth-child(' + expression + ')');
        }

        var filterNthLastChild = function filterNthLastChild(stack) {
            if (stack.length < 2) {
                return {ok: false, next: null};
            }
            array = stack[stack.length - 2].obj;
            if (Array.isArray(array)) {
                for (i = array.length - 1 - b; i < array.length && i >= 0; i -= a) {
                    if (parseInt(stack[stack.length - 1].key, 10) === i) {
                        return {ok: true, next: null};
                    }
                    if(0 === a) {
                        break;
                    }
                }
            }
            return {ok: false, next: null};
        };
        filterNthLastChild.toString = function () {
            return 'nthLastChild()';
        };
        return filterNthLastChild;
    };
});