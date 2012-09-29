/*global unionOr, childrenUnion, createFilterDeeperAny*/
function descendantUnion(filter1, filter2) {// E F
    'use strict';
    var filter, i;
    if (arguments.length > 2) {
        filter = descendantUnion(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            filter = descendantUnion(filter, arguments[i]);
        }
        return filter;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    return unionOr(childrenUnion(filter1, filter2), childrenUnion(filter1, createFilterDeeperAny(), filter2));
}