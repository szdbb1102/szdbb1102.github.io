var index = {
	init:function () {
		this.settings(true,5);
		this.dataOptions();
		this.rightOptions();	
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
	"someLibFunction":{
		buildContent:function (data) {//生成内容
				
		},
		getNewArr:function (arr,num,flag) {//获取想要的数据，flag=1向前，2向后，3乱序
			
		},
		setIfLocal:function (flag) {// 是否本地存储
			
		}
		

	}
	// 一些常用的函数库


}

index.init();