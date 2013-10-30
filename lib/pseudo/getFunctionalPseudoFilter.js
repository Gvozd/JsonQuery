define(function(require, exports, module) {
    'use strict';
    var createFilterNthChild = require('pseudo/createFilterNthChild'),
        createFilterNthLastChild = require('pseudo/createFilterNthLastChild'),
        notImplemented = require('filters/notImplemented');
    return function getFunctionalPseudoFilter(IDENT, expression) {
        switch(IDENT) {
            case 'nth-child':
                return createFilterNthChild(expression);
            case 'nth-last-child':
                return createFilterNthLastChild(expression);
            default:
                return notImplemented(['Functional pseudo: ' + IDENT]);
        }
    };
});