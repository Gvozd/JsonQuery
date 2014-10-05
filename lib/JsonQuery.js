/*global define*/
define(function(require, exports, module) {
    'use strict';
    var findByFilter = require('findByFilter'),
        selectors_group = require('grammar/grammar'),
        extend = require('utility/extend');
    function JsonQuery(selector, data, options) {
        var filter, result;
        if(!(this instanceof JsonQuery)) {
            return new JsonQuery(selector, data, options);
        }
        filter = selectors_group(selector, 0);
        if(filter) {
            filter = filter.res;
        } else {
            console.error(filter);
            return this;
        }
        options = extend({}, JsonQuery.defaultOptions, options);
        debugger;
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
    return JsonQuery;
});
