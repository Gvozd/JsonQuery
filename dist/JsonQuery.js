/*! JsonQuery - v0.2.0 - 2013-10-27
* https://github.com/Gvozd/JsonQuery/
* Copyright (c) 2013 Gvozdev Viktor; Licensed MIT */
(function(window, undefined) {
	"use strict";

/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var grammar = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"full_selector":3,"selectors_group":4,"EOF":5,"selector":6,"COMMA":7,"selectors_group_repetition0":8,"simple_selector_sequence":9,"combinator":10,"PLUS":11,"combinator_repetition0":12,"GREATER":13,"combinator_repetition1":14,"TILDE":15,"combinator_repetition2":16,"combinator_repetition_plus3":17,"simple_selector_sequence_group0":18,"simple_selector_sequence_repetition0":19,"simple_selector_sequence_repetition_plus1":20,"type_selector":21,"namespace_prefix":22,"element_name":23,"IDENT":24,"|":25,"*":26,"universal":27,"class":28,".":29,"STRING":30,"attrib":31,"[":32,"]":33,"attrib2":34,"S*":35,"attrib2_group0":36,"attrib2_group1":37,"attrib2_group2":38,"attrib2_group3":39,"pseudo":40,":":41,"functional_pseudo":42,"(":43,"functional_pseudo_repetition0":44,"expression":45,")":46,"expression_repetition_plus0":47,"negation":48,"NOT":49,"negation_repetition0":50,"negation_arg":51,"negation_repetition1":52,"HASH":53,"S":54,"simple_selector_sequence_repetition0_group0":55,"simple_selector_sequence_repetition_plus1_group0":56,"PREFIXMATCH":57,"SUFFIXMATCH":58,"SUBSTRINGMATCH":59,"=":60,"INCLUDES":61,"DASHMATCH":62,"expression_repetition_plus0_group0":63,"-":64,"DIMENSION":65,"NUMBER":66,"expression_repetition_plus0_repetition0":67,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"COMMA",11:"PLUS",13:"GREATER",15:"TILDE",24:"IDENT",25:"|",26:"*",29:".",30:"STRING",32:"[",33:"]",35:"S*",41:":",43:"(",46:")",49:"NOT",53:"HASH",54:"S",57:"PREFIXMATCH",58:"SUFFIXMATCH",59:"SUBSTRINGMATCH",60:"=",61:"INCLUDES",62:"DASHMATCH",64:"-",65:"DIMENSION",66:"NUMBER"},
productions_: [0,[3,2],[4,1],[4,4],[6,1],[6,3],[10,2],[10,2],[10,2],[10,1],[9,2],[9,1],[21,2],[21,1],[22,2],[22,2],[22,1],[23,1],[27,2],[27,1],[28,2],[28,2],[31,3],[34,10],[34,6],[34,9],[34,5],[40,2],[40,3],[40,2],[40,3],[42,5],[45,1],[48,5],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[8,0],[8,2],[12,0],[12,2],[14,0],[14,2],[16,0],[16,2],[17,1],[17,2],[18,1],[18,1],[55,1],[55,1],[55,1],[55,1],[55,1],[19,0],[19,2],[56,1],[56,1],[56,1],[56,1],[56,1],[20,1],[20,2],[36,1],[36,1],[36,1],[36,1],[36,1],[36,1],[37,1],[37,1],[38,1],[38,1],[38,1],[38,1],[38,1],[38,1],[39,1],[39,1],[44,0],[44,2],[63,1],[63,1],[63,1],[63,1],[63,1],[63,1],[67,0],[67,2],[47,2],[47,3],[50,0],[50,2],[52,0],[52,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:console.log('full_selector');return $$[$0-1];
break;
case 2:console.log('selectors_group 1');this.$ = $$[$0];
break;
case 3:console.log('selectors_group 2');this.$ = createUnionOr($$[$0-3], $$[$0]);
break;
case 4:console.log('selector 1');this.$ = createUnionOr(createUnionAnd(createFilterRoot(),$$[$0]),createSpaceCombinator(createFilterRoot(), $$[$0]));
break;
case 5:console.log('selector 2');this.$ = $$[$0-1]($$[$0-2], $$[$0]);
break;
case 6:console.log('combinator PLUS');this.$ = notImplemented(arguments);
break;
case 7:console.log('combinator GREATER');this.$ = createGreaterCombinator;
break;
case 8:console.log('combinator TILDE');this.$ = notImplemented(arguments);
break;
case 9:console.log('combinator S+');this.$ = createSpaceCombinator;
break;
case 10:console.log('simple_selector_sequence 1');this.$ = createUnionAnd.apply(null, [$$[$0-1]].concat($$[$0]));
break;
case 11:console.log('simple_selector_sequence 2');this.$ = createUnionAnd.apply(null, $$[$0]);
break;
case 12:console.log('type_selector 1');this.$ = notImplemented(arguments);
break;
case 13:console.log('type_selector 2');this.$ = createFilterType($$[$0]);
break;
case 14:console.log('namespace_prefix 1');this.$ = notImplemented(arguments);
break;
case 15:console.log('namespace_prefix 2');this.$ = notImplemented(arguments);
break;
case 16:console.log('namespace_prefix 3');this.$ = notImplemented(arguments);
break;
case 17:console.log('element_name');this.$ = $$[$0];
break;
case 18:console.log('universal 1');this.$ = notImplemented(arguments);
break;
case 19:console.log('universal 2');this.$ = createFilterAny();
break;
case 20:console.log('class');this.$ = createFilterName($$[$0]);
break;
case 21:console.log('class');this.$ = createFilterName(eval($$[$0]));
break;
case 22:console.log('fake attrib');this.$ = notImplemented(arguments);
break;
case 23:console.log('attrib 1');this.$ = notImplemented(arguments);
break;
case 24:console.log('attrib 2');this.$ = notImplemented(arguments);
break;
case 25:console.log('attrib 3');this.$ = notImplemented(arguments);
break;
case 26:console.log('attrib 4');this.$ = notImplemented(arguments);
break;
case 27:console.log('pseudo 1', $$[$0]);this.$ = getPseudoFilter($$[$0]);
break;
case 28:console.log('pseudo 2', $$[$0]);this.$ = getPseudoFilter($$[$0]);
break;
case 29:console.log('pseudo 3');this.$ = $$[$0];
break;
case 30:console.log('pseudo 4');this.$ = $$[$0];
break;
case 31:console.log('functional_pseudo', $$[$0-4]);this.$ = getFunctionalPseudoFilter($$[$0-4], $$[$0-1]);
break;
case 32:console.log('expression');this.$ = this.$.join('');
break;
case 33:console.log('negation');this.$ = notImplemented(arguments);
break;
case 34:console.log('negation_arg type_selector');this.$ = notImplemented(arguments);
break;
case 35:console.log('negation_arg universal');this.$ = notImplemented(arguments);
break;
case 36:console.log('negation_arg HASH');this.$ = notImplemented(arguments);
break;
case 37:console.log('negation_arg typeclass_selector');this.$ = notImplemented(arguments);
break;
case 38:console.log('negation_arg attrib');this.$ = notImplemented(arguments);
break;
case 39:console.log('negation_arg pseudo');this.$ = notImplemented(arguments);
break;
case 40:this.$ = [];
break;
case 41:$$[$0-1].push($$[$0]);
break;
case 42:this.$ = [];
break;
case 43:$$[$0-1].push($$[$0]);
break;
case 44:this.$ = [];
break;
case 45:$$[$0-1].push($$[$0]);
break;
case 46:this.$ = [];
break;
case 47:$$[$0-1].push($$[$0]);
break;
case 48:this.$ = [$$[$0]];
break;
case 49:$$[$0-1].push($$[$0]);
break;
case 57:this.$ = [];
break;
case 58:$$[$0-1].push($$[$0]);
break;
case 64:this.$ = [$$[$0]];
break;
case 65:$$[$0-1].push($$[$0]);
break;
case 82:this.$ = [];
break;
case 83:$$[$0-1].push($$[$0]);
break;
case 90:this.$ = [];
break;
case 91:$$[$0-1].push($$[$0]);
break;
case 92:this.$ = [$$[$0-1]];
break;
case 93:$$[$0-2].push($$[$0-1]);
break;
case 94:this.$ = [];
break;
case 95:$$[$0-1].push($$[$0]);
break;
case 96:this.$ = [];
break;
case 97:$$[$0-1].push($$[$0]);
break;
}
},
table: [{3:1,4:2,6:3,9:4,18:5,20:6,21:7,22:10,23:11,24:[1,18],25:[1,19],26:[1,12],27:8,28:14,29:[1,20],31:15,32:[1,21],40:16,41:[1,22],48:17,49:[1,23],53:[1,13],56:9},{1:[3]},{5:[1,24],7:[1,25]},{5:[2,2],7:[2,2],10:26,11:[1,27],13:[1,28],15:[1,29],17:30,54:[1,31]},{5:[2,4],7:[2,4],11:[2,4],13:[2,4],15:[2,4],54:[2,4]},{5:[2,57],7:[2,57],11:[2,57],13:[2,57],15:[2,57],19:32,29:[2,57],32:[2,57],41:[2,57],49:[2,57],53:[2,57],54:[2,57]},{5:[2,11],7:[2,11],11:[2,11],13:[2,11],15:[2,11],28:14,29:[1,20],31:15,32:[1,21],40:16,41:[1,22],48:17,49:[1,23],53:[1,13],54:[2,11],56:33},{5:[2,50],7:[2,50],11:[2,50],13:[2,50],15:[2,50],29:[2,50],32:[2,50],41:[2,50],49:[2,50],53:[2,50],54:[2,50]},{5:[2,51],7:[2,51],11:[2,51],13:[2,51],15:[2,51],29:[2,51],32:[2,51],41:[2,51],49:[2,51],53:[2,51],54:[2,51]},{5:[2,64],7:[2,64],11:[2,64],13:[2,64],15:[2,64],29:[2,64],32:[2,64],41:[2,64],49:[2,64],53:[2,64],54:[2,64]},{23:34,24:[1,36],26:[1,35]},{5:[2,13],7:[2,13],11:[2,13],13:[2,13],15:[2,13],29:[2,13],32:[2,13],41:[2,13],46:[2,13],49:[2,13],53:[2,13],54:[2,13]},{5:[2,19],7:[2,19],11:[2,19],13:[2,19],15:[2,19],25:[1,37],29:[2,19],32:[2,19],41:[2,19],46:[2,19],49:[2,19],53:[2,19],54:[2,19]},{5:[2,59],7:[2,59],11:[2,59],13:[2,59],15:[2,59],29:[2,59],32:[2,59],41:[2,59],49:[2,59],53:[2,59],54:[2,59]},{5:[2,60],7:[2,60],11:[2,60],13:[2,60],15:[2,60],29:[2,60],32:[2,60],41:[2,60],49:[2,60],53:[2,60],54:[2,60]},{5:[2,61],7:[2,61],11:[2,61],13:[2,61],15:[2,61],29:[2,61],32:[2,61],41:[2,61],49:[2,61],53:[2,61],54:[2,61]},{5:[2,62],7:[2,62],11:[2,62],13:[2,62],15:[2,62],29:[2,62],32:[2,62],41:[2,62],49:[2,62],53:[2,62],54:[2,62]},{5:[2,63],7:[2,63],11:[2,63],13:[2,63],15:[2,63],29:[2,63],32:[2,63],41:[2,63],49:[2,63],53:[2,63],54:[2,63]},{5:[2,17],7:[2,17],11:[2,17],13:[2,17],15:[2,17],25:[1,38],29:[2,17],32:[2,17],41:[2,17],46:[2,17],49:[2,17],53:[2,17],54:[2,17]},{24:[2,16],26:[2,16]},{24:[1,39],30:[1,40]},{24:[1,41]},{24:[1,42],41:[1,43],42:44},{24:[2,94],25:[2,94],26:[2,94],29:[2,94],32:[2,94],41:[2,94],50:45,53:[2,94],54:[2,94]},{1:[2,1]},{8:46,24:[2,40],25:[2,40],26:[2,40],29:[2,40],32:[2,40],41:[2,40],49:[2,40],53:[2,40],54:[2,40]},{9:47,18:5,20:6,21:7,22:10,23:11,24:[1,18],25:[1,19],26:[1,12],27:8,28:14,29:[1,20],31:15,32:[1,21],40:16,41:[1,22],48:17,49:[1,23],53:[1,13],56:9},{12:48,24:[2,42],25:[2,42],26:[2,42],29:[2,42],32:[2,42],41:[2,42],49:[2,42],53:[2,42],54:[2,42]},{14:49,24:[2,44],25:[2,44],26:[2,44],29:[2,44],32:[2,44],41:[2,44],49:[2,44],53:[2,44],54:[2,44]},{16:50,24:[2,46],25:[2,46],26:[2,46],29:[2,46],32:[2,46],41:[2,46],49:[2,46],53:[2,46],54:[2,46]},{24:[2,9],25:[2,9],26:[2,9],29:[2,9],32:[2,9],41:[2,9],49:[2,9],53:[2,9],54:[1,51]},{24:[2,48],25:[2,48],26:[2,48],29:[2,48],32:[2,48],41:[2,48],49:[2,48],53:[2,48],54:[2,48]},{5:[2,10],7:[2,10],11:[2,10],13:[2,10],15:[2,10],28:54,29:[1,20],31:55,32:[1,21],40:56,41:[1,22],48:57,49:[1,23],53:[1,53],54:[2,10],55:52},{5:[2,65],7:[2,65],11:[2,65],13:[2,65],15:[2,65],29:[2,65],32:[2,65],41:[2,65],49:[2,65],53:[2,65],54:[2,65]},{5:[2,12],7:[2,12],11:[2,12],13:[2,12],15:[2,12],29:[2,12],32:[2,12],41:[2,12],46:[2,12],49:[2,12],53:[2,12],54:[2,12]},{5:[2,18],7:[2,18],11:[2,18],13:[2,18],15:[2,18],29:[2,18],32:[2,18],41:[2,18],46:[2,18],49:[2,18],53:[2,18],54:[2,18]},{5:[2,17],7:[2,17],11:[2,17],13:[2,17],15:[2,17],29:[2,17],32:[2,17],41:[2,17],46:[2,17],49:[2,17],53:[2,17],54:[2,17]},{24:[2,15],26:[2,15]},{24:[2,14],26:[2,14]},{5:[2,20],7:[2,20],11:[2,20],13:[2,20],15:[2,20],29:[2,20],32:[2,20],41:[2,20],46:[2,20],49:[2,20],53:[2,20],54:[2,20]},{5:[2,21],7:[2,21],11:[2,21],13:[2,21],15:[2,21],29:[2,21],32:[2,21],41:[2,21],46:[2,21],49:[2,21],53:[2,21],54:[2,21]},{33:[1,58]},{5:[2,27],7:[2,27],11:[2,27],13:[2,27],15:[2,27],29:[2,27],32:[2,27],41:[2,27],43:[1,59],46:[2,27],49:[2,27],53:[2,27],54:[2,27]},{24:[1,60],42:61},{5:[2,29],7:[2,29],11:[2,29],13:[2,29],15:[2,29],29:[2,29],32:[2,29],41:[2,29],46:[2,29],49:[2,29],53:[2,29],54:[2,29]},{21:64,22:10,23:11,24:[1,18],25:[1,19],26:[1,12],27:65,28:67,29:[1,20],31:68,32:[1,21],40:69,41:[1,22],51:62,53:[1,66],54:[1,63]},{6:70,9:4,18:5,20:6,21:7,22:10,23:11,24:[1,18],25:[1,19],26:[1,12],27:8,28:14,29:[1,20],31:15,32:[1,21],40:16,41:[1,22],48:17,49:[1,23],53:[1,13],54:[1,71],56:9},{5:[2,5],7:[2,5],11:[2,5],13:[2,5],15:[2,5],54:[2,5]},{24:[2,6],25:[2,6],26:[2,6],29:[2,6],32:[2,6],41:[2,6],49:[2,6],53:[2,6],54:[1,72]},{24:[2,7],25:[2,7],26:[2,7],29:[2,7],32:[2,7],41:[2,7],49:[2,7],53:[2,7],54:[1,73]},{24:[2,8],25:[2,8],26:[2,8],29:[2,8],32:[2,8],41:[2,8],49:[2,8],53:[2,8],54:[1,74]},{24:[2,49],25:[2,49],26:[2,49],29:[2,49],32:[2,49],41:[2,49],49:[2,49],53:[2,49],54:[2,49]},{5:[2,58],7:[2,58],11:[2,58],13:[2,58],15:[2,58],29:[2,58],32:[2,58],41:[2,58],49:[2,58],53:[2,58],54:[2,58]},{5:[2,52],7:[2,52],11:[2,52],13:[2,52],15:[2,52],29:[2,52],32:[2,52],41:[2,52],49:[2,52],53:[2,52],54:[2,52]},{5:[2,53],7:[2,53],11:[2,53],13:[2,53],15:[2,53],29:[2,53],32:[2,53],41:[2,53],49:[2,53],53:[2,53],54:[2,53]},{5:[2,54],7:[2,54],11:[2,54],13:[2,54],15:[2,54],29:[2,54],32:[2,54],41:[2,54],49:[2,54],53:[2,54],54:[2,54]},{5:[2,55],7:[2,55],11:[2,55],13:[2,55],15:[2,55],29:[2,55],32:[2,55],41:[2,55],49:[2,55],53:[2,55],54:[2,55]},{5:[2,56],7:[2,56],11:[2,56],13:[2,56],15:[2,56],29:[2,56],32:[2,56],41:[2,56],49:[2,56],53:[2,56],54:[2,56]},{5:[2,22],7:[2,22],11:[2,22],13:[2,22],15:[2,22],29:[2,22],32:[2,22],41:[2,22],46:[2,22],49:[2,22],53:[2,22],54:[2,22]},{11:[2,82],24:[2,82],30:[2,82],44:75,54:[2,82],64:[2,82],65:[2,82],66:[2,82]},{5:[2,28],7:[2,28],11:[2,28],13:[2,28],15:[2,28],29:[2,28],32:[2,28],41:[2,28],43:[1,59],46:[2,28],49:[2,28],53:[2,28],54:[2,28]},{5:[2,30],7:[2,30],11:[2,30],13:[2,30],15:[2,30],29:[2,30],32:[2,30],41:[2,30],46:[2,30],49:[2,30],53:[2,30],54:[2,30]},{46:[2,96],52:76,54:[2,96]},{24:[2,95],25:[2,95],26:[2,95],29:[2,95],32:[2,95],41:[2,95],53:[2,95],54:[2,95]},{46:[2,34],54:[2,34]},{46:[2,35],54:[2,35]},{46:[2,36],54:[2,36]},{46:[2,37],54:[2,37]},{46:[2,38],54:[2,38]},{46:[2,39],54:[2,39]},{5:[2,3],7:[2,3],10:26,11:[1,27],13:[1,28],15:[1,29],17:30,54:[1,31]},{24:[2,41],25:[2,41],26:[2,41],29:[2,41],32:[2,41],41:[2,41],49:[2,41],53:[2,41],54:[2,41]},{24:[2,43],25:[2,43],26:[2,43],29:[2,43],32:[2,43],41:[2,43],49:[2,43],53:[2,43],54:[2,43]},{24:[2,45],25:[2,45],26:[2,45],29:[2,45],32:[2,45],41:[2,45],49:[2,45],53:[2,45],54:[2,45]},{24:[2,47],25:[2,47],26:[2,47],29:[2,47],32:[2,47],41:[2,47],49:[2,47],53:[2,47],54:[2,47]},{11:[1,81],24:[1,86],30:[1,85],45:77,47:79,54:[1,78],63:80,64:[1,82],65:[1,83],66:[1,84]},{46:[1,87],54:[1,88]},{46:[1,89]},{11:[2,83],24:[2,83],30:[2,83],54:[2,83],64:[2,83],65:[2,83],66:[2,83]},{11:[1,81],24:[1,86],30:[1,85],46:[2,32],63:90,64:[1,82],65:[1,83],66:[1,84]},{11:[2,90],24:[2,90],30:[2,90],46:[2,90],54:[2,90],64:[2,90],65:[2,90],66:[2,90],67:91},{11:[2,84],24:[2,84],30:[2,84],46:[2,84],54:[2,84],64:[2,84],65:[2,84],66:[2,84]},{11:[2,85],24:[2,85],30:[2,85],46:[2,85],54:[2,85],64:[2,85],65:[2,85],66:[2,85]},{11:[2,86],24:[2,86],30:[2,86],46:[2,86],54:[2,86],64:[2,86],65:[2,86],66:[2,86]},{11:[2,87],24:[2,87],30:[2,87],46:[2,87],54:[2,87],64:[2,87],65:[2,87],66:[2,87]},{11:[2,88],24:[2,88],30:[2,88],46:[2,88],54:[2,88],64:[2,88],65:[2,88],66:[2,88]},{11:[2,89],24:[2,89],30:[2,89],46:[2,89],54:[2,89],64:[2,89],65:[2,89],66:[2,89]},{5:[2,33],7:[2,33],11:[2,33],13:[2,33],15:[2,33],29:[2,33],32:[2,33],41:[2,33],49:[2,33],53:[2,33],54:[2,33]},{46:[2,97],54:[2,97]},{5:[2,31],7:[2,31],11:[2,31],13:[2,31],15:[2,31],29:[2,31],32:[2,31],41:[2,31],46:[2,31],49:[2,31],53:[2,31],54:[2,31]},{11:[2,90],24:[2,90],30:[2,90],46:[2,90],54:[2,90],64:[2,90],65:[2,90],66:[2,90],67:92},{11:[2,92],24:[2,92],30:[2,92],46:[2,92],54:[1,93],64:[2,92],65:[2,92],66:[2,92]},{11:[2,93],24:[2,93],30:[2,93],46:[2,93],54:[1,93],64:[2,93],65:[2,93],66:[2,93]},{11:[2,91],24:[2,91],30:[2,91],46:[2,91],54:[2,91],64:[2,91],65:[2,91],66:[2,91]}],
defaultActions: {24:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                this.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.2.1 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 54;
break;
case 1:return 61;
break;
case 2:return 62;
break;
case 3:return 57;
break;
case 4:return 58;
break;
case 5:return 59;
break;
case 6:return 24;
break;
case 7:return 30;
break;
case 8:return 66;
break;
case 9:return 53;
break;
case 10:return 11;
break;
case 11:return 13;
break;
case 12:return 7;
break;
case 13:return 15;
break;
case 14:return 49;
break;
case 15:return 'ATKEYWORD';
break;
case 16:return 'INVALID';
break;
case 17:return 'PERCENTAGE';
break;
case 18:return 65;
break;
case 19:return 'CDO';
break;
case 20:return 'CDC';
break;
case 21:/* ignore comments */
break;
case 22:return yy_.yytext;
break;
case 23:return 5
break;
}
},
rules: [/^(?:[ \t\r\n\f]+)/i,/^(?:~=)/i,/^(?:\|=)/i,/^(?:\^=)/i,/^(?:\$=)/i,/^(?:\*=)/i,/^(?:([-]?([_a-z]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))([_a-z0-9-]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*))/i,/^(?:(("([^\n\r\f\\"]|\\(\n|\r\n|\r|\f)|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*")|('([^\n\r\f\\']|\\(\n|\r\n|\r|\f)|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*')))/i,/^(?:([0-9]+|[0-9]*\.[0-9]+))/i,/^(?:#(([_a-z0-9-]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))+))/i,/^(?:([ \t\r\n\f]*)\+)/i,/^(?:([ \t\r\n\f]*)>)/i,/^(?:([ \t\r\n\f]*),)/i,/^(?:([ \t\r\n\f]*)~)/i,/^(?::()()()\()/i,/^(?:([-]?([_a-z]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))([_a-z0-9-]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*))/i,/^(?:(("([^\n\r\f\\"]|\\(\n|\r\n|\r|\f)|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*)|('([^\n\r\f\\']|\\(\n|\r\n|\r|\f)|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*)))/i,/^(?:([0-9]+|[0-9]*\.[0-9]+))/i,/^(?:([0-9]+|[0-9]*\.[0-9]+)([-]?([_a-z]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))([_a-z0-9-]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*))/i,/^(?:<!--)/i,/^(?:-->)/i,/^(?:\/\*[^*]*\*+([^/*][^*]*\*+)*\/)/i,/^(?:.)/i,/^(?:$)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = grammar;
exports.Parser = grammar.Parser;
exports.parse = function () { return grammar.parse.apply(grammar, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
function findByFilter(filter, data, options, stack, result) {
    'use strict';
    if (3 === arguments.length) {
        return findByFilter(filter, {':root': data}, options, [], []);
    }
    if (5 !== arguments.length) {
        throw new Error('Need 3 or 5 arguments');
    }
    Object.keys(data).forEach(function (key) {
        var newStack, filtered;
        newStack = stack.slice();
        newStack.push({obj: data[key], key: key});
        var qwe = function(element) {
            return element(newStack.slice());
        };
        if(options.excludeFilters.some(qwe)) {
            return;
        }
        filtered = filter(newStack.slice());
        if ('function' === typeof filtered.next && 'object' === typeof data[key] && null !== data[key]) {
            findByFilter(filtered.next, data[key], options, newStack.slice(), result);
        }
        if (filtered.ok) {
            result.push(newStack.slice());
        }
    });
    return result;
}

// util
function convertResult(from) {
    'use strict';
    return from.map(function (element) {
        var result, first, path;
        result = element[element.length - 1].obj;
        first = element.shift();
        path = element.reduce(function (path, element) {
            return path + '>.' + element.key;
        }, first.key);
        return [path, result ];
    });
}
function convertResult2(from) {
    'use strict';
    return from.map(function (element) {
        var result, first, path, path2;
        result = element[element.length - 1].obj;
        first = element.shift();
        path = element.reduce(function (path, element) {
            if (!isNaN(element.key)) {
                return path + '[' + element.key + ']';
            } else {
                return path + '.' + element.key;
            }
        }, 'data');
        path2 = element.reduce(function (path, element) {
            return path + '>.' + element.key;
        }, first.key);
        return [path2, path ];
    });
}
function createFilterAny() {
    'use strict';
    var filterAny = function filterAny() {
        return {
            ok: true,
            next: null
        };
    };
    filterAny.toString = function() {
        return 'filterAny()';
    };
    return filterAny;
}
function createFilterDeeperAny() {
    'use strict';
    var filterDeeperAny = function filterDeeperAny() {
        return {
            ok: true,
            next: filterDeeperAny
        };
    };
    filterDeeperAny.toString = function() {
        return 'filterDeeperAny()';
    };
    return filterDeeperAny;
}
function createFilterName(name) {
    'use strict';
    var filterName = function filterName(stack) {
        return {
            ok: stack.pop().key === name,
            next: null
        };
    };
    filterName.toString = function() {
        return 'filterName(' + JSON.stringify(name) + ')';
    };
    return filterName;
}
function notImplemented(args) {
    'use strict';
    throw new Error('Not implemented: ' + JSON.stringify(args));
}
function createFilterType(type) {
    'use strict';
    function getType(object) {
        if (Array.isArray(object)) {
            return 'array';
        } else if (null === object) {
            return 'null';
        } else {
            return typeof object;
        }
    }
    var filterType = function filterType(stack) {
        return {
            ok: getType(stack.pop().obj) === type,
            next: null
        };
    };
    filterType.toString = function () {
        return 'filterType(' + JSON.stringify(type) + ')';
    };
    return filterType;
}
function createUnionAnd(filter1, filter2) {
    'use strict';
    var unionAnd, i, args;
    if (arguments.length === 1) {
        return filter1;
    } else if (arguments.length > 2) {
        unionAnd = createUnionAnd(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            unionAnd = createUnionAnd(unionAnd, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        unionAnd.toString = function () {
            return 'unionAnd(' + args + ')';
        };
        return unionAnd;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    unionAnd = function unionAnd(stack) {
        var filtered1, filtered2;
        filtered1 = filter1(stack.slice());
        filtered2 = filter2(stack.slice());
        if (filtered1.ok && filtered2.ok) {
            return {
                ok: true,
                next: createUnionAnd(filtered1.next, filtered2.next)
            };
        } else {
            return {
                ok: false,
                next: createUnionAnd(filtered1.next, filtered2.next)
            };
        }
    };
    unionAnd.toString = function () {
        return 'unionAnd(' + filter1 + ', ' + filter2 + ')';
    };
    return unionAnd;
}
function createUnionOr(filter1, filter2) {
    'use strict';
    var unionOr, i, args;
    if (arguments.length === 1) {
        return filter1;
    } else if (arguments.length > 2) {
        unionOr = createUnionOr(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            unionOr = createUnionOr(unionOr, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        unionOr.toString = function () {
            return 'unionOr(' + args + ')';
        };
        return unionOr;
    }
    if ('function' === typeof filter1 && 'function' !== typeof filter2) {
        return filter1;
    }
    if ('function' !== typeof filter1 && 'function' === typeof filter2) {
        return filter2;
    }
    if ('function' !== typeof filter1 && 'function' !== typeof filter2) {
        return null;
    }
    unionOr = function unionOr(stack) {
        var filtered1, filtered2;
        filtered1 = filter1(stack.slice());
        filtered2 = filter2(stack.slice());
        if (filtered1.ok || filtered2.ok) {
            return {
                ok: true,
                next: createUnionOr(filtered1.next, filtered2.next)
            };
        } else {
            return {
                ok: false,
                next: createUnionOr(filtered1.next, filtered2.next)
            };
        }
    };
    unionOr.toString = function() {
        return 'unionOr(' + filter1 + ',' + filter2 + ')';
    };
    return unionOr;
}
function createGreaterCombinator(filter1, filter2) {// E > F
    'use strict';
    var greaterCombinator, i, args;
    if (arguments.length > 2) {
        greaterCombinator = createGreaterCombinator(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            greaterCombinator = createGreaterCombinator(greaterCombinator, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        greaterCombinator.toString = function () {
            return 'greaterCombinator(' + args + ')';
        };
        return greaterCombinator;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    greaterCombinator = function greaterCombinator(stack) {
        var filtered1 = filter1(stack.slice());
        if (!filtered1.ok) {
            if ('function' === typeof filtered1.next) {
                return {
                    ok: false,
                    next: createGreaterCombinator(filtered1.next, filter2)
                };
            } else {
                return {
                    ok: false,
                    next: null
                };
            }
        } else {
            if ('function' === typeof filtered1.next) {
                return {
                    ok: false,
                    next: createUnionOr(createGreaterCombinator(filtered1.next, filter2), filter2)
                };
            } else {
                return {
                    ok: false,
                    next: filter2
                };
            }
        }
    };
    greaterCombinator.toString = function() {
        return 'greaterCombinator(' + filter1 + ', ' + filter2 + ')';
    };
    return greaterCombinator;
}
function createSpaceCombinator(filter1, filter2) {// E F
    'use strict';
    var spaceCombinator, i, args;
    if (arguments.length > 2) {
        spaceCombinator = createSpaceCombinator(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            spaceCombinator = createSpaceCombinator(spaceCombinator, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        spaceCombinator.toString = function () {
            return 'spaceCombinator(' + args + ')';
        };
        return spaceCombinator;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    spaceCombinator = createUnionOr(createGreaterCombinator(filter1, filter2), createGreaterCombinator(filter1, createFilterDeeperAny(), filter2));
    spaceCombinator.toString = function () {
        return 'spaceCombinator(' + filter1 + ',' + filter2 + ')';
    };
    return spaceCombinator;
}
function createFilterFirstChild() {
    'use strict';
    var filterFirstChild = function filterFirstChild(stack) {
        if (stack.length < 2) {
            return {ok: false, next: null};
        }
        return {
            ok: Array.isArray(stack[stack.length - 2].obj) &&
                parseInt(stack[stack.length - 1].key, 10) === 0,
            next: null
        };
    };
    filterFirstChild.toString = function () {
        return 'firstChild()';
    };
    return filterFirstChild;
}
function createFilterLastChild() {
    'use strict';
    var filterLastChild = function filterLastChild(stack) {
        if (stack.length < 2) {
            return {ok: false, next: null};
        }
        return {
            ok: Array.isArray(stack[stack.length - 2].obj) &&
                parseInt(stack[stack.length - 1].key, 10) === stack[stack.length - 2].obj.length - 1,
            next: null
        };
    };
    filterLastChild.toString = function () {
        return 'lastChild()';
    };
    return filterLastChild;
}
function createFilterNthChild(expression) {
    'use strict';
    // [":nth-child\\((odd|even|-?\\d+|-?\\d+n(?=[+\\-]|$)(\\+?-?\\d+)?)\\)", "return 'nth-child';"],
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

    var filterNthChild = function filterNthChild(stack) {
        if (stack.length < 2) {
            return {ok: false, next: null};
        }
        array = stack[stack.length - 2].obj;
        if (Array.isArray(array)) {
            for (i = b; i < array.length && i >= 0; i += a) {
                if (parseInt(stack[stack.length - 1].key, 10) === i) {
                    return {ok: true, next: null};
                }
                if(0 === a) {
                    break;
                }
            }
        }
        return {ok: false, next: null};
    };
    filterNthChild.toString = function () {
        return 'nthChild()';
    };
    return filterNthChild;
}
function createFilterNthLastChild(expression) {
    'use strict';
    // [":nth-child\\((odd|even|-?\\d+|-?\\d+n(?=[+\\-]|$)(\\+?-?\\d+)?)\\)", "return 'nth-child';"],
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

    var filterNthLastChild = function filterNthLastChild(stack) {
        if (stack.length < 2) {
            return {ok: false, next: null};
        }
        array = stack[stack.length - 2].obj;
        if (Array.isArray(array)) {
            for (i = array.length - 1 - b; i < array.length && i >= 0; i -= a) {
                if (parseInt(stack[stack.length - 1].key, 10) === i) {
                    return {ok: true, next: null};
                }
                if(0 === a) {
                    break;
                }
            }
        }
        return {ok: false, next: null};
    };
    filterNthLastChild.toString = function () {
        return 'nthLastChild()';
    };
    return filterNthLastChild;
}
function createFilterRoot() {
    'use strict';
    var filterRoot = function filterRoot(stack) {
        return {ok: 1 === stack.length};
    };
    filterRoot.toString = function() {
        return 'root()';
    };
    return filterRoot;
}
function getFunctionalPseudoFilter(IDENT, expression) {
    'use strict';
    switch(IDENT) {
        case 'nth-child':
            return createFilterNthChild(expression);
        case 'nth-last-child':
            return createFilterNthLastChild(expression);
        default:
            return notImplemented(['Functional pseudo: ' + IDENT]);
    }
}
function getPseudoFilter(IDENT) {
    'use strict';
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
function extend(base) {
    "use strict";
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
/*global findByFilter, grammar, extend */
function JsonQuery(selector, data, options) {
    'use strict';
    var filter, result;
    if(!(this instanceof JsonQuery)) {
        return new JsonQuery(selector, data, options);
    }
    filter = grammar.parse(selector);
    options = extend({}, JsonQuery.defaultOptions, options);
    result = findByFilter(filter, data, options);
    Object.defineProperty(this, 'length', {
        enumerable: false,
        value: result.length
    });
    result.forEach(function(path, index) {
        this[index] = path[path.length - 1].obj;
    }, this);
    Object.defineProperty(this, 'filter', {
        enumerable: false,
        value: filter
    });
    return this;
}
JsonQuery.prototype = Array.prototype;
JsonQuery.defaultOptions = {
    excludeFilters: []
};
if('function' === typeof jQuery) {
    JsonQuery.defaultOptions.excludeFilters = function(stack) {
        "use strict";
        if(stack[stack.length - 1].key === jQuery.expando) {
            return true;
        }
        return false;
    };
}

if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = JsonQuery;
} else if ( typeof define === "function" && define.amd ) {
    define( "JsonQuery", [], function () {
        "use strict";
        return JsonQuery;
    });
}
if ( typeof window === "object" && typeof window.document === "object" ) {
    window.JsonQuery = JsonQuery;
}


})(this);
