/*global define*/
define(function() {
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
            if(stack.descendants.some(filter)) {
                return true;
            }
            return false;
        }
        filterHas.toString = function() {
            return 'has(' + fitler + ')';
        };
        return filterHas;
    }

    return createFilterHas;
});