/*exported util*/
var util = (function () {
    'use strict';
    var util = {};

    util.text = function text(needle) {
        return function exprText(haystack, position) {
            if (haystack.substr(position, needle.length) === needle) {
                return {
                    res: needle,
                    end: position + needle.length
                };
            }
        };
    };

    util.regexp = function (needle) {
        if ('string' === typeof needle) {
            needle = new RegExp('^(?:' + needle + ')');
        }
        return function exprRegexp(haystack, position) {
            var m;

            needle.lastIndex = position;
            m = needle.exec(haystack);

            if (m && m.index === 0) {
                return {
                    res: m[0],
                    end: position + m[0].length
                };
            }
        };
    };

    util.optional = function optional(pattern) {
        return function combinatorOptional(haystack, position) {
            return pattern(haystack, position) || {
                res: undefined,
                end: position
            };
        };
    };

    util.exclude = function exclude(pattern, except) {
        return function combinatorExclude(haystack, position) {
            return !except(haystack, position) &&
                pattern(haystack, position);
        };
    };

    util.any = function any(firstPattern) {
        var patterns = 'function' === typeof firstPattern ? arguments : firstPattern;
        return function combinatorAny(haystack, position) {
            var result,
                i;

            for (i = 0; i < patterns.length; i += 1) {
                result = patterns[i](haystack, position);
                if (result) {
                    return result;
                }
            }
        };
    };

    util.sequence = function sequence(firstPattern) {
        var patterns = 'function' === typeof firstPattern ? arguments : firstPattern;
        return function combinatorSequence(haystack, position) {
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
        };
    };


    function getFirst(r) {
        return r[1];
    }

    util.repeat = function repeat(pattern, separator) {
        var separated = !separator ?
                pattern :
                util.then(util.sequence(separator, pattern), getFirst);

        return function combinatorRepeat(haystack, position) {
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
        };
    };

    util.then = function then(pattern, transform) {
        return function combinatorThen(haystack, position) {
            var r = pattern(haystack, position);
            return r && {
                res: transform(r.res),
                end: r.end
            };
        };
    };

    return util;
}());