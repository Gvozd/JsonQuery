/*exported util*/
var util = (function () {
    'use strict';
    var util = {};

    util.text = function text(needle) {
        var result = exprText.bind(util, needle);
        result.then = util.then.bind(util, result);
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

    util.regexp = function (needle) {
        var result;
        if ('string' === typeof needle) {
            needle = new RegExp('^(?:' + needle + ')');
        }
        result = exprRegexp.bind(util, needle);
        result.then = util.then.bind(util, result);
        return result;
    };

    function exprRegexp(needle, haystack, position) {
        var m;
        needle.lastIndex = position;
        m = needle.exec(haystack);
        if (m && m.index === 0) {
            return {
                res: m[0],
                end: position + m[0].length
            };
        }
    }

    util.optional = function optional(pattern) {
        var result = combinatorOptional.bind(util, pattern);
        result.then = util.then.bind(util, result);
        return result;
    };

    function combinatorOptional(pattern, haystack, position) {
        return pattern(haystack, position) || {
            res: undefined,
            end: position
        };
    }

    util.exclude = function exclude(pattern, except) {
        var result = combinatorExclude.bind(util, pattern, except);
        result.then = util.then.bind(util, result);
        return result;
    };

    function combinatorExclude(pattern, except, haystack, position) {
        return !except(haystack, position) && pattern(haystack, position);
    }

    util.any = function any(firstPattern) {
        var patterns = 'function' === typeof firstPattern ? arguments : firstPattern,
            result = combinatorAny.bind(util, patterns);
        result.then = util.then.bind(util, result);
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

    util.sequence = function sequence(firstPattern) {
        var patterns = 'function' === typeof firstPattern ? arguments : firstPattern,
            result = combinatorSequence.bind(util, patterns);
        result.then = util.then.bind(util, result);
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


    util.repeat = function repeat(pattern, separator) {
        var separated = !separator ?
                pattern :
                util.then(util.sequence(separator, pattern), getFirst),
            result = combinatorRepeat.bind(util, pattern, separated);
        result.then = util.then.bind(util, result);
        return result;
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

    util.then = function then(pattern, transform) {
        var result = combinatorThen.bind(util, pattern, transform);
        result.then = util.then.bind(util, result);
        return result;
    };

    function combinatorThen(pattern, transform, haystack, position) {
        var r = pattern(haystack, position);
        return r && {
            res: transform(r.res),
            end: r.end
        };
    }

    return util;
}());