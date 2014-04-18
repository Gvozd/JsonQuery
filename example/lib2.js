
/**
 * @param {StackItem[]}stack
 * @constructor
 * @extends Array
 */
function Stack(stack) {
    'use strict';
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
    'use strict';
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
    'use strict';
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
    'use strict';
    var item = new StackItem('', object),
        stack = new Stack([item]);
    createChildrenStacks(stack);
    return [stack].concat(stack.descendants);
}


