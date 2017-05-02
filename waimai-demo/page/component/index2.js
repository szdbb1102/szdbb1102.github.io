// import dishes from './resources/json/dish.js'
const openIdUrl = require('../../config').loginUrl;
const server = require('../../util/server');
Page({
    data:{
        text:"Page main",
        background: [
            {
                color:'green',
                sort:1
            },
            {
                color:'red',
                sort:2
            },
            {
                color:'yellow',
                sort:3
            }
        ],
        adds: [
          {name:'',color:'#6A5ACD'},
          {name:'',color:'#EE82EE'},
          {name:'',color:'#ADFF2F'}
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
        hasLogin:false
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
            server.postJSON('https://outfood.51yhr.com/tob/wechat/user/login',{
                  "latitude": res.latitude.toString(),
                  "longitude":res.longitude.toString(),
                  "openid": self.globalData.openid,
                  "userInfo": self.globalData.userInfo
                }, function (res) {
                    console.log('checkSignature', res)
                    self.globalData.loginData = res.data.target;
                    getApp().globalData.loginData = res.data.target;
                    getApp().globalData.token = res.data.target.token;
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
        this.setData({
            'dishes':dishAll,
            'total':total
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
        this.setData({
            'dishes':dishAll,
            'total':total
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
        this.loginFun();
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