/*global window, jQuery, define*/
/*global findByFilter, grammar, extend */
function JsonQuery(selector, data, options) {
    'use strict';
    var filter, result;
    if(!(this instanceof JsonQuery)) {
        return new JsonQuery(selector, data, options);
    }
    filter = grammar.parse(selector);
    options = extend({}, JsonQuery.defaultOptions, options);
    result = findByFilter(filter, data, options);
    this.length = result.length;
    result.forEach(function(path, index) {
        this[index] = path[path.length - 1].obj;
    }, this);
    Object.defineProperty(this, 'filter', {
        enumerable: false,
        value: filter
    });
    return this;
}
JsonQuery.prototype = Array.prototype;
JsonQuery.defaultOptions = {
    excludeFilters: []
};
if('function' === typeof jQuery) {
    JsonQuery.defaultOptions.excludeFilters = function(stack) {
        "use strict";
        if(stack[stack.length - 1].key === jQuery.expando) {
            return true;
        }
        return false;
    };
}

if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = JsonQuery;
} else if ( typeof define === "function" && define.amd ) {
    define( "JsonQuery", [], function () {
        "use strict";
        return JsonQuery;
    });
}
if ( typeof window === "object" && typeof window.document === "object" ) {
    window.JsonQuery = JsonQuery;
}
