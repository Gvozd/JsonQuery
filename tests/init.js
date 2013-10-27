(function() {
    'use strict';
    var __toString = Object.prototype.toString;
    Object.prototype.toString = function () {
        //fix for assert.deepEqual type comparison
        if (this instanceof JsonQuery) {
            return "[object Array]";
        }
        return __toString.apply(this, arguments);
    }
})();