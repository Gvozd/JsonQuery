/*global define*/
define(function() {
    'use strict';

    /**
     * @returns {stackFilter}
     */
    function createFilterAny() {
        /**
         * @type {stackFilter}
         */
        function filterAny() {
            return true;
        }
        filterAny.toString = function () {
            return 'any()';
        };
        return filterAny;
    }

    return createFilterAny;
});