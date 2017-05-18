// import dishes from './resources/json/dish.js'
const openIdUrl = require('../../config').loginUrl;
const server = require('../../util/server');
const app = getApp();
Page({
    data:{
        adds: [
          {name:'',color:'#31CA63'},
          {name:'',color:'#31CA63'},
          {name:'',color:'#31CA63'}
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        toView: 'blue',
        'dishes':null,
        selectedMenuId:1,
        total:{
            count:0,
            money:0
        },
        serverError:false,
        hasLogin:false,
        tobook:{}
    },
    checkSessionFun:function () {
        var self = this;
        var rd_session;
        try{
          rd_session = wx.getStorageSync('rd_session');
        }catch(e){

        } 
        console.log('rd_session', rd_session)
        if (!rd_session) {
            self.login();//todo 
        } else {
            wx.checkSession({
                success: function () {
                    // 登录态未过期
                    console.log('登录态未过期')
                    // self.rd_session = rd_session;
                    getApp().globalData.rd_session = rd_session;
                    getApp().globalData.openid = wx.getStorageSync('openid');
                    // self.getLocation();
                    self.login();
                },
                fail: function () {
                    self.login();
                    console.log('登录态过期')
                }
            })
        }
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
                console.log('wx.login', res)
                self.globalData.userInfo = res.rawData;
                self.getUserInfo(res.code);
            },
            fail:function (e) {
                console.log('拒绝授权')
                self.errorFun(self);
            }
        });
    },
    getUserInfo: function(code) {
        var self = this;
        wx.getUserInfo({
            withCredentials:false,
            success: function(res) {
                console.log('getUserInfo', res)
                app.globalData.userInfoDt = JSON.parse(res.rawData);
                self.globalData.userInfo = res.userInfo;
                if(getApp().globalData.rd_session){
                    self.getLocation();
                    return;
                }
                server.getJSONLogin('https://outfood.51yhr.com/tob/wechat/common/getSessionKey', {code: code}, function (res) {
                    console.log('setUserSessionKey', res)
                    //存储openid与sessionkey
                    wx.setStorageSync('openid', res.data.target.openid)
                    wx.setStorageSync('rd_session', self.rd_session);
                    self.rd_session = res.data.target.session_key;
                    self.globalData.hasLogin = true;
                    self.globalData.openid = res.data.target.openid;
                    app.globalData.openid = res.data.target.openid;
                    wx.setStorageSync('rd_session', self.rd_session);
                    self.getLocation();
                    },function (e) {
                      console.log(e)
                      self.errorFun(self);
                });
            },
            fail:function (e) {
                self.errorFun(self);
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
            server.postJSONLogin('https://outfood.51yhr.com/tob/wechat/user/login',{
                  "latitude": res.latitude.toString(),
                  "longitude":res.longitude.toString(),
                  "openid": app.globalData.openid,
                  "userInfo": self.globalData.userInfo
                }, function (res) {
                    console.log('checkSignature', res)
                    wx.hideLoading();
                    self.setData({
                        hasLocation:res.data.target.buildingList[0].name
                    })
                    self.globalData.loginData = res.data.target;
                    app.globalData.loginData = res.data.target;
                    app.globalData.token = res.data.target.token;
                    app.globalData.buildingList = res.data.target.buildingList;
                    console.log('t',self.globalData.loginData);
                    self.setLoginData(self.globalData.loginData,self);
                    if (res.data.errorcode) {
                        // TODO:验证有误处理
                    }
                });
          }
        });
    },
    setLoginData:function (data,scope) {
        var self = scope;
        const loginData =  self.globalData.loginData;
        var dishes =   loginData.productList;
        for (var i = 0; i < dishes.length; i++) {
            dishes[i].count = 0;
        }
        this.setData({
            dishes:dishes,
            hasLogin:true
        })
    },
    getDishes:function () {
        getApp().loginFun();
        // var self = this;
        // const loginData =  getApp().globalData.loginData;
        // var dishes =   loginData.productList;
        // for (var i = 0; i < dishes.length; i++) {
        //     dishes[i].count = 0;
        // }
        // this.setData({
        //     dishes:dishes
        // })
    },
    getLocation2: function () {
    var that = this
        wx.getLocation({
          success: function (res) {
            console.log(res)
            that.setData({
              // hasLocation: '时代广场',
                hasLocation: '选择站点',
              // location: formatLocation(res.longitude, res.latitude)
            })
          },
          fail:function () {
              that.setData({
              hasLocation: '选择站点',
              // location: formatLocation(res.longitude, res.latitude)
              })
          }
        })
    },
    chooseZhanDian:function (event) {
        console.log('选择站点')
        let data = event.currentTarget.dataset
        
        wx.navigateTo({
            url: '../other/other'
        })
        
    },
    selectMenu:function(event){
        let data = event.currentTarget.dataset
        this.setData({
            toView: data.tag,
            selectedMenuId: data.id
        })
        // this.data.toView = 'red'
    },
    addCount:function(event){
        let data = event.currentTarget.dataset
        let total = this.data.total
        let dishAll = this.data.dishes
        let dishCur = dishAll.find(function(v){
            return v.id == data.id
        })
        dishCur.count += 1;
        total.count += 1
        total.money += dishCur.price
        var tobook = this.getOrderParam();
        this.setData({
            'dishes':dishAll,
            'total':total,
            'tobook':JSON.stringify(tobook)
        })
    },
    minusCount:function(event){
        let data  = event.currentTarget.dataset
        let total = this.data.total
        let dishAll = this.data.dishes
        let dishCur = dishAll.find(function(v){
            return v.id == data.id
        })
        if(dishCur.count <= 0)
            return
        dishCur.count -= 1;
        total.count -= 1
        total.money -= dishCur.price
        var tobook = this.getOrderParam();
        this.setData({
            'dishes':dishAll,
            'total':total,
            'tobook':JSON.stringify(tobook)
        })
    },
    getOrderParam:function(){//获取下单参数
        let total = this.data.total
        let dishAll = this.data.dishes
        let tobook = {detail:[],total:total};
        for (var i = 0; i < dishAll.length; i++) {
            if(dishAll[i].count>0){
                tobook.detail.push(dishAll[i])
            }
        }
        return tobook;
    },
    tobook:function () {//提交订单
    	if(this.data.total.count!=0){
    		wx.navigateTo({
            	url: '../Order/cert/cert?tobook='+this.data.tobook
        	})
    	}
    },
    reLogin:function () {//重新授权
    	this.setData({
    		serverError:false
    	})
    	wx.showLoading({
          title: '加载中',
        })
        this.loginFun();
    },
    errorFun:function (scope) {
        wx.hideLoading();
        scope.setData({
            serverError:true
        })
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
        interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    onLoad:function(options){
        wx.showLoading({
        title: '加载中',
        })
        this.checkSessionFun();
        // this.setData({hasLogin:true})
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady:function(){
        // 页面渲染完成
        // this.getLocation()
    },
    onShow:function(){
        // 页面显示

    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    },
    onScroll:function(e){
        console.log(e)
    }
})