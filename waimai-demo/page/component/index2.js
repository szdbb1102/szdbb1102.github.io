import dishes from './resources/json/dish.js'
Page({
    data:{
        text:"Page main",
        background: [
            {
                color:'green',
                sort:1
            },
            {
                color:'red',
                sort:2
            },
            {
                color:'yellow',
                sort:3
            }
        ],
        adds: [
          {name:'',color:'#6A5ACD'},
          {name:'',color:'#EE82EE'},
          {name:'',color:'#ADFF2F'}
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        toView: 'blue',
        'dishes':dishes,
        selectedMenuId:1,
        total:{
            count:0,
            money:0
        }
    },
    getLocation: function () {
    var that = this
        wx.getLocation({
          success: function (res) {
            console.log(res)
            that.setData({
              // hasLocation: '时代广场',
                hasLocation: '选择站点',
              // location: formatLocation(res.longitude, res.latitude)
            })
          },
          fail:function () {
              that.setData({
              hasLocation: '选择站点',
              // location: formatLocation(res.longitude, res.latitude)
              })
          }
        })
    },
    chooseZhanDian:function (event) {
        console.log('选择站点')
        let data = event.currentTarget.dataset
        if(data.haslocation=='选择站点'){
            wx.navigateTo({
            url: '../other/other'
        })
        }
    },
    selectMenu:function(event){
        let data = event.currentTarget.dataset
        this.setData({
            toView: data.tag,
            selectedMenuId: data.id
        })
        // this.data.toView = 'red'
    },
    addCount:function(event){
        let data = event.currentTarget.dataset
        let total = this.data.total
        let dishAll = this.data.dishes
        let dishCur = dishAll.find(function(v){
            return v.id == data.id
        })
        dishCur.count += 1;
        total.count += 1
        total.money += dishCur.price
        this.setData({
            'dishes':dishAll,
            'total':total
        })
    },
    minusCount:function(event){
        let data  = event.currentTarget.dataset
        let total = this.data.total
        let dishAll = this.data.dishes
        let dishCur = dishAll.find(function(v){
            return v.id == data.id
        })
        if(dishCur.count <= 0)
            return
        dishCur.count -= 1;
        total.count -= 1
        total.money -= dishCur.price
        this.setData({
            'dishes':dishAll,
            'total':total
        })
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
        interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady:function(){
        // 页面渲染完成
        this.getLocation()
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