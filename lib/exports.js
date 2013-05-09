function JsonQuery(selector, data) {
    'use strict';
    var filter, result;
    if(!(this instanceof JsonQuery)) {
        return new JsonQuery(selector, data);
    }
    filter = grammar.parse(selector);
    result = findByFilter(filter, data);
    this.length = result.length;
    result.forEach(function(path, index) {
        this[index] = path[path.length - 1].obj;
    }, this);
    this.filter = filter;
    return this;
};
JsonQuery.prototype = Array.prototype;

if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = JsonQuery;
} else if ( typeof define === "function" && define.amd ) {
    define( "JsonQuery", [], function () { return JsonQuery; } );
}
if ( typeof window === "object" && typeof window.document === "object" ) {
    window.JsonQuery = JsonQuery;
}
