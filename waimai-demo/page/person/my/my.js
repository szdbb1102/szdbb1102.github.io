// page/person/my/my.js
const config = require('../../../config');
var server = require('../../../util/server');
var app = getApp()
Page({
  data: {
    name:''
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  onLoad:function(options){
        var dt = app.globalData.userInfoDt;
        this.setData({
          name:dt.nickName,
          avatarUrl:dt.avatarUrl
        })
    },
})