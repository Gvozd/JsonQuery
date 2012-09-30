/*global createUnionOr, createChildrenUnion, createFilterDeeperAny*/
function createDescendantUnion(filter1, filter2) {// E F
    'use strict';
    var descendantUnion, i, args;
    if (arguments.length > 2) {
        descendantUnion = createDescendantUnion(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            descendantUnion = createDescendantUnion(descendantUnion, arguments[i]);
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
    descendantUnion = createUnionOr(createChildrenUnion(filter1, filter2), createChildrenUnion(filter1, createFilterDeeperAny(), filter2));
    descendantUnion.toString = function () {
        return 'descendantUnion(' + filter1 + ',' + filter2 + ')';
    };
    return descendantUnion;
}