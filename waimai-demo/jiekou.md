swagger
api_key
Explore
Api Documentation
Api Documentation
Apache 2.0
订单 : Order Controller Show/Hide List Operations Expand Operations
POST /tob/wechat/business/order/addOrModfiyDeliveryAddress 收获地址新增、修改
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": [
    {
        "buildingId": 0,
        "contactNumber": "string",
        "contacts": "string",
        "createTime": "2017-05-08T02:40:27.209Z",
        "createdBy": "string",
        "defaultFlag": 0,
        "floor": "string",
        "id": 0,
        "merchantId": 0,
        "room": "string",
        "sex": 0,
        "status": 0,
        "updateTime": "2017-05-08T02:40:27.209Z",
        "updatedBy": "string"
    }
]
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
deliveryAddress
{
    "buildingId": 0,
    "contactNumber": "string",
    "contacts": "string",
    "createTime": "2017-05-08T02:40:27.201Z",
    "createdBy": "string",
    "defaultFlag": 0,
    "floor": "string",
    "id": 0,
    "merchantId": 0,
    "room": "string",
    "sex": 0,
    "status": 0,
    "updateTime": "2017-05-08T02:40:27.201Z",
    "updatedBy": "string"
}

Parameter content type:
    deliveryAddress
body
ModelModel Schema
{
    "buildingId": 0,
    "contactNumber": "string",
    "contacts": "string",
    "createTime": "2017-05-08T02:40:27.201Z",
    "createdBy": "string",
    "defaultFlag": 0,
    "floor": "string",
    "id": 0,
    "merchantId": 0,
    "room": "string",
    "sex": 0,
    "status": 0,
    "updateTime": "2017-05-08T02:40:27.201Z",
    "updatedBy": "string"
}
Click to set as parameter value
Response Messages
HTTP Status Code	Reason	Response Model	Headers
201
Created
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    POST /tob/wechat/business/order/cancle 订单取消
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": "string"
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
dto
(required)

Parameter content type:
    dto
body
ModelModel Schema
{
    "createTime": "2017-05-08T02:40:27.201Z",
    "createdBy": "string",
    "orderId": 0,
    "updateTime": "2017-05-08T02:40:27.201Z",
    "updatedBy": "string"
}
Click to set as parameter value
Response Messages
HTTP Status Code	Reason	Response Model	Headers
201
Created
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    POST /tob/wechat/business/order/commentOrder 评价
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": "string"
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
dto
(required)

Parameter content type:
    dto
body
ModelModel Schema
{
    "comment": {
    "descs": "string",
        "id": 0,
        "merchantId": 0,
        "orderId": 0,
        "start": 0
},
    "tags": [
    {
        "id": 0,
        "name": "string"
    }
]
}
Click to set as parameter value
Response Messages
HTTP Status Code	Reason	Response Model	Headers
201
Created
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    POST /tob/wechat/business/order/deliveryAddressList 收获地址列表
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": [
    {
        "buildingId": 0,
        "contactNumber": "string",
        "contacts": "string",
        "createTime": "2017-05-08T02:40:27.225Z",
        "createdBy": "string",
        "defaultFlag": 0,
        "floor": "string",
        "id": 0,
        "merchantId": 0,
        "room": "string",
        "sex": 0,
        "status": 0,
        "updateTime": "2017-05-08T02:40:27.225Z",
        "updatedBy": "string"
    }
]
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
dto
(required)

Parameter content type:
    dto
