/*global define*/
define(function() {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterName(name) {
        /**
         * @type {stackFilter}
         */
        function filterName(stack) {
            return name === stack[stack.length - 1].property;
        }
        filterName.toString = function() {
            return 'name(' + JSON.stringify(name) + ')';
        };
        return filterName;
    }

    return createFilterName;
});