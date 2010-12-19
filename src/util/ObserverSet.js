/*global CAF */

/**
 * A set containing observers
 * @author RobinQu
 * @private
 * @version 0.1
 * @requires Observer
 */

CAF.util.ObserverSet = CAF.extend(Array, {
	bubble: false,
	init: function(observable, eventType) {
		this.observable = observable;
		this.eventType = eventType;
	},
	add: function(fn, scope) {
		this.push(new CAF.Observer(fn, scope));
	},
	find: function(fn, scope) {
		var len = this.length,
			obv;
		while(len--) {
			obv = this[len];
			if(obv.fn === fn && (obv.scope === scope || obv.scope === this.observable)) {
				return len;
			}
		}
	},
	remove: function(fn, scope) {
		var index = this.find(fn, scope);
		this.splice(index, 1);
	},
	fire: function() {
		var len = this.length,
			obv;
		while(len--) {
			obv = this[len];
			obv.invoke();
		}
	}
});