/*global define*/
define(function(require, exports, module) {
    'use strict';
    exports.text = function text(needle) {
        var result = exprText.bind(exports, needle);
        result.then = exports.then.bind(exports, result);
        return result;
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
        var result;
        if ('string' === typeof needle) {
            needle = new RegExp('^(?:' + needle + ')');
        }
        result = exprRegexp.bind(exports, needle);
        result.then = exports.then.bind(exports, result);
        return result;
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
        var result = exprEnd.bind(exports);
        result.then = exports.then.bind(exports, result);
        return result;
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
        var result = combinatorOptional.bind(exports, pattern);
        result.then = exports.then.bind(exports, result);
        return result;
    };

    function combinatorOptional(pattern, haystack, position) {
        return pattern(haystack, position) || {
            res: undefined,
            end: position
        };
    }

    exports.exclude = function exclude(pattern, except) {
        var result = combinatorExclude.bind(exports, pattern, except);
        result.then = exports.then.bind(exports, result);
        return result;
    };

    function combinatorExclude(pattern, except, haystack, position) {
        return !except(haystack, position) && pattern(haystack, position);
    }

    exports.any = function any(firstPattern) {
        var patterns = 'function' === typeof firstPattern ? arguments : firstPattern,
            result = combinatorAny.bind(exports, patterns);
        result.then = exports.then.bind(exports, result);
        return result;
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
        var patterns = 'function' === typeof firstPattern ? arguments : firstPattern,
            result = combinatorSequence.bind(exports, patterns);
        result.then = exports.then.bind(exports, result);
        return result;
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


    exports.repeat = function repeat(pattern, separator, includeSeparator) {
        var result = combinatorRepeat.bind(exports, pattern, separator, includeSeparator);
        result.then = exports.then.bind(exports, result);
        return result;
    };

    function combinatorRepeat(pattern, separator, includeSeparator, haystack, position) {
        var result = [],
            r2 = pattern(haystack, position),
            end = r2 ? r2.end : position,
            r1;

        while (r2 && r2.end > end) {
            if(includeSeparator && r1) {
                result.push(r1.res);
            }
            result.push(r2.res);
            if(separator) {
                r1 = separator(haystack, end);
                if(!r1) {
                    break;
                }
                end = r1.end;
            }
            r2 = pattern(haystack, end);
            end = r2.end;
        }

        return {
            res: result,
            end: end
        };
    }

    exports.optionalRepeat = function (pattern, separator, includeSeparator) {
        var result = exports.then(
            combinatorOptional.bind(exports, combinatorRepeat.bind(exports, pattern, separator, includeSeparator)),
                function(res) {
                    return res && res[0];
                }
            );
        result.then = exports.then.bind(exports, result);
        return result;
    };

    exports.then = function then(pattern, transform) {
        var result = combinatorThen.bind(exports, pattern, transform);
        result.then = exports.then.bind(exports, result);
        return result;
    };

    function combinatorThen(pattern, transform, haystack, position) {
        if('function' !== typeof transform) {
            debugger;
        }
        var r = pattern(haystack, position);
        return r && {
            res: transform(r.res),
            end: r.end
        };
    }
});