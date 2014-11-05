var JsonQuery = (function() {
    'use strict';

    /*module: utility/options*/
    var options = {
        currentRootStack: null
    };

    /*module: findByFilter*/
    function findByFilter(filter, data) {
        var stacks = getAllStacks(data);
        options.currentRootStack = stacks[0][0].stack;
        if (!filter) {
            throw new Error('empty filter function');
        }
        return stacks.filter(filter);
    }

    function _stackSorter(stack1, stack2) {
        var length = Math.min(stack1.length, stack2.length),
            i,
            keys;
        for(i = 0; i < length; i++) {
            if(stack1[i] !== stack2[i]) {
                keys = Object.keys(stack1[i - 1].value);
                if(keys.indexOf(stack1[i].property) < keys.indexOf(stack2[i].property)) {
                    return -1;
                } else {
                    return 1;
                }
            }
        }
        if(stack1.length < stack2.length) {
            return 1;
        }
        if(stack2.length < stack1.length) {
            return -1;
        }
        return 0;
    }

    /**
     * @param {StackItem[]}stack
     * @constructor
     * @extends Array
     */
    function Stack(stack) {
        this.push.apply(this, stack);
        stack[stack.length - 1].stack = this;
    }
    Stack.prototype = Object.create(Array.prototype);
    Stack.prototype.constructor = Stack;
    Stack.prototype.children    = [];
    Stack.prototype.descendants = [];

    /**
     * @param {String} property
     * @param {*} value
     * @constructor
     */
    function StackItem(property, value) {
        this.property = property;
        this.value = value;
    }
    StackItem.prototype.property = '';
    StackItem.prototype.value = undefined;
    StackItem.prototype.stack = null;


    /**
     * @param {Stack} parentStack
     */
    function createChildrenStacks(parentStack) {
        var object = parentStack[parentStack.length - 1].value,
            keys,
            key,
            i,
            item,
            stack;
        if(null !== object && 'object' === typeof object) {
            parentStack.children = [];
            parentStack.descendants = [];
            keys = Object.keys(object);
            for(i = 0; i < keys.length; i++) {
                key = keys[i];
                item = new StackItem(key, object[key]);
                stack = new Stack(
                    parentStack.slice().concat([item])
                );
                createChildrenStacks(stack);
                parentStack.children.push(stack);
                parentStack.descendants.push.apply(parentStack.descendants, stack.descendants);
                parentStack.descendants.push(stack);
            }
        }
    }

    /**
     * @param {Object} object
     * @returns {Stack[]}
     */
    function getAllStacks(object) {
        var item = new StackItem('', object),
            stack = new Stack([item]);
        createChildrenStacks(stack);
        return stack.descendants.concat([stack]);
    }

    /*module: grammar/util*/
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

    /*module: combinator/createGreaterCombinator*/
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createGreaterCombinator(filter1, filter2) {// E > F
        /**
         * @type {stackFilter}
         */
        function greaterCombinator(stack) {
            if(stack.length < 2) {
                return false;
            }
            // filter2 easier than filter1
            return filter2(stack) && filter1(stack[stack.length - 2].stack);
        }
        greaterCombinator.toString = function() {
            return 'greaterCombinator(' + filter1 + ', ' + filter2 + ')';
        };
        return greaterCombinator;
    }

    /*module: combinator/createSpaceCombinator*/
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createSpaceCombinator(filter1, filter2) {// E > F
        /**
         * @type {stackFilter}
         */
        function spaceCombinator(stack) {
            var i;
            if(stack.length < 2) {
                return false;
            }
            if(!filter2(stack)) {
                return false;
            }
            for(i = stack.length - 2; i >= 0; i--) {
                if(filter1(stack[i].stack)) {
                    return true;
                }
            }
            return false;
        }
        spaceCombinator.toString = function() {
            return 'spaceCombinator(' + filter1 + ', ' + filter2 + ')';
        };
        return spaceCombinator;
    }

    /*module: filters/createFilterAny*/

    /**
     * @returns {stackFilter}
     */
    function createFilterAny() {
        /**
         * @type {stackFilter}
         */
        function filterAny() {
            return true;
        }
        filterAny.toString = function () {
            return 'any()';
        };
        return filterAny;
    }

    /*module: filters/createFilterName*/
    /**
     * @returns {stackFilter}
     */
    function createFilterName(name) {
        /**
         * @type {stackFilter}
         */
        function filterName(stack) {
            return name === stack[stack.length - 1].property;
        }
        filterName.toString = function() {
            return 'name(' + JSON.stringify(name) + ')';
        };
        return filterName;
    }

    /*module: filters/notImplemented*/
    function notImplemented(args) {
        return function notImplemented() {
            throw new Error('Not implemented: ' + JSON.stringify(args));
        };
    }

    /*module: filters/createFilterType*/

    /**
     * @returns {stackFilter}
     */
    function createFilterType(type) {
        /**
         * @type {stackFilter}
         */
        function filterType(stack) {
            return type === _getType(stack[stack.length - 1].value);
        }
        filterType.toString = function () {
            return 'type(' + JSON.stringify(type) + ')';
        };
        return filterType;
    }

    function _getType(object) {
        if (Array.isArray(object)) {
            return 'array';
        } else if (null === object) {
            return 'null';
        } else {
            return typeof object;
        }
    }

    /*module: pseudo/createFilterHas*/
    /**
     * @returns {stackFilter}
     */
    function createFilterHas(filter) {
        /**
         *
         * @param {Stack} stack
         * @returns {boolean}
         */
        function filterHas(stack) {
            var oldRootStack = options.currentRootStack,
                result;
            options.currentRootStack = stack;
            result = stack.descendants.some(filter);
            options.currentRootStack = oldRootStack;
            return result;
        }
        filterHas.toString = function() {
            return 'has(' + filter + ')';
        };
        return filterHas;
    }

    /*module: pseudo/createFilterFirstChild*/
    /**
     * @returns {stackFilter}
     */
    function createFilterFirstChild() {
        /**
         * @type {stackFilter}
         */
        function filterFirstChild(stack) {
            if(stack.length < 2) {
                return false;
            }
            return Array.isArray(stack[stack.length - 2].value) &&
                parseInt(stack[stack.length - 1].property, 10) === 0;
        }
        filterFirstChild.toString = function() {
            return 'firstChild()';
        };
        return filterFirstChild;
    }

    /*module: pseudo/createFilterLastChild*/
    /**
     * @returns {stackFilter}
     */
    function createFilterLastChild() {
        /**
         * @type {stackFilter}
         */
        function filterLastChild(stack) {
            if(stack.length < 2) {
                return false;
            }
            return Array.isArray(stack[stack.length - 2].value) &&
                parseInt(stack[stack.length - 1].property, 10) === stack[stack.length - 2].value.length - 1;
        }
        filterLastChild.toString = function() {
            return 'lastChild()';
        };
        return filterLastChild;
    }

    /*module: utility/parseNthChildExpression*/

    /**
     * @typedef {function} stackFilter
     * @param {Stack} stack
     * @returns {Boolean}
     */
    function parseNthChildExpression(expression) {
        var a, b, i, array, exprReg = /^(-?\d*)n(?=[+\-]|\))\+?(-?\d+)?$/, mask;
        if ('even' === expression) {
            a = 2;
            b = 1;
        } else if ('odd' === expression) {
            a = 2;
            b = 0;
        } else if (null !== expression.match(/^-?\d+$/)) {
            a = 0;
            b = parseInt(expression || 0, 10) - 1;
        } else if (null !== expression.match(exprReg)) {
            mask = expression.match(exprReg);
            a = parseInt(mask[1], 10);
            a = !isNaN(a) ? a : parseInt(mask[1] + '1', 10);
            b = parseInt(mask[2] || 0, 10) - 1;
        } else {
            throw new Error('Lexical error on line 1. Unrecognized expression.\n:nth-child(' + expression + ')');
        }
        return {a: a, b: b};
    }

    /*module: pseudo/createFilterNthChild*/
    function createFilterNthChild(expression) {
        // [":nth-child\\((odd|even|-?\\d+|-?\\d+n(?=[+\\-]|$)(\\+?-?\\d+)?)\\)", "return 'nth-child';"],
        var __ret = parseNthChildExpression(expression),
            a = __ret.a,
            b = __ret.b;

        var filterNthChild = function filterNthChild(stack) {
            var array,
                i;
            if (stack.length < 2) {
                return false;
            }
            array = stack[stack.length - 2].value;
            if (Array.isArray(array)) {
                for (i = b; i < array.length && i >= 0; i += a) {
                    if (parseInt(stack[stack.length - 1].property, 10) === i) {
                        return true;
                    }
                    if (0 === a) {
                        return false;
                    }
                }
            }
            return false;
        };
        filterNthChild.toString = function () {
            return 'nthChild(' + expression + ')';
        };
        return filterNthChild;
    }

    /*module: pseudo/createFilterNthLastChild*/
    function createFilterNthLastChild(expression) {
        // [":nth-child\\((odd|even|-?\\d+|-?\\d+n(?=[+\\-]|$)(\\+?-?\\d+)?)\\)", "return 'nth-child';"],
        var __ret = parseNthChildExpression(expression),
            a = __ret.a,
            b = __ret.b;

        var filterNthLastChild = function filterNthLastChild(stack) {
            var array,
                i;
            if (stack.length < 2) {
                return false;
            }
            array = stack[stack.length - 2].value;
            if (Array.isArray(array)) {
                for (i = array.length - 1 - b; i < array.length && i >= 0; i -= a) {
                    if (parseInt(stack[stack.length - 1].property, 10) === i) {
                        return true;
                    }
                    if(0 === a) {
                        return false;
                    }
                }
            }
            return false;
        };
        filterNthLastChild.toString = function () {
            return 'nthLastChild(' + expression + ')';
        };
        return filterNthLastChild;
    }

    /*module: pseudo/createFilterRoot*/
    /**
     * @returns {stackFilter}
     */
    function createFilterRoot() {
        /**
         * @type {stackFilter}
         */
        function filterRoot(stack) {
            return stack === options.currentRootStack;
        }
        filterRoot.toString = function() {
            return 'root(???)';
        };
        return filterRoot;
    }

    /*module: pseudo/createFilterVal*/
    /**
     * @returns {stackFilter}
     */
    function createFilterVal(value) {
        value = JSON.parse(value);
        /**
         *
         * @param {Stack} stack
         * @returns {boolean}
         */
        function filterVal(stack) {
            return stack[stack.length - 1].value === value;
        }
        filterVal.toString = function() {
            return 'val(' + JSON.stringify(value) + ')';
        };
        return filterVal;
    }

    /*module: pseudo/getFunctionalPseudoFilter*/
    function getFunctionalPseudoFilter(IDENT, expression) {
        switch(IDENT) {
            case 'nth-child':
                return createFilterNthChild(expression);
            case 'nth-last-child':
                return createFilterNthLastChild(expression);
            case 'val':
                return createFilterVal(expression);
            default:
                return notImplemented(['Functional pseudo: ' + IDENT]);
        }
    }

    /*module: pseudo/getPseudoFilter*/
    function getPseudoFilter(IDENT) {
        switch(IDENT) {
            case 'root':
                return createFilterRoot();
            case 'first-child':
                return createFilterFirstChild();
            case 'last-child':
                return createFilterLastChild();
            default:
                return notImplemented(['pseudo ' + IDENT]);
        }
    }

    /*module: union/createUnionAnd*/
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createUnionAnd(filter1, filter2) {
        var args, argsList;
        args = Array.prototype.filter.call(arguments, function(filter) {
            return 'function' === typeof filter;
        });
        argsList = args.join(', ');
        if (args.length === 0) {
            return null;
        } else if (args.length === 1) {
            return args[0];
        }
        /**
         * @type {stackFilter}
         */
        function unionAnd(stack) {
            for(var i =0; i < args.length; i++) {
                if(!args[i](stack)) {
                    return false;
                }
            }
            return true;
        }
        unionAnd.toString = function() {
            return 'unionAnd(' + argsList + ')';
        };
        return unionAnd;
    }

    /*module: union/createUnionOr*/
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createUnionOr(filter1, filter2) {
        var args, argsList;
        args = Array.prototype.filter.call(arguments, function(filter) {
            return 'function' === typeof filter;
        });
        argsList = args.join(', ');
        if (args.length === 0) {
            return null;
        } else if (args.length === 1) {
            return args[0];
        }
        /**
         * @type {stackFilter}
         */
        function unionOr(stack) {
            for(var i =0; i < args.length; i++) {
                if(args[i](stack)) {
                    return true;
                }
            }
            return false;
        }
        unionOr.toString = function() {
            return 'unionOr(' + argsList + ')';
        };
        return unionOr;
    }

    /*module: grammar/grammar*/
    var // lexical tokens 1
        nl = '\\n|\\r\\n|\\r|\\f',                                      // nl        \n|\r\n|\r|\f
        nonascii = '[^\\0-\\177]',                                      // nonascii  [^\0-\177]
        num = '[0-9]+|[0-9]*\\.[0-9]+',                                 // num       [0-9]+|[0-9]*\.[0-9]+
        unicode = '\\\\[0-9a-f]{1,6}(?:\\r\\n|[ \\n\\r\\t\\f])?',       // unicode   \\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?
        escape = '(?:' + unicode + ')|\\\\[^\\n\\r\\f0-9a-f]',          // escape    {unicode}|\\[^\n\r\f0-9a-f]
        nmstart = '[_a-z]|(?:' + nonascii + ')|(?:' + escape + ')',     // nmstart   [_a-z]|{nonascii}|{escape}
        nmchar = '[_a-z0-9-]|(?:' + nonascii + ')|(?:' + escape + ')',  // nmchar    [_a-z0-9-]|{nonascii}|{escape}
        name = '(?:' + nmchar + ')+',                                   // name      {nmchar}+
        ident = '[-]?(?:' + nmstart + ')(?:' + nmchar + ')*',           // ident     [-]?{nmstart}{nmchar}*
        string1 = '\\"(?:[^\\n\\r\\f\\\\"]|\\\\(?:' + nl + ')|(?:' +
            nonascii + ')|(?:' + escape + '))*\\"',                     // string1   \"([^\n\r\f\\"]|\\{nl}|{nonascii}|{escape})*\"
        string2 = '\\\'(?:[^\\n\\r\\f\\\\\']|\\\\(?:' + nl + ')|(?:' +
            nonascii + ')|(?:' + escape + '))*\\\'',                    // string2   \'([^\n\r\f\\']|\\{nl}|{nonascii}|{escape})*\'
        string = '(?:' + string1 + ')|(?:' + string2 + ')',             // string    {string1}|{string2}
        invalid1 = '\\"([^\\n\\r\\f\\\\"]|\\\\(?:' + nl + ')|(?:' +
            nonascii + ')|(?:' + escape + '))*',                        // invalid1  \"([^\n\r\f\\"]|\\{nl}|{nonascii}|{escape})*
        invalid2 = '\\\'([^\\n\\r\\f\\\\\']|\\\\(?:' + nl + ')|(?:' +
            nonascii + ')|(?:' + escape + '))*',                        // invalid2  \'([^\n\r\f\\']|\\{nl}|{nonascii}|{escape})*
        invalid = '(?:' + invalid1 + ')|(?:' + invalid2 + ')',          // invalid   {invalid1}|{invalid2}
        w = '[ \\t\\r\\n\\f]*',                                         // w         [ \t\r\n\f]*
        D = 'd|\\\\0{0,4}(44|64)(\\r\\n|[ \\t\\r\\n\\f])?',             // D         d|\\0{0,4}(44|64)(\r\n|[ \t\r\n\f])?
        E = 'e|\\\\0{0,4}(45|65)(\\r\\n|[ \\t\\r\\n\\f])?',             // E         e|\\0{0,4}(45|65)(\r\n|[ \t\r\n\f])?
        N = 'n|\\\\0{0,4}(4e|6e)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\n',       // N         n|\\0{0,4}(4e|6e)(\r\n|[ \t\r\n\f])?|\\n
        O = 'o|\\\\0{0,4}(4f|6f)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\o',       // O         o|\\0{0,4}(4f|6f)(\r\n|[ \t\r\n\f])?|\\o
        T = 't|\\\\0{0,4}(54|74)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\t',       // T         t|\\0{0,4}(54|74)(\r\n|[ \t\r\n\f])?|\\t
        V = 'v|\\\\0{0,4}(56|76)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\v',       // V         v|\\0{0,4}(56|76)(\r\n|[ \t\r\n\f])?|\\v
        _H = 'h|\\\\0{0,4}(48|68)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\h',      // _H        h|\\0{0,4}(48|68)(\r\n|[ \t\r\n\f])?|\\h
        _A = 'a|\\\\0{0,4}(41|61)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\a',      // _A        a|\\0{0,4}(41|61)(\r\n|[ \t\r\n\f])?|\\a
        _S = 's|\\\\0{0,4}(53|73)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\s',      // _S        s|\\0{0,4}(53|73)(\r\n|[ \t\r\n\f])?|\\s

        // lexical tokens 2
        S = '[ \\t\\r\\n\\f]+',                                         // [ \t\r\n\f]+     return S;
        INCLUDES = '~=',                                                // "~="             return INCLUDES;
        DASHMATCH = '|=',                                               // "|="             return DASHMATCH;
        PREFIXMATCH = '\\^=',                                           // "^="             return PREFIXMATCH;
        SUFFIXMATCH = '\\$=',                                           // "$="             return SUFFIXMATCH;
        SUBSTRINGMATCH = '\\*=',                                        // "*="             return SUBSTRINGMATCH;
        IDENT = '(?:' + ident + ')',                                    // {ident}          return IDENT;
        STRING = '(?:' + string + ')',                                  // {string}         return STRING;
        FUNCTION = '(?:' + ident + ')\\(',                              // {ident}"("       return FUNCTION;
        NUMBER = '(?:' + num + ')',                                     // {num}            return NUMBER;
        HASH = '#(?:' + name + ')',                                     // "#"{name}        return HASH;
        PLUS = '(?:' + w + ')\\+',                                      // {w}"+"           return PLUS;
        GREATER = '(?:' + w + ')>',                                     // {w}">"           return GREATER;
        COMMA = '(?:' + w + '),',                                       // {w}',"           return COMMA;
        TILDE = '(?:' + w + ')~',                                       // {w}"~"           return TILDE;
        NOT = ':(?:' + N + ')(?:' + O + ')(?:' + T + ')[ \\t\\r\\n\\f]*\\(',            // ":"{N}{O}{T}"("  return NOT;
        HAS = ':(?:' + _H + ')(?:' + _A + ')(?:' + _S + ')[ \\t\\r\\n\\f]*\\(',         // ":"{_H}{_A}{_S}"("  return HAS;
        ATKEYWORD = '@(?:' + ident + ')',                               // @{ident}         return ATKEYWORD;
        INVALID = '(?:' + invalid + ')',                                // {invalid}        return INVALID;
        PERCENTAGE = '(?:' + w + ')%',                                  // {num}%           return PERCENTAGE;
        DIMENSION = '(?:' + num + ')(?:' + ident + ')',                 // {num}{ident}     return DIMENSION;
        CDO = '<!--',                                                   // "<!--"           return CDO;
        CDC = '-->';                                                    // "-->"            return CDC;

    function selectors_group(haystack, position) {
        // selectors_group
        //   : selector [ COMMA S* selector ]*
        //   ;
        return util
            .sequence(
                selector,
                util.optionalRepeat(
                    util
                        .sequence(
                            util.regexp(COMMA, 'i'),
                            util.optionalRepeat(
                                util.regexp(S, 'i')
                            ),
                            selector
                        )
                        .then(function(res) {
                            return res[2];
                        })
                )/*,
                util.end()*/
            )
            .then(function(res) {
                var result,
                    i;
                result = res[0];
                if(res[1]) {
                    for(i = 0; i < res[1].length; i++) {
                        result = createUnionOr(result, res[1][i]);
                    }
                }
                return result;
            })(haystack, position);
    }

    function selector(haystack, position) {
        // selector
        //   : simple_selector_sequence [ combinator simple_selector_sequence ]*
        //   ;
        return util
            .sequence(
                simple_selector_sequence,
                util.optionalRepeat(
                    util.sequence(
                        combinator,
                        simple_selector_sequence
                    )
                )
            )
            .then(function(res) {
                    var result = res[0],
                        i;
                    if(res[1]) {
                        for(i = 0; i < res[1].length; i++) {
                            result = res[1][i][0](result, res[1][i][1]);
                        }
                    }
                    //debugger;
                    return result;
                })(haystack, position);
    }

    function combinator(haystack, position) {
        // combinator
        //   /* combinators can be surrounded by whitespace */
        //   : PLUS S* | GREATER S* | TILDE S* | S+
        //   ;
        return util.any(
            util
                .sequence(
                    util.regexp(PLUS, 'i'),
                    util.optionalRepeat(
                        util.regexp(S, 'i')
                    )
                )
                .then(function(res) {
                    return notImplemented('PLUS combinator', res);
                }),
            util
                .sequence(
                    util.regexp(GREATER, 'i'),
                    util.optionalRepeat(
                        util.regexp(S, 'i')
                    )
                )
                .then(function(res) {
                    return createGreaterCombinator;
                }),
            util
                .sequence(
                    util.regexp(TILDE, 'i'),
                    util.optionalRepeat(
                        util.regexp(S, 'i')
                    )
                )
                .then(function(res) {
                    return notImplemented('TILDE combinator', res);
                }),
            util
                .repeat(
                    util.regexp(S, 'i')
                )
                .then(function(res) {
                    return createSpaceCombinator;
                })
        )(haystack, position);
    }

    function simple_selector_sequence(haystack, position) {
        // simple_selector_sequence
        //   : [ type_selector | universal]
        //     [ HASH | class | attrib | pseudo | negation ]*
        //   | [ HASH | class | attrib | pseudo | negation ]+
        //   ;
        //debugger;
        return util
            .any(
                util.sequence(
                    util.any(
                        type_selector,
                        universal
                    ),
                    util.optionalRepeat(
                        util.any(
                            util.regexp(HASH, 'i'),
                            class_selector,
                            attrib,
                            negation,
                            has,
                            pseudo
                        )
                    )
                ),
                util
                    .repeat(
                        util.any(
                            util.regexp(HASH, 'i'),
                            class_selector,
                            attrib,
                            negation,
                            has,
                            pseudo
                        )
                    )
                    .then(function(res) {
                        return [null, res];
                    })
            )
            .then(function(res) {
                var result,
                    i;
                result = res[0];
                if(res[1]) {
                    for(i = 0; i < res[1].length; i++) {
                        result = createUnionAnd(result, res[1][i]);
                    }
                }
                return result;
            })(haystack, position);
    }

    function type_selector(haystack, position) {
        // type_selector
        //   : [ namespace_prefix ]? element_name
        //   ;
        return util
            .sequence(
                util.optional(
                    namespace_prefix
                ),
                element_name
            )
            .then(function(res) {
                return createFilterType(res[1] || res[0]);
            })(haystack, position);
    }

    function namespace_prefix(haystack, position) {
        // namespace_prefix
        //   : [ IDENT | '*' ]? '|'
        //   ;
        return util
                .sequence(
                util.optional(
                    util.any(
                        util.regexp(IDENT, 'i'),
                        util.text('*')
                    )
                ),
                util.text('|')
            )
            .then(function(res) {
                return notImplemented('namespace_prefix', res);
            })(haystack, position);
    }

    function element_name(haystack, position) {
        // element_name
        //   : IDENT
        //   ;
        return util.regexp(IDENT, 'i')(haystack, position);
    }

    function universal(haystack, position) {
        // universal
        //   : [ namespace_prefix ]? '*'
        //   ;
        return util
            .sequence(
                util.optional(
                    namespace_prefix
                ),
                util.text('*')
            )
            .then(function() {
                return createFilterAny();
            })(haystack, position);
    }

    function class_selector(haystack, position) {
        // class
        //   : '.' IDENT
        //   ;
        return util
            .sequence(
                util.text('.'),
                util.any(
                    util
                        .regexp(STRING, 'i')
                        .then(function(res) {
                            if(res[0] === '"' && res[res.length - 1] === '"') {
                                return res.slice(1, -1).replace(/\\"/, '"');
                            }
                            if(res[0] === "'" && res[res.length - 1] === "'") {
                                return res.slice(1, -1).replace(/\\'/, "'");
                            }
                        }),
                    util.regexp(IDENT, 'i')
                )
            )
            .then(function(res) {
                return createFilterName(res[1]);
            })(haystack, position);
    }

    function attrib(haystack, position) {
        // attrib
        //   : '[' S* [ namespace_prefix ]? IDENT S*
        //         [ [ PREFIXMATCH |
        //             SUFFIXMATCH |
        //             SUBSTRINGMATCH |
        //             '=' |
        //             INCLUDES |
        //             DASHMATCH ] S* [ IDENT | STRING ] S*
        //         ]? ']'
        //   ;
        return util
            .sequence(
                util.text('['),
                util.optionalRepeat(
                    util.regexp(S, 'i')
                ),
                util.optional(
                    namespace_prefix
                ),
                util.regexp(IDENT, 'i'),
                util.optionalRepeat(
                    util.regexp(S, 'i')
                ),
                util.optional(
                    util.sequence(
                        util.any(
                            util.regexp(PREFIXMATCH, 'i'),
                            util.regexp(SUFFIXMATCH, 'i'),
                            util.regexp(SUBSTRINGMATCH, 'i'),
                            util.text('='),
                            util.regexp(INCLUDES, 'i'),
                            util.regexp(DASHMATCH, 'i')
                        ),
                        util.optionalRepeat(
                            util.regexp(S, 'i')
                        ),
                        util.any(
                            util.regexp(IDENT, 'i'),
                            util.regexp(STRING, 'i')
                        ),
                        util.optionalRepeat(
                            util.regexp(S, 'i')
                        )
                    )
                ),
                util.text(']')
            )
            .then(function(res) {
                return notImplemented('attrib', res);
            })(haystack, position);
    }

    function pseudo(haystack, position) {
        // pseudo
        //   /* '::' starts a pseudo-element, ':' a pseudo-class */
        //   /* Exceptions: :first-line, :first-letter, :before and :after. */
        //   /* Note that pseudo-elements are restricted to one per selector and */
        //   /* occur only in the last simple_selector_sequence. */
        //   : ':' ':'? [ IDENT | functional_pseudo ]
        //   ;
        return util
            .sequence(
                util.text(':'),
                util.optional(
                    util.text(':')
                ),
                util.any(
                    //TODO reverse matching
                    functional_pseudo,
                    util
                        .regexp(IDENT, 'i')
                        .then(function(res) {
                            return getPseudoFilter(res);
                        })
                )
            )
            .then(function(res) {
                return res[2];
            })(haystack, position);
    }

    function functional_pseudo(haystack, position) {
        // functional_pseudo
        //   : FUNCTION S* expression ')'
        //   ;
        return util
            .sequence(
                util.regexp(FUNCTION, 'i'),
                util.optionalRepeat(
                    util.regexp(S, 'i')
                ),
                expression,
                util.text(')')
            )
            .then(function(res) {
                return getFunctionalPseudoFilter(res[0].slice(0, -1), res[2]);
            })
            (haystack, position);
    }


    function expression(haystack, position) {
        // expression
        //   /* In CSS3, the expressions are identifiers, strings, */
        //   /* or of the form "an+b" */
        //   : [ [ PLUS | '-' | DIMENSION | NUMBER | STRING | IDENT ] S* ]+
        //   ;
        return util
            .repeat(
                util
                    .sequence(
                        util.any(
                            util.regexp(PLUS, 'i'),
                            util.text('-'),
                            util.regexp(DIMENSION, 'i'),
                            util.regexp(NUMBER, 'i'),
                            util.regexp(STRING, 'i'),
                            util.regexp(IDENT, 'i')
                        ),
                        util.optionalRepeat(
                            util.regexp(S, 'i')
                        )
                    )
                    .then(function(res) {
                        return res[0];
                    })
            )
            .then(function(res) {
                return res.join('');
            })(haystack, position);
    }

    function negation(haystack, position) {
        // negation
        //   : NOT S* negation_arg S* ')'
        //   ;
        return util.sequence(
            util.regexp(NOT, 'i'),
            util.optionalRepeat(
                util.regexp(S, 'i')
            ),
            negation_arg,
            util.optionalRepeat(
                util.regexp(S, 'i')
            ),
            util.text(')')
        )(haystack, position);
    }

    function negation_arg(haystack, position) {
        // negation_arg
        //   : type_selector | universal | HASH | class | attrib | pseudo
        //   ;
        return util.any(
            type_selector,
            universal,
            util.regexp(HASH, 'i'),
            class_selector,
            attrib,
            pseudo
        )(haystack, position);
    }

    function has(haystack, position) {
        // has
        //   : HAS S* selector S* ')'
        //   ;
        return util
            .sequence(
                util.regexp(HAS, 'i'),
                util.optionalRepeat(
                    util.regexp(S, 'i')
                ),
                selectors_group,
                util.optionalRepeat(
                    util.regexp(S, 'i')
                ),
                util.text(')')
            )
            .then(function(res) {
                //debugger;
                return createFilterHas(res[2]);
            })(haystack, position);
    }

    /*module: utility/extend*/
    function extend(base) {
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
    }

    /*module: JsonQuery*/
    function JsonQuery(selector, data, options) {
        var filter, result;
        if(!(this instanceof JsonQuery)) {
            return new JsonQuery(selector, data, options);
        }
        filter = selectors_group(selector, 0);
        //debugger;
        if(filter) {
            filter = filter.res;
        } else {
            throw new Error('Wrong selector: ' + selector);
        }
        options = extend({}, JsonQuery.defaultOptions, options);
        result = findByFilter(filter, data, options);
        Object.defineProperty(this, 'length', {
            enumerable: false,
            value: result.length
        });
        result.forEach(function(path, index) {
            this[index] = path[path.length - 1].value;
        }, this);
        Object.defineProperty(this, 'filter', {
            enumerable: false,
            value: filter
        });
        Object.defineProperty(this, 'splice', {
            enumerable: false,
            value: function() {
                //need for array-like view in console
                throw new Error('dummy method');
            }
        });
        return this;
    }
    JsonQuery.prototype = Array.prototype;
    JsonQuery.defaultOptions = {
        excludeFilters: []
    };

    /*global define*/
    if (typeof define === "function" && define.amd) {
        define("JsonQuery", [], function () {
            return JsonQuery;
        });
    }
    return JsonQuery;
}());