body
ModelModel Schema
{
    "buildingId": 0,
    "createTime": "2017-05-08T02:40:27.201Z",
    "createdBy": "string",
    "updateTime": "2017-05-08T02:40:27.201Z",
    "updatedBy": "string"
}
Click to set as parameter value
Response Messages
HTTP Status Code	Reason	Response Model	Headers
201
Created
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    POST /tob/wechat/business/order/initOrder 前往确认订单页面
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": {
    "commonDoorFee": 0,
        "deliveryAddress": {
        "buildingId": 0,
            "contactNumber": "string",
            "contacts": "string",
            "createTime": "2017-05-08T02:40:27.230Z",
            "createdBy": "string",
            "defaultFlag": 0,
            "floor": "string",
            "id": 0,
            "merchantId": 0,
            "room": "string",
            "sex": 0,
            "status": 0,
            "updateTime": "2017-05-08T02:40:27.230Z",
            "updatedBy": "string"
    },
    "foodTimeEnd": "string",
        "foodTimeStart": "string",
        "hasFirstOrder": true,
        "jian": 0,
        "man": 0,
        "salesCouponDetails": [
        {
            "batchId": "string",
            "coupon": {
                "circulationMax": 0,
                "comment": "string",
                "couponCode": "string",
                "createTime": "2017-05-08T02:40:27.230Z",
                "createdBy": "string",
                "fromTime": "2017-05-08T02:40:27.230Z",
                "fromTimeShow": "string",
                "id": 0,
                "name": "string",
                "receiveNum": 0,
                "status": 0,
                "statusForShown": "string",
                "toTime": "2017-05-08T02:40:27.230Z",
                "toTimeShow": "string",
                "updateTime": "2017-05-08T02:40:27.230Z",
                "updatedBy": "string",
                "useSituation": 0,
                "validity": 0
            },
            "createTime": "2017-05-08T02:40:27.230Z",
            "createdBy": "string",
            "merchant": {
                "createTime": "2017-05-08T02:40:27.231Z",
                "createdBy": "string",
                "id": 0,
                "name": "string",
                "openid": "string",
                "status": "string",
                "updateTime": "2017-05-08T02:40:27.231Z",
                "updatedBy": "string",
                "userInfo": "string"
            },
            "orderId": "string",
            "receiveTime": "2017-05-08T02:40:27.231Z",
            "salesCouponDetailId": 0,
            "status": "string",
            "updateTime": "2017-05-08T02:40:27.231Z",
            "updatedBy": "string",
            "useTime": "2017-05-08T02:40:27.231Z"
        }
    ],
        "selfTake": true,
        "selfTakeFee": 0
}
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
dto
(required)

Parameter content type:
    dto
body
ModelModel Schema
{
    "buildingId": 0,
    "createTime": "2017-05-08T02:40:27.201Z",
    "createdBy": "string",
    "updateTime": "2017-05-08T02:40:27.202Z",
    "updatedBy": "string"
}
Click to set as parameter value
Response Messages
HTTP Status Code	Reason	Response Model	Headers
201
Created
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    POST /tob/wechat/business/order/myOrder 我的订单
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": [
    {
        "actualPrice": 0,
        "code": "string",
        "consigneeName": "string",
        "consigneePhonenum": "string",
        "createTime": "2017-05-08T02:40:27.237Z",
        "deliveryAddress": "string",
        "details": [
            {
                "actualPrice": 0,
                "actualProductNum": 0,
                "actualProductWeight": 0,
                "head": "string",
                "icon": "string",
                "name": "string",
                "productId": 0,
                "productMode": "string",
                "productNum": 0,
                "productPrice": 0,
                "productTotalPrice": 0,
                "productUnitPrice": 0,
                "productWeight": 0,
                "type": 0,
                "unit": "string"
            }
        ],
        "id": 0,
        "merchantName": "string",
        "orderRemark": "string",
        "paymentAmount": 0,
        "paymentStatus": 0,
        "price": 0,
        "receiverTime": "2017-05-08T02:40:27.238Z",
        "status": 0,
        "statusShowName": "string",
        "totalActualPrice": 0
    }
]
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
pageable

Parameter content type:
    pageable
body	Pageable
paymentStatus

Parameter content type:
    paymentStatus
body	integer
Response Messages
HTTP Status Code	Reason	Response Model	Headers
201
Created
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    POST /tob/wechat/business/order/orderDetail 订单详情
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": {
    "actualProductNum": 0,
        "createTime": "2017-05-08T02:40:27.243Z",
        "createdBy": "string",
        "id": 0,
        "merchantId": 0,
        "order": {
        "code": "string",
            "createTime": "2017-05-08T02:40:27.243Z",
            "createTimeShow": "string",
            "createTimeStr": "string",
            "createdBy": "string",
            "deliveryAddressId": 0,
            "id": 0,
            "merchant": {
            "createTime": "2017-05-08T02:40:27.243Z",
                "createdBy": "string",
                "id": 0,
                "name": "string",
                "openid": "string",
                "status": "string",
                "updateTime": "2017-05-08T02:40:27.243Z",
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
            "receiverTime": "2017-05-08T02:40:27.243Z",
            "receiverTimeShow": "string",
            "status": 0,
            "statusShowName": "string",
            "updateTime": "2017-05-08T02:40:27.243Z",
            "updatedBy": "string"
    },
    "orderId": 0,
        "price": 0,
        "product": {
        "categoryId": "string",
            "categoryIdStr": "string",
            "cost": 0,
            "createTime": "2017-05-08T02:40:27.243Z",
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
            "updateTime": "2017-05-08T02:40:27.243Z",
            "updatedBy": "string"
    },
    "productId": 0,
        "productNum": 0,
        "remark": "string",
        "returnPrice": 0,
        "returnProductNum": 0,
        "returnReason": "string",
        "updateTime": "2017-05-08T02:40:27.250Z",
        "updatedBy": "string"
}
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
orderId

