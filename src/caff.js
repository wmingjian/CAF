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

CAF.extend = function(superClass, classImp){
	var clazz = function(){
		if(this.constructor == "function"){
			this.constructor.apply(this, arguments);
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

CAF.bind = function(){
};

