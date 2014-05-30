
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


}());