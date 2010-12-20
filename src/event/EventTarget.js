/**
 * EventTarget
 */
CAF.EventTarget = CAF.extend(Object, {
	_eventMaps: {},  //事件映射表
	addEventListener: function(type, func){
		if(!this._eventMaps[type]){
			//TODO 应该使用{}来模拟多个事件执行顺序的无关性
			this._eventMaps[type] = [];
		}
		this._eventMaps[type].push(func);
	},
	removeEventListener: function(type, func){
		if(this._eventMaps[type]){
			var arr = this._eventMaps[type];
			for(var i = 0, len = arr.length; i < len; i++){
				if(func == null){  //移除所有事件
					arr[i] = null;
					arr.splice(i, 1);
				}else if(arr[i] == func){
					arr[i] = null;
					arr.splice(i, 1);  //移除元素
					break;
				}
			}
		}
	},
	dispatchEvent: function(ev){
		var map = this._eventMaps[ev.type];
		if(map){  //检查事件映射表中是否有对应的事件
			for(var i = 0, len = map.length; i < len; i++){
				map[i].call(this, ev);
			}
		}
		map = null;
	}
});
