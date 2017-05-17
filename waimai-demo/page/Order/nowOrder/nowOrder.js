const config = require('../../../config');
var server = require('../../../util/server');
var app = getApp()
Page({
  data:{
    flag2:5,
    orderStat:'配送中',
    orderInfo: {}
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
    this.setData({commentStat:1});
  },
  hideComment:function (argument) {
    this.setData({commentStat:2});
  },
  onLoad:function(options){
    // todo 查询订单详情
    var self = this;
    server.getJSONLogin(config.orderDetailUrl,{orderId:options.id},function (res) {
      var nowDt = res.data.target;
      self.setData({orderInfo:nowDt,
          orderTime:config.calcuTime(nowDt.createTime),
          shouhuo:nowDt.deliveryAddress
      })
      console.log('订单详情',res)

    })
    // this.comment()
    // 页面初始化 options为页面跳转所带来的参数
  },
  comment:function () {
    var dt = {
      "comment": {
        "descs": "string",
        "id": 0,
        "merchantId": 0,
        "orderId": 6,
        "start": 0
      },
      "tags": [
        {
          "id": 0,
          "name": "态度不错"
        }
      ]
    }
    server.postJSONLogin(config.commentUrl,dt,function (argument) {
      // body...
    })
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