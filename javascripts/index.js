var xxindex = {
	"params":{
		"list":["moren"],
		lib:{
			"moren":[
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
			]
		},
		"ifLocal":true,
		"morenLib":"moren"
	},
	init:function () {
		// this.settings(true,5);
		this.dataOptions();
		this.rightOptions();	
		this.eventBind();
		this.someDomOptions.showList();
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
		$('.listAddFrame .btn').click(function(event) {
			if ($(".listAddFrame input").val()!="") {
				$("#listName").text($(".listAddFrame input").val());
				xxindex.someLibFunction.addNewlib($(".listAddFrame input").val(),[]);
			}
		});
		$(".setting .sort").click(function (argument) {
			var arrNow  = xxindex.params.lib[$("#listName").text()].slice(0);	
			var data = xxindex.someLibFunction.dataSort($(this).attr("sort"),arrNow);
			xxindex.someLibFunction.buildContent(data);
		});
		$("#addTip .btn-true").click(function (argument) {
			var flag = $(this).attr('edit');
			var quesStr = $("#addTip textarea").eq(0).val();
			var answStr = $("#addTip textarea").eq(1).val();
 			if (flag=="true"&&quesStr!=""&&answStr!="") {
 				var obj ={
					"ques":quesStr,
					"answ":answStr,
					"index":$(this).attr('nowIndex'),
					"ifGet":false
				}
				xxindex.params.lib[$("#listName").text()][$(this).attr('nowIndex')]=obj;
				$(this).attr('edit',"false");
			}else if(flag=="false"&&quesStr!=""&&answStr!=""){
				
				var obj ={
					"ques":quesStr,
					"answ":answStr,
					"index":xxindex.params.lib[$("#listName").text()].length,
					"ifGet":false
				}
				xxindex.params.lib[$("#listName").text()].push(obj); 

			}
			var dataNow = xxindex.params.lib[$("#listName").text()];
			xxindex.someLibFunction.buildContent(dataNow);
			xxindex.someDomOptions.showLibCont(dataNow);
			xxindex.someDomOptions.closeAddTip($("#addTip"));


		});
		$(".nav>ul>li").click(function (argument) {
			var str = "."+ $(this).attr("id");
			$(".rightBar>div").not(".ri-title").addClass("none");
			$(str).removeClass("none");
		});
			
	},
	// 事件绑定
	"someLibFunction":{
		buildContent:function (data) {//生成内容
			var html = "";
			if (data.length>0) {
				for (var i = 0; i < data.length; i++) {
					var obj = data[i];
					html +='<div class="item" index="'+obj.index+'"ques="true">\
					            <div class="item-avatar">\
					              <img src="images/319.png"></div>\
					            <div class="item-title">问题</div>\
					            <div class="item-btn edit-btn">点击编辑</div>\
					            <div class="item-cont item-ques">问题：'+obj.ques+'</div>\
					            <div class="item-cont item-answ none">答案：'+obj.answ+'</div>\
				            </div>';
				}
			}
			
			$(".body .item").not(".addItmBtnWrap").remove();
			$(".addItmBtnWrap").before(html);
			$(".body .cont>.item").click(function(event) {
				xxindex.someDomOptions.switchQA($(this));
			});
			$(".item-btn.edit-btn").unbind().click(function(event) {
			var indexToUse  =$(this).parent(".item").attr("index");
			$("#addTip .btn-true").attr("nowIndex",indexToUse).attr("edit","true");
			xxindex.someDomOptions.showAddTip($("#addTip"));
			__.setLocalStore("moren",$("#listName").text());
		});
		},
		dataSort:function (flag,data) {//1顺序，2倒序，3乱序
			var arr=[];
			if (flag==1) {
				arr = data;
			}else if(flag==2){
				arr  = data.reverse();
			}else if(flag==3){
				arr = data.sort(function(){return Math.random()>0.5?-1:1;}); 
			}
			return arr;
		},
		setIfLocal:function (flag) {// 是否本地存储
			
		},
		addNewlib:function (name,data) {//添加新库	
			xxindex.params.list.push(name);
			xxindex.params.lib[name] = data;
			xxindex.someDomOptions.showList();
			xxindex.someLibFunction.buildContent(data);
			xxindex.someDomOptions.showLibCont(data);

		},
		addNewItem:function (data,libName) {//添加新问题
			xxindex.params.lib[libName].push(data);
			xxindex.someLibFunction.buildContent(data);
			xxindex.someDomOptions.showLibCont(data);
		},
		editItem:function(data,index,libName){//编辑问题
			xxindex.params.lib[libName][index] = data;
			xxindex.someLibFunction.buildContent(data);
			xxindex.someDomOptions.showLibCont(data);
		},
		saveDataOnStore:function (data,libName) {
			__.setLocalStore(libName,data);
		},
		readDataOnLocal:function (libName) {
			var data  = __.redLocalStore(libName);
			return data;
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
		switchQA:function ($obj) {//切换问题与答案
			if ($obj.attr("ques")=="true") {
				$obj.find(".item-title").text("答案");
				$obj.find(".item-ques").addClass('none');
				$obj.find('.item-answ').removeClass('none');
				$obj.attr("ques","false");
			}else{
				$obj.find(".item-title").text("问题");
				$obj.find(".item-answ").addClass('none');
				$obj.find('.item-ques').removeClass('none');
				$obj.attr("ques","true");
			}
		},
		showList:function (argument) {
			var html  = "";
			for (var i = 0; i < xxindex.params.list.length; i++) {
				var obj =  xxindex.params.list[i];
				html+='<li>'+obj+'</li>';
			}
			$(".listWrap ul").html(html);
		},
		showLibCont:function (data) {
			var str  = JSON.stringify(data);
			$(".listContentTxt").text(str);
		}
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
	var morenLibName  = __.redLocalStore("moren")?__.redLocalStore("moren"):"moren";
	var curData =  xxindex.someLibFunction.readDataOnLocal(xxindex.params.morenLibName);
	curData = (curData!="")?curData:xxindex.params.lib.moren;
	xxindex.someLibFunction.buildContent(curData);
})
