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
N         n|\\0{0,4}("4e"|"6e")(\r\n|[ \t\r\n\f])?s
O         o|\\0{0,4}("4f"|"6f")(\r\n|[ \t\r\n\f])?|\\o
T         t|\\0{0,4}("54"|"74")(\r\n|[ \t\r\n\f])?|\\t
V         v|\\0{0,4}("58"|"78")(\r\n|[ \t\r\n\f])?|\\v

%options case-insensitive

%%

[ \t\r\n\f]+     return S;

"~="             return INCLUDES;
"|="             return DASHMATCH;
"^="             return PREFIXMATCH;
"$="             return SUFFIXMATCH;
"*="             return SUBSTRINGMATCH;
{ident}          return IDENT;
{string}         return STRING;
{ident}"("       return FUNCTION;
{num}            return NUMBER;
"#"{name}        return HASH;
{w}"+"           return PLUS;
{w}">"           return GREATER;
{w}","           return COMMA;
{w}"~"           return TILDE;
":"{N}{O}{T}"("  return NOT;
@{ident}         return ATKEYWORD;
{invalid}        return INVALID;
{num}%           return PERCENTAGE;
{num}{ident}     return DIMENSION;
"<!--"           return CDO;
"-->"            return CDC;

\/\*[^*]*\*+([^/*][^*]*\*+)*\/                    /* ignore comments */

.                return yytext;

/lex

%start selectors_group
%ebnf /* enable EBNF grammar syntax */
%% /* language grammar */

selectors_group
  : selector
    {console.log('selectors_group 1');$$ = notImplemented(arguments);}
  | selectors_group COMMA S* selector
    {console.log('selectors_group 2');$$ = notImplemented(arguments);}
  ;

selector
  : simple_selector_sequence
    {console.log('selector 1');$$ = notImplemented(arguments);}
  | selector combinator simple_selector_sequence
    {console.log('selector 2');$$ = notImplemented(arguments);}
  ;

combinator
  /* combinators can be surrounded by whitespace */
  : PLUS S*
    {console.log('combinator PLUS');$$ = notImplemented(arguments);}
  | GREATER S*
    {console.log('combinator GREATER');$$ = notImplemented(arguments);}
  | TILDE S*
    {console.log('combinator TILDE');$$ = notImplemented(arguments);}
  | S+
    {console.log('combinator S+');$$ = notImplemented(arguments);}
  ;

simple_selector_sequence
  : ( type_selector | universal )
    ( HASH | class | attrib | pseudo | negation )*
    {console.log('simple_selector_sequence 1');$$ = notImplemented(arguments);}
  | ( HASH | class | attrib | pseudo | negation )+
    {console.log('simple_selector_sequence 2');$$ = notImplemented(arguments);}
  ;

type_selector
  : ( namespace_prefix )? element_name
    {console.log('type_selector');$$ = notImplemented(arguments);}
  ;

namespace_prefix
  : ( IDENT | '*' )? '|'
    {console.log('namespace_prefix');$$ = notImplemented(arguments);}
  ;

element_name
  : IDENT
    {console.log('element_name');$$ = notImplemented(arguments);}
  ;

universal
  : ( namespace_prefix )? '*'
    {console.log('universal');$$ = notImplemented(arguments);}
  ;

class
  : '.' IDENT
    {console.log('class');$$ = notImplemented(arguments);}
  ;

attrib
  : '[' S* ( namespace_prefix )? IDENT S*
        ( ( PREFIXMATCH |
            SUFFIXMATCH |
            SUBSTRINGMATCH |
            '=' |
            INCLUDES |
            DASHMATCH ) S* ( IDENT | STRING ) S*
        )? ']'
  ;

pseudo
  /* '::' starts a pseudo-element, ':' a pseudo-class */
  /* Exceptions: :first-line, :first-letter, :before and :after. */
  /* Note that pseudo-elements are restricted to one per selector and */
  /* occur only in the last simple_selector_sequence. */
  : ':' ':'? ( IDENT | functional_pseudo )
    {console.log('pseudo');$$ = notImplemented(arguments);}
  ;

functional_pseudo
  : FUNCTION S* expression ')'
    {console.log('functional_pseudo');$$ = notImplemented(arguments);}
  ;

expression
  /* In CSS3, the expressions are identifiers, strings, */
  /* or of the form "an+b" */
  : ( ( PLUS | '-' | DIMENSION | NUMBER | STRING | IDENT ) S* )+
    {console.log('expression');$$ = notImplemented(arguments);}
  ;

negation
  : NOT S* negation_arg S* ')'
    {console.log('negation');$$ = notImplemented(arguments);}
  ;

negation_arg
  : type_selector
    {console.log('negation_arg type_selector');$$ = notImplemented(arguments);}
  | universal
    {console.log('negation_arg universal');$$ = notImplemented(arguments);}
  | HASH
    {console.log('negation_arg HASH');$$ = notImplemented(arguments);}
  | class
    {console.log('negation_arg typeclass_selector');$$ = notImplemented(arguments);}
  | attrib
    {console.log('negation_arg attrib');$$ = notImplemented(arguments);}
  | pseudo
    {console.log('negation_arg pseudo');$$ = notImplemented(arguments);}
  ;
