/*global define*/
define(function() {
    'use strict';
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createUnionOr(filter1, filter2) {
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
        function unionOr(stack) {
            for(var i =0; i < args.length; i++) {
                if(args[i](stack)) {
                    return true;
                }
            }
            return false;
        }
        unionOr.toString = function() {
            return 'unionOr(' + argsList + ')';
        };
        return unionOr;
    }
    return createUnionOr;
});