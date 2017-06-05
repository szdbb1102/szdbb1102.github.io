	function a(url,i) {
		$.ajax({
	        url: url+i,
	        type: 'GET',
	        success: function (res) {
	            if (/\bbg-orange\b/.test(res)) {
                    var hehe = '---'

                    try{
                        hehe =  /\<span class="txt-hide"\>(\W+)\<\/span\>/.exec(res)[1]
                    }catch(e){
                      
                    }
                    console.log(url+i,hehe)
	            }

	        },
	        complete:function () {
	        	i++;
	        	if(i==11000){
	        		return
	        	}
	        	a(url,i)
	        }
	    })
	}
	var i = 2600;
	var url = 'http://tcdx.tcent.cn/course/detail.aspx?id=';
	a(url,i)



	function a(i) {
		$.ajax({
	        url: arr[i],
	        type: 'GET',
	        success: function (res) {
	            if (/\bbg-orange\b/.test(res)) {
                    var hehe = '---'

                    try{
                        hehe =  /\<span class="txt-hide"\>(\W+)\<\/span\>/.exec(res)[1]
                    }catch(e){
                      
                    }
                    console.log(arr[i],hehe)
	            }

	        },
	        complete:function () {
	        	i++;
	        	if(i==arr.length){return}
	        	a(i)
	        }
	    })
	}
	var i = 0;
	a(i)


$.ajax({
	        url: 'http://tcdx.tcent.cn/ajax/course.ashx',
	        type: 'POST',
            data:'action=getallcourselistv3&jsonstring=%7B%22PageIndex%22%3A1%2C%22PageSize%22%3A100%2C%22CatalogID%22%3A%222143%22%2C%22SearchContent%22%3A%22%22%2C%22Order%22%3A3%7D',
	        success: function (res) {
                 var arr  = JSON.parse(res).Results;
                 console.log(JSON.parse(res).Results[0])	            

	        },
	        
	    })




	$.ajax({
	        url: 'http://tcdx.tcent.cn/course/?cid=2143',
	        type: 'GET',
	        success: function (res) {
                 var a = /\<body\>([\s\S]*)\<\/body\>/.exec(res)[0];
                  a = $(a).find('.kc-pic>a')
                 for (var i = 0; i < a.length; i++) {
 	console.log(a.eq(i).attr('href'))
 }

	        },
	        
	    })

//抓取技术课程的有学分链接

		$.ajax({
	        url: 'http://tcdx.tcent.cn/ajax/course.ashx',
	        type: 'POST',
            data:'action=getallcourselistv3&jsonstring=%7B%22PageIndex%22%3A1%2C%22PageSize%22%3A100%2C%22CatalogID%22%3A%222143%22%2C%22SearchContent%22%3A%22%22%2C%22Order%22%3A3%7D',
	        success: function (res) {
                 window.arr  = JSON.parse(res).Results;
                 var i = 0;
	             var url = 'http://tcdx.tcent.cn/course/detail.aspx?id=';
	             a(url,i)
                 	            

	        },
	        
	    })
function a(url,i) {
		$.ajax({
	        url: url+arr[i].CourseID,
	        type: 'GET',
	        success: function (res) {
	            if (/\bbg-orange\b/.test(res)) {
                    var hehe = '---'

                    try{
                        hehe =  /\<span class="txt-hide"\>(\W+)\<\/span\>/.exec(res)[1]
                    }catch(e){
                      
                    }
                    console.log(url+i,hehe)
	            }

	        },
	        complete:function () {
	        	i++;
	        	if(i==window.arr.lenght){
	        		return
	        	}
	        	a(url,i)
	        }
	    })
	}
	
	

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 