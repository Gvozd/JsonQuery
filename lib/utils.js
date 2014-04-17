define(function() {
    'use strict';
    var utils = {};
    utils.convertSyncToAsync = function convertSyncToAsync(functor){
        var results = [],
            nextFunctors = [];
        if('function' !== typeof functor) {
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
            if(!stack) {
                // TODO HACK - нужен адекватный способ возврата результата
                return _getResults();
            }
            var result = functor(stack),
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