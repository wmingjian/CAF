/**
 * KVO base
 * @author RobinQu
 * @version 0.1
 */

CAF.Obseravable = {
    isObservable: true,
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
		var events = this.events,
			ev = events[ename] = events[ename] || [];
		scope = scope || this;
		
		
	},
};