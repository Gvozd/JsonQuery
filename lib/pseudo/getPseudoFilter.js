/*global createFilterRoot, createFilterFirstChild, createFilterLastChild, notImplemented */
function getPseudoFilter(IDENT) {
    'use strict';
    switch(IDENT) {
        case 'root':
            return createFilterRoot();
        case 'first-child':
            return createFilterFirstChild();
        case 'last-child':
            return createFilterLastChild();
        default:
            return notImplemented(['pseudo ' + IDENT]);
    }
}