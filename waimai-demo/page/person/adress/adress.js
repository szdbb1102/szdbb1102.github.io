// page/person/historyOrder/historyOrder.js
const hostURL = require('../../../config').host;
var server = require('../../../util/server');
const config = require('../../../config');
// import orderData from 'data.js'
var app = getApp();
Page({
    data:{
        shouhuoItems: [
            {contacts: '薛少','contactNumber':'13915412747',adress:'松泽家园八区36栋1602', value: '0',checked: true},
            {contacts: '薛鑫','contactNumber':'13915412747',adress:'松泽家园八区36栋1602', value: '0'}
        ],
        zhandianItems: app.globalData.buildingList,
        checkboxItems: [
            {name: '先生', value: '0', checked: true},
            {name: '女士', value: '1'}
        ],
        countries: ["中国", "美国", "英国"],
        addState:3//1新增，2编辑，3展示
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.zhandianItems, values = e.detail.value;
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
	    // wx.navigateTo({
	    //         url: '../../Order/cert/cert'
	    //     })
        wx.navigateBack();
  	},
  	addNewAdress:function () {//todo ------0
        var self = this;
  		this.setData({addState:1})
  		var url = hostURL + '/tob/wechat/business/order/addOrModfiyDeliveryAddress';
	    var data = {
            "contacts":"薛鑫",
            "contactNumber":"13915412747",
            "sex":1,
            "buildingId":1,
            "floor":"12楼",
            "room":"1104号房",
            "defaultFlag":"1",
            "status":"1"
        }
        function setShuoHuo(data) {
            data.value = 1;
            self.setData({shouhuoItems:[data]})
        }
        setShuoHuo(data);
	    // server.postJSONLogin(url,data,function (res) {
	    // })
  	},
    submitAdd:function (e) {//todo ---获取表单数据---2
        var self = this;
        var dt = e.detail.value;
        for (var key in dt){
            if(dt[key]==''&&key=='sex'){
               dt[key]=1 //默认选项
            }
            if(dt[key]==''&&key=='buildingId'){
               dt[key]=1 
            }else if(dt[key]!=''&&key=='buildingId'){
                dt[key]= parseFloat(dt[key])+1;//数组默认从0开始
            }
            if(dt[key]==''){
                wx.showModal({
                  title: '温馨提示',
                  content: '信息填写不完整'
                })
                return;
            } ;
        }
        var data =dt;
        data.defaultFlag="1",
        data.status="1";
        console.log( e.detail.value);
        this.setData({addState:3})
        server.postJSONLogin(config.addAdressUrl,data,function (res) {
            self.setData({shouhuoItems:res.data.target})
            self.countAdressFun();
        })
        function setShuoHuo(data) {
            data.value = 1;
            self.setData({shouhuoItems:[data],addState:3})
        }
        setShuoHuo(data);
    },
    submitEdit:function () {//todo ---获取表单数据---2
        var self = this;
        this.setData({addState:3})
        var data = {
            buildingId :app.globalData.morenZhanDianId?app.globalData.morenZhanDianId:1,
            "contactNumber": "13915412747",
            "contacts": "薛鑫",
            "floor": 3,
            "room": 302,
            "sex": 0
        }
        function setShuoHuo(data) {
            data.value = 1;
            self.setData({shouhuoItems:[data],addState:3})
        }
        setShuoHuo(data);
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

        var radioItems = this.data.shouhuoItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            if(radioItems[i].id == e.detail.value){
                getApp().globalData.morenShouHuo = radioItems[i];
            }
            radioItems[i].checked = radioItems[i].id == e.detail.value;

        }

        this.setData({
            shouhuoItems: radioItems
        });
        this.toBook();

    },
    onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
        var self = this;
        var zhandianArr = [];//新增编辑中的picker只能以一维数组存在
        console.log('xx',getApp().globalData.loginData);
        var  loginData = getApp().globalData.loginData;
        if(loginData.deliveryAddresses&&loginData.deliveryAddresses.length>0){
            loginData.deliveryAddresses[0].checked = true
        }
        loginData.buildingList[0].checked = true;
        if(loginData.buildingList.length>0){
            loginData.buildingList[0].checked = true;
            for (var i = 0; i < loginData.buildingList.length; i++) {
                zhandianArr[i] = loginData.buildingList[i].name
            }
            self.setData(
                {
                    zhandianItems:loginData.buildingList,
                    zhandianArr:zhandianArr,
                    shouhuoItems:loginData.deliveryAddresses
                }
            )
            self.countAdressFun()
        }
        
    },
    countAdressFun:function () {//计算收货地址信息
        var self  = this;
        var shouhuoDt = self.data.shouhuoItems;
        var zhandianItems = self.data.zhandianItems;
        for (var i = 0; i < shouhuoDt.length; i++) {
            for (var j = 0; j < zhandianItems.length; j++) {
                if(shouhuoDt[i].buildingId==zhandianItems[j].id){
                    shouhuoDt[i].adress=zhandianItems[j].name +shouhuoDt[i].floor+'楼'+shouhuoDt[i].room
                }
            }
        }
        self.setData({shouhuoItems:shouhuoDt});
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