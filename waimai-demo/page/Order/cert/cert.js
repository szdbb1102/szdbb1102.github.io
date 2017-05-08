const hostURL = require('../../../config').host;
const paymentUrl = require('../../../config').paymentUrl
var server = require('../../../util/server');
var app = getApp()
Page({
  data:{
    text:"Page main",
    radioItems: [
            {name: '下楼自取（配送费2.5元）', value: '0',fee:2.5},
            {name: '送餐上门（配送费5元）', value: '1', fee:5,checked: true}
        ],
    youhui:[]

  },
  radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
            if(radioItems[i].value == e.detail.value){
              this.setData({
                postFee:radioItems[i].fee
              })
            }
        }

        this.setData({
            radioItems: radioItems
        });
    },
  selectMenu:function(event){
    let data = event.currentTarget.dataset
    this.setData({
      toView: data.tag,
      selectedMenuId: data.id
    })
    // this.data.toView = 'red'
  },
  requestPayment: function() {
    var self = this;
      wx.requestPayment({
              timeStamp: payargs.timeStamp,
              nonceStr: payargs.nonceStr,
              package: payargs.package,
              signType: payargs.signType,
              paySign: payargs.paySign
          })
  },
  toOrder:function (e) {
    console.log(123)
      var self = this;
      this.setData({addState:1})
      var url = hostURL + '/tob/wechat/business/order/submit';
      var data = {
          'openid':app.globalData.openid,
          'currUrl':'page/Order/cert/cert',
          "activityFlag": 1,
          "buildingId": 1,
          "commonDoorFlag": true,
          "deliveryAddressId": 1,
          "orderRemark": "尽快",
          "paymentType": 10,
          "products": [
              {
                  "counts": 4,
                  "id": 1
              }
          ],
          "receiverTime": "2017-05-09 12:29",
      }
      server.postJSONLogin(url,data,function (res) {
      })
		server.sendTemplate(e.detail.formId, null, function (res) {
			if (res.data.errorcode == 0) {
				wx.showModal({
					showCancel: false,
					title: '恭喜',
					content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
					success: function(res) {
						if (res.confirm) {
							wx.navigateBack();
						}
					}
				})
			}
		}, function (res) {
			console.log(res)
		});
  },
  initOrder:function () {//初始化订单
    var self = this;
    this.setData({morenShouHuo:app.globalData.loginData.deliveryAddresses[0]})
    var url = hostURL + '/tob/wechat/business/order/initOrder';
    var data = {
      buildingId :app.globalData.morenZhanDianId?app.globalData.morenZhanDianId:1
    }

    server.postJSONLogin(url,data,function (res) {
        var data = res.data.target;
        var youhui = [];
        if(data.selfTake){
          var radioItems = [
              {name: '下楼自取（配送费'+data.selfTakeFee+'元）', value: '0',fee:data.selfTakeFee},
              {name: '送餐上门（配送费'+data.commonDoorFee+'元）', value: '1', checked: true,fee:data.commonDoorFee}
          ]
          for (var i = 0, len = radioItems.length; i < len; ++i) {
              if(radioItems[i].value == true){
                  self.setData({
                      postFee:radioItems[i].fee
                  })
              }
          }
          self.setData({radioItems:radioItems})
        }
        if(data.hasFirstOrder){
          youhui.push('首单优惠')
        }
        if(data.man<=self.data.tobook.total.money){
            youhui.push('满减优惠')
        }
        //todo 优惠券
        if(data.salesCouponDetails.length>0){
          youhui.push('使用优惠券')
        }
        self.setData({initOrder:data,youhui:youhui})
    })

  },
  chooseYouHui:function () {

  },
  onLoad:function(options){
    console.log(options);
    this.setData({
      tobook:JSON.parse(options.tobook)
    })
    this.initOrder();
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
  },
  onScroll:function(e){
    console.log(e)
  }
})

//todo 展示提交订单前数据，提交订单-------0
//1.选择不同优惠方式----优惠券时展示优惠券选择栏-----
//2.计算订单明细---配送费、优惠明细
//3.下单前验证未填选项
//4.支付工作处理-------1
