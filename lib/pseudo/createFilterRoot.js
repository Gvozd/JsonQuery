/*global define*/
define(function() {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterRoot() {
        /**
         * @type {stackFilter}
         */
        function filterRoot(stack) {
            if(stack.length === 1) {
                return true;
            }
            return false;
        }
        filterRoot.toString = function() {
            return 'root()';
        };
        return filterRoot;
    }

    return createFilterRoot;
});