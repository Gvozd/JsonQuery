/*global util*/
(function () {
    'use strict';

    var
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
        string1 = '\\"([^\\n\\r\\f\\\\"]|\\\\(?:' + nl + ')|(?:' +
        nonascii + ')|(?:' + escape + '))*\\"',                         // string1   \"([^\n\r\f\\"]|\\{nl}|{nonascii}|{escape})*\"
        string2 = '\\\'([^\\n\\r\\f\\\\\']|\\\\(?:' + nl + ')|(?:' +
        nonascii + ')|(?:' + escape + '))*\\\'',                         // string2   \'([^\n\r\f\\']|\\{nl}|{nonascii}|{escape})*\'
        string = '(?:' + string1 + ')|(?:' + string2 + ')',             // string    {string1}|{string2}
        invalid1 = '\\"([^\\n\\r\\f\\\\"]|\\\\(?:' + nl + ')|(?:' +
        nonascii + ')|(?:' + escape + '))*',                            // invalid1  \"([^\n\r\f\\"]|\\{nl}|{nonascii}|{escape})*
        invalid2 = '\\\'([^\\n\\r\\f\\\\\']|\\\\(?:' + nl + ')|(?:' +
        nonascii + ')|(?:' + escape + '))*',                            // invalid2  \'([^\n\r\f\\']|\\{nl}|{nonascii}|{escape})*
        invalid = '(?:' + invalid1 + ')|(?:' + invalid2 + ')',          // invalid   {invalid1}|{invalid2}
        w = '[ \\t\\r\\n\\f]*',                                         // w         [ \t\r\n\f]*
        D = 'd|\\\\0{0,4}(44|64)(\\r\\n|[ \\t\\r\\n\\f])?',             // D         d|\\0{0,4}(44|64)(\r\n|[ \t\r\n\f])?
        E = 'e|\\\\0{0,4}(45|65)(\\r\\n|[ \\t\\r\\n\\f])?',             // E         e|\\0{0,4}(45|65)(\r\n|[ \t\r\n\f])?
        N = 'n|\\\\0{0,4}(4e|6e)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\n',       // N         n|\\0{0,4}(4e|6e)(\r\n|[ \t\r\n\f])?|\\n
        O = 'o|\\\\0{0,4}(4f|6f)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\o',       // O         o|\\0{0,4}(4f|6f)(\r\n|[ \t\r\n\f])?|\\o
        T = 't|\\\\0{0,4}(54|74)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\t',       // T         t|\\0{0,4}(54|74)(\r\n|[ \t\r\n\f])?|\\t
        V = 'v|\\\\0{0,4}(58|78)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\v',       // V         v|\\0{0,4}(58|78)(\r\n|[ \t\r\n\f])?|\\v

        // lexical tokens 2
        S = '[ \\t\\r\\n\\f]+', // [ \t\r\n\f]+     return S;
        INCLUDES = '~=', // "~="             return INCLUDES;
        DASHMATCH = '|=', // "|="             return DASHMATCH;
        PREFIXMATCH = '\\^=', // "^="             return PREFIXMATCH;
        SUFFIXMATCH = '\\$=', // "$="             return SUFFIXMATCH;
        SUBSTRINGMATCH = '\\*=', // "*="             return SUBSTRINGMATCH;
        IDENT = '(?:' + ident + ')', // {ident}          return IDENT;
        STRING = '(?:' + string + ')', // {string}         return STRING;
        FUNCTION = '(?:' + ident + ')\\(', // {ident}"("       return FUNCTION;
        NUMBER = '(?:' + num + ')', // {num}            return NUMBER;
        HASH = '#(?:' + name + ')', // "#"{name}        return HASH;
        PLUS = '(?:' + w + ')\\+', // {w}"+"           return PLUS;
        GREATER = '(?:' + w + ')>', // {w}">"           return GREATER;
        COMMA = '(?:' + w + '),', // {w}',"           return COMMA;
        TILDE = '(?:' + w + ')~', // {w}"~"           return TILDE;
        NOT = ':(?:' + N + ')(?:' + O + ')(?:' + T + ')\\(', // ":"{N}{O}{T}"("  return NOT;
        ATKEYWORD = '@(?:' + ident + ')', // @{ident}         return ATKEYWORD;
        INVALID = '(?:' + invalid + ')', // {invalid}        return INVALID;
        PERCENTAGE = '(?:' + w + ')%', // {num}%           return PERCENTAGE;
        DIMENSION = '(?:' + num + ')(?:' + ident + ')', // {num}{ident}     return DIMENSION;
        CDO = '<!--', // "<!--"           return CDO;
        CDC = '-->'; // "-->"            return CDC;

    window.selectors_group = selectors_group;

    function selectors_group(haystack, position) {
        // selectors_group
        //     : selector [ COMMA S* selector ]*
        // ;
        return util.sequence(
            selector,
            util.optionalRepeat(
                util.sequence(
                    util.regexp(COMMA),
                    util.optionalRepeat(
                        util.regexp(S)
                    ),
                    selector
                )
            )
        )(haystack, position);
    }

    function selector(haystack, position) {
        // selector
        //     : simple_selector_sequence [ combinator simple_selector_sequence ]*
        // ;
        return util.sequence(
            simple_selector_sequence,
            util.optionalRepeat(
                util.sequence(
                    combinator,
                    simple_selector_sequence
                )
            )
        )(haystack, position);
    }

    function combinator(haystack, position) {
        // combinator
        //     /* combinators can be surrounded by whitespace */
        //     : PLUS S* | GREATER S* | TILDE S* | S+
        // ;
        return util.any(
            util.sequence(
                util.regexp(PLUS),
                util.optionalRepeat(
                    util.regexp(S)
                )
            ),
            util.sequence(
                util.regexp(GREATER),
                util.optionalRepeat(
                    util.regexp(S)
                )
            ),
            util.sequence(
                util.regexp(TILDE),
                util.optionalRepeat(
                    util.regexp(S)
                )
            ),
            util.repeat(
                util.regexp(S)
            )
        )(haystack, position);
    }

    function simple_selector_sequence(haystack, position) {
        // simple_selector_sequence
        //     : [ type_selector | universal ]
        //       [ HASH | class | attrib | pseudo | negation ]*
        //     | [ HASH | class | attrib | pseudo | negation ]+
        // ;
        return util.any(
            util.sequence(
                util.any(
                    type_selector,
                    universal
                ),
                util.optionalRepeat(
                    util.any(
                        util.regexp(HASH),
                        class_selector,
                        attrib,
                        pseudo,
                        negation
                    )
                )
            ),
            util.repeat(
                util.any(
                    util.regexp(HASH),
                    class_selector,
                    attrib,
                    pseudo,
                    negation
                )
            )
        )(haystack, position);
    }

    function type_selector(haystack, position) {
        // type_selector
        //     : [ namespace_prefix ]? element_name
        // ;
        return util.sequence(
            util.optional(namespace_prefix),
            element_name
        )(haystack, position);
    }

    function namespace_prefix(haystack, position) {
        // namespace_prefix
        //     : [ IDENT | '*' ]? '|'
        // ;
        return util.sequence(
            util.optional(
                util.any(
                    util.regexp(IDENT),
                    util.text('*')
                )
            ),
            util.text('|')
        )(haystack, position);
    }

    function element_name(haystack, position) {
        // element_name
        //     : IDENT
        // ;
        return util.sequence(
            util.regexp(IDENT)
        )(haystack, position);
    }

    function universal(haystack, position) {
        // universal
        //     : [ namespace_prefix ]? '*'
        // ;
        return util.sequence(
            util.optional(namespace_prefix),
            util.text('*')
        )(haystack, position);
    }

    function class_selector(haystack, position) {
        // class
        //     : '.' IDENT
        // ;
        return util.sequence(
            util.text('.'),
            util.regexp(IDENT)
        )(haystack, position);
    }

    function attrib(haystack, position) {
        // attrib
        //     : '[' S* [ namespace_prefix ]? IDENT S*
        //     [ [ PREFIXMATCH |
        //         SUFFIXMATCH |
        //         SUBSTRINGMATCH |
        //         '=' |
        //         INCLUDES |
        //         DASHMATCH ] S* [ IDENT | STRING ] S*
        //     ]? ']'
        // ;
        throw new Error('Not Implemented');
    }

    function pseudo(haystack, position) {
        // pseudo
        //     /* '::' starts a pseudo-element, ':' a pseudo-class */
        //     /* Exceptions: :first-line, :first-letter, :before and :after. */
        //     /* Note that pseudo-elements are restricted to one per selector and */
        //     /* occur only in the last simple_selector_sequence. */
        //     : ':' ':'? [ IDENT | functional_pseudo ]
        // ;
        return util.sequence(
            util.text(':'),
            util.opt(
                util.text(':')
            ),
            util.any(
                util.regexp(IDENT),
                functional_pseudo
            )
        )(haystack, position);
    }

    function functional_pseudo(haystack, position) {
        // functional_pseudo
        //     : FUNCTION S* expression ')'
        // ;
        return util.sequence(
            util.regexp(FUNCTION),
            util.optionalRepeat(
                util.regexp(S)
            ),
            expression,
            util.text(')')
        )(haystack, position);
    }


    function expression(haystack, position) {
        // expression
        //     /* In CSS3, the expressions are identifiers, strings, */
        //     /* or of the form "an+b" */
        //     : [ [ PLUS | '-' | DIMENSION | NUMBER | STRING | IDENT ] S* ]+
        // ;
        return util.repeat(
            util.sequence(
                util.any(
                    util.regexp(PLUS),
                    util.text('-'),
                    util.regexp(DIMENSION),
                    util.regexp(NUMBER),
                    util.regexp(STRING),
                    util.regexp(IDENT)
                ),
                util.optionalRepeat(
                    util.regexp(S)
                )
            )
        )(haystack, position);
    }

    function negation(haystack, position) {
        // negation
        //     : NOT S* negation_arg S* ')'
        // ;
        return util.any(
            util.regexp(NOT),
            util.optionalRepeat(
                util.regexp(S)
            ),
            negation_arg,
            util.optionalRepeat(
                util.regexp(S)
            ),
            util.text(')')
        )(haystack, position);
    }

    function negation_arg(haystack, position) {
        // negation_arg
        //     : type_selector | universal | HASH | class | attrib | pseudo
        // ;
        return util.any(
            type_selector,
            universal,
            util.regexp(HASH),
            class_selector,
            attrib,
            pseudo
        )(haystack, position);
    }
}());