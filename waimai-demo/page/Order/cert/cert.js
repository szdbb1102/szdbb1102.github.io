const hostURL = require('../../../config').host;
const config = require('../../../config');
var server = require('../../../util/server');
var app = getApp()
Page({
    data: {
        text: "Page main",
        radioItems: [
            {name: '下楼自取（配送费2.5元）', value: '0', fee: 2.5},
            {name: '送餐上门（配送费5元）', value: '1', fee: 5, checked: true}
        ],
        youhui: []

    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
            if (radioItems[i].value == e.detail.value) {
                this.setData({
                    postFee: radioItems[i].fee
                })
            }
        }

        this.setData({
            radioItems: radioItems
        });
        var dt = this.data.receiveTime;
        if(radioItems[0].checked==true){
            this.setData({
                receiveTime: {
                    start: dt.start,
                    end: dt.end
                }
            })
        }else {
            this.setData({
                receiveTime: {
                    start: dt.end,
                    end: '24:00'
                }
            })
        }
    },
    selectMenu: function (event) {
        let data = event.currentTarget.dataset
        this.setData({
            toView: data.tag,
            selectedMenuId: data.id
        })
        // this.data.toView = 'red'
    },
    requestPayment: function (data,id) {//支付
        var self = this;
        var payargs = JSON.parse(data);
        wx.requestPayment({
            timeStamp: payargs.timeStamp,
            nonceStr: payargs.nonceStr,
            package: payargs.packageStr,
            signType: payargs.signType,
            paySign: payargs.paySign,
            success:function () {
                wx.navigateTo({url:'../nowOrder/nowOrder?id='+id})
            },
            fail:function () {

            },
            complete: function (res) {
                console.log('支付完成')
            }
        })
    },
    toOrder: function (e) {
        console.log(123)
        var self = this;
        console.log(e.detail.value)
        var dt = e.detail.value;
        var txt = '订单信息不完整';
        //表单数据start
        for (var key in dt){
            if(dt[key]!=''&&key=='activityFlag'){
                if(dt[key]=1){
                    dt[key] = 2;
                }else{
                    dt[key] = 1;
                } //默认选项
            }
            if(dt[key]!=''&&key=='commonDoorFlag'){
                if(dt[key]=1){
                    dt[key] = true;
                }else{
                    dt[key] = false;
                } //默认选项
            }
            if(dt[key]==''&&key=='receiverTime'){
                txt='未选择配送时间'
            }else if(dt[key]!=''&&key=='buildingId'){
                dt[key]= parseFloat(dt[key])+1;//数组默认从0开始
            }
            if(dt[key]==''&&key!='orderRemark'){
                wx.showModal({
                    title: '温馨提示',
                    content: txt
                })
                return;
            } ;
        }
        //表单数据end
        //其他数据start
        var tb = this.data.tobook,
            dtail = tb.detail;
        var pro = [];
        for (var i=0;i<dtail.length;i++){
            pro.push({counts:dtail[i].count,id:dtail[i].id})
        }
        //其他数据end
        var data = {
            'openid': app.globalData.openid,
            'currUrl': 'page/Order/cert/cert',
            "activityFlag": dt.activityFlag?dt.activityFlag:2,
            "commonDoorFlag": dt.commonDoorFlag,
            "orderRemark": dt.orderRemark,
            "buildingId": app.globalData.morenZhanDianId ? app.globalData.morenZhanDianId : 1,
            "paymentType": 10,
            "deliveryAddressId": app.globalData.morenShouHuo.id,
            "products": pro,
            "receiverTime": config.nowDate+dt.receiverTime,
        }
        server.postJSONLogin(config.submitUrl, data, function (res) {
            var payData = res.data.target.wechatPayInfo;
            self.requestPayment(payData,res.data.target.id)
        })
    },
    initOrder: function () {//初始化订单
        var self = this;
        var globalData = app.globalData;
        this.setData({morenShouHuo: globalData.morenShouHuo ? globalData.morenShouHuo : globalData.loginData.deliveryAddresses[0]})
        var url = hostURL + '/tob/wechat/business/order/initOrder';
        var data = {
            buildingId: app.globalData.morenZhanDianId ? app.globalData.morenZhanDianId : 1
        }
        app.globalData.morenZhanDianId = data.buildingId;
        app.globalData.morenShouHuo = this.data.morenShouHuo;

        server.postJSONLogin(config.initOrderUrl, data, function (res) {
            var data = res.data.target;
            var youhui = [];
            if (data.selfTake) {
                var radioItems = [
                    {name: '下楼自取（配送费' + data.selfTakeFee + '元）', value: '0', fee: data.selfTakeFee},
                    {name: '送餐上门（配送费' + data.commonDoorFee + '元）', value: '1', checked: true, fee: data.commonDoorFee}
                ]
                for (var i = 0, len = radioItems.length; i < len; ++i) {
                    if (radioItems[i].value == true) {
                        self.setData({
                            postFee: radioItems[i].fee
                        })
                    }
                }
                self.setData({radioItems: radioItems})
            }
            // data.hasFirstOrder = true;
            // data.firstOrderJian = 20;
            if (data.hasFirstOrder) {
                youhui.push({name:'首单优惠',jian:data.firstOrderJian,type:'0'})
            }
            if (data.man <= self.data.tobook.total.money) {
                youhui.push({name:'满'+data.man+'减'+data.jian,jian:data.jian,type:'1'})
            }
            //todo 优惠券
            if (data.salesCouponDetails.length > 0) {
                youhui.push('使用优惠券')
            }
            if(youhui.length>0){
                youhui[0].checked = true;
            }
            self.setData({
                initOrder: data, youhui: youhui,
                receiveTime: {
                    start: data.foodTimeStart,
                    end: data.foodTimeEnd
                }
            })
        })

    },
    youhuiChange:function (e) {
        var radioItems = this.data.youhui;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].type == e.detail.value;
            if (radioItems[i].type == e.detail.value) {
                this.setData({
                    youhuiInfo: {type:e.detail.value+1, jian:radioItems[i].jian}
                })
            }
        }

        this.setData({
            youhui: radioItems
        });
    },
    chooseYouHui: function () {

    },
    countTotalFee:function () {
        var self = this,
            tobook = self.data.tobook;
        var fee = self.data.tobook.total.money;
        //todo 计算总价
        self.setData({tobook:tobook})
    },
    onLoad: function (options) {
        // console.log(options);
        this.setData({
            tobook: JSON.parse(options.tobook)
        })
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        this.initOrder();
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    onScroll: function (e) {
        console.log(e)
    }
})

//todo 展示提交订单前数据，提交订单-------0
//1.选择不同优惠方式----优惠券时展示优惠券选择栏-----
//2.计算订单明细---配送费、优惠明细
//3.下单前验证未填选项
//4.支付工作处理-------1
