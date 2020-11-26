	//页面加载完成后调用
	$(function(){		
		//设置布局
		iniWindowSize()		
		//绑定监听
		evenFunction();		
		//初始化默认查询参数
		iniParams();
		//查询数据
		queryListData();
	});
	
	//用户监听绑定事件的方法
	var evenFunction = function(){
		$(".bodyDataDiv").scroll(function(){
			var scorlW=0-$(".bodyDataDiv").scrollLeft();
			$(".titleTableDiv").css({"left":scorlW});
		});
		
		$("#chooseMonth").click(function(){
			$("#chooseMonth").css("color","red");
			$("#chooseWeek").css("color","black");
			date_fun('month');
		})
		$("#chooseWeek").click(function(){
			$("#chooseWeek").css("color","red");
			$("#chooseMonth").css("color","black");
			date_fun('week');
		})
	}
	//动态设置搜索条件的日期
	function  date_fun(id){
		  var  now = new Date()
		  var  time2 = timeFormt(now);
		  $("#time2").attr("value",time2); //设置结束日期
		  var allminus ;
		  if(id=="week"){
			  allminus = 24*60*60*7*1000;
			  var t1 = (new Date()).getTime();
			  var  beginDate = new Date( t1-allminus); 
			  mini.get("time1").setValue(beginDate)//设置开始日期
		    }else if(id=="month"){
		      allminus = 24*60*60*30*1000;
		      var t1 = (new Date()).getTime();
			  var  beginDate = new Date( t1-allminus); 
			  mini.get("time1").setValue(beginDate)//设置开始日期
		    }
		  mini.get("time2").setValue(now)//设置开始日期
	}
	
	//窗口改变后调用
	$(window).resize(function(){
		iniWindowSize();
	});
	
	function timeFormt(now){
		  var  year = now.getFullYear();
		  var  month  = now.getMonth()+1<10?"0"+(now.getMonth()+1):now.getMonth()+1;
		  var  date = now.getDate()<10?"0"+now.getDate():now.getDate();
		  var  hour= now.getHours()<10?"0"+now.getHours():now.getHours(); //小时
		  var  minu = now.getMinutes()<10?"0"+now.getMinutes():now.getMinutes(); //分钟
		  var  sec = now.getSeconds()<10?"0"+now.getSeconds():now.getSeconds(); //秒
		  var  date = year+"-"+month+"-"+date+" "+hour+":"+minu+":"+sec
		return  date;
	}
	
	//初始化查询参数条件方法，根据url传参进行设值
	var  iniParams =  function(){
		
		//设置日期
		 var  now = new Date();
		 var t1 = (new Date()).getTime();
		 var allminus = 24*60*60*7*1000;
		 var  beginDate = new Date( t1-allminus); 
		 mini.get("time1").setValue(beginDate)//设置开始日期
		  mini.get("time2").setValue(now)//设置结束日期
		 //设置组织结构
		 var orgId=queryLoginOrgNo();
		 //初始化地址                                  
		 mini.get("psOrgNo").setUrl("/"+util_str_getProjectName()+"/cq_project/rest/cq/jobdetail/getOrg?orgId="+orgId);
		 
	}
	
	//设置表格宽度大小，该大小按照当前窗口进行设置
	function reptable(width){
		//设置固定宽度，注意固定宽度不能大于width
		var td1=35;
		var td19=100;
		//剩余宽度值=总宽度-固定宽度-表格线占用像素（列+1）
		width=width-35-100-18;
		//设置百分比宽度
		var td2=width*0.1;
		var td3=width*0.06;
		var td4=width*0.03;
		var td5=width*0.03;
		var td6=width*0.06;
		var td7=width*0.06;
		var td8=width*0.13;
		var td9=width*0.13;
		var td12=width*0.08;
		var td13=width*0.1;
		var td14=width*0.1;
		var td15=width*0.03;
		var td16=width*0.04;
		var td17=width*0.02;
		var td18=width*0.03;
	
		//设置表格宽度
		$(".td1").css({"width":td1});
		$(".td2").css({"width":td2});
		$(".td3").css({"width":td3});
		$(".td4").css({"width":td4});
		$(".td5").css({"width":td5});
		$(".td6").css({"width":td6});
		$(".td7").css({"width":td7});
		$(".td8").css({"width":td8});
		$(".td9").css({"width":td9});
		
		$(".td12").css({"width":td12});
		$(".td13").css({"width":td13});
		$(".td14").css({"width":td14});
		$(".td15").css({"width":td15});
		$(".td16").css({"width":td16});
		$(".td17").css({"width":td17});
		$(".td18").css({"width":td18});
		$(".td19").css({"width":td19});
	}
	
	
	//设置各组件大小统一方法入口
	function iniWindowSize(){
		var width=$(window).width();
		var height=$(window).height();
		//设置查询框高度
		var conditionIndex=$(".conditionOne").length;
		var lineIndex=parseInt((width*0.8)/280);
		var ys=conditionIndex%lineIndex;
		var i=0;
		if(ys>0){i=1;};
		var queryHeight=10+35*(parseInt(conditionIndex/lineIndex)+i);
		//查询框
		$(".queryDiv").css({"width":$(window).width(),"height":queryHeight});
		$(".conditionDiv").css({"height":queryHeight});
		$(".conditionBtDiv").css({"height":queryHeight});
		//分页栏div
		$(".footDiv").css({"width":$(window).width()});
		//设置内容高度
		var dataHeight=height-($(".footDiv").height()+$(".titleTableDiv").height()+$(".queryDiv").height());
		//数据div
		$(".bodyDataDiv").css({"width":width,"height":dataHeight,"top":$(".titleTableDiv").height()+$(".queryDiv").height()});
		//设置table表格宽度,满屏需减去滚动条宽度17
		width=width*1.5-17;
		$(".classdataTbale").css({"width":width});
		//表格div
		$(".titleTableDiv").css({"width":width,"top":$(".conditionDiv").height()});
		reptable(width);
	}
	
	

	//查询数据统一方法
	function queryListData(){
		$(".loadDiv").show();
		$.ajax({
			url : "/sgpssc/cq_project/rest/cq/jobdetail/getXCGCJobList",
			data : getData(),
			type : "POST",
			error:function(error){
			},
			success : function(data){
				//获取数据总条数
				var sum=data.sum;
				//数据处理
				doData(data);
				//设置分页情况
				setPage(mini.get("pageNum").getValue(),sum);
				iniWindowSize();
				//隐藏加载框
				$(".loadDiv").hide();
			}
		}); 
	}
	
	//对查询结果返回数据进行处理
	var doData = function(data){
		var datas=data.data;
		if(datas!=undefined){
		var html="";
		var msg;
		for(var i=0;i<datas.length;i++){
			var  falg = true;
			//联合勘察时间
			var  unsurTime =util_data_getDate((datas[i].UNSURVEYTIME),"/");  
			var  handletime =util_data_getDate((datas[i].HANDLETIME),"/");  
			var  chktime =util_data_getDate((datas[i].CHKTIME),"/");  
			html+="<tr class=\"tr"+(i%2)+"\">";
			html+='<td class="td1">'+util_str_rmnull(datas[i].PAGINATIONNUM)+'</td>';
			html+='<td class="td2">'+util_str_rmnull(datas[i].ENGNAME)+'</td>';
			html+='<td class="td3">'+util_str_rmnull(datas[i].ENGCODE)+'</td>';
			html+='<td class="td12">'+util_str_rmnull(datas[i].YZUNITNAME)+'</td>';
			html+='<td class="td4">'+util_str_rmnull(datas[i].FLOWSTATE)+'</td>';
			/*html+='<td class="td5">'+util_str_rmnull(datas[i].RISKGRADE)+'</td>';*/
			html+='<td class="td5">'+util_str_rmnull("四级")+'</td>';
			
			html+='<td class="td6">'+util_str_rmnull(formatDate(new Date(datas[i].STARTTIME)))+'</td>';
			html+='<td class="td7">'+util_str_rmnull(formatDate(new Date(datas[i].ENDTIME)))+'</td>';
			html+='<td class="td8">'+util_str_rmnull(datas[i].ENGCONTENT)+'</td>';
			html+='<td class="td9">'+util_str_rmnull(datas[i].ADDRESS)+'</td>';
			
			
			html+='<td class="td13">'+util_str_rmnull(datas[i].SGUNITNAME)+'</td>';
			html+='<td class="td14">'+util_str_rmnull(datas[i].JLUNITNAME)+'</td>';
			
			html+='<td class="td15">'+util_str_rmnull(datas[i].SGUSERNAME)+'</td>';
			html+='<td class="td16">'+util_str_rmnull(datas[i].SGUSERPHONE)+'</td>';
			
			html+='<td class="td17">'+util_str_rmnull(datas[i].CONSNUMBER)+'</td>';
			html+='<td class="td18">'+util_str_rmnull(getStatus(datas[i].PLANSTATUS))+'</td>';
			html+='<td class="td19"><div style="margin-left:25%;" class="bodybtDiv" onclick="openGCInfo(\''+datas[i].PLANID+'\',\''+datas[i].ENGNAME+'\')">详情</div></td>';
			html+='</tr>'
		}  
		$(".dataTbale").html(html); }
	}
	
	//执行状态转换
	function  getStatus(code){
		if(code==4){
			return "已结束"
		}else{
			return "待执行";
		}
		
	}
	
	
	//获取查询框统一方法
	function getData(){	
		//查询框数据
		var consName= mini.get("consName").getValue();
		var psOrgNo= mini.get("psOrgNo").getValue();
		var time1= (mini.get("time1").getFormValue().trim()).replace(new RegExp("-","g"),'/');
		var time2= (mini.get("time2").getFormValue().trim()).replace(new RegExp("-","g"),'/');
		//分页对象
		var pageNum=mini.get("pageNum").getValue();
		var pageIndex=$(".pageIndex").val();
		var index = $("#extraCondiotion").attr("value");
		var datas = {consName:consName,psOrgNo:psOrgNo,time1:time1,time2:time2,pageNum:pageNum,pageIndex:pageIndex,index:index};
		console.log("查询条件----->"+datas);
		return datas; 
	}
	
	//设置当前分页
	function setPage(pageNum,sum){
		$(".sumSpan").text(sum);
		var page=0;
		if(sum%pageNum>0){
			page=parseInt(sum/pageNum)+1;
		}else{
			page=parseInt(sum/pageNum);
		}
		$(".sumPag").text(page);
	}
	
	//点击上下页、首页、尾页统一方法
	var pageIndex = function(index){
		if(index==-1){
			index=parseInt($(".sumPag").text());
		}
		$(".pageIndex").val(index);
		queryListData();
	}
	
	//分页改变
	var pageChange = function (index){
		var currtPage=parseInt($(".pageIndex").val());
		var sumPag = parseInt($(".sumPag").text());
		if((currtPage+index)>0 && (currtPage+index) <= sumPag){
			$(".pageIndex").val(currtPage+index);
		}
		queryListData();
	}
	
	//修改一页数据条数方法
	var pageSizeChange = function (){
		$(".pageNumSpan").text(mini.get("pageNum").getValue());
		$(".pageIndex").val(1);
		queryListData();
	}
	
	//手动修改页数值
	var yschange=function(){
		var pageIndex=parseInt($(".pageIndex").val());
		var sumPag=parseInt($(".sumPag").text());
		if(sumPag >= pageIndex){
			queryListData();
		}
	}
	
	//点击查询入口方法
	var conditionQuery = function(){
		$(".pageIndex").val(1);
		queryListData();
	}	
    var	conditionReset = function(){
    	iniParams();
    	$("#chooseMonth").click();
    	mini.get("consName").setValue("")
    	location.reload();
    }
