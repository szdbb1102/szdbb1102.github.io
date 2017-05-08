const openIdUrl = require('./config').loginUrl;
const server = require('./util/server');

App({
	onLaunch: function () {
		console.log('App Launch')
	},
	loginFun:function () {
		var self = this;
		var rd_session = wx.getStorageSync('rd_session');
		console.log('rd_session', rd_session)
		if (!rd_session) {
			self.login();
		} else {
			wx.checkSession({
				success: function () {
					// 登录态未过期
					// console.log('登录态未过期')
					// self.rd_session = rd_session;
					// self.getUserInfo();
					self.login();
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
	// todo
	//1.默认站点数据
	// 1.1 收货地址与站点数据统一
	//2.initorder数据绑定---tobook,配送，总价
	//3.新增编辑收货地址
	//4.下单与支付
	//5.跳转到订单详情
	//6.订单列表与订单详情
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
        	server.postJSON('https://outfood.51yhr.com/tob/wechat/user/login',{
				  "latitude": res.latitude.toString(),
				  "longitude":res.longitude.toString(),
				  "openid": self.globalData.openid,
				  "userInfo": self.globalData.userInfo
				}, function (res) {
					console.log('checkSignature', res)
					self.globalData.loginData = res.data.target;
					console.log('t',self.globalData.loginData);
					if (res.data.errorcode) {
						// TODO:验证有误处理
					}
				});
          }
        });
    },
})
//todo 首页选好了验证---剩余量---颜色改---选好了ui修正
//todo 首页顶部样式 ---地图---tab切换
//todo 接口config统一配置
//todo 评论、确认取餐等逻辑提前输入----1