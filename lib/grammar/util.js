/*global define*/
define(function(require, exports, module) {
    'use strict';
    exports.text = function text(needle) {
        return exprText.bind(exports, needle);
    };

    function exprText(needle, haystack, position) {
        if (haystack.substr(position, needle.length) === needle) {
            return {
                res: needle,
                end: position + needle.length
            };
        }
    }

    exports.regexp = function (needle) {
        if ('string' === typeof needle) {
            needle = new RegExp('^(?:' + needle + ')');
        }
        return exprRegexp.bind(exports, needle);
    };

    function exprRegexp(needle, haystack, position) {
        var m;
        if (needle.global) {
            needle.lastIndex = 0;
        }
        m = needle.exec(haystack.slice(position));
        if (m && 0 === m.index) {
            return {
                res: m[0],
                end: position + m[0].length
            };
        }
    }

    exports.end = function end() {
        return exprEnd;
    };

    function exprEnd(haystack, position) {
        if (haystack.length === position) {
            return {
                res: '',
                end: position
            };
        }
    }

    exports.optional = function optional(pattern) {
        return combinatorOptional.bind(exports, pattern);
    };

    function combinatorOptional(pattern, haystack, position) {
        return pattern(haystack, position) || {
            res: undefined,
            end: position
        };
    }

    exports.exclude = function exclude(pattern, except) {
        return combinatorExclude.bind(exports, pattern, except);
    };

    function combinatorExclude(pattern, except, haystack, position) {
        return !except(haystack, position) && pattern(haystack, position);
    }

    exports.any = function any(firstPattern) {
        var patterns = 'function' === typeof firstPattern ? arguments : firstPattern;
        return combinatorAny.bind(exports, patterns);
    };

    function combinatorAny(patterns, haystack, position) {
        var result,
            i;
        for (i = 0; i < patterns.length; i += 1) {
            result = patterns[i](haystack, position);
            if (result) {
                return result;
            }
        }
    }

    exports.sequence = function sequence(firstPattern) {
        var patterns = 'function' === typeof firstPattern ? arguments : firstPattern;
        return combinatorSequence.bind(exports, patterns);
    };

    function combinatorSequence(patterns, haystack, position) {
        var result = [],
            end = position,
            r,
            i;

        for (i = 0; i < patterns.length; i += 1) {
            r = patterns[i](haystack, end);
            if (!r) {
                return;
            }
            result.push(r.res);
            end = r.end;
        }

        return {
            res: result,
            end: end
        };
    }


    exports.repeat = function repeat(pattern, separator) {
        var separated = !separator ?
            pattern :
            exports.then(exports.sequence(separator, pattern), getFirst);

        return combinatorRepeat.bind(exports, pattern, separated);
    };

    function combinatorRepeat(pattern, separated, haystack, position) {
        var result = [],
            end = position,
            r = pattern(haystack, end);

        while (r && r.end > end) {
            result.push(r.res);
            end = r.end;
            r = separated(haystack, end);
        }

        return {
            res: result,
            end: end
        };
    }

    function getFirst(r) {
        return r[1];
    }

    exports.optionalRepeat = function (pattern, separator) {
        var separated = !separator ?
            pattern :
            exports.then(exports.sequence(separator, pattern), getFirst);
        return combinatorOptional.bind(exports, combinatorRepeat.bind(exports, pattern, separated));
    };

    exports.then = function then(pattern, transform) {
        return combinatorThen.bind(exports, pattern, transform);
    };

    function combinatorThen(pattern, transform, haystack, position) {
        var r = pattern(haystack, position);
        return r && {
            res: transform(r.res),
            end: r.end
        };
    }
});