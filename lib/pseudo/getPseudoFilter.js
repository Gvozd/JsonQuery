/*global define*/
define([
    './createFilterRoot', './createFilterFirstChild', './createFilterLastChild', '../filters/notImplemented'
], function(createFilterRoot, createFilterFirstChild, createFilterLastChild, notImplemented) {
    'use strict';
    function getPseudoFilter(IDENT) {
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

    return getPseudoFilter;
});