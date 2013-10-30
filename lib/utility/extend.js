define(function() {
    "use strict";
    return function extend(base) {
        var i, additional, key;
        base = base || {};
        for(i = 1; i < arguments.length; i++) {
            additional = arguments[i];
            for(key in additional) {
                if(additional.hasOwnProperty(key)) {
                    base[key] = additional[key];
                }
            }
        }
        return base;
    };
});