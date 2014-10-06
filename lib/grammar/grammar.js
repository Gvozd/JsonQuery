/*global define*/
define(function(require, exports, module) {
    'use strict';
    var util = require('grammar/util'),
        createGreaterCombinator = require('combinator/createGreaterCombinator'),
        createSpaceCombinator = require('combinator/createSpaceCombinator'),
        createFilterAny = require('filters/createFilterAny'),
        createFilterName = require('filters/createFilterName'),
        notImplemented = require('filters/notImplemented'),
        createFilterType = require('filters/createFilterType'),
        createFilterHas = require('pseudo/createFilterHas'),
        createFilterFirstChild = require('pseudo/createFilterFirstChild'),
        createFilterLastChild = require('pseudo/createFilterLastChild'),
        createFilterNthChild = require('pseudo/createFilterNthChild'),
        createFilterNthLastChild = require('pseudo/createFilterNthLastChild'),
        createFilterRoot = require('pseudo/createFilterRoot'),
        getFunctionalPseudoFilter = require('pseudo/getFunctionalPseudoFilter'),
        getPseudoFilter = require('pseudo/getPseudoFilter'),
        createUnionAnd = require('union/createUnionAnd'),
        createUnionOr = require('union/createUnionOr'),

        // lexical tokens 1
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

    return selectors_group;
});