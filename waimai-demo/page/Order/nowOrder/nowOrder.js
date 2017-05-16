// page/Order/nowOrder/nowOrder.js
Page({
  data:{
    flag2:5
  },
  changeColor11:function(){
    var that = this;
    that.setData( {
      flag2: 1
    });
  },
  changeColor12:function(){
    var that = this;
    that.setData( {
      flag2:2
    });
  },
  changeColor13:function(){
    var that = this;
    that.setData( {
      flag2: 3
    });
  },
  changeColor14:function(){
    var that = this;
    that.setData( {
      flag2:4
    });
  },
  changeColor15:function(){
    var that = this;
    that.setData( {
      flag2: 5
    });
  },
  toComment:function () {
    wx.navigateTo({
            url: '../comment/comment'
        })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})