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
  todetail:function () {
    
    wx.navigateTo({url:'../../Order/nowOrder/nowOrder'})
  },
  onLoad:function(options){
    console.log(orderData);
    server.postJSONLogin(config.myOrderUrl,{
      
    }, function (res) {
        console.log(orderData);
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