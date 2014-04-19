/*global define*/
define(function() {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterLastChild() {
        /**
         * @type {stackFilter}
         */
        function filterLastChild(stack) {
            if(stack.length < 2) {
                return false;
            }
            return Array.isArray(stack[stack.length - 2].value) &&
                parseInt(stack[stack.length - 1].property, 10) === stack[stack.length - 2].value.length - 1;
        }
        filterLastChild.toString = function() {
            return 'lastChild()';
        };
        return filterLastChild;
    }

    return createFilterLastChild;
});