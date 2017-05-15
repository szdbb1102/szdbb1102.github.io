//下单提交，供orderAmountView.js使用

define([], function () {

    var isOrderCreating=false;
    var getConRst,msgKey,getVerIdentity,getHoldSeatRst;
    var getConsumeResultUrl=APIUrl+'consumeresult.html';
    function saveContacts(uid) {
        //getMD5User(uid,function(md5user){
        /*var p = { "Passengers": [] };
        appView.contactslist.model.each(function (model) {
            var o = {};
            o.passenType = model.get("ticketType") == "1" ? "1" : "0";
            o.name = model.get("name");
            o.idType = appView.convertByC(model.get("cardType"));
            o.idCard = model.get("cardNum");
            o.passenBirthday = model.get("birth");
            o.sex = model.get("sex") == "" ? "1" : model.get("sex");
            o.lid = model.get("lId");
            p.Passengers.push(o);
        }, this);

        var para = {
            "Userid": uid,
            "Key": '',
            "Para": JSON.stringify(p)
        };
        appView.addpassenger.saveContact(para);*/
        //});
        
        var p = [];
        appView.contactslist.model.each(function(passenger) {
            var o = {
                "PassenType": passenger.get("ticketType"), //1成人2儿童3学生4残军票
                "Name": passenger.get("name"),
                "IdType": passenger.get("cardType"),
                "IdCard": passenger.get("cardNum"),
                "BirthDay": passenger.get("birth"),
                "passenBirthDay": passenger.get("birth"),
                "lid": passenger.get("lId"),
                "Sex": passenger.get("sex")
            }
            p.push(o);
        }, this);

        var para = {
            "MemberId": uid,
            "Linker": p
        };
        $.ajax({
            url: "AddMemberLinkerForBatch.html?timeStamp="+(new Date()).getTime(),
            data: {json: JSON.stringify(para)},
            type: "get",
            dataType: "json",
            success: function (data) {
            },
            error: function() {
            }
        });
    }
    //异步占座
    //function HoldingSeat(backdata,phone,timeout,callback){
    function HoldingSeat(backdata, phone, timeout, mId) {
        var holdingseat = $.ajax({
            //url: WebConfigUrl.WeChatHoldingSeat,
            url: "WeChatHoldingSeat",
            data: { OrdSerNo: backdata.OrderNumber, phoneNum: phone,  timeStamp: new Date().getTime() },
            type: "get",
            dataType: "json",
            timeout: timeout,
            //contentType:"application/json",
            beforeSend: function () {
            },
            success: function (data) {
                if (data.MessageCode == "2003" ||
                    data.MessageCode == "2004" ||
                    data.MessageCode == "2006" ||
                    data.MessageCode == "2007" ||
                    data.MessageCode == "2011") {
                    isOrderCreating=false;
                    mobileUtil.dialog(data.Message, "body");                    
                } else if (data.MessageCode == "2001" || data.MessageCode == "2002" || data.MessageCode == "2005") {
                    isOrderCreating=false;
                    mobileUtil.confirm(data.Message, "body", function () {
                        //跳转book1
                        location.replace("trainsearch.html?BeginPlaceCn=" + $('.depStation').html() + "&BeginPlace=" + $('#from').val() + "&ArrPlaceCn=" + $('.arrStation').html() + "&ArrPlace=" + $("#to").val() + "&Time=" + $(".depDate").attr("data-date") + "&filter=&openid=" + (getWxObj().openid) + "&token=" + (getWxObj().token || 0));
                    }, "取消", "重新预订");
                } else if (data.MessageCode == "2008" || data.MessageCode == "2009" || data.MessageCode == "2010") {
                    mobileUtil.confirm(data.Message, "body", function () {
                        location.replace(WebConfigUrl.PayUrl + "?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                    }, "查看详情", "确定", function () {
                        location.replace("TrainOrderDetail.html?orderNo="+backdata.OrderNumber+"&orderId=" + encodeURIComponent(backdata.OrderId) + "&bookerId=" + backdata.EnCodeUID);
                    });
                } else if (data.MessageCode == "1001") {
                    location.replace(WebConfigUrl.PayUrl + "?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                } else if (data.MessageCode == "2012") {
                    //{"MessageCode":"2012","Message":"\n      订单已提交，同程正在为您购票，请耐心等待通知后进行支付\n    ","Status":"","PublicPayUrl":"","ResponseInfo":"","OrderId":null,"OrderNumber":null,"MemberId":null,"EnCodeUID":null,"PlaceOrderType":null,"ResponseStatus":false,"ResponseMessage":null} // 直接进入订单详情页
                    //mobileUtil.dialog(data.Message, "body", function () {
                    location.replace("TrainOrderDetail.html?orderNo="+backdata.OrderNumber+"&orderId=" + encodeURIComponent(backdata.OrderId) + "&bookerId=" + backdata.EnCodeUID);
                    //location.replace(zj.tool.getWxAuthUrlAndQsToJSONString("TrainOrderDetail.html","?orderId=" + encodeURIComponent(backdata.OrderId) + "&bookerId=" + backdata.EnCodeUID));
                    //}, "查看订单详情");

                    //if(callback)callback();
                }
            },
            complete: function (req, state) {
                hideMsgLoading();
                if (state == "timeout") {
                    isOrderCreating=false;
                    holdingseat.abort();
                    mobileUtil.dialog("亲，很抱歉，铁路售票系统忙碌哦！您可以前往订单中心跟踪占座结果。", "body", function () {
                        //location.href = "TrainOrderDetail.html?orderId="+encodeURIComponent(backdata.OrderId)+"&bookerId="+backdata.EnCodeUID;
                        location.replace("TrainOrderDetail.html?orderNo="+backdata.OrderNumber+"&orderId=" + encodeURIComponent(backdata.OrderId) + "&bookerId=" + backdata.EnCodeUID);
                        //location.replace(zj.tool.getWxAuthUrlAndQsToJSONString("TrainOrderDetail.html","?orderId=" + encodeURIComponent(backdata.OrderId) + "&bookerId=" + backdata.EnCodeUID));
                    });
                }
            }

        });
    }

    //狮子座拦截时弹框倒计时start
    function countDown(secs) {
        var sec = document.getElementsByClassName('sec');
        secs-=1;
        sec[0].innerHTML = "("+secs+"s)";
        if (secs == 0) {
            sec[0].style.display="none";
            sec[0].parentNode.removeAttribute("disabled");
            sec[0].parentNode.classList.remove("graybt");
            return;
        }
        countDownTimer=setTimeout(function(){countDown(secs)}, 1000);
    };
    //狮子座拦截时弹框倒计时end
    //狮子座拦截时立即抢票选择默认保险start
    function selectInsurance(){
        var insuranceRes;
        insuranceRes=$.extend({},appView.insurance.model.attributes.dataInsurance);
        var insuranceList=insuranceRes.InsuranceInfo,
        sortData=[];
        for(var e=0,l=insuranceList.length;e<l;e++){  
            if(insuranceList[e].SeatType==appView.switchSeatView.model.get("seatType")){
                if(insuranceList[e].DefaultInsurance){
                    insuranceList[e].IsDefault="true";
                    appView.insurance.model.set({"insPri":insuranceList[e].Price,"InsuranceId":insuranceList[e].InsuranceId});    
                }
                sortData.push(insuranceList[e]);
                insuranceRes.InsuranceInfo=sortData;
                
            }
        }
        for(var i=0,length=ORDER.getInstance().passengers.length;i<length;i++){
            ORDER.getInstance().passengers[i].insurPrice=appView.insurance.model.get("insPri");
            ORDER.getInstance().passengers[i].insurId=appView.insurance.model.get("InsuranceId");
            ORDER.getInstance().passengers[i].insurCount=1;
        }
    }
    //狮子座拦截时立即抢票选择默认保险end
    function CreateNewOrder(mId, phone, timeout, bwu) {
            
        ORDER.getInstance().memberId = encodeURIComponent(mId);        

        /* 读取配置判断是否是12306账号登陆
         * 例如： 0：12306账号    1：同程账号    2：两者并存
         * */
        //utilityRailway.getAccountConfigure(function(accountConfigure) {
        //    var bookdata = { para:JSON.stringify(ORDER.getInstance()) };
        //    /* 如果用12306账户登陆下单添加参数 */
        //    if(accountConfigure == 0 || accountConfigure == 2){
        //        bookdata = { para:JSON.stringify($.extend(ORDER.getInstance(),{KyfwUserName:appView.model.get('username'),KyfwUserPwd:appView.model.get('password')})) }
        //    }
        getIsSellAtNight(timeout, function (timeout, a) {
            ORDER.getInstance().PlaceOrderForNight = a ? "0" : "1";

            showLoading();

            zj.config.getUseAccountType(function (accountType) {

                ORDER.getInstance().UserName = "";
                ORDER.getInstance().PassWord = "";

                var u = zj.trainUser.get(),
                    //是否是送票上门
                    isDoorstep = isPer();
                // test settings
                //accountType = zj.useAccountType._12306;
                if (((accountType == zj.useAccountType._12306) || (accountType == zj.useAccountType.both && appView.userJuestEnterIsLogined)) && !isDoorstep) {

                    function submit12306Fun() {
                        ORDER.getInstance().UserName = u.username;
                        ORDER.getInstance().PassWord = u.password;
                        submitFun();
                    }

                    zj.trainUser.checkAndLogin(function (opts) {
                        hideLoading();
                        if (opts.status != 0) return;
                        showLoading();

                        //需要重新获取用户信息
                        u = zj.trainUser.get();
                        submit12306Fun();
                    }, false);
                } else {
                    submitFun();
                }

                /*if (((accountType == zj.useAccountType._12306) || (accountType == zj.useAccountType.both && appView.userJuestEnterIsLogined)) && !isDoorstep) {

                    function submit12306Fun() {
                        ORDER.getInstance().UserName = u.username;
                        ORDER.getInstance().PassWord = u.password;
                        submitFun();
                    }

                    if (u && zj.trainUser.isLogined()) {
                        submit12306Fun();
                    } else {
                        hideLoading();
                        zj.trainUser.autoLogin(function () {
                            //需要重新获取用户信息
                            u = zj.trainUser.get();
                            submit12306Fun();
                        });
                    }
                } else {
                    submitFun();
                }*/

            });

            var submitFun = function () {
                if(ORDER.getInstance().orderType == '2'){
                    ORDER.getInstance().orderType= undefined;//修复正常单变成抢票单问题。
                }
                if(getRequest().fromCity){
                    ORDER.getInstance().fromStation = decodeURIComponent(getRequest().fromCity);
                }
                if(getRequest().toCity){
                    ORDER.getInstance().toStation = decodeURIComponent(getRequest().toCity);
                }
                if(getRequest().oldOrderSerId){
                    ORDER.getInstance().RelationSerialId = getRequest().oldOrderSerId;
                }
                var ajaxData = JSON.stringify(ORDER.getInstance()),//{ para: JSON.stringify(ORDER.getInstance()) };
                    flag=true,
                    url,
                    ajaxDataJson=JSON.parse(ajaxData);
                ajaxData=$.extend({},APICommonHead,ajaxDataJson);
                url=APIUrl+"CreateWeChatOrder.html";
                var CreateOrder = $.ajax({
                    url:url,
                    data: {para:JSON.stringify(ajaxData)},
                    type: "post",
                    dataType: "json",
                    beforeSend: function () {//showLoading();
                        bwu = setInterval(function () {
                            timeout -= 1000;
                        }, 1000);
                        document.cookie = "WxCheckPost=" + $.md5(JSON.stringify(ajaxData));
                    },
                    timeout: timeout,
                    success: function (backdata) {
                        if(Object.prototype.toString.call(backdata)!="[object Object]"){
                            backdata = JSON.parse(backdata);
                        }
                        if(backdata.status==200){
                            backdata=backdata.data;
                        }else if(backdata.status==400){
                            isOrderCreating=false;
                            mobileUtil.dialog(backdata.error, "body"); 
                            return;
                        } else{
                            isOrderCreating=false;
                            mobileUtil.dialog("亲，下单失败，请重试！", "body"); 
                            return;
                        }

                        if(backdata.IsUseMQ=='1'){
                            if (backdata.ResponseMessageCode && backdata.ResponseMessageCode == "2125") {
                            flag=false;
                            zj.track.tc("tianxieye-chuxiantanchuang");
                            zjPopup.showConfirm2(
                                "当前购票人数较多，系统正在排队。请在倒计时结束后重试。建议您购买行程保险，无需排队，可立即购票！",
                                "立即购票",
                                function(){
                                    isOrderCreating=false;
                                    zj.track.tc("tianxieye-szzgoupiao");
                                    selectInsurance();
                                    clearTimeout(countDownTimer);
                                    CreateNewOrder(mId, phone, timeout, bwu);     
                                },
                                "重试",
                                function(){
                                    isOrderCreating=false;
                                    zj.track.tc("tianxieye-szzchongshi");
                                    CreateNewOrder(mId, phone, timeout, bwu);
                                }  
                            );
                            return;
                            }
                            toMQProcess(backdata);
                            return;
                        }                        
                        clearInterval(bwu);

                        if(backdata.OrderNumber){
                            TCMemeberCardTrack(backdata.OrderNumber);
                            zj.tool.setOrderNumber(backdata.OrderNumber);
                        }

                         //hideLoading(); // 12-17
                        //会员信息有误，重新授�
                        if(backdata.MessageCode == "10001"){
                            var ulrTrain =location.href;
                            location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri="+encodeURIComponent(ulrTrain)+"&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
                            return;
                        }else if (backdata.MessageCode == "2002" ||
                            backdata.MessageCode == "2007" ||
                            backdata.MessageCode == "2008" ||
                            backdata.MessageCode == "2010" ||
                            backdata.MessageCode == "2011" ||
                            backdata.MessageCode == "2108") {
                            isOrderCreating=false;
                            mobileUtil.dialog(backdata.Message, "body");
                        } else if (backdata.ResponseMessageCode && backdata.ResponseMessageCode == "2125") {
                            flag=false;
                            zj.track.tc("tianxieye-chuxiantanchuang");
                            zjPopup.showConfirm2(
                                "当前购票人数较多，系统正在排队。请在倒计时结束后重试。建议您购买行程保险，无需排队，可立即购票！",
                                "立即购票",
                                function(){
                                    isOrderCreating=false;
                                    zj.track.tc("tianxieye-szzgoupiao");
                                    selectInsurance();
                                    clearTimeout(countDownTimer);
                                    CreateNewOrder(mId, phone, timeout, bwu);     
                                },
                                "重试",
                                function(){
                                    isOrderCreating=false;
                                    zj.track.tc("tianxieye-szzchongshi");
                                    CreateNewOrder(mId, phone, timeout, bwu);
                                }  
                            );
                        } else if (backdata.MessageCode && backdata.MessageCode == "2125") {
                            flag=false;
                            zj.track.tc("tianxieye-chuxiantanchuang");
                            zjPopup.showConfirm2(
                                "当前购票人数较多，系统正在排队。请在倒计时结束后重试。建议您购买行程保险，无需排队，可立即购票！",
                                "立即购票",
                                function(){
                                    isOrderCreating=false;
                                    zj.track.tc("tianxieye-szzgoupiao");
                                    selectInsurance();
                                    clearTimeout(countDownTimer);
                                    CreateNewOrder(mId, phone, timeout, bwu);      
                                },
                                "重试",
                                function(){
                                    isOrderCreating=false;
                                    zj.track.tc("tianxieye-szzchongshi");
                                    CreateNewOrder(mId, phone, timeout, bwu);
                                }  
                            );
                        } else if (backdata.MessageCode == "2004") {
                            var msg = backdata.Message;
                            isOrderCreating=false;
                            mobileUtil.dialog(msg.substring(0, msg.indexOf('首次')) + "<div class='idTip'>" + msg.substring(msg.indexOf('首次'), msg.length) + '</div>', "body");
                        } else if (backdata.MessageCode == "2003" || backdata.MessageCode == "2005" || backdata.MessageCode == "2009") {
                            isOrderCreating=false;
                            mobileUtil.confirm(backdata.Message, "body", function () {
                                //跳转book1
                                location.replace("trainsearch.html?BeginPlaceCn=" + $('.depStation').html() + "&BeginPlace=" + $('#from').val() + "&ArrPlaceCn=" + $('.arrStation').html() + "&ArrPlace=" + $("#to").val() + "&Time=" + $(".depDate").attr("data-date") + "&filter=&openid=" + (getWxObj().openid) + "&token=" + (getWxObj().token || 0));
                            }, "取消", "重新预订");
                        } else if (backdata.MessageCode == "2006" ||
                            backdata.MessageCode == "2103" ||
                            backdata.MessageCode == "2104" ||
                            backdata.MessageCode == "2105" ||
                            backdata.MessageCode == "2106" ||
                            backdata.MessageCode == "2107") {
                            isOrderCreating=false;
                            mobileUtil.confirm(backdata.Message, "body", function () {
                                location.replace("TrainOrderDetail.html?orderNo="+backdata.OrderNumber+"&orderId=" + encodeURIComponent(backdata.OrderId) + "&bookerId=" + backdata.EnCodeUID);
                            }, "取消", "查看详情");
                        } else if (backdata.MessageCode == "2101") {
                            //下单成功...
                            hideLoading();
                            //送票上门单直接去支付页
                            if (isPer()) {
                                location.replace(WebConfigUrl.PayUrl + "?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                                return;
                            }

                            //PlaceOrderType:  0:白天，先占座后支付         1：夜间          2：白天：先支付后占座
                            if (backdata.PlaceOrderType == 1) {
                                verificationIdentity(backdata.OrderId, function () {
                                    if (isPer()) {
                                        location.replace(WebConfigUrl.PayUrl + "?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                                        return;
                                    }else{
                                        mobileUtil.dialog("夜间下单（23点至次日6点），付款成功后，系统将在次日6点为您排队购票，8点前短信或微信通知出票结果。", "body", function() {
                                            location.replace(WebConfigUrl.PayUrl + "?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                                        });
                                        return;
                                    }   
                                });  
                            } else if (backdata.PlaceOrderType == 2) {
                                setTimeout(function () {
                                    showLoading();
                                }, 0);
                                verificationIdentity(backdata.OrderId, function () {
                                    location.replace("TrainPay.html?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                                });
                            } else {
                                //提交占座(非夜间下单)
                                showMsgLoading("正在提交，请勿离开…", 2000, function () {
                                    showLoading();
                                });
                                /* 证件号核验 */
                                verificationIdentity(backdata.OrderId, function () {

                                    HoldingSeat(backdata, phone, timeout, mId);
                                    clearInterval(bwu);
                                });
                            }
                        } else if (backdata.MessageCode == "203") {
                            isOrderCreating=false;
                            mobileUtil.confirm("该坐席余票不足，不支持送票上门，您可以选择更换其它坐席或不邮寄。", "body");
                        } else if (backdata.MessageCode == "204") {
                            isOrderCreating=false;
                            mobileUtil.confirm("当前车次距发车时间过近，不支持送票上门，您可以更换其它车次或不邮寄。", "body");
                        } else if (backdata.MessageCode == "205" || backdata.MessageCode == "206") {
                            isOrderCreating=false;
                            mobileUtil.confirm("暂不支持送票上门，您可以选择不邮寄。", "body");
                        } else {
                            isOrderCreating=false;
                            mobileUtil.confirm(backdata.Message, "body");
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        isOrderCreating=false;
                        var p=0;
                        if(ajaxDataJson.passengers[0].insurPrice>0){p=1;}else{p=0;}
                        var rcinfo="postData:"+JSON.stringify(ajaxDataJson)+"errorText:"+jqXHR.statusText;
                        $.get("/rubbishcoll?tp="+p+"&rcinfo="+rcinfo);                       
                    },
                    complete: function (a, status, c) {                        
                        hideLoading();
                        if (status == 'timeout' || status == 'error') {
                            //超时,status还有error等值的情况
                            isOrderCreating=false;
                            mobileUtil.confirm("亲，网络异常，本次订单提交失败！您可以选择重新提交。", "body", submit);
                        }
                        var wh = $(window).height();
                        var th = $("#showMsg").height();
                        $("#showMsg").css({ top: wh > th ? ((wh - th) / 2) : 0 });
                        if(flag){
                            ORDER.getInstance().passengers = [];
                        }else{
                            flag=true;
                        }
                        //狮子座拦截时调用倒计时
                        if(document.getElementsByClassName('sec')[0]!=undefined){
                            countDown(6);    
                        }
                    }
                    //});
                });
            }
        });
    }

    function CreateNewOrder2(mId, phone, timeout, bwu) {        
        ORDER.getInstance().userNo = encodeURIComponent(mId);   
                ORDER.getInstance().userAccount = "";
                var u = zj.trainUser.get();
                if (appView.userJuestEnterIsLogined) {

                    function submit12306Fun() {
                        ORDER.getInstance().userAccount = u.username;
                        submitFun2();
                    }

                    zj.trainUser.checkAndLogin(function (opts) {
                        if (opts.status != 0) return;
                        showLoading();

                        //需要重新获取用户信息
                        u = zj.trainUser.get();
                        submit12306Fun();
                    }, false);
                } else {
                    submitFun2();
                }

            function submitFun2(){
                var ajaxData = { para: JSON.stringify(ORDER.getInstance()) };
                var CreateOrder = $.ajax({
                    url: "BookGrabTicketOrder?timeStamp="+(new Date()).getTime(),
                    data: ajaxData,
                    type: "post",
                    dataType: "json",
                    beforeSend: function () {
                        isOrderCreating=true;
                        showLoading();
                        bwu = setInterval(function () {
                            timeout -= 1000;
                        }, 1000);
                    },
                    timeout: timeout,
                    beforeSend: function () { },
                    success: function (backdata) {
                        clearInterval(bwu);
                        backdata = (typeof(backdata)==="string" ? eval(backdata) : backdata);
                        if (backdata.msgCode == "1000") {
                            //下单成功...
                            hideLoading();
                            //location.replace(WebConfigUrl.PayUrl + "?OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                            //PlaceOrderType:  0:白天，先占座后支付         1：夜间          2：白天：先支付后占座
                            setTimeout(function () {
                                showLoading();
                            }, 0);

                            verificationIdentity(backdata.orderId, function () {
                                location.replace("TrainPay.html?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.orderId + "&userid=" + backdata.enCodeUID +"&processRoute=1");
                            });
                                
                        }else if (backdata.ResponseMessageCode && backdata.ResponseMessageCode == "2125") {
                            var msg = "当前用户较多，请稍后尝试";
                            isOrderCreating=false;
                            mobileUtil.dialog(msg, "body");
                        }else if (backdata.MessageCode && backdata.MessageCode == "2125") {
                            var msg = "当前用户较多，请稍后尝试";
                            isOrderCreating=false;
                            mobileUtil.dialog(msg, "body");
                        } else {
                            hideLoading();
                            //mobileUtil.dialog("亲，下单失败，请重试！", "body");
                            isOrderCreating=false;
                            mobileUtil.dialog(backdata.msgInfo, "body");
                        }
                    },
                    error: function (data, t) { },
                    complete: function (a, status, c) {
                        isOrderCreating=false;
                        hideLoading();
                        if (status == 'timeout' || status == 'error') {
                            //超时,status还有error等值的情况
                            mobileUtil.confirm("亲，网络异常，本次订单提交失败！您可以选择重新提交。", "body", submit);
                        }
                        var wh = $(window).height();
                        var th = $("#showMsg").height();
                        $("#showMsg").css({ top: wh > th ? ((wh - th) / 2) : 0 });
                        ORDER.getInstance().passengers = [];
                    }
                    //});
                });
            }
    }
    var fnFlag=true; 
    function verificationIdentity(orderId, fn) {

        fn = (fn ? fn : function () { });
      
        //12306账号下单不调取身份核验接口
        if (ORDER.getInstance().UserName) {
            fn();
            return;
        }

        if(fnFlag){
            fnFlag=false;
            var verification = $.ajax({
                url: "VerificationIdentity",
                data: {
                    OrderId: orderId,
                    platId: 501,
                    timeStamp: new Date().getTime()
                },
                type: "get",
                dataType: "json",
                timeout: 10000,
                success: function (data) {
                    if (data.Status == "true") {
                        fn();
                    } else {
                        hideMsgLoading();
                        /*if (appView.doorstepView.model.get("isDoorstep") == "2") {
                            appView.doorstepView.model.set({ verificationIdentity: false });
                            mobileUtil.confirm("乘客" + data.Msg + "未办理实名制身份核验，不能通过自助取票方式购票。您可以尝试私人订制或者护照买票", "body", function () {
                                zj.track.tc("tianxieye-308-songpiaoshangmen");
                                appView.doorstepView.model.set({ isDoorstep: 1 });
                                appView.customSeatView.model.set({"appoint":true,"AcceptOtherSeat":"1"}); 
                            }, "护照买票", "私人订制", function () {
                                zj.track.tc("tianxieye-308-huzhaogoupiao");
                                location.reload();
                                return;
                                (function () {
                                    var items = $("#plist .item-delete");
                                    if (items.length) {
                                        $(items[items.length - 1]).trigger("click");
                                        arguments.callee();
                                        //setTimeout(arguments.callee, 10);
                                    }
                                })();
                            });
                        } else {
                            mobileUtil.dialog("乘客" + data.Msg + "未办理实名制身份核验，暂不能通过自助取票方式购票。乘客需携带有效身份证件去车站核验窗口核验身份后才能进行互联网购票。", "body");
                        }*/

                        //blf 16/5/27
                        data.privateTip=appView.entrance12306View.model.get('activityIconStr');
                        var msg=data.Msg,
                            msgArr=msg.split("；"),
                            msgLen=msgArr.length,
                            disabled=appView.entrance12306View.model.get('disabled'),
                            privateDisabled=appView.entrance12306View.model.get('privateDisabled');
                        msgArr.splice(msgLen-1,1);
                        var len=msgArr.length, 
                            nameArr=[],
                            nameArr2=[];
                        data.disabled=disabled;
                        data.privateDisabled=privateDisabled;
                        if((msg.indexOf("308:")!=-1&&msg.indexOf("315:")<0)||(msg.indexOf("308:")!=-1&&msg.indexOf("315:")!=-1)){
                            data.flag="308";
                            if(msg.indexOf("308:")!=-1&&msg.indexOf("315:")<0){
                                for(var i = 0; i < len; i++){
                                    var name=msgArr[i].split('/')[0].replace("308:","").replace("315:","");
                                    // var name=msgArr[i].split('/')[0].replace(/[^a-zA-Z\u4e00-\u9fa5]/gi,"");
                                     nameArr.push(name);
                                }
                                data.name=nameArr.join(",");
                                zjPopup.showConfirm(
                                    "乘客【" + data.name + "】未办理实名制身份核验，无法直接预订。请查看解决方案。",
                                    "取消",
                                    function(){
                                        isOrderCreating=false;
                                        zj.track.tc('tianxieye-308quxiao');
                                        location.reload();
                                    },
                                    "解决方案",
                                    function(){
                                        isOrderCreating=false;
                                        zj.track.tc('tianxieye-308jiejuefangan');
                                        page.open("lead315");                        
                                    } 
                                );    
                            }else{
                                for(var i = 0; i < len; i++){
                                    if(msgArr[i].indexOf("308:")!=-1){
                                        var name=msgArr[i].replace("308:","");
                                        nameArr.push(name);    
                                    }
                                    if(msgArr[i].indexOf("315:")!=-1){
                                        var name2=msgArr[i].replace("315:","");
                                        nameArr2.push(name2);    
                                    }
                                }
                                data.name308=nameArr.join(",");
                                data.name315=nameArr2.join(",");
                                zjPopup.showConfirm(
                                    "乘客【" + data.name308 + "】未办理实名制身份核验，乘客【" + data.name315 + "】未通过身份信息核验，无法直接预订。请查看解决方案。",
                                    "取消",
                                    function(){
                                        isOrderCreating=false;
                                        zj.track.tc('tianxieye-308&315quxiao');
                                        location.reload();
                                    },
                                    "解决方案",
                                    function(){
                                        isOrderCreating=false;
                                        zj.track.tc('tianxieye-308&315jiejuefangan');
                                        page.open("lead315");                        
                                    } 
                                );    
                            }    
                        }else if(msg.indexOf("315:")!=-1&&msg.indexOf("308:")<0){
                            data.flag="315";
                            for(var i = 0; i < len; i++){
                                var name=msgArr[i].split('/')[0].replace("308:","").replace("315:","");
                                nameArr.push(name);
                            }
                            data.name=nameArr.join(",");
                            zjPopup.showConfirm(
                                "乘客【" + data.name + "】未通过身份信息核验，无法直接预订。请查看解决方案。",
                                "取消",
                                function(){
                                    isOrderCreating=false;
                                    zj.track.tc('tianxieye-315quxiao');
                                    location.reload();
                                },
                                "解决方案",
                                function(){
                                    isOrderCreating=false;
                                    zj.track.tc('tianxieye-315jiejuefangan');
                                    page.open("lead315");                        
                                }
                                
                            );
                        }
                        $('.lead315-wrap').html(_.template($('#lead-page').html(), data));
                    }
                },
                complete: function (req, state) {
                    if (state == "timeout") {
                        isOrderCreating=false;
                        verification.abort();
                        fn();
                    }
                    fnFlag=true;
                }
            });
        }
    }


    function submit() {
        //if (getRequest().processRoute != 1) {
        if(isOrderCreating){//防止重复下单
            return;
        }
        isOrderCreating=true;
       
            zj.track.tc("tianxieye-tijiaodingdan");
            if(typeof(getRequest().sectionType)!=="undefined"){zj.track.tc("qujianpiao-tijiaodingdan");}
            //console.log('@此处提交订单按钮');
            var trainno = $("#trainNo").val(),
                fromtype = $("#FromType").val(),
                totype = $("#ToType").val(),
                traveltype = $("#TravelType").val(),
                querykey = $("#QueryKey").val(),
                from = $("#from").val(),
                //phone = $("#phone").val(),
                to = $("#to").val(),
                isIns = appView.insurance.model.get('InsuranceSales'), //是否需要保险
                iswuxu = !appView.insurance.model.get("hotelVoucher").wuxu, //是否需要保险2
                doorstepModel = appView.doorstepView.model.toJSON(),
                isMail = appView.insurance.model.get('needVoucher'), //是否需要邮寄
                mail = appView.insurance.model.get('mailAddress'), //邮寄地址
                personalCustom = appView.customSeatView.model.toJSON(); //私人定制
            var phone;
            zj.trainUser.isLogined(function (isLogined) {
                if (isLogined){
                    var storageUser;
                    if(localStorage.getItem('phoneValidateDataFromCache_key')){
                        storageUser=JSON.parse(localStorage.getItem('phoneValidateDataFromCache_key'));    
                    }
                    phone=storageUser.MobileNo;       
                }else{
                    phone = $("#phone").val();
                }
            })
            var y = [], selectSeat = appView.seats.getSelectItem();
            if (!selectSeat) {
                zjPopup.showDialog("乘车人异常", function () {
                    zj.tool.toIndex();
                });
                isOrderCreating=false;
                return false;
            }
            ORDER.getInstance().passengers = [];
            appView.passengerlist.model.each(function(model) {
                var o = model.attributes;
                var p = {};
                p.Sex = o.sex.toString()||'1';
                p.idCard = o.cardNum;
                p.idType = appView.convertByC(o.cardType.toString());
                p.insurCount = 0;
                p.insurId = "0";
                p.insurPrice = 0;
                p.lid = o.lId;
                p.name = o.name;
                p.needSave = 1;
                p.passenBirthday = o.birth;
                p.passenType = o.ticketType == "3" ? "1" : o.ticketType;
                p.seatClass = selectSeat.get("ticketTypeCn");
                p.ticketPrice = selectSeat.get("price");
                if(p.idCard){
                    ORDER.getInstance().passengers.push(p);
                }
                if (p.passenType == "2") {
                    y.push(true);
                } else {
                    y.push(false);
                }
            }, this);
            
            if (eval(y.join("&&"))) {
                mobileUtil.dialog("儿童不能单独乘车，请您至少添加一名成人乘车人。", "body","","我知道了");
                isOrderCreating=false;
                return false;
            }

            //验证信息是否输入
            if (ORDER.getInstance().passengers.length == 0) {
                mobileUtil.dialog("请添加乘客！", "body");
                isOrderCreating=false;
                return false;
            }

            if (phone == "") {
                mobileUtil.dialog("请输入手机号码！", "body");
                isOrderCreating=false;
                return false;
            }

            //if (phone != "") {
            phone = phone.replace(/\s/g, "");
            if (!/^1[3,4,5,7,8]\d{9}$/i.test(phone)) {
                mobileUtil.dialog("请正确输入手机号码！", "body");
                isOrderCreating=false;
                return false;
            }

            if (phone==="13000000016") {
                mobileUtil.dialog("请输入有效的手机号码！", "body");
                isOrderCreating=false;
                return false;
            }
            //}

            if (isIns == "1" && isMail && JSON.stringify(mail) == "{}") {
                mobileUtil.dialog("若您需要报销凭证，请先填写邮寄地址", "body");
                isOrderCreating=false;
                return false;
            }

            if (appView.customSeatView.model.get('isGao') && (isPer()) && appView.switchSeatView.model.get("seatType") !== "无座") {
                    if (!/\//.test(appView.customSeatView.model.toJSON().CustomizeContent)) {
                        mobileUtil.dialog("您还没有选择座席哦。", 'body', "", "我知道了");
                        isOrderCreating=false;
                        return;
                    }
            }
            if (isPer() && _.isEmpty(doorstepModel.mailAddress)) {
                //mobileUtil.dialog("您的邮寄地址还没有填写哦~","body");
                showToast("您的邮寄地址还没有填写哦~");
                isOrderCreating=false;
                return;
            }
            /*if ((appView.vipGrabView.model.get("checked")) && (/[^a-z|A-Z|0-9|\u4e00-\u9fa5|\s|#|，|。|)|(|,|.|、|（|）]/g.test(doorstepModel.mailAddress.Address))) {
                showToast("邮寄地址中不能含有特殊字符！");
                isOrderCreating=false;
                return;
            }*/
            //中文、英文、数字、# 、，、。、（、）
            if ((isPer()) && (/[^a-z|A-Z|0-9|\u4e00-\u9fa5|\s|#|，|。|)|(|,|.|、|（|）]/g.test(doorstepModel.mailAddress.Address))) {
                showToast("邮寄地址中不能含有特殊字符！");
                isOrderCreating=false;
                return;
            }
            if ((isPer()) && (/[^a-zA-Z\u4e00-\u9fa5]/g.test($.trim(doorstepModel.mailAddress.UserName)))) {
                showToast("用户名只能含有中文或英文!");
                isOrderCreating=false;
                return;
            }
            showLoading();
            //设置联系人信息
            appView.linkerinfo.model.set({
                name: !!appView.linkerinfo.model.get("name") ? appView.linkerinfo.model.get("name") : phone, //$("#phone").val(),
                phone: phone, //$("#phone").val(),
                mail: ""
            });
            StorageHelp.SetStorage("phone", phone);
            //设置所有乘客的保险
            //utilityRailway.getAccountConfigure(function(accountConfigure) {
            //    if(accountConfigure == 0){
            var b = ORDER.getInstance().passengers;

                if (isIns == "1" && iswuxu) {               
                    for (var h in b) {
                        b[h].insurCount = 1;
                        b[h].insurPrice = appView.insurance.model.get("insPri");
                        b[h].insurId = appView.insurance.model.get("InsuranceId");
                    }
                }

            if(appView.vipServiceView.model.get('Switch')&&!appView.vipServiceView.model.get("isClose")){//套餐
                ORDER.getInstance().ComboId = appView.vipServiceView.model.get("serId");
                ORDER.getInstance().ComboName = appView.vipServiceView.model.get("serName");
                ORDER.getInstance().ComboUnitPrice = appView.vipServiceView.model.get("serPrice")||0;
            }
            if($(".onlyChoose .tcui-switch").hasClass("current")){
                if(appView.customSeatView.model.get("CustomizeContents")){
                    ORDER.getInstance().chooseSeats = appView.customSeatView.model.get("CustomizeContent").replace(/\//g, "");
                }else{
                    showToast("您还没有选择座位号哦~");
                    isOrderCreating=false;
                    hideLoading();
                    return;
                }
            }
            //一元免单
            if(appView.activityView.model.get("getfree_isChoose")){
               ORDER.getInstance().FreeOrderPrice = ORDER.getInstance().passengers.length;
            }
            //退改无忧
            if(appView.refundFreeView.model.get("refundFreeIsDefault")){
               ORDER.getInstance().BackChangeFlag = appView.refundFreeView.model.get("refundFreeType");
               ORDER.getInstance().BackChangeId = appView.refundFreeView.model.get("refundFreeId");
            }
            //出发时间
            ORDER.getInstance().departTime = $("#txtTrainDate").val()+" "+$("#startTime").val();
            //套餐标识
            ORDER.getInstance().ValueAddedData={
                    ComboId: {
                        defaultId:appView.vipServiceView.model.get("defaultId")||0,
                        choose:appView.vipServiceView.model.get("serId"),
                        isAccurate:appView.vipServiceView.model.get("IsAccurate")
                    },
                    InsuranceId: {
                        defaultId:appView.insurance.model.get("defaultId") || 0,
                        choose:(isIns == "1" && iswuxu)?appView.insurance.model.get("InsuranceId"):0,
                        isAccurate:0
                    }
            }
            //设置订单邮寄信息
            if (isIns == "1" && isMail && iswuxu) {
                var rec = appView.insurance.model.get('mailAddress');
                ORDER.getInstance().postFee = appView.insurance.model.get('postFee');
                ORDER.getInstance().receipt.Mobile = appView.insurance.model.get('mailAddress').Mobile;
                ORDER.getInstance().receipt.Zip = appView.insurance.model.get('mailAddress').Zip;
                ORDER.getInstance().receipt.UserName = appView.insurance.model.get('mailAddress').name;
                ORDER.getInstance().receipt.Address = appView.insurance.model.get('mailAddress').StreetAddress;
                ORDER.getInstance().receipt.City.Province = appView.insurance.model.get('mailAddress').Province;
                ORDER.getInstance().receipt.City.City = appView.insurance.model.get('mailAddress').City;
                ORDER.getInstance().receipt.City.District = appView.insurance.model.get('mailAddress').Region;
            } else {
                ORDER.getInstance().postFee = 0;
                ORDER.getInstance().receipt = null;
            }

            //送票上门
            if (doorstepModel.isDoorstep == '1') {
                ORDER.getInstance().IsOnlineTicket = 1; // "IsOnlineTicket": 0,                      //是否线上出票 0. 默认 线上出票 1. 线下出票
                ORDER.getInstance().TicketPlatformNo = doorstepModel.TicketPlatformNo;
                ORDER.getInstance().ExpressCode = doorstepModel.mailCompany;
                ORDER.getInstance().postFee = doorstepModel.postFee;
                ORDER.getInstance().ServiceFeeTotal = doorstepModel.ServiceFeeTotal;
                ORDER.getInstance().receipt = doorstepModel.mailAddress;
                ORDER.getInstance().PostType = (isIns == "1" ? 3 : 2); //PostType参数，如果是送票上门，不要保险的传2 送票上门需要保险的传3，
            } else {
                ORDER.getInstance().IsOnlineTicket = 0; // "IsOnlineTicket": 0,                      //是否线上出票 0. 默认 线上出票 1. 线下出票
                ORDER.getInstance().TicketPlatformNo = '0';
                ORDER.getInstance().ExpressCode = '';
                ORDER.getInstance().postFee = 0;
                ORDER.getInstance().ServiceFeeTotal = 0;
                ORDER.getInstance().receipt = null;
                ORDER.getInstance().PostType = '';
            }
            //私人定制
            if (isPer()) {
                if (personalCustom && appView.customSeatView.model.toJSON().seatTypeCn != "无座") {
                    if (appView.customSeatView.model.get('isGao')) {
                        ORDER.getInstance().AcceptOtherSeat = appView.customSeatView.model.toJSON().AcceptOtherSeat;
                        ORDER.getInstance().CustomizeModel = appView.customSeatView.model.toJSON().CustomizeModel;
                        ORDER.getInstance().CustomizeContent = encodeURIComponent(appView.customSeatView.model.toJSON().CustomizeContent);
                    } else {
                        ORDER.getInstance().AcceptOtherSeat = appView.customSeatView.model.toJSON().AcceptOtherSeat;
                        ORDER.getInstance().CustomizeModel = appView.customSeatView.model.toJSON().CustomizeModel;
                        ORDER.getInstance().CustomizeContent = appView.customSeatView.model.toJSON().bujin;
                    }
                }
            }

            //设置订单其他数据
            ORDER.getInstance().contactInfo.name = !appView.linkerinfo.model.get("name") ? phone : appView.linkerinfo.model.get("name");
            ORDER.getInstance().contactInfo.phone = phone;
            ORDER.getInstance().contactInfo.mail = appView.linkerinfo.model.get("mail");
            ORDER.getInstance().trainNo = trainno;
            ORDER.getInstance().StartStationState = fromtype;
            ORDER.getInstance().EndStationState = totype;
            ORDER.getInstance().JourneyType = traveltype;
            ORDER.getInstance().tQueryKey = querykey;
            ORDER.getInstance().fromCityPy = from;
            ORDER.getInstance().toCityPy = to;
            ORDER.getInstance().OrderPlatId = $("#platId").val();
            ORDER.getInstance().ChannelKey = "47595184";
            ORDER.getInstance().MemberAccNo = "";
            ORDER.getInstance().ClientIp = $('#hidden_clientIp').val();
            ORDER.getInstance().AppVision = "V002";
            ORDER.getInstance().AcceptNoSeat = appView.switchSeatView.model.get("isAcceptNo");
            if(decodeURIComponent(getRequest().newSeatType)=='无座')
            ORDER.getInstance().AcceptNoSeat = 1;
            ORDER.getInstance().QdId = zj.tool.getQdid();
            if(appView.vipServiceView.model.get("quId")!=""){
                ORDER.getInstance().recComboGuid = appView.vipServiceView.model.get("quId");
            }
            //酒店代金券
            if((appView.insurance.model.attributes.hotelVoucher.wuxu2 == false) && (appView.insurance.model.attributes.hotelVoucher.SellingPrice>0)){
                ORDER.getInstance().VoucherList  = [{"GiftVoucherId":parseInt(appView.insurance.model.attributes.hotelVoucher.GiftVoucherId),"GiftVoucherPrice":parseInt(appView.insurance.model.attributes.hotelVoucher.SellingPrice)}];
            }
            //次晨达参数
            ORDER.getInstance().ExpressCategory = appView.doorstepView.model.get('expressType');  // 送票到站版本  15:00 增加
            /*
            * 下单时校检活动是否可用
            * */
            function useCoupon(callbock) {
                //包邮
                if (appView.mailVolumeView.model.get('mailb') && appView.mailVolumeView.model.get('visible') && appView.mailVolumeView.model.get('visible2') && (isPer())) {
                    if (appView.customSeatView.model.get("baoyou") && appView.customSeatView.model.get('TAUCardType') == 3) {
                        ORDER.getInstance().UseCardId = appView.customSeatView.model.get('UseCardId');
                        ORDER.getInstance().UseCardType = appView.customSeatView.model.get('TAUCardType');
                        ORDER.getInstance().UseCardMoney = appView.mailVolumeView.model.get('charge');
                    }
                    callbock();
                } else {
                    /*
                     * 校检朋友券是否已经被使用
                     * */
                    var friendCoupon = store.get("IsFriendCoupon");
                    if (!!friendCoupon && 1==2) {
                        vouchers.fetch({
                            dataType: "jsonp",
                            timeout: 30000,
                            data: {
                                openid: getWxObj().openid || getCooperateUser().openid,
                                cardno: friendCoupon.cardno,
                                cardid: friendCoupon.cardid,
                                price: $("#trainPrice").val(),
                                ischeck: 1,
                                timeStamp: new Date().getTime()
                            },
                            success: function (model, data) {
                                hideLoading();
                                if(~~data.mscode == 1){
                                    store.remove("IsFriendCoupon");
                                    mobileUtil.confirm("您的券已被其他好友使用，是否继续预定？", "body", function(){
                                        isOrderCreating=true;
                                        showLoading();
                                        callbock();
                                    },'','继续预订');
                                    isOrderCreating=false;
                                    return ;
                                }
                                if(~~data.mscode == 0){
                                    /*朋友券*/
                                    if (appView.vouchersview.model.get('TAUReduceCost')) {
                                        ORDER.getInstance().UseCardId = data.pcardid;
                                        ORDER.getInstance().UseCardType = appView.vouchersview.model.get('TAUCardType');
                                        ORDER.getInstance().UseCardMoney = appView.vouchersview.model.get('TAUReduceCost');
                                    }
                                }
                                callbock();
                            },
                            error:function(){
                                isOrderCreating=false;
                                callbock();
                            }
                        });
                    } else {                        
                        if (appView.vouchersview.model.get('friendCard')) {
                            var param="&openId="+(getWxObj().openid || getCooperateUser().openid)+"&cardid="+appView.vouchersview.model.get('friendCard').cardid+"&cardno="+appView.vouchersview.model.get('friendCard').cardno+"&price="+$("#trainPrice").val();
                            zj.apiHelper.request("Activity","MarkFriendCard",param,function(isOk,data){
                                if(isOk && data && data.MessageCode=="1000"){
                                    if (appView.vouchersview.model.get('friendCard').cardvalue) {
                                        ORDER.getInstance().UseCardId = data.Data.tauid;
                                        ORDER.getInstance().UseCardType = 2;
                                        ORDER.getInstance().UseCardMoney = appView.vouchersview.model.get('friendCard').cardvalue;
                                    }             
                                    callbock();
                                }else{//被占用                            
                                    hideLoading();
                                    if(appView.vouchersview.model.get('status') && appView.vouchersview.model.get('array').length>0){
                                        zjPopup.showConfirm("代金券已被其他好友使用，是否使用其他代金券预订？","不使用",function(){                                            
                                            zj.track.tc("tianxieye-bushiyongqitadaijinquan");
                                            isOrderCreating=true;
                                            callbock();
                                        },"使用",function(){
                                            isOrderCreating=false;
                                            zj.track.tc("tianxieye-shiyongqitadaijinquan");
                                            appView.vouchersview.model.set('isGetFriendCard',false);
                                            appView.vouchersview.model.set('friendCard',null);
                                            return;
                                        }); 
                                    }else{
                                       zjPopup.showConfirm("代金券已被其他好友使用，是否继续预订？","取消",function(){
                                            zj.track.tc("tianxieye-tankuangquxiaoyuding");
                                            if(appView.vouchersview.model.get('isFromWxCard')){
                                                appView.vouchersview.model.set('isGetFriendCard',false);
                                                appView.vouchersview.model.set('friendCard',null);
                                            }else{
                                                var param="&openId="+getWxObj().openid; 
                                                zj.apiHelper.request("Activity","IsGetFriendCard",param,function(isOk,data){
                                                    if(isOk && data && data.MessageCode=="1000"){
                                                        appView.vouchersview.model.set('friendCard',null);
                                                    }else{
                                                        appView.vouchersview.model.set('isGetFriendCard',false);
                                                        appView.vouchersview.model.set('friendCard',null);
                                                    }
                                                });
                                                
                                            }
                                            isOrderCreating=false;
                                            return;
                                        },"继续预订",function(){
                                            zj.track.tc("tianxieye-tankuangjixuyuding");
                                            callbock();
                                        }); 
                                    }
                                    
                                }
                            });
                        }else{
                            if(appView.vouchersview.model.get('isGetFriendCard') || appView.vouchersview.model.get('isFromWxCard')){
                            }else{
                                /*代金券*/
                                if (appView.vouchersview.model.get('TAUReduceCost')) {
                                    ORDER.getInstance().UseCardId = appView.vouchersview.model.get('TAUId');
                                    ORDER.getInstance().UseCardType = appView.vouchersview.model.get('TAUCardType');
                                    ORDER.getInstance().UseCardMoney = appView.vouchersview.model.get('TAUReduceCost');
                                }
                            }                                
                            callbock();
                        }                    
                    }
                }
            }
            //2015-03-03 新增 平台来源refid
            if (StorageHelp.GetStorage("refid") != "") {
                ORDER.getInstance().SourceRefId = StorageHelp.GetStorage("refid");
            } else if ($.cookie("wxTrainRefId")) {  // 06-02-23
                ORDER.getInstance().SourceRefId = $.cookie("wxTrainRefId");
            }
            var c = WebConfigUrl.PublicInterface; //提交的URL
            //        var mId = 0;
            var timeout = 50000,
                bwu;
            var mId = getWxObj().userid;
            var openId = getWxObj().openid;
            ORDER.getInstance().openId = openId;
            ORDER.getInstance().outUserNo = openId;
            if (openId && openId != "null" && openId != "0" && openId != undefined && openId != "undefined") {
                if (!!mId && mId != "null" && mId != undefined && mId != "undefined" && mId != "0" && mId != "") {
                    /*
                     * 下单前校检活动是否可用
                     * */
                    useCoupon(function(){CreateNewOrder(mId, phone, timeout, bwu)})
                } else {
                    $.ajax({
                        url: "BindWxUser",
                        data: {
                            openid: getWxObj().openid,
                            token: getWxObj().token,
                            mobile: phone,
                            timeStamp: new Date().getTime()
                        },
                        type: "post",
                        dataType: "string",
                        timeout: timeout,
                        beforeSend: function() {
                            bwu = setInterval(function() {
                                timeout -= 1000;
                            }, 1000);
                        },
                        success: function(userid) {
                            clearInterval(bwu);
                            if (userid == "0") {
                                hideLoading();
                                mobileUtil.dialog("会员信息丢失，请重新查询预订", "body", function() {
                                    location.href = WebConfigUrl.wxIndexUrl;
                                });
                                isOrderCreating=false;
                                return;
                            }
                            mId = userid;
                            saveContacts(userid); //微信新用户保存常用旅客到后台
                            // saveContacts(getWxObj().userid);
                            /*
                             * 下单前校检活动是否可用
                             * */
                            useCoupon(function(){CreateNewOrder(userid, phone, timeout, bwu)})
                        },
                        complete: function(req, state) {
                            if (state != "success") {
                                isOrderCreating=false;
                                clearInterval(bwu);
                                mobileUtil.dialog("服务器繁忙，请稍后再试！", "body");
                            }
                        }
                    });
                }
            } else {
                hideLoading();
                mobileUtil.dialog("会员信息丢失，请重新查询预订", "body", function() {
                    isOrderCreating=false;
                    location.href = WebConfigUrl.wxIndexUrl;
                });
            }
        
    }


    function getIsSellAtNight(timeout, backFn) {
        var bwu;
        var data= $.extend({},APICommonHead);   
        $.ajax({
            url: APIUrl+"worktime.html",
            data: {para:JSON.stringify(data)},
            timeout: timeout,
            dataType: "text",
            beforeSend: function () {
                bwu = setInterval(function () {
                    timeout -= 1000
                }, 1000);
            },
            success: function (issell) {
                //issell = 'false'; true 白天
                if (issell && issell.status == 200 && issell.data.iswork == true&& (isPer())){
                    backFn(timeout, issell.data.iswork);
                } else {
                    backFn(timeout, false);
                }
                clearInterval(bwu);
            },
            complete: function (req, state) {
                hideLoading();
                clearInterval(bwu);
                if (state == "error" || state == "timeout") {
                    isOrderCreating=false;
                    mobileUtil.dialog("服务器繁忙，请稍后再试！", "body");
                }
            }

        });
    }

    function toMQProcess(backdata){
        if(!!backdata.ResponseStatus&&backdata.ResponseMessageCode=="5000"){
            msgKey = backdata.ResponseMessageKey;
            showLoading();
            getConRst = setInterval(function(){
                GetConsumeResult(msgKey);
            },1000);
        }else{
            mobileUtil.dialog("提交失败，请稍后重试", "body");
            isOrderCreating=false;
        }
    }

    function GetConsumeResult(msgKey){
         var data=$.extend({},{messageKey:msgKey,flowKey:"CreateOrder",channelKey:'Wechat',timeStamp: new Date().getTime()},APICommonHead);
         var GetConsumeAjax = $.ajax({
            url: getConsumeResultUrl,
            data: {para:JSON.stringify(data)},
            type:"get",
            dataType:"json",
            timeout:20000,
            beforeSend:function(){clearInterval(getConRst);},
            success:function (backdata) {
                if(backdata.status==200){
                    backdata=backdata.data;
                }else{
                    isOrderCreating=false;
                    mobileUtil.dialog("亲，下单失败，请重试！", "body"); 
                    return;
                }
                if(backdata.MessageQueueStatus){
                        TCMemeberCardTrack(backdata.OrderNumber);
                        if(backdata.MessageCode == "10001"){
                            var ulrTrain =location.href;
                            location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri="+encodeURIComponent(ulrTrain)+"&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
                            return;
                        }else if (backdata.MessageCode == "2002" ||
                            backdata.MessageCode == "2007" ||
                            backdata.MessageCode == "2008" ||
                            backdata.MessageCode == "2010" ||
                            backdata.MessageCode == "2011" ||
                            backdata.MessageCode == "2108") {
                            hideLoading();
                            isOrderCreating=false;
                            mobileUtil.dialog(backdata.Message, "body");
                        } else if (backdata.MessageCode == "2004") {
                            var msg = backdata.Message;
                            hideLoading();
                            isOrderCreating=false;
                            mobileUtil.dialog(msg.substring(0, msg.indexOf('首次')) + "<div class='idTip'>" + msg.substring(msg.indexOf('首次'), msg.length) + '</div>', "body");
                        } else if (backdata.MessageCode == "2003" || backdata.MessageCode == "2005" || backdata.MessageCode == "2009") {
                            isOrderCreating=false;
                            hideLoading();
                            mobileUtil.confirm(backdata.Message, "body", function () {
                                //跳转book1
                                location.replace("trainsearch.html?orderNo="+backdata.OrderNumber+"&BeginPlaceCn=" + $('.depStation').html() + "&BeginPlace=" + $('#from').val() + "&ArrPlaceCn=" + $('.arrStation').html() + "&ArrPlace=" + $("#to").val() + "&Time=" + $(".depDate").attr("data-date") + "&filter=&openid=" + (getWxObj().openid) + "&token=" + (getWxObj().token || 0));
                            }, "取消", "重新预订");
                        } else if (backdata.MessageCode == "2006" ||
                            backdata.MessageCode == "2103" ||
                            backdata.MessageCode == "2104" ||
                            backdata.MessageCode == "2105" ||
                            backdata.MessageCode == "2106" ||
                            backdata.MessageCode == "2107") {
                            isOrderCreating=false;
                            hideLoading();
                            if(backdata.MessageCode == "2006" && backdata.Message == "存在重复购票，请确认是否通过其他渠道预订了该车次。"){
                                zjPopup.showDialog(backdata.Message, "知道了");
                            }else{
                                mobileUtil.confirm(backdata.Message, "body", function () {
                                    if(backdata.MessageCode == "2006"){
                                        if(backdata.Message.indexOf("无法重复预订")>-1)
                                        zj.track.tc("tianxieye-chongfuchakandingdan");
                                        else
                                        zj.track.tc("tianxieye-xingchengchongtuchakandingdan");
                                    }
                                    location.replace("TrainOrderDetail.html?orderNo="+backdata.OrderNumber+"&orderId=" + encodeURIComponent(backdata.OrderId) + "&bookerId=" + backdata.EnCodeUID);
                                }, "知道了", "查看详情",function(){
                                    //知道了
                                    if(backdata.MessageCode == "2006"){
                                        if(backdata.Message.indexOf("无法重复预订")>-1)
                                        zj.track.tc("tianxieye-chongfuzhidaole");
                                        else
                                        zj.track.tc("tianxieye-xingchengchongtuzhidaole");
                                    }
                                });
                            }
                            
                        } else if (backdata.MessageCode == "203") {
                            isOrderCreating=false;
                            hideLoading();
                            mobileUtil.confirm("该坐席余票不足，不支持送票上门，您可以选择更换其它坐席或不邮寄。", "body");
                        } else if (backdata.MessageCode == "204") {
                            isOrderCreating=false;
                            hideLoading();
                            mobileUtil.confirm("当前车次距发车时间过近，不支持送票上门，您可以更换其它车次或不邮寄。", "body");
                        } else if (backdata.MessageCode == "205" || backdata.MessageCode == "206") {
                            isOrderCreating=false;
                            hideLoading();
                            mobileUtil.confirm("暂不支持送票上门，您可以选择不邮寄。", "body");
                        } else if(backdata.MessageCode == "2101"){
                            //下单成功...
                            //hideLoading();
                            //PlaceOrderType:  0:白天，先占座后支付         1：夜间          2：白天：先支付后占座
                            //$(".panel-bottom .payTipMsg").html("正在为您核验信息");
                            getVerIdentity = setInterval(function() {
                                        getVerificationIdentity(msgKey,backdata);
                                    },1000);
                        }else {
                            isOrderCreating=false;
                            mobileUtil.confirm(backdata.Message, "body");
                        }
                }else{
                    getConRst = setInterval(function(){
                        GetConsumeResult(msgKey);
                    },1000);
                }
            },
            complete:function(a ,status){
                if(status=='timeout'||status=='error'){
                    //超时,status还有error等值的情况
                    GetConsumeAjax.abort();
                    hideLoading();
                    mobileUtil.confirm("亲，网络异常，本次订单提交失败！您可以选择重新提交。","body",submit);
                }
            }
        })
    }

     /**
     * [getVerificationIdentity 轮询身份核验]
     * @param  {[type]} msgKey    [msgkey]
     * @return {[type]}
     */
    function getVerificationIdentity(msgKey,backdata) {
        var data=$.extend({},{messageKey:msgKey,flowKey:"VerificationIdentity",channelKey:'Wechat',timeStamp: new Date().getTime()},APICommonHead);
        var verification = $.ajax({
            url: getConsumeResultUrl,
            data: {para:JSON.stringify(data)},
            type:"get",
            dataType:"json",
            timeout:20000,
            beforeSend:function(){clearInterval(getVerIdentity);},
            success:function(data){
                if(data.status==200){
                    data=data.data;
                }else{
                    isOrderCreating=false;
                    mobileUtil.dialog("亲，下单失败，请重试！", "body"); 
                    return;
                }
                if(data.MessageQueueStatus){
                    if(data.MessageCode=="2001"){
                        if(data.PlaceOrderType!="0"){                           
                           if(data.PlaceOrderType=="1"){
                                hideLoading();
                                mobileUtil.dialog("夜间下单（23点至次日6点），付款成功后，系统将在次日6点为您排队购票，8点前短信或微信通知出票结果。", "body", function() {
                                    location.replace(WebConfigUrl.PayUrl + "?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                                });
                           }else{
                                location.replace("TrainPay.html?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                           }
                        }else{
                            getHoldSeatRst = setInterval(function(){
                                getHoldingSeat(msgKey,backdata);
                            },1000);
                        }
                    }else if(data.MessageCode=="3001"){
                        hideLoading();
                        //blf 16/5/27
                        data.privateTip=appView.entrance12306View.model.get('activityIconStr');
                        var msg=data.Message,
                            msgArr=msg.split("；"),
                            msgLen=msgArr.length,
                            disabled=appView.entrance12306View.model.get('disabled'),
                            privateDisabled=appView.entrance12306View.model.get('privateDisabled');
                        msgArr.splice(msgLen-1,1);
                        var len=msgArr.length, 
                            nameArr=[],
                            nameArr2=[];
                        data.disabled=disabled;
                        data.privateDisabled=privateDisabled;
                        if((msg.indexOf("308:")!=-1&&msg.indexOf("315:")<0)||(msg.indexOf("308:")!=-1&&msg.indexOf("315:")!=-1)){
                            data.flag="308";
                            if(msg.indexOf("308:")!=-1&&msg.indexOf("315:")<0){
                                for(var i = 0; i < len; i++){
                                    var name=msgArr[i].split('/')[0].replace("308:","").replace("315:","");
                                    nameArr.push(name);
                                }
                                data.name=nameArr.join(",");
                                zjPopup.showConfirm(
                                    "乘客【" + data.name + "】未办理实名制身份核验，无法直接预订。请查看解决方案。",
                                    "取消",
                                    function(){
                                        isOrderCreating=false;
                                        zj.track.tc('tianxieye-308quxiao');
                                        location.reload();
                                    },
                                    "解决方案",
                                    function(){
                                        isOrderCreating=false;
                                        zj.track.tc('tianxieye-308jiejuefangan');
                                        page.open("lead315");                        
                                    } 
                                );    
                            }else{
                                for(var i = 0; i < len; i++){
                                    if(msgArr[i].indexOf("308:")!=-1){
                                        var name=msgArr[i].replace("308:","");
                                        nameArr.push(name);    
                                    }
                                    if(msgArr[i].indexOf("315:")!=-1){
                                        var name2=msgArr[i].replace("315:","");
                                        nameArr2.push(name2);    
                                    }
                                }
                                data.name308=nameArr.join(",");
                                data.name315=nameArr2.join(",");
                                zjPopup.showConfirm(
                                    "乘客【" + data.name308 + "】未办理实名制身份核验，乘客【" + data.name315 + "】未通过身份信息核验，无法直接预订。请查看解决方案。",
                                    "取消",
                                    function(){
                                        isOrderCreating=false;
                                        zj.track.tc('tianxieye-308&315quxiao');
                                        location.reload();
                                    },
                                    "解决方案",
                                    function(){
                                        isOrderCreating=false;
                                        zj.track.tc('tianxieye-308&315jiejuefangan');
                                        page.open("lead315");                        
                                    } 
                                );    
                            }    
                        }else if(msg.indexOf("315:")!=-1&&msg.indexOf("308:")<0){
                            data.flag="315";
                            for(var i = 0; i < len; i++){
                                var name=msgArr[i].split('/')[0].replace("308:","").replace("315:","");
                                nameArr.push(name);
                            }
                            data.name=nameArr.join(",");
                            zjPopup.showConfirm(
                                "乘客【" + data.name + "】未通过身份信息核验，无法直接预订。请查看解决方案。",
                                "取消",
                                function(){
                                    isOrderCreating=false;
                                    zj.track.tc('tianxieye-315quxiao');
                                    location.reload();
                                },
                                "解决方案",
                                function(){
                                    isOrderCreating=false;
                                    zj.track.tc('tianxieye-315jiejuefangan');
                                    page.open("lead315");                        
                                }
                                
                            );
                        }
                        $('.lead315-wrap').html(_.template($('#lead-page').html(), data));                        
                    }else{
                        hideLoading();
                        mobileUtil.dialog(data.Message, "body");
                    }
                }else{
                    getVerIdentity = setInterval(function() {
                        getVerificationIdentity(msgKey,backdata);
                    },1000);
                }
            },
            complete:function(req,state){
                if(state=="timeout"){
                    verification.abort();
                    hideLoading();
                    mobileUtil.confirm("提交失败，请稍后重试。","body");
                }
            }
        });
    }

    //占座
    function getHoldingSeat(msgKey,backdata) {
        //调用占座接口
        var data=$.extend({},{messageKey:msgKey,flowKey:"HoldSeat",channelKey:'Wechat',timeStamp: new Date().getTime()},APICommonHead);
        var holdSeatAjax =  $.ajax({
            url: getConsumeResultUrl,
            data: {para:JSON.stringify(data)},
            type:"get",
            dataType:"json",
            timeout:20000,
            beforeSend:function(){clearInterval(getHoldSeatRst);},
            success:function (data) {
                if(data.status==200){
                    data=data.data;
                }else{
                    mobileUtil.dialog("亲，下单失败，请重试！", "body"); 
                    return;
                }
                if(data.MessageQueueStatus){
                    hideLoading();
                    if(data.MessageCode == "2003"||
                        data.MessageCode == "2004"||
                        data.MessageCode == "2006"||
                        data.MessageCode == "2007"||
                        data.MessageCode == "2011"){
                        isOrderCreating=false;
                        mobileUtil.dialog(data.Message,"body");
                    }else if(data.MessageCode == "2001"||data.MessageCode == "2002"||data.MessageCode == "2005"){
                        isOrderCreating=false;
                        mobileUtil.confirm(data.Message,"body",function(){
                            location.replace("trainsearch.html?BeginPlaceCn=" + $('.depStation').html() + "&BeginPlace=" + $('#from').val() + "&ArrPlaceCn=" + $('.arrStation').html() + "&ArrPlace=" + $("#to").val() + "&Time=" + $(".depDate").attr("data-date") + "&filter=&openid=" + (getWxObj().openid) + "&token=" + (getWxObj().token || 0));
                        },"取消","重新预订");
                    }else if(data.MessageCode == "2008"||data.MessageCode == "2009"||data.MessageCode == "2010"){
                        isOrderCreating=false;
                        mobileUtil.confirm(data.Message, "body", function () {
                            location.replace(WebConfigUrl.PayUrl + "?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                        }, "查看详情", "确定", function () {
                            location.replace("TrainOrderDetail.html?orderNo="+backdata.OrderNumber+"&orderId=" + encodeURIComponent(backdata.OrderId) + "&bookerId=" + backdata.EnCodeUID);
                        });
                    }else if(data.MessageCode == "1001"){
                        location.replace(WebConfigUrl.PayUrl + "?orderNo="+backdata.OrderNumber+"&OrderId=" + backdata.OrderId + "&userid=" + backdata.EnCodeUID);
                    }else if(data.MessageCode == "2012"){
                        location.replace("TrainOrderDetail.html?orderNo="+backdata.OrderNumber+"&orderId=" + encodeURIComponent(backdata.OrderId) + "&bookerId=" + backdata.EnCodeUID);
                    }else{
                        isOrderCreating=false;
                        mobileUtil.dialog(data.Message,"body");
                    }
                }else{
                    getHoldSeatRst = setInterval(function(){
                        getHoldingSeat(msgKey,backdata);
                    },1000);
                }

            },
            complete:function(req,state){
                if(state=="timeout"){
                    hideMsgLoading();
                    holdSeatAjax.abort();
                    mobileUtil.dialog("亲，很抱歉，铁路售票系统忙碌哦！您可以前往订单中心跟踪占座结果。", "body", function () {
                        location.replace("TrainOrderDetail.html?orderNo="+backdata.OrderNumber+"&orderId=" + encodeURIComponent(backdata.OrderId) + "&bookerId=" + backdata.EnCodeUID);
                    });
                }
            }
        });
    }


    var ORDER = (function () {
        var unique;
        function getInstance() { if (unique === undefined) { unique = new Construct(); } return unique; }
        var recinfo;
        function getReceipt() { if (recinfo === undefined) { recinfo = new receipt(); } return recinfo; }
        //联系人
        function contact() { this.name = ""; this.phone = ""; this.mail = ""; }
        //邮寄地址
        function city() { this.Province = ""; this.City = ""; this.District = ""; }
        //乘客对象
        function passenger() { this.passenType = ""; this.name = ""; this.idType = ""; this.idCard = ""; this.passenBirthday = ""; this.insurCount = 0; this.insurPrice = 0; this.insurId = "0"; this.Sex = "1"; this.needSave = 1; this.lid = ""; this.seatClass = ""; this.ticketPrice = ""; }
        //邮寄信息
        function receipt() { this.Zip = ""; this.Mobile = ""; this.UserName = ""; this.Address = ""; this.City = new city(); }
        //订单构造器
        function Construct() {
            this.UseCardId = 0; this.UseCardMoney = ''; this.MothedName = "bookorderfortouch"; this.MothedVersion = "V1.0.1"; this.PlaceOrderForNight = "0"; this.MemberAccNo = ""; this.EndStationState = ""; this.JourneyType = "单程"; this.StartStationState = 1; this.memberId = ""; this.openId = ""; this.OrderPlatId = "5"; this.ChannelKey = "0"; this.ClientIp = ""; this.tQueryKey = ""; this.trainNo = ""; this.postFee = 0; this.fromCityPy = ""; this.toCityPy = ""; this.contactInfo = new contact(); this.receipt = new receipt(); this.passengers = []; this.IsOnlineTicket = 0;
            this.UserName = "";
            this.PassWord = "";
        }
        
            return { getInstance: getInstance, getPassenger: function () { return new passenger() }}
        
    })();


    return submit;

});
