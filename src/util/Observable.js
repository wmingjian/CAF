/*global CAF */

/**
 * MVC base. With salution to Ext, I just follow some style of Ext, e.g. bubble mechanism and event management. Just now, observers will not be removed automaticaly when unloaded, and cannot be paused or resumed.
 * @author RobinQu
 * @version 0.1
 * @requires ObserverSet
 */

CAF.util.Obseravable = CAF.extend(Object, {
    isObservable: true,
	events: {},
    init: function(config) {
        CAF.cloneTo(this, config);
    },
	addListener: function(ename, fn, scope) {
		var events = this.events,
			bubble,
			parent;
		events[ename] = events[ename] || new CAF.util.ObserverSet(this, ename);
		events[ename].add(fn, scope);
	},
	removeListener: function(ename, fn, scope) {
		var ev = this.events[ename];
		if(ev) {
			ev.remove(fn, scope);
		}
	},
	/**
     * <p>Fires the specified event with the passed parameters (minus the event name).</p>
     * <p>An event may be set to bubble up an Observable parent hierarchy (See {@link CAF.Component#getBubbleTarget}).</p>
     * @param {String} eventName The name of the event to fire.
     * @param {Object...} args Variable number of parameters are passed to handlers.
     * @return {Boolean} returns false if any of the handlers return false otherwise it returns true.
     */
	dispatchEvent: function() {
		var me = this,
            a = CAF.toArray(arguments),
            ename = a[0].toLowerCase(),
            ev = me.events[ename],
            parent;
		
		if(ev && ev.bubble) {//bubbling
			ev.fire.apply(ev, a.slice(1));
			parent = me.getBubbleTarget && me.getBubbleTarget();
			if(parent && parent.isObservable) {
				if(!parent.events[ename] || !parent.events[ename].bubble) {
					me.bubble(ename);
				}
				parent.dispatchEvent(parent, a);
			}
		} else if(ev) {
			a.shift();
			ev.dispatchEvent.apply(ev, a);
		}
	},
	/**
	 * @private
	 */
	bubble: function(events) {
		var me = this;
        if (!CAF.isEmpty(events)) {
            events = CAF.isArray(events) ? events: CAF.toArray(arguments);
            CAF.each(events,
            function(ename) {
                ename = ename.toLowerCase();
                var ce = me.events[ename] || true;
                if (CAF.isBoolean(ce)) {
                    ce = new CAF.util.ObserverSet(me, ename);
                    me.events[ename] = ce;
                }
                ce.bubble = true;
            });
        }
	}
});