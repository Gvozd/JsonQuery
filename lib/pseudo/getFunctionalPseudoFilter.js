/*global define*/
define(function(require, exports, module) {
    'use strict';
    var createFilterNthChild = require('pseudo/createFilterNthChild'),
        createFilterNthLastChild = require('pseudo/createFilterNthLastChild'),
        createFilterVal = require('pseudo/createFilterVal'),
        notImplemented = require('filters/notImplemented');
    return function getFunctionalPseudoFilter(IDENT, expression) {
        switch(IDENT) {
            case 'nth-child':
                return createFilterNthChild(expression);
            case 'nth-last-child':
                return createFilterNthLastChild(expression);
            case 'val':
                return createFilterVal(expression);
            default:
                return notImplemented(['Functional pseudo: ' + IDENT]);
        }
    };
});