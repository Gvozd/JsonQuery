/*global define*/
define(['findByFilter', 'grammar/grammar', 'utility/extend'], function(findByFilter, selectors_group, extend, window) {
    'use strict';
    function JsonQuery(selector, data, options) {
        var filter, result;
        if(!(this instanceof JsonQuery)) {
            return new JsonQuery(selector, data, options);
        }
        filter = selectors_group(selector, 0);
        //debugger;
        if(filter) {
            filter = filter.res;
        } else {
            throw new Error('Wrong selector: ' + selector);
        }
        options = extend({}, JsonQuery.defaultOptions, options);
        result = findByFilter(filter, data, options);
        Object.defineProperty(this, 'length', {
            enumerable: false,
            value: result.length
        });
        result.forEach(function(path, index) {
            this[index] = path[path.length - 1].value;
        }, this);
        Object.defineProperty(this, 'filter', {
            enumerable: false,
            value: filter
        });
        Object.defineProperty(this, 'splice', {
            enumerable: false,
            value: function() {
                //need for array-like view in console
                throw new Error('dummy method');
            }
        });
        return this;
    }
    JsonQuery.prototype = Array.prototype;
    JsonQuery.defaultOptions = {
        excludeFilters: []
    };

    /*global define*/
    if (typeof define === "function" && define.amd) {
        define("JsonQuery", [], function () {
            return JsonQuery;
        });
    }

    return JsonQuery;
});
