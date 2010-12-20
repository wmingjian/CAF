CAF.Element = CAF.extend(Object, {
	init: function(){
		this._parent = null;
		this._self = null;
		this._visibile = false;
		this._opacity = 0;
	},
	create: function(){
	},
	destroy: function(){
	},
	_getStyle: function(){
		var style, view = this._doc.defaultView;
		if(view && view.getComputedStyle){
			style = view.getComputedStyle(this._self, null);
		}else{
			throw "无法动态获取DOM的实际样式属性";
		}
		return style;
	},
	getStyleProperty: function(name){
		return this._getStyle()[name];
	},
	setStyleProperty: function(name, value){
		if(this._self){
			this._self.style[name] = value;
		}
	},
	getVisible: function(){
	},
	setVisible: function(visible){
	},
	getOpacity: function(){
	},
	setOpacity: function(opacity){
	},
	moveTo: function(x, y){
	},
	resizeTo: function(w, h){
	}
});

CAF.Element.createElement = function(parent, tag, cls){
	var obj = document.createElement(tag);
	if(parent){
		parent.appendChild(obj);
	}
	if(cls){
		obj.className = cls;
	}
	return obj;
};
