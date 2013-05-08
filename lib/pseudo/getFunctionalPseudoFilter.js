/*global createFilterNthChild, createFilterNthLastChild, notImplemented*/
function getFunctionalPseudoFilter(IDENT, expression) {
    'use strict';
    switch(IDENT) {
        case 'nth-child':
            return createFilterNthChild(expression);
        case 'nth-last-child':
            return createFilterNthLastChild(expression);
        default:
            return notImplemented(['Functional pseudo: ' + IDENT]);
    }
}