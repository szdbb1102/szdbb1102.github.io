var __ = {
	// 读取本地存储，返回对应于该键的值
	redLocalStore:function (key) {
		var storage=window.localStorage;
		var value  = {};
		value  = storage[key]?storage[key]:"";
		return value;
	},

	//设置本地存储
	setLocalStore:function (key,value) {
		var storage=window.localStorage;
		storage.setItem(key,value);
	}

}
