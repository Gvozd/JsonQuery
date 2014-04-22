%{
var createGreaterCombinator, createSpaceCombinator, createFilterAny, createFilterName,
    notImplemented, createFilterType, createFilterHas, createFilterFirstChild, createFilterLastChild, createFilterNthChild,
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
D         "d"|\\"0"{0,4}("44"|"64")(\r\n|[ \t\r\n\f])?
E         "e"|\\"0"{0,4}("45"|"65")(\r\n|[ \t\r\n\f])?
N         "n"|\\"0"{0,4}("4e"|"6e")(\r\n|[ \t\r\n\f])?|\\"n"
O         "o"|\\"0"{0,4}("4f"|"6f")(\r\n|[ \t\r\n\f])?|\\"o"
T         "t"|\\"0"{0,4}("54"|"74")(\r\n|[ \t\r\n\f])?|\\"t"
H         "h"|\\"0"{0,4}("48"|"68")(\r\n|[ \t\r\n\f])?|\\"h"
A         "a"|\\"0"{0,4}("41"|"61")(\r\n|[ \t\r\n\f])?|\\"a"
S         "s"|\\"0"{0,4}("53"|"73")(\r\n|[ \t\r\n\f])?|\\"s"
V         "v"|\\"0"{0,4}("58"|"78")(\r\n|[ \t\r\n\f])?|\\"v"

%options case-insensitive

%%

[ \t\r\n\f]+     return 'S';

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
":"{H}{A}{S}"("  return 'HAS';
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

%start full_selector
%ebnf /* enable EBNF grammar syntax */
%% /* language grammar */

full_selector
  : selectors_group EOF
    {return $1;}
  ;

selectors_group
//  : selector [ COMMA S* selector ]*
  : S selector
    {$$ = $2;}
  | selector
    {$$ = $1;}
  | selectors_group COMMA S selector S
    {$$ = createUnionOr($1, $4);}
  | selectors_group COMMA selector S
    {$$ = createUnionOr($1, $3);}
  | selectors_group COMMA S selector
    {$$ = createUnionOr($1, $4);}
  | selectors_group COMMA selector
    {$$ = createUnionOr($1, $3);}
  ;

selector
//  : simple_selector_sequence [ combinator simple_selector_sequence ]*
  : simple_selector_sequence
    {$$ = $1;}
  | selector combinator simple_selector_sequence
    {$$ = $2($1, $3);}
  ;

combinator
  /* combinators can be surrounded by whitespace */
//  : PLUS S* | GREATER S* | TILDE S* | S+
  : PLUS S
    {/*1*/;$$ = notImplemented(arguments);}
  | PLUS
    {/*2*/;$$ = notImplemented(arguments);}
  | GREATER S
    {$$ = createGreaterCombinator;}
  | GREATER
    {$$ = createGreaterCombinator;}
  | TILDE S
    {/*3*/;$$ = notImplemented(arguments);}
  | TILDE
    {/*4*/;$$ = notImplemented(arguments);}
  | S
    {$$ = createSpaceCombinator;}
  ;

simple_selector_sequence
//  : [ type_selector | universal ]
//    [ HASH | class | attrib | pseudo | negation ]*
//  | [ HASH | class | attrib | pseudo | negation ]+
  : simple_selector_sequence_1
    {$$ = $1;}
  | simple_selector_sequence_2
    {$$ = $1;}
  | simple_selector_sequence simple_selector_sequence_2
    {$$ = createUnionAnd($1, $2);}
  ;
simple_selector_sequence_1
  : type_selector | universal
  ;
simple_selector_sequence_2
  : HASH | class | attrib | pseudo | negation | has_inner
  ;

type_selector
//  : [ namespace_prefix ]? element_name
  : namespace_prefix element_name
    {/*5*/;$$ = notImplemented(arguments);}
  | element_name
    {$$ = createFilterType($1);}
  ;

namespace_prefix
//  : [ IDENT | '*' ]? '|'
  : IDENT '|'
    {/*6*/;$$ = notImplemented(arguments);}
  | '*' '|'
    {/*7*/;$$ = notImplemented(arguments);}
  | '|'
    {/*8*/;$$ = notImplemented(arguments);}
  ;

element_name
  : IDENT
    {$$ = $1;}
  ;

universal
//  : [ namespace_prefix ]? '*'
  : namespace_prefix '*'
    {/*9*/;$$ = notImplemented(arguments);}
  | '*'
    {$$ = createFilterAny();}
  ;

class
//  : '.' IDENT
  : '.' IDENT
    {$$ = createFilterName($2);}
  | '.' STRING
    {$$ = createFilterName(eval($2));}
  ;

attrib
//  : '[' S* [ namespace_prefix ]? IDENT S*
//        [ [ PREFIXMATCH |
//            SUFFIXMATCH |
//            SUBSTRINGMATCH |
//            '=' |
//            INCLUDES |
//            DASHMATCH ] S* [ IDENT | STRING ] S*
//        ]? ']'
  : '[' IDENT ']'
    {/*10*/;$$ = notImplemented(arguments);}
  ;

attrib2
  : '[' 'S*' namespace_prefix IDENT 'S*' ( PREFIXMATCH | SUFFIXMATCH | SUBSTRINGMATCH | '=' | INCLUDES | DASHMATCH ) 'S*' ( IDENT | STRING ) 'S*' ']'
    {/*11*/;$$ = notImplemented(arguments);}
  | '[' 'S*' namespace_prefix IDENT 'S*' ']'
    {/*12*/;$$ = notImplemented(arguments);}
  | '[' 'S*' IDENT 'S*' ( PREFIXMATCH | SUFFIXMATCH | SUBSTRINGMATCH | '=' | INCLUDES | DASHMATCH ) 'S*' ( IDENT | STRING ) 'S*' ']'
    {/*13*/;$$ = notImplemented(arguments);}
  | '[' 'S*' IDENT 'S*'  ']'
    {/*14*/;$$ = notImplemented(arguments);}
  ;

pseudo
  /* '::' starts a pseudo-element, ':' a pseudo-class */
  /* Exceptions: :first-line, :first-letter, :before and :after. */
  /* Note that pseudo-elements are restricted to one per selector and */
  /* occur only in the last simple_selector_sequence. */
//  : ':' ':'? [ IDENT | functional_pseudo ]
  : ':' functional_pseudo
    {$$ = $2;}
  | ':' ':' functional_pseudo
    {$$ = $3;}
  | ':' IDENT
    {$$ = getPseudoFilter($2);}
  | ':' ':' IDENT
    {$$ = getPseudoFilter($3);}
  ;

functional_pseudo
//  : FUNCTION S* expression ')'
  : IDENT '(' S expression ')'
    {$$ = getFunctionalPseudoFilter($1, $4);}
  | IDENT '('  expression ')'
    {$$ = getFunctionalPseudoFilter($1, $3);}
  ;

expression
  /* In CSS3, the expressions are identifiers, strings, */
  /* or of the form "an+b" */
//  : [ expression_1 S* ]+
  : expression_1 S
    {$$ = $1;}
  | expression_1
    {$$ = $1;}
  | expression expression_1 S
    {$$ = $1 + $2;}
  | expression expression_1
    {$$ = $1 + $2;}
  ;
expression_1
  : PLUS | '-' | DIMENSION | NUMBER | STRING | IDENT
  ;

negation
//  : NOT S* negation_arg S* ')'
  : NOT negation_arg ')'
    {/*15*/;$$ = notImplemented(arguments);}
  ;

negation_arg
//  : type_selector | universal | HASH | class | attrib | pseudo
  : selectors_group
  ;

has_inner
//  : NOT S* negation_arg S* ')'
  : HAS selectors_group ')'
    {debugger;$$ = createFilterHas($2);}
  ;