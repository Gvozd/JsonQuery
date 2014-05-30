
(function () {
    'use strict';
    //lexical tokens 1
    var n1 = '\\n|\\r\\n|\\r|\\f',                                      // nl        \n|\r\n|\r|\f
        nonascii = '[^\\0-\\177]',                                      // nonascii  [^\0-\177]
        num = '[0-9]+|[0-9]*\\.[0-9]+',                                 // num       [0-9]+|[0-9]*\.[0-9]+
        unicode = '\\\\[0-9a-f]{1,6}(?:\\r\\n|[ \\n\\r\\t\\f])?',       // unicode   \\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?
        escape = '(?:' + unicode + ')|\\\\[^\\n\\r\\f0-9a-f]',          // escape    {unicode}|\\[^\n\r\f0-9a-f]
        nmstart = '[_a-z]|(?:' + nonascii + ')|(?:' + escape + ')',     // nmstart   [_a-z]|{nonascii}|{escape}
        nmchar = '[_a-z0-9-]|(?:' + nonascii + ')|(?:' + escape + ')',  // nmchar    [_a-z0-9-]|{nonascii}|{escape}
        name = '(?:' + nmchar + ')+',                                   // name      {nmchar}+
        ident = '[-]?(?:' + nmstart + ')(?:' + nmchar + ')*',           // ident     [-]?{nmstart}{nmchar}*
        string1 = '\\"([^\\n\\r\\f\\\\"]|\\\\(?:' + n1 + ')|(?:' +
            nonascii + ')|(?:' + escape + '))*\\"',                     // string1   \"([^\n\r\f\\"]|\\{nl}|{nonascii}|{escape})*\"
        string2 = "\\'([^\\n\\r\\f\\\\']|\\\\(?:" + n1 + ")|(?:" +
            nonascii + ")|(?:" + escape + "))*\\'",                     // string2   \'([^\n\r\f\\']|\\{nl}|{nonascii}|{escape})*\'
        string = '(?:' + string1 + ')|(?:' + string2 + ')',             // string    {string1}|{string2}
        invalid1 = '\\"([^\\n\\r\\f\\\\"]|\\\\{nl}|(?:' +
            nonascii + ')|(?:' + escape + '))*',                        // invalid1  \"([^\n\r\f\\"]|\\{nl}|{nonascii}|{escape})*
        invalid2 = "\\'([^\\n\\r\\f\\\\']|\\\\{nl}|(?:" +
            nonascii + ")|(?:" + escape + "))*",                        // invalid2  \'([^\n\r\f\\']|\\{nl}|{nonascii}|{escape})*
        invalid = '(?:' + invalid1 + ')|(?:' + invalid2 + ')',                          // invalid   {invalid1}|{invalid2}
        w = '[ \\t\\r\\n\\f]*',                                         // w         [ \t\r\n\f]*
        D = 'd|\\\\0{0,4}(44|64)(\\r\\n|[ \\t\\r\\n\\f])?',             // D         d|\\0{0,4}(44|64)(\r\n|[ \t\r\n\f])?
        E = 'e|\\\\0{0,4}(45|65)(\\r\\n|[ \\t\\r\\n\\f])?',             // E         e|\\0{0,4}(45|65)(\r\n|[ \t\r\n\f])?
        N = 'n|\\\\0{0,4}(4e|6e)(\\r\\n|[ \\t\\r\\n\\f])?|\\n',         // N         n|\\0{0,4}(4e|6e)(\r\n|[ \t\r\n\f])?|\\n
        O = 'o|\\\\0{0,4}(4f|6f)(\\r\\n|[ \\t\\r\\n\\f])?|\\o',         // O         o|\\0{0,4}(4f|6f)(\r\n|[ \t\r\n\f])?|\\o
        T = 't|\\\\0{0,4}(54|74)(\\r\\n|[ \\t\\r\\n\\f])?|\\t',         // T         t|\\0{0,4}(54|74)(\r\n|[ \t\r\n\f])?|\\t
        V = 'v|\\\\0{0,4}(58|78)(\\r\\n|[ \\t\\r\\n\\f])?|\\v';         // V         v|\\0{0,4}(58|78)(\r\n|[ \t\r\n\f])?|\\v
}());
//
//[ \t\r\n\f]+     return S;
//
//"~="             return INCLUDES;
//"|="             return DASHMATCH;
//"^="             return PREFIXMATCH;
//"$="             return SUFFIXMATCH;
//"*="             return SUBSTRINGMATCH;
//{ident}          return IDENT;
//{string}         return STRING;
//{ident}"("       return FUNCTION;
//{num}            return NUMBER;
//"#"{name}        return HASH;
//{w}"+"           return PLUS;
//{w}">"           return GREATER;
//{w}',"           return COMMA;
//{w}"~"           return TILDE;
//":"{N}{O}{T}"("  return NOT;
//@{ident}         return ATKEYWORD;
//{invalid}        return INVALID;
//{num}%           return PERCENTAGE;
//{num}{ident}     return DIMENSION;
//"<!--"           return CDO;
//"-->"            return CDC;
//
//\/\*[^*]*\*+([^/*][^*]*\*+)*\/                    /* ignore comments */
//
//.                return *yytext;