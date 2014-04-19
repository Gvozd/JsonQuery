/*global define*/
define(function() {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterFirstChild() {
        /**
         * @type {stackFilter}
         */
        function filterFirstChild(stack) {
            if(stack.length < 2) {
                return false;
            }
            return Array.isArray(stack[stack.length - 2].value) &&
                parseInt(stack[stack.length - 1].property, 10) === 0;
        }
        filterFirstChild.toString = function() {
            return 'firstChild()';
        };
        return filterFirstChild;
    }

    return createFilterFirstChild;
});