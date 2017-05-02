// page/other/other.js
// import dishes from './resources/json/dish.js'
Page({
    data:{
        shouhuoItems: [
            {name: '薛少','phone':'13915412747',adress:'松泽家园八区36栋1602', value: '0',checked: true},
            {name: '薛鑫','phone':'13915412747',adress:'松泽家园八区36栋1602', value: '0'}
        ],
        zhandianItems: [
            {name: '商旅大厦', value: '0',distance:'1km',checked: true},
            {name: '时代广场', value: '1',distance:'1.5km'}
        ]
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