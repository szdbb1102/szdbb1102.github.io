function __args() {
	var setting = {};
	if (arguments.length === 1 && typeof arguments[0] !== 'string') {
		setting = arguments[0];
	} else {
		setting.url = arguments[0];
		if (typeof arguments[1] === 'object') {
			setting.data = arguments[1];
			setting.success = arguments[2];
		} else {
			setting.success = arguments[1];
		}
	}
	if (setting.url.indexOf('https://') !== 0) {
		setting.url = 'https://' + setting.url;
	}
	return setting;
}
function __json(method, setting) {
	var app = getApp();
	setting.method = method;
	setting.header = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'token':app.globalData.token?app.globalData.token:''
	};
	wx.request(setting);
}

module.exports = {
	getJSON: function () {
		__json('GET', __args.apply(this, arguments));
	},
	postJSON: function () {
		__json('POST', __args.apply(this, arguments));
	},
	getJSONLogin:function (url,data,success,fail) {
		var app = getApp();
		var datas = data;
		if(app.globalData.token){
            datas.token = app.globalData.token;
		}
		this.postJSON({
			url: url,
			data: datas,
			success: success,   // errorcode==0时发送成功
			fail: fail
		});
	},
	postJSONLogin:function (url,data,success,fail) {
		var app = getApp();
		var datas = data;
		// datas.token = app.globalData.token;
		this.postJSON({
			url: url,
			data: datas,
			success: success,   // errorcode==0时发送成功
			fail: fail
		});
	},
	sendTemplate: function(formId, templateData, success, fail) {
		var app = getApp();
		this.getJSON({
			url: '/WxAppApi/sendTemplate',
			data: {
				rd_session: app.rd_session,
				form_id: formId,
				data: templateData,
			},
			success: success,   // errorcode==0时发送成功
			fail: fail
		});
	}
}
