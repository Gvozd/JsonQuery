/*global define*/
define(['./createFilterNthChild', './createFilterNthLastChild', './createFilterVal', 'filters/notImplemented'],
    function(createFilterNthChild, createFilterNthLastChild, createFilterVal, notImplemented) {
    'use strict';
    function getFunctionalPseudoFilter(IDENT, expression) {
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
    }
    return getFunctionalPseudoFilter;
});