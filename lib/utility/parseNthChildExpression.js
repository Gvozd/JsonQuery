/*global define*/
define(function() {
    'use strict';

    /**
     * @typedef {function} stackFilter
     * @param {Stack} stack
     * @returns {Boolean}
     */
    function parseNthChildExpression(expression) {
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
        return {a: a, b: b};
    }

    return parseNthChildExpression;
});