function _getKeys(data) {
    return Object.keys(data);
}

function findByChecker(stack, checker) {
    var data = stack[stack.length - 1].object,
        keys = ('object' === typeof data && null !== data) ? _getKeys(data) : [],
        result = [],
        next_checker = checker(stack.slice(), function(newResults) {
            //debugger;
            result = result.concat(newResults);
        }),
        i,
        key;
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        result = result.concat(findByChecker(stack.concat({object: data[key], property: key}), next_checker));
        /*
         * TODO result на некорневом элементе может быть неполный.
         *  Имеет смысл не сразу конкатенировать, а во внешней оболочке собрать массив массивов ... результатов
         *  а может быть и нет =)
         * TODO объединение AND должно знать что оба подселектора вернули полные результаты
         * В свою очередь подселекторы должны знать, что больше стеков для проверки не будет
         * Вывод: checker должен возвращать result тлько один раз, после того как будет дан сигнал что чилды кончились
         *  Он должен в свою очередь дать аналогичный сигнал своим под-чекерам, и получить от них результат
         *  Похоже что чекер должен вернуть что-то вроде promise-а, но форсирующего выдачу по запросу а не дающего событие
         *  В результате корневой элемент будет собирать дерево подобных promise-ов, которые развернуться в список результатов
        */
    }
    return result;
}

function normalize(result) {
    return result.map(function(stack) {
        return stack[stack.length - 1].object;
    });
}

function _isSameStack(stack1, stack2) {
    stack1 = JSON.stringify(stack1.map(_getProperty));
    stack2 = JSON.stringify(stack2.map(_getProperty));
    if(stack1 === stack2) {
        return true;
    } else {
        return false;
    }
}

function _getProperty(stackItem) {
    return stackItem.property;
}


function _getIntersect(results1, results2) {
    return results1.filter(function(stack1) {
        return results2.some(function(stack2) {
            return _isSameStack(stack1, stack2);
        });
    });
}