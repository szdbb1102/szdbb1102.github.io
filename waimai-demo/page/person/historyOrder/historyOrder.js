// page/person/historyOrder/historyOrder.js
const server = require('../../../util/server');
const config = require('../../../config');
import orderData from 'data.js'
const app = getApp();
Page({
  data:{
        shouhuoItems: [
            {locat:'上海银行（时代广场）',createTime:'2017 04-02', orderStat:'派送中', name: '薛少','phone':'13915412747',adress:'松泽家园八区36栋1602', value: '0',checked: true},
            {locat:'上海银行（时代广场）',createTime:'2017 04-02', orderStat:'已完成', name: '薛少','phone':'13915412747',adress:'松泽家园八区36栋1602', value: '0'}
        ],
        zhandianItems: [
            {name: '商旅大厦', value: '0',distance:'1km',checked: true},
            {name: '时代广场', value: '1',distance:'1.5km'}
        ],
    },
  todetail:function (event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({url:'../../Order/nowOrder/nowOrder?id='+id})
  },
  onLoad:function(options){
    console.log(orderData);
    var self = this;
    wx.showLoading({
          title: '获取订单信息中',
        })
    server.postJSONLogin(config.myOrderUrl,{
      
    }, function (res) {
        wx.hideLoading()
        console.log(orderData);
        var dt = res.data.target;
        if(dt.length>0){
          for (var i = 0; i < dt.length; i++) {
            dt[i].createTime = config.calcuTime(dt[i].createTime);
            dt[i].locat = dt[i].deliveryAddress.floor+'楼'+dt[i].deliveryAddress.room;
            dt[i].details.push( {
          "actualPrice": 0,
          "actualProductNum": 0,
          "actualProductWeight": 0,
          "head": "string",
          "icon": "string",
          "name": "西红柿鸡蛋",
          "productId": 0,
          "productMode": "string",
          "productNum": 2,
          "productPrice": 20,
          "productTotalPrice": 0,
          "productUnitPrice": 0,
          "productWeight": 0,
          "type": 0,
          "unit": "string"
        })
          }
          self.setData({
            orderArr:dt.reverse()
          })
        }

    });
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