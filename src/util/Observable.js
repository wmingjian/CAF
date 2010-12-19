/*global CAF */

/**
 * KVO base
 * @author RobinQu
 * @version 0.1
 * @requires ObserverSet
 */

CAF.Obseravable = CAF.extend(Object, {
    isObservable: true,
	events: {},
    init: function(config) {
        var me = this;
        CAF.cloneTo(me, config);
        if (me.listeners) {
            me.on(me.listeners);
            delete me.listeners;
        }

        me.events = me.events || {};
    },
	addListener: function(ename, fn, scope) {
		var events = this.events;
		events[ename] = events[ename] || new CAF.ObserverSet();
		events[ename].add(fn, scope);
	},
	removeListener: function(ename, fn, scope) {
		var ev = this.events[ename];
		if(ev) {
			ev.remove(fn, scope);
		}
	},
	dispatchEvent: function(ename) {
		var ev = this.events[ename];
		if(ev) {
			ev.fire();
		}
	}
});