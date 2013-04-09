/*! JsonQuery - v0.1.0 - 2013-04-09
* https://github.com/Gvozd/JsonQuery/
* Copyright (c) 2013 Gvozdev Viktor; Licensed MIT */
(function(window, undefined) {
	"use strict";

var grammar = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"ruleset":3,"selector":4,"comma":5,"EOF":6,"simple_selector":7,"space":8,">":9,"*":10,"identity":11,".":12,"root":13,"first-child":14,"last-child":15,"nth-child":16,"nth-last-child":17,"$accept":0,"$end":1},
terminals_: {2:"error",5:"comma",6:"EOF",8:"space",9:">",10:"*",11:"identity",12:".",13:"root",14:"first-child",15:"last-child",16:"nth-child",17:"nth-last-child"},
productions_: [0,[3,1],[3,3],[3,2],[4,1],[4,3],[4,3],[7,2],[7,1],[7,1],[7,2],[7,1],[7,1],[7,1],[7,1],[7,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:this.$ = $$[$0];
break;
case 2:this.$ = createUnionOr($$[$0-2], $$[$0]);
break;
case 3:return $$[$0-1];
break;
case 4:this.$ = createUnionOr(createUnionAnd(createFilterRoot(),$$[$0]),createDescendantUnion(createFilterRoot(), $$[$0]));
break;
case 5:this.$ = createDescendantUnion($$[$0-2], $$[$0]);
break;
case 6:this.$ = createChildrenUnion($$[$0-2], $$[$0]);
break;
case 7:this.$ = createUnionAnd($$[$0-1], $$[$0]);
break;
case 8:this.$ = createFilterAny();
break;
case 9:this.$ = createFilterType($$[$0]);
break;
case 10:this.$ = createFilterName($$[$0]);
break;
case 11:this.$ = createFilterRoot();
break;
case 12:this.$ = createFilterFirstChild();
break;
case 13:this.$ = createFilterLastChild();
break;
case 14:this.$ = createFilterNthChild($$[$0]);
break;
case 15:this.$ = createFilterNthLastChild($$[$0]);
break;
}
},
table: [{3:1,4:2,7:3,10:[1,4],11:[1,5],12:[1,6],13:[1,7],14:[1,8],15:[1,9],16:[1,10],17:[1,11]},{1:[3],5:[1,12],6:[1,13]},{1:[2,1],5:[2,1],6:[2,1],8:[1,14],9:[1,15]},{1:[2,4],5:[2,4],6:[2,4],7:16,8:[2,4],9:[2,4],10:[1,4],11:[1,5],12:[1,6],13:[1,7],14:[1,8],15:[1,9],16:[1,10],17:[1,11]},{1:[2,8],5:[2,8],6:[2,8],8:[2,8],9:[2,8],10:[2,8],11:[2,8],12:[2,8],13:[2,8],14:[2,8],15:[2,8],16:[2,8],17:[2,8]},{1:[2,9],5:[2,9],6:[2,9],8:[2,9],9:[2,9],10:[2,9],11:[2,9],12:[2,9],13:[2,9],14:[2,9],15:[2,9],16:[2,9],17:[2,9]},{11:[1,17]},{1:[2,11],5:[2,11],6:[2,11],8:[2,11],9:[2,11],10:[2,11],11:[2,11],12:[2,11],13:[2,11],14:[2,11],15:[2,11],16:[2,11],17:[2,11]},{1:[2,12],5:[2,12],6:[2,12],8:[2,12],9:[2,12],10:[2,12],11:[2,12],12:[2,12],13:[2,12],14:[2,12],15:[2,12],16:[2,12],17:[2,12]},{1:[2,13],5:[2,13],6:[2,13],8:[2,13],9:[2,13],10:[2,13],11:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[2,13],16:[2,13],17:[2,13]},{1:[2,14],5:[2,14],6:[2,14],8:[2,14],9:[2,14],10:[2,14],11:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14],17:[2,14]},{1:[2,15],5:[2,15],6:[2,15],8:[2,15],9:[2,15],10:[2,15],11:[2,15],12:[2,15],13:[2,15],14:[2,15],15:[2,15],16:[2,15],17:[2,15]},{4:18,7:3,10:[1,4],11:[1,5],12:[1,6],13:[1,7],14:[1,8],15:[1,9],16:[1,10],17:[1,11]},{1:[2,3],5:[2,3],6:[2,3]},{7:19,10:[1,4],11:[1,5],12:[1,6],13:[1,7],14:[1,8],15:[1,9],16:[1,10],17:[1,11]},{7:20,10:[1,4],11:[1,5],12:[1,6],13:[1,7],14:[1,8],15:[1,9],16:[1,10],17:[1,11]},{1:[2,7],5:[2,7],6:[2,7],7:16,8:[2,7],9:[2,7],10:[1,4],11:[1,5],12:[1,6],13:[1,7],14:[1,8],15:[1,9],16:[1,10],17:[1,11]},{1:[2,10],5:[2,10],6:[2,10],8:[2,10],9:[2,10],10:[2,10],11:[2,10],12:[2,10],13:[2,10],14:[2,10],15:[2,10],16:[2,10],17:[2,10]},{1:[2,2],5:[2,2],6:[2,2],8:[1,14],9:[1,15]},{1:[2,5],5:[2,5],6:[2,5],7:16,8:[2,5],9:[2,5],10:[1,4],11:[1,5],12:[1,6],13:[1,7],14:[1,8],15:[1,9],16:[1,10],17:[1,11]},{1:[2,6],5:[2,6],6:[2,6],7:16,8:[2,6],9:[2,6],10:[1,4],11:[1,5],12:[1,6],13:[1,7],14:[1,8],15:[1,9],16:[1,10],17:[1,11]}],
defaultActions: {},
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
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 11;
break;
case 1:yy_.yytext = this.matches[1].replace(/\\"/g, '"');return 11;
break;
case 2:yy_.yytext = this.matches[1].replace(/\\'/g, '\'');return 11;
break;
case 3:return 13;
break;
case 4:return 14;
break;
case 5:return 15;
break;
case 6:return 16;
break;
case 7:return 17;
break;
case 8:return 9;
break;
case 9:return 8;
break;
case 10:return 12;
break;
case 11:return 10;
break;
case 12:return 5;
break;
case 13:return 6;
break;
}
},
rules: [/^(?:(\w|\d)+)/,/^(?:"((?:\w|\d|\\")+)")/,/^(?:'((?:\w|\d|\\')+)')/,/^(?::root)/,/^(?::first-child)/,/^(?::last-child)/,/^(?::nth-child\((odd|even|-?\d+|-?\d*n(?=[+\-]|\))\+?(-?\d+)?)\))/,/^(?::nth-last-child\((odd|even|-?\d+|-?\d*n(?=[+\-]|\))\+?(-?\d+)?)\))/,/^(?:\s*>\s*)/,/^(?:\s+)/,/^(?:\.)/,/^(?:\*)/,/^(?:\s*,\s*)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
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
        return 'filterRoot()';
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
    if (arguments.length > 2) {
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
function createChildrenUnion(filter1, filter2) {// E > F
    'use strict';
    var childrenUnion, i, args;
    if (arguments.length > 2) {
        childrenUnion = createChildrenUnion(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            childrenUnion = createChildrenUnion(childrenUnion, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        childrenUnion.toString = function () {
            return 'childrenUnion(' + args + ')';
        };
        return childrenUnion;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    childrenUnion = function childrenUnion(stack) {
        var filtered1 = filter1(stack.slice());
        if (!filtered1.ok) {
            if ('function' === typeof filtered1.next) {
                return {
                    ok: false,
                    next: createChildrenUnion(filtered1.next, filter2)
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
                    next: createUnionOr(createChildrenUnion(filtered1.next, filter2), filter2)
                };
            } else {
                return {
                    ok: false,
                    next: filter2
                };
            }
        }
    };
    childrenUnion.toString = function() {
        return 'childrenUnion(' + filter1 + ', ' + filter2 + ')';
    };
    return childrenUnion;
}
function createDescendantUnion(filter1, filter2) {// E F
    'use strict';
    var descendantUnion, i, args;
    if (arguments.length > 2) {
        descendantUnion = createDescendantUnion(filter1, filter2);
        for (i = 2; i < arguments.length; i += 1) {
            descendantUnion = createDescendantUnion(descendantUnion, arguments[i]);
        }
        args = Array.prototype.map.call(arguments, JSON.stringify).join(', ');
        descendantUnion.toString = function () {
            return 'descendantUnion(' + args + ')';
        };
        return descendantUnion;
    }
    if ('function' !== typeof filter1 || 'function' !== typeof filter2) {
        return null;
    }
    descendantUnion = createUnionOr(createChildrenUnion(filter1, filter2), createChildrenUnion(filter1, createFilterDeeperAny(), filter2));
    descendantUnion.toString = function () {
        return 'descendantUnion(' + filter1 + ',' + filter2 + ')';
    };
    return descendantUnion;
}
function createUnionOr(filter1, filter2) {
    'use strict';
    var unionOr, i, args;
    if (arguments.length > 2) {
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
function JsonQuery(selector, data) {
    'use strict';
    if(!(this instanceof JsonQuery)) {
        return new JsonQuery(selector, data);
    }
    var result = findByFilter(grammar.parse(selector), data);
    this.length = result.length;
    result.forEach(function(path, index) {
        this[index] = path[path.length - 1].obj;
    }, this);
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
