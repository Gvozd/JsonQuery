define(function() {
    'use strict';
    var utils;
    utils.convertSyncToAsync = function convertSyncToAsync(functor){
        var results = [],
            nextFunctors = [];
        if('fucntion' !== typeof functor) {
            return null;
        }
        function _getResults() {
            nextFunctors.forEach(function(nextFunctor) {
                if('function' === typeof nextFunctor) {
                    results = results.concat(nextFunctor());
                }
            });
            return results;
        }

        function newFunctor(stack) {
            var result = fucntor(stack),
                nextFunctor = utils.convertSyncToAsync(result.next);
            nextFunctors.push(nextFunctor);
            if(result.ok) {
                results.push(stack);
            }
            return {
                ok: _getResults,
                next: nextFunctor
            }
        }
        newFunctor.toString = function toString() {
            return 'async(' + functor + ')';
        };
        return newFunctor;
    };

    return utils;
});