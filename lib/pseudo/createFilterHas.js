/*global define*/
define(['utility/options'], function(options) {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterHas(filter) {
        /**
         *
         * @param {Stack} stack
         * @returns {boolean}
         */
        function filterHas(stack) {
            var oldRootStack = options.currentRootStack,
                result;
            options.currentRootStack = stack;
            result = stack.descendants.some(filter);
            options.currentRootStack = oldRootStack;
            return result;
        }
        filterHas.toString = function() {
            return 'has(' + filter + ')';
        };
        return filterHas;
    }

    return createFilterHas;
});