/*! JsonQuery - v0.2.0 - 2014-10-06
* https://github.com/Gvozd/JsonQuery/
* Copyright (c) 2014 Gvozdev Viktor; Licensed MIT */
define(function(require, exports, module) {
    'use strict';
    var options = require('utility/options');
    function findByFilter(filter, data) {
        var stacks = getAllStacks(data);
        options.currentRootStack = stacks[0][0].stack;
        if(!filter) {
            //debugger;
        }
        return stacks
            .filter(filter)
            .filter(function(el, i, arr) {
                return arr.indexOf(el) === i;
            })
            .sort(_stackSorter);
    }

    function _stackSorter(stack1, stack2) {
        var length = Math.min(stack1.length, stack2.length),
            i,
            keys;
        for(i = 0; i < length; i++) {
            if(stack1[i] !== stack2[i]) {
                keys = Object.keys(stack1[i - 1].value);
                if(keys.indexOf(stack1[i].property) < keys.indexOf(stack2[i].property)) {
                    return -1;
                } else {
                    return 1;
                }
            }
        }
        if(stack1.length < stack2.length) {
            return 1;
        }
        if(stack2.length < stack1.length) {
            return -1;
        }
        return 0;
    }

    /**
     * @param {StackItem[]}stack
     * @constructor
     * @extends Array
     */
    function Stack(stack) {
        this.push.apply(this, stack);
        stack[stack.length - 1].stack = this;
    }
    Stack.prototype = Object.create(Array.prototype);
    Stack.prototype.constructor = Stack;
    Stack.prototype.children    = [];
    Stack.prototype.descendants = [];

    /**
     * @param {String} property
     * @param {*} value
     * @constructor
     */
    function StackItem(property, value) {
        this.property = property;
        this.value = value;
    }
    StackItem.prototype.property = '';
    StackItem.prototype.value = undefined;
    StackItem.prototype.stack = null;


    /**
     * @param {Stack} parentStack
     */
    function createChildrenStacks(parentStack) {
        var object = parentStack[parentStack.length - 1].value,
            keys,
            key,
            i,
            item,
            stack;
        if(null !== object && 'object' === typeof object) {
            parentStack.children = [];
            parentStack.descendants = [];
            keys = Object.keys(object);
            for(i = 0; i < keys.length; i++) {
                key = keys[i];
                item = new StackItem(key, object[key]);
                stack = new Stack(
                    parentStack.slice().concat([item])
                );
                createChildrenStacks(stack);
                parentStack.children.push(stack);
                parentStack.descendants.push(stack);
                parentStack.descendants.push.apply(parentStack.descendants, stack.descendants);
            }
        }
    }

    /**
     * @param {Object} object
     * @returns {Stack[]}
     */
    function getAllStacks(object) {
        var item = new StackItem('', object),
            stack = new Stack([item]);
        createChildrenStacks(stack);
        return [stack].concat(stack.descendants);
    }

    return findByFilter;
});
define(function() {
    'use strict';

    /**
     * @returns {stackFilter}
     */
    function createFilterAny() {
        /**
         * @type {stackFilter}
         */
        function filterAny() {
            return true;
        }
        filterAny.toString = function () {
            return 'any()';
        };
        return filterAny;
    }

    return createFilterAny;
});
define(function() {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterName(name) {
        /**
         * @type {stackFilter}
         */
        function filterName(stack) {
            return name === stack[stack.length - 1].property;
        }
        filterName.toString = function() {
            return 'name(' + JSON.stringify(name) + ')';
        };
        return filterName;
    }

    return createFilterName;
});
define(function() {
    'use strict';

    /**
     * @returns {stackFilter}
     */
    function createFilterType(type) {
        /**
         * @type {stackFilter}
         */
        function filterType(stack) {
            return type === _getType(stack[stack.length - 1].value);
        }
        filterType.toString = function () {
            return 'type(' + JSON.stringify(type) + ')';
        };
        return filterType;
    }

    function _getType(object) {
        if (Array.isArray(object)) {
            return 'array';
        } else if (null === object) {
            return 'null';
        } else {
            return typeof object;
        }
    }

    return createFilterType;
});
define(function() {
    'use strict';
    return function getNotImplemented(args) {
        return function notImplemented() {
            throw new Error('Not implemented: ' + JSON.stringify(args));
        };
    };
});
define(function() {
    'use strict';
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createUnionAnd(filter1, filter2) {
        var args, argsList;
        args = Array.prototype.filter.call(arguments, function(filter) {
            return 'function' === typeof filter;
        });
        argsList = args.join(', ');
        if (args.length === 0) {
            return null;
        } else if (args.length === 1) {
            return args[0];
        }
        /**
         * @type {stackFilter}
         */
        function unionAnd(stack) {
            for(var i =0; i < args.length; i++) {
                if(!args[i](stack)) {
                    return false;
                }
            }
            return true;
        }
        unionAnd.toString = function() {
            return 'unionAnd(' + argsList + ')';
        };
        return unionAnd;
    }
    return createUnionAnd;
});
define(function() {
    'use strict';
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createUnionOr(filter1, filter2) {
        var args, argsList;
        args = Array.prototype.filter.call(arguments, function(filter) {
            return 'function' === typeof filter;
        });
        argsList = args.join(', ');
        if (args.length === 0) {
            return null;
        } else if (args.length === 1) {
            return args[0];
        }
        /**
         * @type {stackFilter}
         */
        function unionOr(stack) {
            for(var i =0; i < args.length; i++) {
                if(args[i](stack)) {
                    return true;
                }
            }
            return false;
        }
        unionOr.toString = function() {
            return 'unionOr(' + argsList + ')';
        };
        return unionOr;
    }
    return createUnionOr;
});
define(function() {
    'use strict';
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createGreaterCombinator(filter1, filter2) {// E > F
        /**
         * @type {stackFilter}
         */
        function greaterCombinator(stack) {
            if(stack.length < 2) {
                return false;
            }
            // filter2 easier than filter1
            return filter2(stack) && filter1(stack[stack.length - 2].stack);
        }
        greaterCombinator.toString = function() {
            return 'greaterCombinator(' + filter1 + ', ' + filter2 + ')';
        };
        return greaterCombinator;
    }

    return createGreaterCombinator;
});
define(function() {
    'use strict';
    /**
     * @parma {stackFilter} filter1
     * @parma {stackFilter} filter2
     * @returns {stackFilter}
     */
    function createSpaceCombinator(filter1, filter2) {// E > F
        /**
         * @type {stackFilter}
         */
        function spaceCombinator(stack) {
            var i;
            if(stack.length < 2) {
                return false;
            }
            if(!filter2(stack)) {
                return false;
            }
            for(i = stack.length - 2; i >= 0; i--) {
                if(filter1(stack[i].stack)) {
                    return true;
                }
            }
            return false;
        }
        spaceCombinator.toString = function() {
            return 'spaceCombinator(' + filter1 + ', ' + filter2 + ')';
        };
        return spaceCombinator;
    }

    return createSpaceCombinator;
});
define(function() {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterFirstChild() {
        /**
         * @type {stackFilter}
         */
        function filterFirstChild(stack) {
            if(stack.length < 2) {
                return false;
            }
            return Array.isArray(stack[stack.length - 2].value) &&
                parseInt(stack[stack.length - 1].property, 10) === 0;
        }
        filterFirstChild.toString = function() {
            return 'firstChild()';
        };
        return filterFirstChild;
    }

    return createFilterFirstChild;
});
define(function(require, exports, module) {
    'use strict';
    var options = require('utility/options');
    /**
     * @returns {stackFilter}
     */
    function createFilterHas(filter) {
        /**
         *
         * @param {Stack} stack
         * @returns {boolean}
         */
        function filterHas(stack) {
            var oldRootStack = options.currentRootStack,
                result;
            options.currentRootStack = stack;
            result = stack.descendants.some(filter);
            options.currentRootStack = oldRootStack;
            return result;
        }
        filterHas.toString = function() {
            return 'has(' + filter + ')';
        };
        return filterHas;
    }

    return createFilterHas;
});
define(function() {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterLastChild() {
        /**
         * @type {stackFilter}
         */
        function filterLastChild(stack) {
            if(stack.length < 2) {
                return false;
            }
            return Array.isArray(stack[stack.length - 2].value) &&
                parseInt(stack[stack.length - 1].property, 10) === stack[stack.length - 2].value.length - 1;
        }
        filterLastChild.toString = function() {
            return 'lastChild()';
        };
        return filterLastChild;
    }

    return createFilterLastChild;
});
define(function(require, exports, module) {
    'use strict';
    var parseNthChildExpression = require('utility/parseNthChildExpression');
    return function createFilterNthChild(expression) {
        // [":nth-child\\((odd|even|-?\\d+|-?\\d+n(?=[+\\-]|$)(\\+?-?\\d+)?)\\)", "return 'nth-child';"],
        var __ret = parseNthChildExpression(expression),
            a = __ret.a,
            b = __ret.b;

        var filterNthChild = function filterNthChild(stack) {
            var array,
                i;
            if (stack.length < 2) {
                return false;
            }
            array = stack[stack.length - 2].value;
            if (Array.isArray(array)) {
                for (i = b; i < array.length && i >= 0; i += a) {
                    if (parseInt(stack[stack.length - 1].property, 10) === i) {
                        return true;
                    }
                    if (0 === a) {
                        return false;
                    }
                }
            }
            return false;
        };
        filterNthChild.toString = function () {
            return 'nthChild(' + expression + ')';
        };
        return filterNthChild;
    };
});
define(function(require, exports, module) {
    'use strict';
    var parseNthChildExpression = require('utility/parseNthChildExpression');
    return function createFilterNthLastChild(expression) {
        // [":nth-child\\((odd|even|-?\\d+|-?\\d+n(?=[+\\-]|$)(\\+?-?\\d+)?)\\)", "return 'nth-child';"],
        var __ret = parseNthChildExpression(expression),
            a = __ret.a,
            b = __ret.b;

        var filterNthLastChild = function filterNthLastChild(stack) {
            var array,
                i;
            if (stack.length < 2) {
                return false;
            }
            array = stack[stack.length - 2].value;
            if (Array.isArray(array)) {
                for (i = array.length - 1 - b; i < array.length && i >= 0; i -= a) {
                    if (parseInt(stack[stack.length - 1].property, 10) === i) {
                        return true;
                    }
                    if(0 === a) {
                        return false;
                    }
                }
            }
            return false;
        };
        filterNthLastChild.toString = function () {
            return 'nthLastChild(' + expression + ')';
        };
        return filterNthLastChild;
    };
});
define(function(require, exports, module) {
    'use strict';
    var options = require('utility/options');
    /**
     * @returns {stackFilter}
     */
    function createFilterRoot() {
        /**
         * @type {stackFilter}
         */
        function filterRoot(stack) {
            return stack === options.currentRootStack;
        }
        filterRoot.toString = function() {
            return 'root(???)';
        };
        return filterRoot;
    }

    return createFilterRoot;
});
define(function() {
    'use strict';
    /**
     * @returns {stackFilter}
     */
    function createFilterVal(value) {
        value = JSON.parse(value);
        /**
         *
         * @param {Stack} stack
         * @returns {boolean}
         */
        function filterVal(stack) {
            return stack[stack.length - 1].value === value;
        }
        filterVal.toString = function() {
            return 'val(' + JSON.stringify(value) + ')';
        };
        return filterVal;
    }

    return createFilterVal;
});
define(function(require, exports, module) {
    'use strict';
    var createFilterNthChild = require('pseudo/createFilterNthChild'),
        createFilterNthLastChild = require('pseudo/createFilterNthLastChild'),
        createFilterVal = require('pseudo/createFilterVal'),
        notImplemented = require('filters/notImplemented');
    return function getFunctionalPseudoFilter(IDENT, expression) {
        switch(IDENT) {
            case 'nth-child':
                return createFilterNthChild(expression);
            case 'nth-last-child':
                return createFilterNthLastChild(expression);
            case 'val':
                return createFilterVal(expression);
            default:
                return notImplemented(['Functional pseudo: ' + IDENT]);
        }
    };
});
define(function(require, exports, module) {
    'use strict';
    var createFilterRoot = require('pseudo/createFilterRoot'),
        createFilterFirstChild = require('pseudo/createFilterFirstChild'),
        createFilterLastChild = require('pseudo/createFilterLastChild'),
        notImplemented = require('filters/notImplemented');
    return function getPseudoFilter(IDENT) {
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
    };
});
define(function() {
    "use strict";
    return function extend(base) {
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
    };
});
define(function() {
    "use strict";
    var options = {
        currentRootStack: null
    };

    return options;
});
define(function() {
    'use strict';

    /**
     * @typedef {function} stackFilter
     * @param {Stack} stack
     * @returns {Boolean}
     */


    function parseNthChildExpression(expression) {
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
        return {a: a, b: b};
    }

    return parseNthChildExpression;
});
define(function(require, exports, module) {
    'use strict';
    var findByFilter = require('findByFilter'),
        selectors_group = require('grammar/grammar'),
        extend = require('utility/extend');
    function JsonQuery(selector, data, options) {
        var filter, result;
        if(!(this instanceof JsonQuery)) {
            return new JsonQuery(selector, data, options);
        }
        filter = selectors_group(selector, 0);
        //debugger;
        if(filter) {
            filter = filter.res;
        } else {
            throw new Error('Wrong selector: ' + selector);
        }
        options = extend({}, JsonQuery.defaultOptions, options);
        result = findByFilter(filter, data, options);
        Object.defineProperty(this, 'length', {
            enumerable: false,
            value: result.length
        });
        result.forEach(function(path, index) {
            this[index] = path[path.length - 1].value;
        }, this);
        Object.defineProperty(this, 'filter', {
            enumerable: false,
            value: filter
        });
        Object.defineProperty(this, 'splice', {
            enumerable: false,
            value: function() {
                //need for array-like view in console
                throw new Error('dummy method');
            }
        });
        return this;
    }
    JsonQuery.prototype = Array.prototype;
    JsonQuery.defaultOptions = {
        excludeFilters: []
    };
    return JsonQuery;
});
