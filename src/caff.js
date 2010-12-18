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
CAF.UI.Text

CAF.Service

*/

/*
CAF
*/


window.CAF = {
	version: 1
};

/**
 * 类继承语法封装
 *
 * @param superClass {Class} 父类的名字
 * @param classImp {Object|Function} 当前类的实现
 * @return {Class} 当前类
 */
CAF.extend = function(superClass, classImp){
	var clazz = function(){
		if(this.init == "function"){
			this.init.apply(this, arguments);
		}
	};
	clazz.prototype = new superClass();
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
};

/**
 * 动态绑定函数对象中this的值
 *
 * @param func {Function}
 * @param obj {Object}
 * @return {Function}
 */
CAF.bind = function(func, obj){
	return function(){
		return func.apply(obj, arguments);
	};
};

