// page/person/historyOrder/historyOrder.js
const hostURL = require('../../../config').host;
var server = require('../../../util/server');
var app = getApp();
Page({
    data:{
        shouhuoItems: [
            {name: '薛少','phone':'13915412747',adress:'松泽家园八区36栋1602', value: '0',checked: true},
            {name: '薛鑫','phone':'13915412747',adress:'松泽家园八区36栋1602', value: '0'}
        ],
        zhandianItems: [
            {name: '商旅大厦', value: '0',distance:'1km',checked: true},
            {name: '时代广场', value: '1',distance:'1.5km'}
        ],
        checkboxItems: [
            {name: '先生', value: '0', checked: true},
            {name: '女士', value: '1'}
        ],
        countries: ["中国", "美国", "英国"],
        addState:3//1新增，2编辑，3展示
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkboxItems[i].value == values[j]){
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }
        this.setData({
            checkboxItems: checkboxItems
        });
    },
    toBook:function () {
	    wx.navigateTo({
	            url: '../../Order/cert/cert'
	        })
  	},
  	addNewAdress:function () {//todo ------0
  		this.setData({addState:1})
  		var url = hostURL + '/tob/wechat/business/order/addOrModfiyDeliveryAddress';
	    var data = {
	      	buildingId :app.globalData.morenZhanDianId?app.globalData.morenZhanDianId:1,
	  		"contactNumber": "13915412747",
	  		"contacts": "薛鑫",
	  		"floor": "3楼",
	  		"room": "302",
	  		"sex": 0
	    }

	    server.postJSONLogin(url,data,function (res) {
	      
	    })
  	},
    editAdress:function () {//编辑收货地址
        //todo 获取数据，设置编辑区块数据，提交修改---添加收货地址栏icon,绑定数据----0

    },
    switchShouHuo:function () {//选择收货地址
        //todo 切换，携带id----0
    },
    getLocation: function () {
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
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.zhandianItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            if(radioItems[i].id == e.detail.value){
                getApp().globalData.morenZhanDianId = e.detail.value;
            }
            radioItems[i].checked = radioItems[i].id == e.detail.value;

        }

        this.setData({
            zhandianItems: radioItems
        });

    },
    onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
        var self = this;
        console.log('xx',getApp().globalData.loginData);
        var  loginData = getApp().globalData.loginData;

        loginData.buildingList[0].checked = true;
        self.setData(
            {
                zhandianItems:loginData.buildingList
            }
        )
    },
    onReady:function(){
        // 页面渲染完成
        this.getLocation()
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