/*global createUnionOr, createGreaterCombinator, createFilterDeeperAny*/
function createSpaceCombinator(filter1, filter2) {// E F
    'use strict';
    var descendantUnion, i, args;
    if (arguments.length > 2) {
        descendantUnion = createSpaceCombinator(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            descendantUnion = createSpaceCombinator(descendantUnion, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        descendantUnion.toString = function () {
            return 'descendantUnion(' + args + ')';
        };
        return descendantUnion;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    descendantUnion = createUnionOr(createGreaterCombinator(filter1, filter2), createGreaterCombinator(filter1, createFilterDeeperAny(), filter2));
    descendantUnion.toString = function () {
        return 'descendantUnion(' + filter1 + ',' + filter2 + ')';
    };
    return descendantUnion;
}