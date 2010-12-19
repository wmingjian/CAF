/*global CAF */

/**
 * Observer
 * @private
 * @author RobinQu
 * @version 0.1
 */
CAF.util.Observer = CAF.extend(Object, {
	init: function(fn, scope) {
		this.fn = fn;
		this.scope = scope;
	},
	invoke: function() {
		this.fn.apply(this.scope, arguments);
	}
});