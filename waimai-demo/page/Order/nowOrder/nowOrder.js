const config = require('../../config');
var server = require('../../util/server');
var app = getApp()
Page({
  data:{
    flag2:5,
    orderInfo: {
        "actualProductNum": 0,
        "createTime": "2017-05-16T02:49:08.590Z",
        "createdBy": "string",
        "id": 0,
        "merchantId": 0,
        "order": {
          "code": "string",
          "createTime": "2017-05-16T02:49:08.590Z",
          "createTimeShow": "string",
          "createTimeStr": "string",
          "createdBy": "string",
          "deliveryAddressId": 0,
          "id": 0,
          "merchant": {
            "createTime": "2017-05-16T02:49:08.590Z",
            "createdBy": "string",
            "id": 0,
            "name": "string",
            "openid": "string",
            "status": "string",
            "token": "string",
            "updateTime": "2017-05-16T02:49:08.590Z",
            "updatedBy": "string",
            "userInfo": "string"
          },
          "merchantId": 0,
          "merchantName": "string",
          "orderRemark": "string",
          "payStatusName": "string",
          "paymentAmount": 0,
          "paymentStatus": 0,
          "paymentType": 0,
          "paymentTypeShow": "string",
          "phonenum": "string",
          "price": 0,
          "productNum": 0,
          "receiver": "string",
          "receiverTime": "2017-05-16T02:49:08.590Z",
          "receiverTimeShow": "string",
          "status": 0,
          "statusShowName": "string",
          "updateTime": "2017-05-16T02:49:08.590Z",
          "updatedBy": "string",
          "wechatPayInfo": "string"
        },
        "orderId": 0,
        "price": 0,
        "product": {
          "categoryId": "string",
          "categoryIdStr": "string",
          "cost": 0,
          "createTime": "2017-05-16T02:49:08.591Z",
          "createdBy": "string",
          "descs": "string",
          "head": "string",
          "icon": "string",
          "id": 0,
          "inventory": 0,
          "name": "string",
          "price": 0,
          "provider": "string",
          "providerId": "string",
          "status": 0,
          "statusForShown": "string",
          "theaterId": 0,
          "unit": "string",
          "updateTime": "2017-05-16T02:49:08.591Z",
          "updatedBy": "string"
        },
        "productId": 0,
        "productNum": 0,
        "remark": "string",
        "returnPrice": 0,
        "returnProductNum": 0,
        "returnReason": "string",
        "updateTime": "2017-05-16T02:49:08.591Z",
        "updatedBy": "string"

    }
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
    // todo 查询订单详情
    // server.postJSONLogin(config.orderDetailUrl,{orderId:options.id},function (res) {
    //   console.log('订单详情',res)
    // })
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