Parameter content type:
    orderId
body	long
Response Messages
HTTP Status Code	Reason	Response Model	Headers
201
Created
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    POST /tob/wechat/business/order/recharge 微信充值
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": {
    "appId": "string",
        "nonceStr": "string",
        "packageStr": "string",
        "paySign": "string",
        "signType": "string",
        "signature": "string",
        "timeStamp": "string"
}
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
dto
(required)

Parameter content type:
    dto
body
ModelModel Schema
{
    "amount": 0,
    "currUrl": "string",
    "jsapiTicket": "string",
    "openId": "string",
    "type": "string"
}
Click to set as parameter value
Response Messages
HTTP Status Code	Reason	Response Model	Headers
201
Created
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    POST /tob/wechat/business/order/submit 订单提交
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": {
    "code": "string",
        "createTime": "2017-05-08T02:40:27.257Z",
        "createTimeShow": "string",
        "createTimeStr": "string",
        "createdBy": "string",
        "deliveryAddressId": 0,
        "id": 0,
        "merchant": {
        "createTime": "2017-05-08T02:40:27.257Z",
            "createdBy": "string",
            "id": 0,
            "name": "string",
            "openid": "string",
            "status": "string",
            "updateTime": "2017-05-08T02:40:27.257Z",
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
        "receiverTime": "2017-05-08T02:40:27.257Z",
        "receiverTimeShow": "string",
        "status": 0,
        "statusShowName": "string",
        "updateTime": "2017-05-08T02:40:27.257Z",
        "updatedBy": "string"
}
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
dto
(required)

Parameter content type:
    dto
body
ModelModel Schema
{
    "activityFlag": 0,
    "buildingId": 0,
    "commonDoorFlag": true,
    "createTime": "2017-05-08T02:40:27.202Z",
    "createdBy": "string",
    "deliveryAddressId": 0,
    "orderRemark": "string",
    "paymentType": 0,
    "products": [
    {
        "counts": 0,
        "id": 0
    }
],
    "receiverTime": "string",
    "salesCouponDetailId": 0,
    "updateTime": "2017-05-08T02:40:27.202Z",
    "updatedBy": "string"
}
Click to set as parameter value
Response Messages
HTTP Status Code	Reason	Response Model	Headers
201
Created
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    district-controller : District Controller Show/Hide List Operations Expand Operations
merchant-controller : Merchant Controller Show/Hide List Operations Expand Operations
trading-area-controller : Trading Area Controller Show/Hide List Operations Expand Operations
    [ base url: / , api version: 1.0 ]






swagger
api_key
Explore
Api Documentation
Api Documentation
Apache 2.0
客户 : User Controller Show/Hide List Operations Expand Operations
GET /tob/wechat/user/info 我的
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": {
    "balance": 0,
        "icon": "string",
        "kefu": "string",
        "nickName": "string"
}
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
loginDto
(required)

Parameter content type:
    loginDto
body
ModelModel Schema
{
    "latitude": 0,
    "longitude": 0,
    "openid": "string",
    "userInfo": {}
}
Click to set as parameter value
request

Parameter content type:
    request
