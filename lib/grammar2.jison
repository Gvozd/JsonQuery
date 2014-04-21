%{
var createGreaterCombinator, createSpaceCombinator, createFilterAny, createFilterName,
    notImplemented, createFilterType, createFilterFirstChild, createFilterLastChild, createFilterNthChild,
    createFilterNthLastChild, createFilterRoot, getFunctionalPseudoFilter, getPseudoFilter, createUnionAnd, createUnionOr;
define(function(require, exports, module) {
    createGreaterCombinator = require('combinator/createGreaterCombinator');
    createSpaceCombinator = require('combinator/createSpaceCombinator');
    createFilterAny = require('filters/createFilterAny');
    createFilterName = require('filters/createFilterName');
    notImplemented = require('filters/notImplemented');
    createFilterType = require('filters/createFilterType');
    createFilterHas = require('pseudo/createFilterHas');
    createFilterFirstChild = require('pseudo/createFilterFirstChild');
    createFilterLastChild = require('pseudo/createFilterLastChild');
    createFilterNthChild = require('pseudo/createFilterNthChild');
    createFilterNthLastChild = require('pseudo/createFilterNthLastChild');
    createFilterRoot = require('pseudo/createFilterRoot');
    getFunctionalPseudoFilter = require('pseudo/getFunctionalPseudoFilter');
    getPseudoFilter = require('pseudo/getPseudoFilter');
    createUnionAnd = require('union/createUnionAnd');
    createUnionOr = require('union/createUnionOr');
    return grammar;
});
%}
%lex

ident     [-]?{nmstart}{nmchar}*
name      {nmchar}+
nmstart   [_a-z]|{nonascii}|{escape}
nonascii  [^\0-\177]
unicode   \\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?
escape    {unicode}|\\[^\n\r\f0-9a-f]
nmchar    [_a-z0-9-]|{nonascii}|{escape}
num       [0-9]+|[0-9]*\.[0-9]+
string    {string1}|{string2}
string1   \"([^\n\r\f\\"]|\\{nl}|{nonascii}|{escape})*\"
string2   \'([^\n\r\f\\']|\\{nl}|{nonascii}|{escape})*\'
invalid   {invalid1}|{invalid2}
invalid1  \"([^\n\r\f\\"]|\\{nl}|{nonascii}|{escape})*
invalid2  \'([^\n\r\f\\']|\\{nl}|{nonascii}|{escape})*
nl        \n|\r\n|\r|\f
w         [ \t\r\n\f]*
D         d|\\0{0,4}("44"|"64")(\r\n|[ \t\r\n\f])?
E         e|\\0{0,4}("45"|"65")(\r\n|[ \t\r\n\f])?
N         n|\\0{0,4}("4e"|"6e")(\r\n|[ \t\r\n\f])?|\\n
O         o|\\0{0,4}("4f"|"6f")(\r\n|[ \t\r\n\f])?|\\o
T         t|\\0{0,4}("54"|"74")(\r\n|[ \t\r\n\f])?|\\t
V         v|\\0{0,4}("58"|"78")(\r\n|[ \t\r\n\f])?|\\v

%options case-insensitive
%%

[ \t\r\n\f]+     return 'S';
TEST     return 'TEST';

"~="             return 'INCLUDES';
"|="             return 'DASHMATCH';
"^="             return 'PREFIXMATCH';
"$="             return 'SUFFIXMATCH';
"*="             return 'SUBSTRINGMATCH';
{ident}          return 'IDENT';
{string}         return 'STRING';
{ident}"("       return 'FUNCTION';
{num}            return 'NUMBER';
"#"{name}        return 'HASH';
{w}"+"           return 'PLUS';
{w}">"           return 'GREATER';
{w}","           return 'COMMA';
{w}"~"           return 'TILDE';
":"{N}{O}{T}"("  return 'NOT';
@{ident}         return 'ATKEYWORD';
{invalid}        return 'INVALID';
{num}%           return 'PERCENTAGE';
{num}{ident}     return 'DIMENSION';
"<!--"           return 'CDO';
"-->"            return 'CDC';

\/\*[^*]*\*+([^/*][^*]*\*+)*\/                    /* ignore comments */

.                return yytext;
//???
<<EOF>>               return 'EOF'

/lex
//%left 'combinator' 'S'
//%left 'COMMA' 'S'

%start selectors_group
%ebnf /* enable EBNF grammar syntax */
%% /* language grammar */


selectors_group
//  : selector [ COMMA S* selector ]*
  : selector
    {$$ = $1;}
  | selector S
    {$$ = $1;}
  | selectors_group COMMA S selector S
    {$$ = createUnion($1, $4);}
  | selectors_group COMMA selector S
    {$$ = createUnion($1, $3);}
  | selectors_group COMMA S selector
    {$$ = createUnion($1, $4);}
  | selectors_group COMMA selector
    {$$ = createUnion($1, $3);}
  ;

selector
//  : simple_selector_sequence [ combinator simple_selector_sequence ]*
  : negation
    {$$ = $1;}
  | selector combinator negation
    {$$ = $2($1, $3);}
  ;

combinator
  /* combinators can be surrounded by whitespace */
//  : PLUS S* | GREATER S* | TILDE S* | S+
  : S
    {$$ = createSpaceCombinator;}
  ;


negation
//  : NOT S* negation_arg S* ')'
  : NOT negation_arg ')'
    {$$ = notImplemented(arguments);}
  ;

negation_arg
//  : type_selector | universal | HASH | class | attrib | pseudo
  : S selectors_group
    {$$ = $2;}
  | selectors_group
    {$$ = $1;}
  ;