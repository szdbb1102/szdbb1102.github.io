

var host = "outfood.51yhr.com"


var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 登录地址，用于建立会话
    loginUrl: `https://${host}/tob/wechat/user/login`,
    //我的
    myUrl:'https://${host}/tob/wechat/user/info',
    //我的优惠券
    youhuiUrl:'https://${host}/tob/wechat/user/myCoupon' ,
    //检查商品
    checkDishUrl:'https://${host}/tob/wechat/product/product/getProductInventory' ,
    //查询商品列表
    searchDishUrl:'https://${host}/tob/wechat/product/product/search' ,
    //订单取消
    quxiaoUrl:'https://${host}/tob/wechat/business/order/commentOrder' ,
    //评价
    commentUrl:'https://${host}/tob/wechat/user/myCoupon' ,
//前往确认订单页面
    initOrderUrl:'https://${host}/tob/wechat/business/order/initOrder' ,
    //我的订单
    myOrderUrl:'https://${host}/tob/wechat/business/order/myOrder' ,
//订单详情
    orderDetailUrl:'https://${host}/tob/wechat/business/order/orderDetail' ,
    //微信充值
    rechargeUrl:'https://${host}/tob/wechat/business/order/recharge' ,
    //订单提交
    submitUrl:'https://${host}/tob/wechat/business/order/submit' ,
    // 测试的请求地址，用于测试会话
    requestUrl: `https://${host}/testRequest`,

    // 用code换取openId
    openIdUrl: `https://${host}/tob/wechat/user/login`,

    // 测试的信道服务接口
    tunnelUrl: `https://${host}/tunnel`,

    // 生成支付订单的接口
    paymentUrl: `https://${host}/payment`,

    // 发送模板消息接口
    templateMessageUrl: `https://${host}/templateMessage`,

    // 上传文件接口
    uploadFileUrl: `https://${host}/upload`,

    // 下载示例图片接口
    downloadExampleUrl: `https://${host}/static/weapp.jpg`
};

module.exports = config
