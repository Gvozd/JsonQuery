
	window.findByFilter = findByFilter;
	window.convertResult = convertResult;
	window.JsonQuery = function JsonQuery(selector, data) {
		'use strict';
		if(!(this instanceof JsonQuery)) {
			return new JsonQuery(selector, data);
		}
		var result = findByFilter(parser.parse(selector), data);
		this.length = result.length;
        result.forEach(function(path, index) {
			this[index] = path[path.length - 1].obj;
		}, this);
		return this;
	};
    JsonQuery.prototype = [];
})(window);
