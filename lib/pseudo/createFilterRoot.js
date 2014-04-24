/*global define*/
define(function(require, exports, module) {
    'use strict';
    var options = require('utility/options');
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