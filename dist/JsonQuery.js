/*! JsonQuery - v0.2.0a - 2013-05-07
* https://github.com/Gvozd/JsonQuery/
* Copyright (c) 2013 Gvozdev Viktor; Licensed MIT */
(function(window, undefined) {
	"use strict";

var grammar = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"full_selector":3,"selectors_group":4,"EOF":5,"selector":6,"COMMA":7,"selectors_group_repetition0":8,"simple_selector_sequence":9,"combinator":10,"PLUS":11,"combinator_repetition0":12,"GREATER":13,"combinator_repetition1":14,"TILDE":15,"combinator_repetition2":16,"combinator_repetition_plus3":17,"simple_selector_sequence_group0":18,"simple_selector_sequence_repetition0":19,"simple_selector_sequence_repetition_plus1":20,"type_selector":21,"namespace_prefix":22,"element_name":23,"IDENT":24,"|":25,"*":26,"universal":27,"class":28,".":29,"STRING":30,"attrib":31,"[":32,"]":33,"attrib2":34,"S*":35,"attrib2_group0":36,"attrib2_group1":37,"attrib2_group2":38,"attrib2_group3":39,"pseudo":40,":":41,"pseudo_option0":42,"pseudo_group0":43,"functional_pseudo":44,"FUNCTION":45,"functional_pseudo_repetition0":46,"expression":47,")":48,"expression_repetition_plus0":49,"negation":50,"NOT":51,"negation_repetition0":52,"negation_arg":53,"negation_repetition1":54,"HASH":55,"S":56,"simple_selector_sequence_repetition0_group0":57,"simple_selector_sequence_repetition_plus1_group0":58,"PREFIXMATCH":59,"SUFFIXMATCH":60,"SUBSTRINGMATCH":61,"=":62,"INCLUDES":63,"DASHMATCH":64,"expression_repetition_plus0_group0":65,"-":66,"DIMENSION":67,"NUMBER":68,"expression_repetition_plus0_repetition0":69,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"COMMA",11:"PLUS",13:"GREATER",15:"TILDE",24:"IDENT",25:"|",26:"*",29:".",30:"STRING",32:"[",33:"]",35:"S*",41:":",45:"FUNCTION",48:")",51:"NOT",55:"HASH",56:"S",59:"PREFIXMATCH",60:"SUFFIXMATCH",61:"SUBSTRINGMATCH",62:"=",63:"INCLUDES",64:"DASHMATCH",66:"-",67:"DIMENSION",68:"NUMBER"},
productions_: [0,[3,2],[4,1],[4,4],[6,1],[6,3],[10,2],[10,2],[10,2],[10,1],[9,2],[9,1],[21,2],[21,1],[22,2],[22,2],[22,1],[23,1],[27,2],[27,1],[28,2],[28,2],[31,3],[34,10],[34,6],[34,9],[34,5],[40,3],[44,4],[47,1],[50,5],[53,1],[53,1],[53,1],[53,1],[53,1],[53,1],[8,0],[8,2],[12,0],[12,2],[14,0],[14,2],[16,0],[16,2],[17,1],[17,2],[18,1],[18,1],[57,1],[57,1],[57,1],[57,1],[57,1],[19,0],[19,2],[58,1],[58,1],[58,1],[58,1],[58,1],[20,1],[20,2],[36,1],[36,1],[36,1],[36,1],[36,1],[36,1],[37,1],[37,1],[38,1],[38,1],[38,1],[38,1],[38,1],[38,1],[39,1],[39,1],[42,0],[42,1],[43,1],[43,1],[46,0],[46,2],[65,1],[65,1],[65,1],[65,1],[65,1],[65,1],[69,0],[69,2],[49,2],[49,3],[52,0],[52,2],[54,0],[54,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

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
case 27:console.log('pseudo');this.$ = notImplemented(arguments);
break;
case 28:console.log('functional_pseudo');this.$ = notImplemented(arguments);
break;
case 29:console.log('expression');this.$ = notImplemented(arguments);
break;
case 30:console.log('negation');this.$ = notImplemented(arguments);
break;
case 31:console.log('negation_arg type_selector');this.$ = notImplemented(arguments);
break;
case 32:console.log('negation_arg universal');this.$ = notImplemented(arguments);
break;
case 33:console.log('negation_arg HASH');this.$ = notImplemented(arguments);
break;
case 34:console.log('negation_arg typeclass_selector');this.$ = notImplemented(arguments);
break;
case 35:console.log('negation_arg attrib');this.$ = notImplemented(arguments);
break;
case 36:console.log('negation_arg pseudo');this.$ = notImplemented(arguments);
break;
case 37:this.$ = [];
break;
case 38:$$[$0-1].push($$[$0]);
break;
case 39:this.$ = [];
break;
case 40:$$[$0-1].push($$[$0]);
break;
case 41:this.$ = [];
break;
case 42:$$[$0-1].push($$[$0]);
break;
case 43:this.$ = [];
break;
case 44:$$[$0-1].push($$[$0]);
break;
case 45:this.$ = [$$[$0]];
break;
case 46:$$[$0-1].push($$[$0]);
break;
case 54:this.$ = [];
break;
case 55:$$[$0-1].push($$[$0]);
break;
case 61:this.$ = [$$[$0]];
break;
case 62:$$[$0-1].push($$[$0]);
break;
case 83:this.$ = [];
break;
case 84:$$[$0-1].push($$[$0]);
break;
case 91:this.$ = [];
break;
case 92:$$[$0-1].push($$[$0]);
break;
case 93:this.$ = [$$[$0-1]];
break;
case 94:$$[$0-2].push($$[$0-1]);
break;
case 95:this.$ = [];
break;
case 96:$$[$0-1].push($$[$0]);
break;
case 97:this.$ = [];
break;
case 98:$$[$0-1].push($$[$0]);
break;
}
},
table: [{3:1,4:2,6:3,9:4,18:5,20:6,21:7,22:10,23:11,24:[1,18],25:[1,19],26:[1,12],27:8,28:14,29:[1,20],31:15,32:[1,21],40:16,41:[1,22],50:17,51:[1,23],55:[1,13],58:9},{1:[3]},{5:[1,24],7:[1,25]},{5:[2,2],7:[2,2],10:26,11:[1,27],13:[1,28],15:[1,29],17:30,56:[1,31]},{5:[2,4],7:[2,4],11:[2,4],13:[2,4],15:[2,4],56:[2,4]},{5:[2,54],7:[2,54],11:[2,54],13:[2,54],15:[2,54],19:32,29:[2,54],32:[2,54],41:[2,54],51:[2,54],55:[2,54],56:[2,54]},{5:[2,11],7:[2,11],11:[2,11],13:[2,11],15:[2,11],28:14,29:[1,20],31:15,32:[1,21],40:16,41:[1,22],50:17,51:[1,23],55:[1,13],56:[2,11],58:33},{5:[2,47],7:[2,47],11:[2,47],13:[2,47],15:[2,47],29:[2,47],32:[2,47],41:[2,47],51:[2,47],55:[2,47],56:[2,47]},{5:[2,48],7:[2,48],11:[2,48],13:[2,48],15:[2,48],29:[2,48],32:[2,48],41:[2,48],51:[2,48],55:[2,48],56:[2,48]},{5:[2,61],7:[2,61],11:[2,61],13:[2,61],15:[2,61],29:[2,61],32:[2,61],41:[2,61],51:[2,61],55:[2,61],56:[2,61]},{23:34,24:[1,36],26:[1,35]},{5:[2,13],7:[2,13],11:[2,13],13:[2,13],15:[2,13],29:[2,13],32:[2,13],41:[2,13],48:[2,13],51:[2,13],55:[2,13],56:[2,13]},{5:[2,19],7:[2,19],11:[2,19],13:[2,19],15:[2,19],25:[1,37],29:[2,19],32:[2,19],41:[2,19],48:[2,19],51:[2,19],55:[2,19],56:[2,19]},{5:[2,56],7:[2,56],11:[2,56],13:[2,56],15:[2,56],29:[2,56],32:[2,56],41:[2,56],51:[2,56],55:[2,56],56:[2,56]},{5:[2,57],7:[2,57],11:[2,57],13:[2,57],15:[2,57],29:[2,57],32:[2,57],41:[2,57],51:[2,57],55:[2,57],56:[2,57]},{5:[2,58],7:[2,58],11:[2,58],13:[2,58],15:[2,58],29:[2,58],32:[2,58],41:[2,58],51:[2,58],55:[2,58],56:[2,58]},{5:[2,59],7:[2,59],11:[2,59],13:[2,59],15:[2,59],29:[2,59],32:[2,59],41:[2,59],51:[2,59],55:[2,59],56:[2,59]},{5:[2,60],7:[2,60],11:[2,60],13:[2,60],15:[2,60],29:[2,60],32:[2,60],41:[2,60],51:[2,60],55:[2,60],56:[2,60]},{5:[2,17],7:[2,17],11:[2,17],13:[2,17],15:[2,17],25:[1,38],29:[2,17],32:[2,17],41:[2,17],48:[2,17],51:[2,17],55:[2,17],56:[2,17]},{24:[2,16],26:[2,16]},{24:[1,39],30:[1,40]},{24:[1,41]},{24:[2,79],41:[1,43],42:42,45:[2,79]},{24:[2,95],25:[2,95],26:[2,95],29:[2,95],32:[2,95],41:[2,95],52:44,55:[2,95],56:[2,95]},{1:[2,1]},{8:45,24:[2,37],25:[2,37],26:[2,37],29:[2,37],32:[2,37],41:[2,37],51:[2,37],55:[2,37],56:[2,37]},{9:46,18:5,20:6,21:7,22:10,23:11,24:[1,18],25:[1,19],26:[1,12],27:8,28:14,29:[1,20],31:15,32:[1,21],40:16,41:[1,22],50:17,51:[1,23],55:[1,13],58:9},{12:47,24:[2,39],25:[2,39],26:[2,39],29:[2,39],32:[2,39],41:[2,39],51:[2,39],55:[2,39],56:[2,39]},{14:48,24:[2,41],25:[2,41],26:[2,41],29:[2,41],32:[2,41],41:[2,41],51:[2,41],55:[2,41],56:[2,41]},{16:49,24:[2,43],25:[2,43],26:[2,43],29:[2,43],32:[2,43],41:[2,43],51:[2,43],55:[2,43],56:[2,43]},{24:[2,9],25:[2,9],26:[2,9],29:[2,9],32:[2,9],41:[2,9],51:[2,9],55:[2,9],56:[1,50]},{24:[2,45],25:[2,45],26:[2,45],29:[2,45],32:[2,45],41:[2,45],51:[2,45],55:[2,45],56:[2,45]},{5:[2,10],7:[2,10],11:[2,10],13:[2,10],15:[2,10],28:53,29:[1,20],31:54,32:[1,21],40:55,41:[1,22],50:56,51:[1,23],55:[1,52],56:[2,10],57:51},{5:[2,62],7:[2,62],11:[2,62],13:[2,62],15:[2,62],29:[2,62],32:[2,62],41:[2,62],51:[2,62],55:[2,62],56:[2,62]},{5:[2,12],7:[2,12],11:[2,12],13:[2,12],15:[2,12],29:[2,12],32:[2,12],41:[2,12],48:[2,12],51:[2,12],55:[2,12],56:[2,12]},{5:[2,18],7:[2,18],11:[2,18],13:[2,18],15:[2,18],29:[2,18],32:[2,18],41:[2,18],48:[2,18],51:[2,18],55:[2,18],56:[2,18]},{5:[2,17],7:[2,17],11:[2,17],13:[2,17],15:[2,17],29:[2,17],32:[2,17],41:[2,17],48:[2,17],51:[2,17],55:[2,17],56:[2,17]},{24:[2,15],26:[2,15]},{24:[2,14],26:[2,14]},{5:[2,20],7:[2,20],11:[2,20],13:[2,20],15:[2,20],29:[2,20],32:[2,20],41:[2,20],48:[2,20],51:[2,20],55:[2,20],56:[2,20]},{5:[2,21],7:[2,21],11:[2,21],13:[2,21],15:[2,21],29:[2,21],32:[2,21],41:[2,21],48:[2,21],51:[2,21],55:[2,21],56:[2,21]},{33:[1,57]},{24:[1,59],43:58,44:60,45:[1,61]},{24:[2,80],45:[2,80]},{21:64,22:10,23:11,24:[1,18],25:[1,19],26:[1,12],27:65,28:67,29:[1,20],31:68,32:[1,21],40:69,41:[1,22],53:62,55:[1,66],56:[1,63]},{6:70,9:4,18:5,20:6,21:7,22:10,23:11,24:[1,18],25:[1,19],26:[1,12],27:8,28:14,29:[1,20],31:15,32:[1,21],40:16,41:[1,22],50:17,51:[1,23],55:[1,13],56:[1,71],58:9},{5:[2,5],7:[2,5],11:[2,5],13:[2,5],15:[2,5],56:[2,5]},{24:[2,6],25:[2,6],26:[2,6],29:[2,6],32:[2,6],41:[2,6],51:[2,6],55:[2,6],56:[1,72]},{24:[2,7],25:[2,7],26:[2,7],29:[2,7],32:[2,7],41:[2,7],51:[2,7],55:[2,7],56:[1,73]},{24:[2,8],25:[2,8],26:[2,8],29:[2,8],32:[2,8],41:[2,8],51:[2,8],55:[2,8],56:[1,74]},{24:[2,46],25:[2,46],26:[2,46],29:[2,46],32:[2,46],41:[2,46],51:[2,46],55:[2,46],56:[2,46]},{5:[2,55],7:[2,55],11:[2,55],13:[2,55],15:[2,55],29:[2,55],32:[2,55],41:[2,55],51:[2,55],55:[2,55],56:[2,55]},{5:[2,49],7:[2,49],11:[2,49],13:[2,49],15:[2,49],29:[2,49],32:[2,49],41:[2,49],51:[2,49],55:[2,49],56:[2,49]},{5:[2,50],7:[2,50],11:[2,50],13:[2,50],15:[2,50],29:[2,50],32:[2,50],41:[2,50],51:[2,50],55:[2,50],56:[2,50]},{5:[2,51],7:[2,51],11:[2,51],13:[2,51],15:[2,51],29:[2,51],32:[2,51],41:[2,51],51:[2,51],55:[2,51],56:[2,51]},{5:[2,52],7:[2,52],11:[2,52],13:[2,52],15:[2,52],29:[2,52],32:[2,52],41:[2,52],51:[2,52],55:[2,52],56:[2,52]},{5:[2,53],7:[2,53],11:[2,53],13:[2,53],15:[2,53],29:[2,53],32:[2,53],41:[2,53],51:[2,53],55:[2,53],56:[2,53]},{5:[2,22],7:[2,22],11:[2,22],13:[2,22],15:[2,22],29:[2,22],32:[2,22],41:[2,22],48:[2,22],51:[2,22],55:[2,22],56:[2,22]},{5:[2,27],7:[2,27],11:[2,27],13:[2,27],15:[2,27],29:[2,27],32:[2,27],41:[2,27],48:[2,27],51:[2,27],55:[2,27],56:[2,27]},{5:[2,81],7:[2,81],11:[2,81],13:[2,81],15:[2,81],29:[2,81],32:[2,81],41:[2,81],48:[2,81],51:[2,81],55:[2,81],56:[2,81]},{5:[2,82],7:[2,82],11:[2,82],13:[2,82],15:[2,82],29:[2,82],32:[2,82],41:[2,82],48:[2,82],51:[2,82],55:[2,82],56:[2,82]},{11:[2,83],24:[2,83],30:[2,83],46:75,56:[2,83],66:[2,83],67:[2,83],68:[2,83]},{48:[2,97],54:76,56:[2,97]},{24:[2,96],25:[2,96],26:[2,96],29:[2,96],32:[2,96],41:[2,96],55:[2,96],56:[2,96]},{48:[2,31],56:[2,31]},{48:[2,32],56:[2,32]},{48:[2,33],56:[2,33]},{48:[2,34],56:[2,34]},{48:[2,35],56:[2,35]},{48:[2,36],56:[2,36]},{5:[2,3],7:[2,3],10:26,11:[1,27],13:[1,28],15:[1,29],17:30,56:[1,31]},{24:[2,38],25:[2,38],26:[2,38],29:[2,38],32:[2,38],41:[2,38],51:[2,38],55:[2,38],56:[2,38]},{24:[2,40],25:[2,40],26:[2,40],29:[2,40],32:[2,40],41:[2,40],51:[2,40],55:[2,40],56:[2,40]},{24:[2,42],25:[2,42],26:[2,42],29:[2,42],32:[2,42],41:[2,42],51:[2,42],55:[2,42],56:[2,42]},{24:[2,44],25:[2,44],26:[2,44],29:[2,44],32:[2,44],41:[2,44],51:[2,44],55:[2,44],56:[2,44]},{11:[1,81],24:[1,86],30:[1,85],47:77,49:79,56:[1,78],65:80,66:[1,82],67:[1,83],68:[1,84]},{48:[1,87],56:[1,88]},{48:[1,89]},{11:[2,84],24:[2,84],30:[2,84],56:[2,84],66:[2,84],67:[2,84],68:[2,84]},{11:[1,81],24:[1,86],30:[1,85],48:[2,29],65:90,66:[1,82],67:[1,83],68:[1,84]},{11:[2,91],24:[2,91],30:[2,91],48:[2,91],56:[2,91],66:[2,91],67:[2,91],68:[2,91],69:91},{11:[2,85],24:[2,85],30:[2,85],48:[2,85],56:[2,85],66:[2,85],67:[2,85],68:[2,85]},{11:[2,86],24:[2,86],30:[2,86],48:[2,86],56:[2,86],66:[2,86],67:[2,86],68:[2,86]},{11:[2,87],24:[2,87],30:[2,87],48:[2,87],56:[2,87],66:[2,87],67:[2,87],68:[2,87]},{11:[2,88],24:[2,88],30:[2,88],48:[2,88],56:[2,88],66:[2,88],67:[2,88],68:[2,88]},{11:[2,89],24:[2,89],30:[2,89],48:[2,89],56:[2,89],66:[2,89],67:[2,89],68:[2,89]},{11:[2,90],24:[2,90],30:[2,90],48:[2,90],56:[2,90],66:[2,90],67:[2,90],68:[2,90]},{5:[2,30],7:[2,30],11:[2,30],13:[2,30],15:[2,30],29:[2,30],32:[2,30],41:[2,30],51:[2,30],55:[2,30],56:[2,30]},{48:[2,98],56:[2,98]},{5:[2,28],7:[2,28],11:[2,28],13:[2,28],15:[2,28],29:[2,28],32:[2,28],41:[2,28],48:[2,28],51:[2,28],55:[2,28],56:[2,28]},{11:[2,91],24:[2,91],30:[2,91],48:[2,91],56:[2,91],66:[2,91],67:[2,91],68:[2,91],69:92},{11:[2,93],24:[2,93],30:[2,93],48:[2,93],56:[1,93],66:[2,93],67:[2,93],68:[2,93]},{11:[2,94],24:[2,94],30:[2,94],48:[2,94],56:[1,93],66:[2,94],67:[2,94],68:[2,94]},{11:[2,92],24:[2,92],30:[2,92],48:[2,92],56:[2,92],66:[2,92],67:[2,92],68:[2,92]}],
defaultActions: {24:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
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
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
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
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
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
}
};
/* generated by jison-lex 0.1.0 */
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
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
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
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 56;
break;
case 1:return 63;
break;
case 2:return 64;
break;
case 3:return 59;
break;
case 4:return 60;
break;
case 5:return 61;
break;
case 6:return 24;
break;
case 7:return 30;
break;
case 8:return 45;
break;
case 9:return 68;
break;
case 10:return 55;
break;
case 11:return 11;
break;
case 12:return 13;
break;
case 13:return 7;
break;
case 14:return 15;
break;
case 15:return 51;
break;
case 16:return 'ATKEYWORD';
break;
case 17:return 'INVALID';
break;
case 18:return 'PERCENTAGE';
break;
case 19:return 67;
break;
case 20:return 'CDO';
break;
case 21:return 'CDC';
break;
case 22:/* ignore comments */
break;
case 23:return yy_.yytext;
break;
case 24:return 5
break;
}
},
rules: [/^(?:[ \t\r\n\f]+)/i,/^(?:~=)/i,/^(?:\|=)/i,/^(?:\^=)/i,/^(?:\$=)/i,/^(?:\*=)/i,/^(?:([-]?([_a-z]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))([_a-z0-9-]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*))/i,/^(?:(("([^\n\r\f\\"]|\\(\n|\r\n|\r|\f\b)|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*")|('([^\n\r\f\\']|\\(\n|\r\n|\r|\f\b)|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*')))/i,/^(?:([-]?([_a-z]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))([_a-z0-9-]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*)\()/i,/^(?:([0-9]+|[0-9]*\.[0-9]+))/i,/^(?:#(([_a-z0-9-]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))+))/i,/^(?:([ \t\r\n\f]*)\+)/i,/^(?:([ \t\r\n\f]*)>)/i,/^(?:([ \t\r\n\f]*),)/i,/^(?:([ \t\r\n\f]*)~)/i,/^(?::()()()\()/i,/^(?:([-]?([_a-z]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))([_a-z0-9-]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*))/i,/^(?:(("([^\n\r\f\\"]|\\(\n|\r\n|\r|\f\b)|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*)|('([^\n\r\f\\']|\\(\n|\r\n|\r|\f\b)|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*)))/i,/^(?:([0-9]+|[0-9]*\.[0-9]+))/i,/^(?:([0-9]+|[0-9]*\.[0-9]+)([-]?([_a-z]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))([_a-z0-9-]|([^\0-\177])|((\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)|\\[^\n\r\f0-9a-f]))*))/i,/^(?:<!--)/i,/^(?:-->)/i,/^(?:\/\*[^*]*\*+([^/*][^*]*\*+)*\/)/i,/^(?:.)/i,/^(?:$)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
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
function findByFilter(filter, data, stack, result) {
    'use strict';
    if (2 === arguments.length) {
        return findByFilter(filter, {':root': data}, [], []);
    }
    if (4 !== arguments.length) {
        throw new Error('Need 2 or 4 arguments');
    }
    Object.keys(data).forEach(function (key) {
        var newStack, filtered;
        newStack = stack.slice();
        newStack.push({obj: data[key], key: key});
        filtered = filter(newStack.slice());
        if ('function' === typeof filtered.next && 'object' === typeof data[key] && null !== data[key]) {
            findByFilter(filtered.next, data[key], newStack.slice(), result);
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
function createFilterNthChild(expression) {
    'use strict';
    // [":nth-child\\((odd|even|-?\\d+|-?\\d+n(?=[+\\-]|$)(\\+?-?\\d+)?)\\)", "return 'nth-child';"],
    var a, b, i, array, exprReg = /^(-?\d*)n(?=[+\-]|\))\+?(-?\d+)?$/, mask;
    expression = expression.match(/\((.*)\)/)[1];
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
    expression = expression.match(/\((.*)\)/)[1];
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
        return 'nthChild()';
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
function JsonQuery(selector, data) {
    'use strict';
    var filter, result;
    if(!(this instanceof JsonQuery)) {
        return new JsonQuery(selector, data);
    }
    filter = grammar.parse(selector);
    result = findByFilter(filter, data);
    this.length = result.length;
    result.forEach(function(path, index) {
        this[index] = path[path.length - 1].obj;
    }, this);
    this.filter = filter;
    return this;
};
JsonQuery.prototype = Array.prototype;

if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = JsonQuery;
} else if ( typeof define === "function" && define.amd ) {
    define( "JsonQuery", [], function () { return JsonQuery; } );
}
if ( typeof window === "object" && typeof window.document === "object" ) {
    window.JsonQuery = window.$ = JsonQuery;
}


})(this);
