/*global define*/
define(function() {
    'use strict';

    /**
     * @returns {stackFilter}
     */
    function createFilterType(type) {
        /**
         * @type {stackFilter}
         */
        function filterType(stack) {
            return type === _getType(stack[stack.length - 1].value);
        }
        filterType.toString = function () {
            return 'type(' + JSON.stringify(type) + ')';
        };
        return filterType;
    }

    function _getType(object) {
        if (Array.isArray(object)) {
            return 'array';
        } else if (null === object) {
            return 'null';
        } else {
            return typeof object;
        }
    }

    return createFilterType;
});