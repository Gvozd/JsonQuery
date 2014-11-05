/*global define*/
define(function() {
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

    util.regexp = function (needle, flags) {
        var result;
        if ('string' === typeof needle) {
            needle = new RegExp('^(?:' + needle + ')', flags || '');
        }
        result = exprRegexp.bind(util, needle);
        result.then = util.then.bind(util, result);
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

    util.end = function end() {
        var result = exprEnd.bind(util);
        result.then = util.then.bind(util, result);
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


    util.repeat = function repeat(pattern, separator, includeSeparator) {
        var result = combinatorRepeat.bind(util, pattern, separator, includeSeparator);
        result.then = util.then.bind(util, result);
        return result;
    };

    function combinatorRepeat(pattern, separator, includeSeparator, haystack, position) {
        var result = [],
            r2 = pattern(haystack, position),
            end = /*r2 ? r2.end : */position,
            r1;
        if(!r2) {
            return;
        }
        while (r2 && r2.end > end) {
            end = r2.end;
            if(includeSeparator && r1) {
                result.push(r1.res);
            }
            result.push(r2.res);
            if(separator) {
                r1 = separator(haystack, end);
                if(!r1) {
                    break;
                }
                //end = r1.end;
            }
            r2 = pattern(haystack, end);
            //end = r2.end;
        }

        return {
            res: result,
            end: end
        };
    }

    util.optionalRepeat = function (pattern, separator, includeSeparator) {
        var result = combinatorOptional.bind(util, combinatorRepeat.bind(util, pattern, separator, includeSeparator));
        result.then = util.then.bind(util, result);
        return result;
    };

    util.then = function then(pattern, transform) {
        var result = combinatorThen.bind(util, pattern, transform);
        result.then = util.then.bind(util, result);
        return result;
    };

    function combinatorThen(pattern, transform, haystack, position) {
        if('function' !== typeof transform) {
            throw new Error('need transform function');
        }
        var r = pattern(haystack, position);
        return r && {
            res: transform(r.res),
            end: r.end
        };
    }

    return util;
});