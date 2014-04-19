/*global define*/
define(function() {
    'use strict';
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createSpaceCombinator(filter1, filter2) {// E > F
        /**
         * @type {stackFilter}
         */
        function spaceCombinator(stack) {
            var i;
            if(stack.length < 2) {
                return false;
            }
            if(!filter2(stack)) {
                return false;
            }
            for(i = stack.length - 2; i >= 0; i--) {
                if(filter1(stack[i].stack)) {
                    return true;
                }
            }
            return false;
        }
        spaceCombinator.toString = function() {
            return 'spaceCombinator(' + filter1 + ', ' + filter2 + ')';
        };
        return spaceCombinator;
    }

    return createSpaceCombinator;
});