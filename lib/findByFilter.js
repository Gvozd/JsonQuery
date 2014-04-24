/*global define*/
define(function(require, exports, module) {
    'use strict';
    var options = require('utility/options');
    function findByFilter(filter, data) {
        var stacks = getAllStacks(data);
        options.currentRootStack = stacks[0][0].stack;
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