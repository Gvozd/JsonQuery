define(['pseudo/createFilterRoot', 'pseudo/createFilterFirstChild', 'pseudo/createFilterLastChild', 'filters/notImplemented'], function() {
    'use strict';
    var createFilterRoot = require('pseudo/createFilterRoot'),
        createFilterFirstChild = require('pseudo/createFilterFirstChild'),
        createFilterLastChild = require('pseudo/createFilterLastChild'),
        notImplemented = require('filters/notImplemented');
    return function getPseudoFilter(IDENT) {
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
    };
});