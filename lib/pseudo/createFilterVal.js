/*global define*/
define(function() {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterVal(value) {
        value = JSON.parse(value);
        /**
         *
         * @param {Stack} stack
         * @returns {boolean}
         */
        function filterVal(stack) {
            return stack[stack.length - 1].value === value;
        }
        filterVal.toString = function() {
            return 'val(' + JSON.stringify(value) + ')';
        };
        return filterVal;
    }

    return createFilterVal;
});