body	HttpServletRequest
Response Messages
HTTP Status Code	Reason	Response Model	Headers
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    POST /tob/wechat/user/login 登陆
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": {
    "buildingList": [
        {
            "commonDoorTimeEnd": "string",
            "commonDoorTimeStart": "string",
            "createTime": "2017-05-08T03:29:28.052Z",
            "createdBy": "string",
            "id": 0,
            "latitude": 0,
            "longitude": 0,
            "name": "string",
            "selfTakeTimeEnd": "string",
            "selfTakeTimeStart": "string",
            "status": 0,
            "statusForShown": "string",
            "tradingArea": {
                "commonDoorFee": 0,
                "createTime": "2017-05-08T03:29:28.053Z",
                "createdBy": "string",
                "foodTimeEnd": "string",
                "foodTimeStart": "string",
                "id": 0,
                "name": "string",
                "selfGetAddress": "string",
                "selfTake": true,
                "selfTakeFee": 0,
                "selfTakeShowName": "string",
                "status": 0,
                "statusForShown": "string",
                "theater": {
                    "commonDoorFee": 0,
                    "createTime": "2017-05-08T03:29:28.053Z",
                    "createdBy": "string",
                    "foodTimeEnd": "string",
                    "foodTimeStart": "string",
                    "id": 0,
                    "name": "string",
                    "selfTake": true,
                    "selfTakeFee": 0,
                    "selfTakeShowName": "string",
                    "status": 0,
                    "statusForShown": "string",
                    "updateTime": "2017-05-08T03:29:28.053Z",
                    "updatedBy": "string",
                    "userId": 0
                },
                "theaterId": 0,
                "updateTime": "2017-05-08T03:29:28.053Z",
                "updatedBy": "string"
            },
            "tradingAreaId": 0,
            "updateTime": "2017-05-08T03:29:28.053Z",
            "updatedBy": "string",
            "userId": 0
        }
    ],
        "deliveryAddresses": [
        {
            "buildingId": 0,
            "contactNumber": "string",
            "contacts": "string",
            "createTime": "2017-05-08T03:29:28.053Z",
            "createdBy": "string",
            "defaultFlag": 0,
            "floor": "string",
            "id": 0,
            "merchantId": 0,
            "room": "string",
            "sex": 0,
            "status": 0,
            "updateTime": "2017-05-08T03:29:28.053Z",
            "updatedBy": "string"
        }
    ],
        "productList": [
        {
            "categoryId": "string",
            "categoryIdStr": "string",
            "cost": 0,
            "createTime": "2017-05-08T03:29:28.053Z",
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
            "updateTime": "2017-05-08T03:29:28.053Z",
            "updatedBy": "string"
        }
    ],
        "token": "string"
}
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
loginDto
(required)

Parameter content type:
    loginDto
body
ModelModel Schema
{
    "latitude": 0,
    "longitude": 0,
    "openid": "string",
    "userInfo": {}
}
Click to set as parameter value
request

Parameter content type:
    request
body	HttpServletRequest
Response Messages
HTTP Status Code	Reason	Response Model	Headers
201
Created
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    GET /tob/wechat/user/myCoupon 我的优惠券
Response Class (Status 200)
OK
ModelModel Schema
{
    "message": "string",
    "target": [
    {
        "batchId": "string",
        "coupon": {
            "circulationMax": 0,
            "comment": "string",
            "couponCode": "string",
            "createTime": "2017-05-08T03:29:28.059Z",
            "createdBy": "string",
            "fromTime": "2017-05-08T03:29:28.059Z",
            "fromTimeShow": "string",
            "id": 0,
            "name": "string",
            "receiveNum": 0,
            "status": 0,
            "statusForShown": "string",
            "toTime": "2017-05-08T03:29:28.059Z",
            "toTimeShow": "string",
            "updateTime": "2017-05-08T03:29:28.059Z",
            "updatedBy": "string",
            "useSituation": 0,
            "validity": 0
        },
        "createTime": "2017-05-08T03:29:28.059Z",
        "createdBy": "string",
        "merchant": {
            "createTime": "2017-05-08T03:29:28.059Z",
            "createdBy": "string",
            "id": 0,
            "name": "string",
            "openid": "string",
            "status": "string",
            "updateTime": "2017-05-08T03:29:28.059Z",
            "updatedBy": "string",
            "userInfo": "string"
        },
        "orderId": "string",
        "receiveTime": "2017-05-08T03:29:28.059Z",
        "salesCouponDetailId": 0,
        "status": "string",
        "updateTime": "2017-05-08T03:29:28.059Z",
        "updatedBy": "string",
        "useTime": "2017-05-08T03:29:28.059Z"
    }
]
}

Response Content Type
Parameters
Parameter	Value	Description	Parameter Type	Data Type
loginDto
(required)

Parameter content type:
    loginDto
body
ModelModel Schema
{
    "latitude": 0,
    "longitude": 0,
    "openid": "string",
    "userInfo": {}
}
Click to set as parameter value
request

Parameter content type:
    request
body	HttpServletRequest
Response Messages
HTTP Status Code	Reason	Response Model	Headers
401
Unauthorized
403
Forbidden
404
Not Found
Try it out!
    role-api-controller : Role Api Controller Show/Hide List Operations Expand Operations
user-api-controller : User Api Controller Show/Hide List Operations Expand Operations
    [ base url: / , api version: 1.0 ]