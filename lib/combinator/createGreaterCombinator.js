/*global define*/
define(function() {
    'use strict';
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createGreaterCombinator(filter1, filter2) {// E > F
        /**
         * @type {stackFilter}
         */
        function greaterCombinator(stack) {
            if(stack.length < 2) {
                return false;
            }
            // filter2 easier than filter1
            return filter2(stack) && filter1(stack[stack.length - 2].stack);
        }
        greaterCombinator.toString = function() {
            return 'greaterCombinator(' + filter1 + ', ' + filter2 + ')';
        };
        return greaterCombinator;
    }

    return createGreaterCombinator;
});