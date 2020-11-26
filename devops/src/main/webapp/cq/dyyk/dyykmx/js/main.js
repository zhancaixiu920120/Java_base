//组织结构json对象
var  orgObject ={};
var  obj = {};
//额外条件说明的数组  
var  extraFunctionAry = new Array("接单总数：","（运检）已完工总数：","（运检）未完工总数：","（整体流程）完工 数：","（整体流程）未完工数：","超时总数：","工程超时：")
var  datashowsObj =new Object();  
   //页面加载完成后调用
	$(function(){
		ini();
		iniParams();
		//给单位机构对象赋值
		orgObject = queryLocalorgs();
		queryListData();
		evenFunction();
		//refreshPage();
		
	});
	
	//窗口改变后调用
	$(window).resize(function(){
		ini();
	});
	
	//用户监听绑定事件的方法
	var evenFunction = function(){
		$(".bodyDataDiv").scroll(function(){
			var scorlW=0-$(".bodyDataDiv").scrollLeft();
			$(".titleTableDiv").css({"left":scorlW});
		});
		
		$("#closebar").click(function(){
			$("#datashows").hide("slow");
			var height=$(window).height();
			var dataHeight=height-($(".footDiv").height()+$(".titleTableDiv").height()+$(".queryDiv").height())-20;
			//数据div
			$(".bodyDataDiv").animate({"height":dataHeight});
		})
		
	}
	
	//设置表格宽度大小，该大小按照当前窗口进行设置
	function reptable(width){
		//设置固定宽度，注意固定宽度不能大于width
		var td1=35;
		//剩余宽度值=总宽度-固定宽度-表格线占用像素（列+1）
		width=width-35-23;
		//设置百分比宽度
		var td2=width*0.05;
		var td3=width*0.05;
		var td4=width*0.05;
		var td5=width*0.025;
		var td6=width*0.05;
		var td7=width*0.05;
		var td8=width*0.05;
		var td9=width*0.025;
		var td10=width*0.025;
		var td11=width*0.025;
		var td12=width*0.025;
		var td13=width*0.045;
		var td14=width*0.045;
		var td15=width*0.045;
		var td16=width*0.045;
		var td17=width*0.045;
		var td18=width*0.045;
		var td19=width*0.045;
		var td20=width*0.045;
		var td21=width*0.045;
		var td22=width*0.045;	
		var td23=width*0.05;	
		var td24=width*0.025;	
		var td25=width*0.025;	
		var td26=width*0.0455;	
	
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
		$(".td10").css({"width":td10});
		$(".td11").css({"width":td11});
		$(".td12").css({"width":td12});
		$(".td13").css({"width":td13});
		$(".td14").css({"width":td14});
		$(".td15").css({"width":td15});
		$(".td16").css({"width":td16});
		$(".td17").css({"width":td17});
		$(".td18").css({"width":td18});
		$(".td19").css({"width":td19});
		$(".td20").css({"width":td20});
		$(".td21").css({"width":td21});
		$(".td22").css({"width":td22});
		$(".td23").css({"width":td23});
		$(".td24").css({"width":td24});
		$(".td25").css({"width":td25});
		$(".td26").css({"width":td26});
	}
	
	//设置各组件大小统一方法入口
	function ini(){
		var width=$(window).width();
		var height=$(window).height();
		//设置查询框高度
		var conditionIndex=$(".conditionDiv .conditionOne").length;
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
		//topDiv上方的间距大小
		var  topDiv_margin_top = 20;
		var  footerHeight = $(".footDiv").height();
        $("#datashows").css({"bottom":footerHeight});
		//设置内容高度
		var dataHeight=height-($(".footDiv").height()+$(".titleTableDiv").height()+$(".queryDiv").height())-topDiv_margin_top;
		//数据div
		$(".bodyDataDiv").css({"width":width,"height":dataHeight,"top":$(".titleTableDiv").height()+$(".queryDiv").height()});
		//设置table表格宽度,满屏需减去滚动条宽度17
		width=width*1-17;
		$(".classdataTbale").css({"width":width});
		//表格div
		$(".titleTableDiv").css({"width":width,"top":$(".conditionDiv").height()});
		$("#listDates").css({"width":(width+17)});
		$(".bottomdataTbale").css({"width":(width+17)});
		reptable(2*width);
	}
	//初始化查询参数条件方法，根据url传参进行设值
	var  iniParams =  function(){
		//设置日期
		 var  now = new Date();
		 var t1 = (new Date()).getTime();
		 var allminus = 24*60*60*7*1000;
		 var  beginDate = new Date( t1-allminus); 
		 var handleTimeBg=decodeURI(util_str_getUrlParam("handleTimeBg"));
		 var dateType=decodeURI(util_str_getUrlParam("dateType"));
		 if(""!=handleTimeBg&&null!=handleTimeBg){
			mini.get("handleTime").setValue(handleTimeBg);
		}else{
			if(""!=dateType&&null!=dateType){
		    //设置日期为当月第一天	
				var y =now.getFullYear();
				var m = now.getMonth()+1;
				m = m < 10?("0"+m):m;
				var d = "01";
				var bgDt = y+"-"+m+"-"+d;
		    mini.get("handleTime").setValue(bgDt)//设置开始日期 	
			}else{
 		    mini.get("handleTime").setValue(beginDate)//设置开始日期 
			}
		}
		 var handleTimeEd=decodeURI(util_str_getUrlParam("handleTimeEd"));
		 if(""!=handleTimeEd&&null!=handleTimeEd){
			 mini.get("meterTime").setValue(handleTimeEd);
		 }else{
		  mini.get("meterTime").setValue(now)//设置结束日期
		 }
		 //设置组织结构
		 var orgId=queryLoginOrgNo();
		 //初始化地址                                  
		 mini.get("psOrgNo").setUrl("/"+util_str_getProjectName()+"/cq_project/rest/cq/jobdetail/getOrg?orgId="+orgId);
		 var localOrg=util_str_getUrlParam("localOrg");
		 if(""!=localOrg&&null!=localOrg){
			 mini.get("psOrgNo").setValue(localOrg);
			 //设置组织结构
			 var psOrgId=util_str_getUrlParam("psOrgId");
			 if(-1!=psOrgId){
				 orgChange(psOrgId);
			 }else{
				 orgChange(); 
			 }
		 } 
		 
		 //设置工程类型
		 var havePrjCode=util_str_getUrlParam("havePrjCode");
		 if(""!=havePrjCode&&null!=havePrjCode){
			 mini.get("havePrjCode").setValue(havePrjCode);
		 }
		 //模块编号index 
		 var index ;
		 var viewType = util_str_getUrlParam("viewType");
		 if(""!=viewType&&null!=viewType&&viewType!=0){ 
			index = util_str_getUrlParam("index"); 
			index = (index==4?2:3); 
		 }else{
			 index = util_str_getUrlParam("index"); 			 
		 }
		 //设置其他 
		 if(""!=index&&null!=index){
			 //将额外查询条件显示出来
			var extraName = extraFunctionAry[index-1];
			if(index!=1){
			$("#extraConditionDiv").css("display","block");
			$("#extraConditionFlag").text(extraName); }
		 }      
		 $("#extraCondiotion").attr("value",index);
		 
	}
	
	//刷新td警告效果
	function  refreshPage(){
		var i=0	
		setInterval(function(){
	     if(i%2==0){
	    	 $(".alertStyle").addClass("alertStyle1");
	     }else{
	    	 $(".alertStyle").removeClass("alertStyle1"); 
	     } 		
		 i++;	
		},1500);	
	}
	
	//获取地市公司键值对
	function queryLocalorgs(){
		var  mapData="";
		$.ajax({
			url : "/sgpssc/cq_project/rest/cq/jobdetail/getOrgNo/getLocal",
			async:false,
			type : "POST",
			error:function(error){
			},
			success : function(data){
				var  objArr = data.data;
				for(var i = 0;i<objArr.length;i++){
					if(i==(objArr.length-1)){
						mapData += objArr[i].ORG_ID+":'"+objArr[i].NAME+"'";
					}else{
						mapData += objArr[i].ORG_ID+":'"+objArr[i].NAME+"',";}
				}
				mapData= "{" + mapData+"}";
			}
		}); 
		return  eval('('+mapData+')');
	}
	
	
	//查询数据统一方法
	function queryListData(){
		$("#datashows").hide(500);
		$(".loadDiv").show();
		$.ajax({
			url : "/sgpssc/cq_project/rest/cq/jobdetail/getJobList",
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
				ini();
				//隐藏加载框
				$(".loadDiv").hide();
			}
		}); 
	}
	
	function listdatascsyz(appNo){
		var html="";
		html+='<td class="td13">'+obj[appNo].HANDLETIME+'</td>';
		html+='<td class="td14">'+obj[appNo].ACCEPTTIME+'</td>';
		
		//给表单赋值
		if(obj[appNo].UNSURVEYTIMEisAlerm){
			html+='<td class="td15"><div class="dataspan alertStyle" ></div></td>';
		}else{
			html+='<td class="td15">'+obj[appNo].UNSURVEYTIME+'</td>';
		}
		if(obj[appNo].MATARRTIMEisAlerm){
			html+='<td class="td16"><div class="dataspan alertStyle" > </div></td>';
		}else{
			html+='<td class="td16">'+obj[appNo].MATARRTIME+'</td>';
		}
		if(obj[appNo].POPFTIMEisAlerm){
			html+='<td class="td17"><div class="dataspan alertStyle" > </div></td>';
		}else{
			html+='<td class="td17">'+obj[appNo].POPFTIME+'</td>';
		}
		if(obj[appNo].AUDTIMEisAlerm){
			html+='<td class="td18"><div class="dataspan alertStyle" > </div></td>';
		}else{
			html+='<td class="td18">'+obj[appNo].AUDTIME+'</td>';
		}
		html+='<td class="td19">'+obj[appNo].STATTIME+'</td>';
		
		if(obj[appNo].ACPDYTIMEisAlerm){
			html+='<td class="td20"><div class="dataspan alertStyle" > </div></td>';
		}else{
			html+='<td class="td20">'+obj[appNo].ACPDYTIME+'</td>';
		}
		if(obj[appNo].ACPGYTIMEisAlerm){
			html+='<td class="td21"><div class="dataspan alertStyle" > </div></td>';
		}else{
			html+='<td class="td21">'+obj[appNo].ACPGYTIME+'</td>';
		}
		if(obj[appNo].METERTIMEisAlerm){
			html+='<td class="td22"><div class="dataspan alertStyle" > </div></td>';
		}else{
			html+='<td class="td22">'+obj[appNo].METERTIME+'</td>';
		}
		return html;
	}
	
	
	function listdatashow(appNo){
		$(".dataTbale tr").removeClass("trClassAdd");
		$("#"+appNo).addClass("trClassAdd");
		/*var height=$(window).height();
		var  datashowheight= $("#datashows").height();
		var dataHeight=height-datashowheight-($(".footDiv").height()+$(".titleTableDiv").height()+$(".queryDiv").height())-20;
		$(".bodyDataDiv").animate({"height":dataHeight},800);
		$(".bodyDataDiv").animate({scrollTop:$(".bodyDataDiv")[0].scrollHeight},800);
		$(".bottomdataTbale div").removeClass("alertStyle")
		$(".bottomdataTbale div").removeClass("alertStyle1")
		//给表单赋值
		$("#sqsj").text(obj[appNo].HANDLETIME);
		$("#yjsj").text(obj[appNo].ACCEPTTIME);
		$("#kcsj").text(obj[appNo].UNSURVEYTIME);
		if(obj[appNo].UNSURVEYTIMEisAlerm){
			$("#kcsj").addClass("alertStyle");
			$("#kcsj").html("超时");
		}
		$("#wzsj").text(obj[appNo].MATARRTIME);
		if(obj[appNo].MATARRTIMEisAlerm){
			$("#wzsj").addClass("alertStyle");
			$("#wzsj").html("超时");
		}
		$("#tdsj").text(obj[appNo].POPFTIME);
		if(obj[appNo].POPFTIMEisAlerm){
			$("#tdsj").addClass("alertStyle");
			$("#tdsj").html("超时");
		}
		$("#xzcaspsj").text(obj[appNo].AUDTIME);
		if(obj[appNo].AUDTIMEisAlerm){
			$("#xzcaspsj").addClass("alertStyle");
			$("#xzcaspsj").html("超时");
		}
		$("#gckgsj").text(obj[appNo].STATTIME);
		$("#dywgsj").text(obj[appNo].ACPDYTIME);
		if(obj[appNo].ACPDYTIMEisAlerm){
			$("#dywgsj").addClass("alertStyle");
			$("#dywgsj").html("超时");
		}
		$("#gywgsj").text(obj[appNo].ACPGYTIME);
		if(obj[appNo].ACPGYTIMEisAlerm){
			$("#gywgsj").addClass("alertStyle");
			$("#gywgsj").html("超时");
		}
		$("#zbsdsj").text(obj[appNo].METERTIME);
		if(obj[appNo].METERTIMEisAlerm){
			$("#zbsdsj").addClass("alertStyle");
			$("#zbsdsj").html("超时");
		}
		$("#datashows").show(1000);*/
	}
	

	//对查询结果返回数据进行处理
	var doData = function(data){
		var datas=data.data;
		if(datas!=undefined){
		var html="";
		var listhtml = "";
		var msg;
		//将datashowsObj对象置空
		datashowsObj ='' ;
		var fh = ',';
		if(datas.length>0){
		for(var i=0;i<datas.length;i++){
			/*************************预警验证模块**********************************/
			var  H1 = util_data_getDate((datas[i].HANDLETIME),'/');
			var  A2 = util_data_getDate((datas[i].ACCEPTTIME),"/");
			var  U3 = util_data_getDate((datas[i].UNSURVEYTIME),"/");
			var  M4 = util_data_getDate(datas[i].MATARRTIME,"/");
			var  P5 = util_data_getDate((datas[i].POPFTIME),"/");
			var  A6 = util_data_getDate((datas[i].AUDTIME),"/");
			var  S7 = util_data_getDate((datas[i].STATTIME),"/");
			var  A8 = util_data_getDate((datas[i].ACPDYTIME),"/");
			var  A9 = util_data_getDate((datas[i].ACPGYTIME),"/");
			var  M10 = util_data_getDate((datas[i].METERTIME),"/");
			var  L11 =  util_str_rmnull(datas[i].LIMTTIMECODE);
			//取得的系统时间
			var  D12 = util_data_getDate((datas[i].LOCALDATE),"/");
			//是否低压居民
			var  isdyjm = isDyjm(datas[i].PRTYPE,datas[i].HAVEPRJCODE);
			//将数据存在json对象中
			var jsonKey = "flag"+(datas[i].APPNO);
			if(i==0){
				fh ='{';
			}else{
				fh =',';
			}
			datashowsObj =datashowsObj+fh 
			     + '"'+jsonKey+'":{ \"HANDLETIME\":\"'+ H1 +'\",\"HANDLETIMEisAlerm\":false,' 
			     + '\"ACCEPTTIME\":\"'+ A2 +'\",\"ACCEPTTIMEisAlerm\":false,'
			     + '\"UNSURVEYTIME\":\"'+U3+'\",\"UNSURVEYTIMEisAlerm\":'+isAlarm(H1,U3,H1,1,L11,D12,isdyjm)+',' 
			     + '\"MATARRTIME\":\"'+M4 +'\",\"MATARRTIMEisAlerm\":'+isAlarm(H1,U3,M4,2,L11,D12,isdyjm)+',' 
			     + '\"POPFTIME\":\"'+P5+'\",\"POPFTIMEisAlerm\":'+isAlarm(H1,U3,P5,3,L11,D12,isdyjm)+',' 
			     + '\"AUDTIME\":\"'+A6+'\",\"AUDTIMEisAlerm\":'+isAlarm(H1,U3,A6,4,L11,D12,isdyjm)+',' 
			     + '\"STATTIME\":\"'+S7+'\",\"STATTIMEisAlerm\":false,'
			     + '\"ACPDYTIME\":\"'+A8+'\",\"ACPDYTIMEisAlerm\":'+isAlarm(H1,U3,A8,5,L11,D12,isdyjm)+','
			     + '\"ACPGYTIME\":\"'+A9+'\",\"ACPGYTIMEisAlerm\":'+isAlarm(H1,U3,A9,6,L11,D12,isdyjm)+','
			     + '\"METERTIME\":\"'+M10+'\",\"METERTIMEisAlerm\":'+isAlarm(A8,M10,M10,7,L11,D12,isdyjm)+''
		         + '}'
		    }
		 datashowsObj = datashowsObj + '}';
	     obj = $.parseJSON(datashowsObj);
		console.log(obj);
		for(var i=0;i<datas.length;i++){
			/*************************预警验证模块**********************************/
			var  H1 = util_data_getDate((datas[i].HANDLETIME),'/');
			var  A2 = util_data_getDate((datas[i].ACCEPTTIME),"/");
			var  U3 = util_data_getDate((datas[i].UNSURVEYTIME),"/");
			var  M4 = util_data_getDate(datas[i].MATARRTIME,"/");
			var  P5 = util_data_getDate((datas[i].POPFTIME),"/");
			var  A6 = util_data_getDate((datas[i].AUDTIME),"/");
			var  S7 = util_data_getDate((datas[i].STATTIME),"/");
			var  A8 = util_data_getDate((datas[i].ACPDYTIME),"/");
			var  A9 = util_data_getDate((datas[i].ACPGYTIME),"/");
			var  M10 = util_data_getDate((datas[i].METERTIME),"/");
			var  L11 =  util_str_rmnull(datas[i].LIMTTIMECODE);
			//取得的系统时间
			var  D12 = util_data_getDate((datas[i].LOCALDATE),"/");
			var  isdyjm = isDyjm(datas[i].PRTYPE,datas[i].HAVEPRJCODE);
			 /*************************预警验证模块**********************************/
			 var alarm = (isAlarm(H1,U3,H1,1,L11,D12,isdyjm)||isAlarm(H1,U3,M4,2,L11,D12,isdyjm)||isAlarm(H1,U3,P5,3,L11,D12,isdyjm)||isAlarm(H1,U3,A6,4,L11,D12,isdyjm)|| isAlarm(H1,U3,A8,5,L11,D12,isdyjm)||isAlarm(H1,U3,A9,6,L11,D12,isdyjm)||isAlarm(A8,M10,M10,7,L11,D12,isdyjm));
			/*************************列表拼接模块**********************************/
			html+='<tr class="tr'+(i%2)+'" id="flag'+datas[i].APPNO+'"  onclick="listdatashow(\''+"flag"+(datas[i].APPNO+"")+'\')"   >';
			html+='<td class="td1"><div '+(alarm?'class="tdClass">':'>')+'</div>'+util_str_rmnull(datas[i].PAGINATIONNUM)+'</td>';
			html+='<td class="td2"><div  class="alinkStyle" >'+util_str_rmnull(datas[i].APPNO)+'</div></td>';
			html+='<td class="td3">'+util_str_rmnull(datas[i].CONSNO)+'</td>';
			html+='<td class="td4">'+util_str_rmnull(datas[i].CONSNAME)+'</td>';
			html+='<td class="td5">'+util_str_rmnull(datas[i].VOLTCODE)+'</td>';
			html+='<td class="td6">'+orgObject[(datas[i].PSORGNO)]+'</td>';
			html+='<td class="td7">'+util_str_rmnull(datas[i].PSSTATIONNO)+'</td>';
			html+='<td class="td8">'+codeToName(datas[i].HAVEPRJCODE)+'</td>';
			html+='<td class="td24">'+util_str_rmnull(datas[i].APPLYCAPACITY)+'</td>';
			html+='<td class="td25">'+util_str_rmnull(datas[i].LINES)+'</td>';
			html+='<td class="td26">'+util_str_rmnull(datas[i].POWERONTIME)+'</td>';
			html+='<td class="td23">'+preTypeToName(datas[i].PRTYPE)+'</td>';
			html+='<td class="td9">'+util_str_rmnull(changeLimtiCode(datas[i].LIMTTIMECODE,datas[i].PRTYPE,datas[i].HAVEPRJCODE))+'</td>';
			html+='<td class="td10">'+util_str_rmnull(datas[i].ACPDYUSE )+'</td>';
			html+='<td class="td11">'+util_str_rmnull(datas[i].ACPGYUSE)+'</td>';
			html+='<td class="td12">'+util_str_rmnull(datas[i].USEDAYS)+'</td>';
			html+=listdatascsyz('flag'+datas[i].APPNO);
			html+='</tr>';
		 /*************************列表拼接模块**********************************/
		}
		
		}
		  $(".dataTbale").html(html); }
	}
	
	//isAlarm()函数子函数
	//参数说明 type:工程类型   day1:unsureytime day2:当前比较时间     area10:周期为10的工程超期时间  area15:周期为15的工程超期时间
	function  daycompare(type,day1,day2,area10,area15,area11,localdate,isdyjm){
		var result;
		if(day1!=""){
	    if(day2!=""){
	     result =  false; 
        }else{
           if(!isdyjm.isdyjm){
	         days=((new  Date(localdate))-new Date(day1))/(24*60*60*1000);
	         //工程周期为10天
	         if(type==10){ 
	           result = days>area10?true:false;
	         }else{
	    	   result = days>area15?true:false; 
	          }
          }else{
          //低压居民工程时限都为11	
        	  days=((new  Date(localdate))-new Date(day1))/(24*60*60*1000);
      	    //工程周期为10天
      	      result = days>area11?true:false;
            }
	     }
		}else{
			result = false;
		}
	    return result;
	}
	
	//工程预警研判流程
    //对日期进行判断，看是否需要添加预警样式
	//参数说明 handleTime:申请时间   unsureytime:联合勘查时间  currentTime:当前环节的时间值  index:需要判断的环节编号 type:工程类型
	//当index 为7 的时候判断 装表送电时间是否超时  此时 handleTime:低压完工时间   unsureytime:装表送电时间 
	//index说明  1:联合勘查时间 ,2:物资到货时间 ,3:停电计划确认时间 ,4:行政审批资料准备时长 , 5:低压完工时间 , 6:高压完工时间, 7:装表送电时间
	//isdyjm ：是否是低压居民业务   结构{isdyjm:true/false,isjl:true/false} ,isjl: 是否掘路，无掘路的话，则没有行政审批准备预警
	function   isAlarm(handleTime,unsureytime,currentTime,index,type,localdate,isdyjm){
		var  days ;
		//result false 不预警，true 预警
		var  result= false;
	    switch(index){
	    case 1:
	    //联合勘查时间
	    if(unsureytime!=""){
	    result = false;
	    }else{
	    days=((new  Date(localdate))-new Date(handleTime))/(24*60*60*1000);
	    if(isdyjm.isdyjm){
	    	//低压居民两天内完成联合勘查
	    	result = days>2?true:false;
	    }else{
	    	result = days>1?true:false;
	    }
	    }
	    break;
	    case 2:
	    	 //物资到货时间
	    	result = daycompare(type,unsureytime,currentTime,2,3,2,localdate,isdyjm);
		    break;
	    case 3:
	    	//停电计划确认时间
	    	result = daycompare(type,unsureytime,currentTime,3,4,3,localdate,isdyjm);	
		    break; 
	    case 4:
	    	//行政审批资料准备时长
	    	if(!isdyjm.isjl){
	    	result = daycompare(type,unsureytime,currentTime,3,4,3,localdate,isdyjm);
	    	}else{
	    	//低压居民业务无掘路的话，此环节不需要预警	
	    	result = false;
	    	}	
		    break; 
	    case 5:
	    	//低压完工时间
	    	result = daycompare(type,unsureytime,currentTime,7,12,8,localdate,isdyjm);	
	    	break; 
	    case 6:
	    	//高压完工时间
	    	if(isdyjm)
	        {  
	    	result = false;	
	        }else{
	    	result = daycompare(type,unsureytime,currentTime,7,12,localdate,isdyjm); }	
	    	break; 
	    case 7:
	    	//装表送电时间
	    	if(handleTime!=""){
	    		if(unsureytime!=""){
	    			result = false;
	    		}else{
	    			result = true;
	    		}
	    	}
	    	break; 
	    
	    }
	    
	    return  result;
		
	}
  //判断是否为低压居民
  function  isDyjm(prType,haveProCode){
	  if(prType=="101"||prType=="109"){
		   if(haveProCode=="01"||haveProCode=="02"||haveProCode=="04"||haveProCode=="05"){
			   var  isjl; //是否掘路  false:有掘路,true:无掘路
			   if(haveProCode=="01"||haveProCode=="02"){
				   isjl = true
			    }else{
			       isjl = false;
			    }
			   return  {'isdyjm':true,"isjl":isjl};
		   }else{
			   return  {"isdyjm":false,"isjl":false};
		   }
	   }else{
		   return  {"isdyjm":false,"isjl":false};
	   }  
	  
	  
  }	
	
   //低压居民业务对应的四种工程类型 工程时限为11天	
   function  changeLimtiCode(limtiCode,prType,haveProCode){
	   if(prType=="101"||prType=="109"){
		   if(haveProCode=="01"||haveProCode=="02"||haveProCode=="04"||haveProCode=="05"){
			   return  "11"
		   }else{
			   return  limtiCode;
		   }
	   }else{
		   return  limtiCode;
	   }
   }	
  	
	
   function   codeToName(code){
	   var  arr = ["有外线(架空)无掘路","有外线(电缆)无掘路","低压衍生的高压","有外线(架空)有掘路","有外线(电缆)有掘路","无工程","其它"];
       if(code!="99"){
	   var  strIndex = code.charAt(1);
       var  index = parseInt(strIndex)-1;
       return  arr[index];
        }else{
       return  arr[6]; 	
       }
   }	
   function   preTypeToName(code){
	   var  arr = ["低压非居民新装","低压非居民增容","低压居民新装","低压居民增容","高压新装","高压增容 ","其他"];
      switch(code){
      case "102":
      return arr[0];
      case "110":
    	  return arr[1];
      case "101":
    	  return arr[2];
      case "109":
    	  return arr[3];
      case "104":
    	  return arr[4];
      case "111":
    	  return arr[5];
      default: 
    	  return arr[6];
      }
   }	
 	
	
	//获取查询框统一方法
	function getData(){	
		//查询框数据
	 	var consName=mini.get("consName").getValue();
	 	var team=mini.get("team").getValue();
		var consNo= mini.get("consNo").getValue();
		var isOverTime= mini.get("isOverTime").getValue();
		console.log("isOverTime---->"+isOverTime);
		var voltCode= mini.get("voltCode").getValue();
		var psOrgNo= mini.get("psOrgNo").getValue();
		var havePrjCode= mini.get("havePrjCode").getValue();
		var prType= mini.get("prType").getValue();
		var handleTime= (mini.get("handleTime").getFormValue().trim()).replace(new RegExp("-","g"),'/');
		var meterTime= (mini.get("meterTime").getFormValue().trim()).replace(new RegExp("-","g"),'/');
		//分页对象
		var pageNum=mini.get("pageNum").getValue();
		var pageIndex=$(".pageIndex").val();
		var index = $("#extraCondiotion").attr("value");
		if($("#extraConditionDiv").css('display')=='block'){
		var hasExtraCondition= mini.get("hasExtraCondition").getValue();
		console.log("hasExtraCondition--->"+hasExtraCondition);
		if("false"==hasExtraCondition){
			index ="1";
		} }
		
		var datas = {isOverTime:isOverTime,team:team,consName:consName,consNo:consNo,voltCode:voltCode,psOrgNo:psOrgNo,havePrjCode:havePrjCode,prType:prType,handleTime:handleTime,meterTime:meterTime,pageNum:pageNum,pageIndex:pageIndex,index:index};
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
