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

[ \t\r\n\f]+     return 'S';

"~="             return 'INCLUDES';
"|="             return 'DASHMATCH';
"^="             return 'PREFIXMATCH';
"$="             return 'SUFFIXMATCH';
"*="             return 'SUBSTRINGMATCH';
{ident}          return 'IDENT';
{string}         return 'STRING';
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
<<EOF>>               return 'EOF'

/lex

%start full_selector
%ebnf /* enable EBNF grammar syntax */
%% /* language grammar */

full_selector
  : selectors_group EOF
    {console.log('full_selector');return $1;}
  ;

selectors_group
  : selector
    {console.log('selectors_group 1');$$ = $1;}
  | selectors_group COMMA S* selector
    {console.log('selectors_group 2');$$ = createUnionOr($1, $4);}
  ;

selector
  : simple_selector_sequence
    {console.log('selector 1');$$ = createUnionOr(createUnionAnd(createFilterRoot(),$1),createSpaceCombinator(createFilterRoot(), $1));}
  | selector combinator simple_selector_sequence
    {console.log('selector 2');$$ = $2($1, $3);}
  ;

combinator
  /* combinators can be surrounded by whitespace */
  : PLUS S*
    {console.log('combinator PLUS');$$ = notImplemented(arguments);}
  | GREATER S*
    {console.log('combinator GREATER');$$ = createGreaterCombinator;}
  | TILDE S*
    {console.log('combinator TILDE');$$ = notImplemented(arguments);}
  | S+
    {console.log('combinator S+');$$ = createSpaceCombinator;}
  ;

simple_selector_sequence
  : ( type_selector | universal )
    ( HASH | class | attrib | pseudo | negation )*
    {console.log('simple_selector_sequence 1');$$ = createUnionAnd.apply(null, [$1].concat($2));}
  | ( HASH | class | attrib | pseudo | negation )+
    {console.log('simple_selector_sequence 2');$$ = createUnionAnd.apply(null, $1);}
  ;

type_selector
  : namespace_prefix element_name
    {console.log('type_selector 1');$$ = notImplemented(arguments);}
  | element_name
    {console.log('type_selector 2');$$ = createFilterType($1);}
  ;

namespace_prefix
  : IDENT '|'
    {console.log('namespace_prefix 1');$$ = notImplemented(arguments);}
  | '*' '|'
    {console.log('namespace_prefix 2');$$ = notImplemented(arguments);}
  | '|'
    {console.log('namespace_prefix 3');$$ = notImplemented(arguments);}
  ;

element_name
  : IDENT
    {console.log('element_name');$$ = $1;}
  ;

universal
  : namespace_prefix '*'
    {console.log('universal 1');$$ = notImplemented(arguments);}
  | '*'
    {console.log('universal 2');$$ = createFilterAny();}
  ;

class
  : '.' IDENT
    {console.log('class');$$ = createFilterName($2);}
  | '.' STRING
    {console.log('class');$$ = createFilterName(eval($2));}
  ;
attrib
  : '[' IDENT ']'
    {console.log('fake attrib');$$ = notImplemented(arguments);}
;

attrib2
  : '[' 'S*' namespace_prefix IDENT 'S*' ( PREFIXMATCH | SUFFIXMATCH | SUBSTRINGMATCH | '=' | INCLUDES | DASHMATCH ) 'S*' ( IDENT | STRING ) 'S*' ']'
    {console.log('attrib 1');$$ = notImplemented(arguments);}
  | '[' 'S*' namespace_prefix IDENT 'S*' ']'
    {console.log('attrib 2');$$ = notImplemented(arguments);}
  | '[' 'S*' IDENT 'S*' ( PREFIXMATCH | SUFFIXMATCH | SUBSTRINGMATCH | '=' | INCLUDES | DASHMATCH ) 'S*' ( IDENT | STRING ) 'S*' ']'
    {console.log('attrib 3');$$ = notImplemented(arguments);}
  | '[' 'S*' IDENT 'S*'  ']'
    {console.log('attrib 4');$$ = notImplemented(arguments);}
  ;

pseudo
  /* '::' starts a pseudo-element, ':' a pseudo-class */
  /* Exceptions: :first-line, :first-letter, :before and :after. */
  /* Note that pseudo-elements are restricted to one per selector and */
  /* occur only in the last simple_selector_sequence. */
  : ':' IDENT
    {console.log('pseudo 1', $2);$$ = getPseudoFilter($2);}
  | ':' ':' IDENT
    {console.log('pseudo 2', $3);$$ = getPseudoFilter($3);}
  | ':' functional_pseudo
    {console.log('pseudo 3');$$ = $2;}
  | ':' ':' functional_pseudo
    {console.log('pseudo 4');$$ = $3;}
  ;

functional_pseudo
  : IDENT '(' S* expression ')'
    {console.log('functional_pseudo', $1);$$ = getFunctionalPseudoFilter($1, $4);}
  ;

expression
  /* In CSS3, the expressions are identifiers, strings, */
  /* or of the form "an+b" */
  : ( ( PLUS | '-' | DIMENSION | NUMBER | STRING | IDENT ) S* )+
    {console.log('expression');$$ = $$.join('');}
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
