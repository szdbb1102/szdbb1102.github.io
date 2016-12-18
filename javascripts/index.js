var xxindex = {
	init:function () {
		// this.settings(true,5);
		this.dataOptions();
		this.rightOptions();	
		this.eventBind();
	},
	// 初始化
	rightOptions:function () {
		
	},
	// 右侧与顶部菜单栏相应操作
	settings:function (ifLocal,initNum) {
		this.someLibFunction.setIfLocal(ifLocal);
		this.someLibFunction.setShowNum(initNum)
	},
	//配置操作
	dataOptions: function () {
		
	},	
	// 数据相关操作
	eventBind:function (argument) {
		$("#addItmBtn").click(function () {
			xxindex.someDomOptions.showAddTip($("#addTip"))
		});
		$("#addTip .btn-close").click(function () {
			xxindex.someDomOptions.closeAddTip($("#addTip"))
		});

			
	},
	// 事件绑定
	"someLibFunction":{
		buildContent:function (data) {//生成内容
			var html = "";
			for (var i = 0; i < data.length; i++) {
				var obj = data[i];
				html +='<div class="item" attr="'+obj.index+'">\
				            <div class="item-avatar">\
				              <img src="images/319.png"></div>\
				            <div class="item-title">问题</div>\
				            <div class="item-btn">点击编辑</div>\
				            <div class="item-cont item-ques">'+obj.ques+'</div>\
				            <div class="item-cont item-answ none">'+obj.answ+'</div>\
			            </div>';
			}
			$(".addItmBtnWrap").before(html);
		},
		getNewArr:function (arr,num,flag) {//获取想要的数据，flag=1向前，2向后，3乱序
			
		},
		setIfLocal:function (flag) {// 是否本地存储
			
		},
		addNewlib:function (name,data) {//添加新库	
			// body...
		},
		addNewItem:function (data,libName) {//添加新问题
			// body...
		},
		editItem:function(data,libName){//编辑问题

		}

	},
	// 一些常用的函数库
	"someDomOptions":{
		showAddTip:function (IdObj) {
			IdObj.show();
		},
		// 展示弹窗
		closeAddTip:function (IdObj) {
			IdObj.hide();
		},
	}
	//dom操作的函数


}
$(function (argument) {
	xxindex.init();	
	var data = [
		{
			"index":0,
			"ques":"问题1",
			"answ":"答案1"
		},
		{
			"index":1,
			"ques":"问题2",
			"answ":"答案2"

		}
	];
	xxindex.someLibFunction.buildContent(data);
})
