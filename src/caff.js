/*

CAF
	oop

CAF.Event
CAF.Element

CAF.Montion
CAF.Intl
CAF.IO
	-json
	-ajax
	-store


CAF.Controller
CAF.View
CAF.Model

CAF.UI.Control
CAF.UI.Layout
CAF.UI.TCAF

CAF.Service

*/

/*
CAF
*/

var CAF = {
	version: 1
};

/**
 *
 * @param dest {Object}
 * @param src {Object}
 * @param flag {Boolean}
 */
CAF.cloneTo = function(dest, src, flag){
	var k;
	if(dest && src && typeof src == 'object'){
		if(flag){
		    for(k in src){
		        if(!(k in dest)){
		            dest[k] = src[k];
		        }
		    }
		}else{
		    for(k in src){
		        dest[k] = src[k];
		    }
		}
    }
    return dest;
};

CAF.cloneTo(CAF, {
	/**
	 * 动态绑定函数对象中this的值
	 *
	 * @param func {Function}
	 * @param obj {Object}
	 * @return {Function}
	 */
	bind : function(func, obj){
		return function(){
			return func.apply(obj, arguments);
		};
	},
	/**
	 * 类继承语法封装
	 *
	 * @param SuperClass {Class} 父类的名字
	 * @param classImp {Object|Function} 当前类的实现
	 * @return {Class} 当前类
	 */
	CAFend : function(SuperClass, classImp){
		var clazz = function(){
			if(this.init == "function"){
				this.init.apply(this, arguments);
			}
		};
		clazz.prototype = new SuperClass();
		var type = typeof classImp;
		if(type == "object"){
			for(var k in classImp){
				clazz[k] = classImp[k];
			}
		}else if(type == "function"){
			classImp.apply(clazz);	
		}else{
			throw "param 'classImp' error!";
		}
		return clazz;
	},
	
	/**
     * <p>Returns true if the passed value is empty.</p>
     * <p>The value is deemed to be empty if it is<div class="mdetail-params"><ul>
     * <li>null</li>
     * <li>undefined</li>
     * <li>an empty array</li>
     * <li>a zero length string (Unless the <tt>allowBlank</tt> parameter is <tt>true</tt>)</li>
     * </ul></div>
     * @param {Mixed} value The value to test
     * @param {Boolean} allowBlank (optional) true to allow empty strings (defaults to false)
     * @return {Boolean}
     */
    isEmpty : function(value, allowBlank) {
        var isNull       = value === null,
            emptyArray   = (CAF.isArray(value) && !value.length),
            blankAllowed = !allowBlank ? value === '' : false;

        return isNull || emptyArray || blankAllowed;
    },

    /**
     * Returns true if the passed value is a JavaScript array, otherwise false.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isArray : function(v) {
        return Object.prototype.toString.apply(v) === '[object Array]';
    },

    /**
     * Returns true if the passed object is a JavaScript date object, otherwise false.
     * @param {Object} object The object to test
     * @return {Boolean}
     */
    isDate : function(v) {
        return Object.prototype.toString.apply(v) === '[object Date]';
    },

    /**
     * Returns true if the passed value is a JavaScript Object, otherwise false.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isObject : function(v) {
        return !!v && !v.tagName && Object.prototype.toString.call(v) === '[object Object]';
    },

    /**
     * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isPrimitive : function(v) {
        return CAF.isString(v) || CAF.isNumber(v) || CAF.isBoolean(v);
    },

    /**
     * Returns true if the passed value is a JavaScript Function, otherwise false.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isFunction : function(v) {
        return Object.prototype.toString.apply(v) === '[object Function]';
    },

    /**
     * Returns true if the passed value is a number. Returns false for non-finite numbers.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isNumber : function(v) {
        return Object.prototype.toString.apply(v) === '[object Number]' && isFinite(v);
    },

    /**
     * Returns true if the passed value is a string.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isString : function(v) {
        return typeof v === 'string';
    },

    /**util
     * Returns true if the passed value is a boolean.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isBoolean : function(v) {
        return Object.prototype.toString.apply(v) === '[object Boolean]';
    },

    /**
     * Returns true if the passed value is an HTMLElement
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isElement : function(v) {
        return v ? !!v.tagName : false;
    },

    /**
     * Returns true if the passed value is not undefined.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isDefined : function(v){
        return typeof v !== 'undefined';
    },

	_nextGUID : 0,
	guidFor : function(obj) {
		// special cases where we don't want to add a key to object
	    if (obj === undefined) return "(undefined)";
	    if (obj === null) return '(null)';
		return this._nextGUID++;
	}
});