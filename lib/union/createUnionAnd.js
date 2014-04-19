/*global define*/
define(function() {
    'use strict';
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createUnionAnd(filter1, filter2) {
        var args, argsList;
        args = Array.prototype.filter.call(arguments, function(filter) {
            return 'function' === typeof filter;
        });
        argsList = args.join(', ');
        if (args.length === 0) {
            return null;
        } else if (args.length === 1) {
            return args[0];
        }
        /**
         * @type {stackFilter}
         */
        function unionAnd(stack) {
            for(var i =0; i < args.length; i++) {
                if(!args[i](stack)) {
                    return false;
                }
            }
            return true;
        }
        unionAnd.toString = function() {
            return 'unionAnd(' + argsList + ')';
        };
        return unionAnd;
    }
    return createUnionAnd;
});