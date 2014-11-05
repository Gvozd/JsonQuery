/*global define*/
define(['utility/options'], function(options) {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterRoot() {
        /**
         * @type {stackFilter}
         */
        function filterRoot(stack) {
            return stack === options.currentRootStack;
        }
        filterRoot.toString = function() {
            return 'root(???)';
        };
        return filterRoot;
    }

    return createFilterRoot;
});