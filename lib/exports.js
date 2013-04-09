function JsonQuery(selector, data) {
    'use strict';
    if(!(this instanceof JsonQuery)) {
        return new JsonQuery(selector, data);
    }
    var result = findByFilter(grammar.parse(selector), data);
    this.length = result.length;
    result.forEach(function(path, index) {
        this[index] = path[path.length - 1].obj;
    }, this);
    return this;
};
JsonQuery.prototype = Array.prototype;

if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = JsonQuery;
} else if ( typeof define === "function" && define.amd ) {
    define( "JsonQuery", [], function () { return JsonQuery; } );
}
if ( typeof window === "object" && typeof window.document === "object" ) {
    window.JsonQuery = window.$ = JsonQuery;
}
