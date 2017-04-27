const openIdUrl = require('./config').loginUrl;
const server = require('./util/server');

App({
	onLaunch: function () {
		console.log('App Launch')
		var self = this;
		self.login();
		var rd_session = wx.getStorageSync('rd_session');
		console.log('rd_session', rd_session)
		if (!rd_session) {
			self.login();
		} else {
			wx.checkSession({
				success: function () {
					// 登录态未过期
					console.log('登录态未过期')
					self.rd_session = rd_session;
					self.getUserInfo();
				},
				fail: function () {
					//登录态过期
					self.login();
				}
			})
		}
	},
	onShow: function () {
	console.log('App Show')
	},
	onHide: function () {
	console.log('App Hide')
	},
	globalData: {
	hasLogin: false,
	openid: null
	},
	// lazy loading openid
	rd_session: null,
	login: function() {
		var self = this;
		wx.login({
			success: function (res) {
				self.globalData.userInfo = res.rawData;
				console.log('wx.login', res)
				server.getJSON('https://outfood.51yhr.com/tob/wechat/common/getSessionKey', {code: res.code}, function (res) {
					console.log('setUserSessionKey', res)
					self.rd_session = res.data.target.session_key;
					self.globalData.hasLogin = true;
					self.globalData.openid = res.data.target.openid;
					wx.setStorageSync('rd_session', self.rd_session);
					self.getUserInfo();
				});
			}
		});
	},
	getUserInfo: function() {
		var self = this;
		wx.getUserInfo({
			success: function(res) {
				console.log('getUserInfo', res)
				self.globalData.userInfo = res.userInfo;
				self.getLocation();
			}
		});
	},
	getLocation: function () {
    	var self = this
        wx.getLocation({
          success: function (res) {
            console.log(res)
          },
          fail:function () {
              // that.setData({
              // hasLocation: '选择站点',
              // // location: formatLocation(res.longitude, res.latitude)
              // })
          },
          complete:function (res) {
        	server.postJSON('/tob/wechat/user/login', {loginDto:{
				  "latitude": res.latitude,
				  "longitude":res.longitude,
				  "openid": self.globalData.openid,
				  "userInfo": self.globalData.userInfo
				}}, function (res) {
					console.log('checkSignature', res)
					if (res.data.errorcode) {
						// TODO:验证有误处理
					}
				});
          }
        })
    },
})
