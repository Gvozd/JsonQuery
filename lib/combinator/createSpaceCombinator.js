define(function(require, exports, module) {
    'use strict';
    var createUnionOr = require('union/createUnionOr'),
        createGreaterCombinator = require('combinator/createGreaterCombinator'),
        createFilterDeeperAny = require('filters/deeperAny');
    return function createSpaceCombinator(filter1, filter2) {// E F
        var spaceCombinator, i, args;
        if (arguments.length > 2) {
            spaceCombinator = createSpaceCombinator(filter1, filter2);
            for (i = 2; i < arguments.length; i += 1) {
                spaceCombinator = createSpaceCombinator(spaceCombinator, arguments[i]);
            }
            args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
            spaceCombinator.toString = function () {
                return 'spaceCombinator(' + args + ')';
            };
            return spaceCombinator;
        }
        if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
            return null;
        }
        spaceCombinator = createUnionOr(createGreaterCombinator(filter1, filter2), createGreaterCombinator(filter1, createFilterDeeperAny(), filter2));
        spaceCombinator.toString = function () {
            return 'spaceCombinator(' + filter1 + ',' + filter2 + ')';
        };
        return spaceCombinator;
    };
});