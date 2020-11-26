var  orgObject ={};
window.onload = function () {
	var royheight = window.innerHeight-226;
	//给滚动条设置相关高度
	$("#datacontent").css("height",royheight+"px");
	$(".selector").click(function(){
		$(".selector").removeClass("click-selector");
		$(this).addClass("click-selector");
		var id = $(this).attr("id");
		date_fun(id);	
	});
   //给单位机构对象赋值
     orgObject = queryLocalorgs();
	//初始化默认查询参数
	iniParams();
	doData();
}
//初始化查询参数条件方法
var  iniParams =  function(){
	//获取地址栏传参
	var lineName=util_str_getUrlParam("lineName");
	mini.get("lineName").setValue(lineName);
	//设置日期
	 var  now = new Date();
	 var t1 = (new Date()).getTime();
	 var allminus = 24*60*60*7*1000;
	 var  beginDate = new Date( t1-allminus); 
	 var handleTimeBg=decodeURI(util_str_getUrlParam("handleTimeBg"));
	 if(""!=handleTimeBg&&null!=handleTimeBg){
		 mini.get("time1").setValue(handleTimeBg)//设置开始日期
	}else{
		mini.get("time1").setValue(beginDate)//设置开始日期
	}
	 var handleTimeEd=decodeURI(util_str_getUrlParam("handleTimeEd"));
	 if(""!=handleTimeEd&&null!=handleTimeEd){
		 mini.get("time2").setValue(handleTimeEd)//设置开始日期
	 }else{
		 mini.get("time2").setValue(now)//设置开始日期
	 }	 
	 
	 
	 //获取地址栏组织机构参数
	 var orgId=queryLoginOrgNo();
	 if(""!=orgId&&null!=orgId){
		 mini.get("sys_org_id").setValue(orgId);
		
	 }
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
	    }else if(id=="season"){
	     var  dt = new Date();
	     dt.setMonth(dt.getMonth()-3);
	     mini.get("time1").setValue(dt)//设置开始日期
	    }else {
	    	  allminus = 24*60*60*365*1000;
	    	  var t1 = (new Date()).getTime();
			  var  beginDate = new Date( t1-allminus); 
			  mini.get("time1").setValue(beginDate)//设置开始日期
	    }	
	  mini.get("time2").setValue(now)//设置开始日期
	  doData();
}
//获取查询框统一方法
function getData(orgType,orgName,dataCode){	
	//查询框数据
	var havePrjCode= mini.get("lineName").getValue();
	var handleTime= (mini.get("time1").getFormValue().trim()).replace(new RegExp("-","g"),'/');
	var meterTime= (mini.get("time2").getFormValue().trim()).replace(new RegExp("-","g"),'/');
	var sysOrgId =mini.get("sys_org_id").getValue();
	var datas = {dataCode:dataCode,orgName:orgName,orgType:orgType,havePrjCode:havePrjCode,handleTime:handleTime,meterTime:meterTime,sysOrgId:sysOrgId};
	return datas; 
}

//查询数据统一方法  orgType psOrgNo:地市公司数据查询   pStationNo：供电所数据查询
function queryListData(orgType,orgName,dataCode){
	var  mapDate ;
	$.ajax({
		url : "/sgpssc/cq_project/rest/cq/jobdetail/getJobViewList",
		data : getData(orgType,orgName,dataCode),
		async:false,
		type : "POST",
		error:function(error){
		},
		success : function(data){
			mapDate=data.data;
			//获取数据总条数
		   var sum=data.sum;
			//设置分页情况
		   setPage(mini.get("pageNum").getValue(),sum);
			//ini();
			//隐藏加载框
		}
	}); 
	return  mapDate;
}

//获取地市单位的下属供电所
function queryorgs(psorgNo){
	var  mapDate ;
	$.ajax({
		url : "/sgpssc/cq_project/rest/cq/jobdetail/getOrgNo/02/"+psorgNo,
		async:false,
		type : "POST",
		error:function(error){
		},
		success : function(data){
			mapDate=data.data;
		}
	}); 
	return  mapDate;
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

//domId:tr或者td id值   index:点击的位置   trType:tr类型，0地市公司tr或者1供电所tr
//psOrgId 如果是供电所的话，传入地市公司id
function toDetailPage(domId,index,trType,psOrgId){
	//获取搜索条件参数
	var havePrjCode= mini.get("lineName").getValue();
	var orgId= mini.get("sys_org_id").getValue();
	var handleTimeBg= (mini.get("time1").getFormValue().trim()).replace(new RegExp("-","g"),'/');
	var handleTimeEd= (mini.get("time2").getFormValue().trim()).replace(new RegExp("-","g"),'/');
	var  args="?havePrjCode="+havePrjCode+"&handleTimeBg="+handleTimeBg+"&handleTimeEd="+handleTimeEd ;
	if(trType==0){
	//地市公司
    args += "&orgId="+orgId+"&localOrg="+domId+"&index="+index+"&psOrgId="+psOrgId;  
	}else{
	domId=encodeURI(encodeURI(domId));	
    args += "&orgId="+orgId+"&localOrg="+psOrgId+"&psOrgId="+domId+"&index="+index;
	}
	var title='业扩工程明细列表';
	var width=$(window).width()-100;
	var height=$(window).height()-40;
	util_str_open_window("../dyykmx/index.jsp"+args,width,height,title);
}

function queryTrData(orgType,orgName,dataCode){
	var  thisOrgName = orgName;
	$.ajax({
		url : "/sgpssc/cq_project/rest/cq/jobdetail/getJobViewList",
		data : getData(orgType,orgName,dataCode),
		async:true,
		type : "POST",
		error:function(error){
		},
		success : function(data){
		var	mapData=data.data;
		switch(dataCode){
		case  1:
		for(var j=0;j<mapData.length;j++){
			var  colu1 = mapData[j].COLU1;
			var  colu2 = mapData[j].COLU2;
			var  colu3 = mapData[j].COLU3;
			var  colu4 = mapData[j].COLU4;
			var  colu5 = mapData[j].COLU5;
			//当前Tr 
			var  trdom;
			var  domId ="";  //id 值
			var  trType ="";  //tr 类型 0,地市公司 1，供电所
			var  psOrgId ="-1";
			if("psOrgNo"==orgType){
				trdom = $("#"+mapData[j].DW).parent();
				domId = mapData[j].DW+"";
				trType =0;
			}else{
				trdom = $("#"+mapData[j].DW);	
				domId = mapData[j].DW+"";
				trType =1;
				psOrgId = thisOrgName;
			}
		
		    $(trdom).find('td').eq(2).html("<a href='javascript:void(0);' onclick='toDetailPage(\""+domId+"\",1,"+trType+","+psOrgId+")' >"+colu1+"</a>");
		    $(trdom).find('td').eq(3).html("<a href='javascript:void(0);' onclick='toDetailPage(\""+domId+"\",2,"+trType+","+psOrgId+")' >"+colu2+"</a>");
		    $(trdom).find('td').eq(4).html(colu3);
		    $(trdom).find('td').eq(5).html("<a href='javascript:void(0);' onclick='toDetailPage(\""+domId+"\",3,"+trType+","+psOrgId+")' >"+colu4+"</a>");
		    $(trdom).find('td').eq(6).html(colu5);
		}; 
		break;
		case 2:
		for(var j=0;j<mapData.length;j++){
		var  colu6 = mapData[j].COLU6;
		var  colu7 = mapData[j].COLU7;
		var  colu8 = mapData[j].COLU8;
		var  colu9 = mapData[j].COLU9;
		//当前Tr 
		var  trdom;
		var  domId ="";  //id 值
		var  trType ="";  //tr 类型 0,地市公司 1，供电所
		var  psOrgId ="-1";
		if("psOrgNo"==orgType){
			trdom = $("#"+mapData[j].DW).parent();
			domId = mapData[j].DW+"";
			trType =0;
		}else{
			trdom = $("#"+mapData[j].DW);	
			domId = mapData[j].DW+"";
			trType =1;
			psOrgId = thisOrgName;
		}
		$(trdom).find('td').eq(7).html("<a href='javascript:void(0);' onclick='toDetailPage(\""+domId+"\",4,"+trType+","+psOrgId+")' >"+colu6+"</a>");
	    $(trdom).find('td').eq(8).html( colu7 );
	    $(trdom).find('td').eq(9).html("<a href='javascript:void(0);' onclick='toDetailPage(\""+domId+"\",5,"+trType+","+psOrgId+")' >"+colu8+"</a>");
	    $(trdom).find('td').eq(10).html( colu9 );
		   }; 
		break;	
		case 3:
			for(var j=0;j<mapData.length;j++){
				var  colu10 = mapData[j].COLU10;
				var  colu11 = mapData[j].COLU11;
				//当前Tr 
				var  trdom;
				var  domId ="";  //id 值
				var  trType ="";  //tr 类型 0,地市公司 1，供电所
				var  psOrgId ="-1";
				if("psOrgNo"==orgType){
					trdom = $("#"+mapData[j].DW).parent();
					domId = mapData[j].DW+"";
					trType =0;
				}else{
					trdom = $("#"+mapData[j].DW);	
					domId = mapData[j].DW+"";
					trType =1;
					psOrgId = thisOrgName;
				}
				$(trdom).find('td').eq(11).html( colu10 );
				$(trdom).find('td').eq(12).html( colu11 );
			}; 
		break;	
		case 4:
			for(var j=0;j<mapData.length;j++){
				var  colu12 = mapData[j].COLU12;
				var  colu13 = mapData[j].COLU13;
				var  colu14 = mapData[j].COLU14;
				var  colu15 = mapData[j].COLU15;
				//当前Tr 
				var  trdom;
				var  domId ="";  //id 值
				var  trType ="";  //tr 类型 0,地市公司 1，供电所
				var  psOrgId ="-1";
				if("psOrgNo"==orgType){
					trdom = $("#"+mapData[j].DW).parent();
					domId = mapData[j].DW+"";
					trType =0;
				}else{
					trdom = $("#"+mapData[j].DW);	
					domId = mapData[j].DW+"";
					trType =1;
					psOrgId = thisOrgName;
				}
				$(trdom).find('td').eq(13).html("<a href='javascript:void(0);' onclick='toDetailPage(\""+domId+"\",6,"+trType+","+psOrgId+")' >"+colu12+"</a>");
				$(trdom).find('td').eq(14).html( colu13 );
				$(trdom).find('td').eq(15).html("<a href='javascript:void(0);' onclick='toDetailPage(\""+domId+"\",7,"+trType+","+psOrgId+")' >"+colu14+"</a>");
				$(trdom).find('td').eq(16).html( colu15 );
			}; 
		break;	
		}
		}
	}); 
}

function doData(){
	var  datas = queryListData("psOrgNoAll","",1);
	if(datas!=undefined){
	//创建空的tr数据
	var  html = createDataTr(datas);
	$("#tb_body").html(html); 
	}
    //异步查询给空的tr数据赋值
	queryTrData("psOrgNo","",1);
	queryTrData("psOrgNo","",2);
	queryTrData("psOrgNo","",3);
	queryTrData("psOrgNo","",4);
	
	   //给td 绑定事件
	   $(".tr_linked").click(function(){
		var tr_id = $(this).attr("id");
		var current_tr = $("#"+tr_id).parent();
		var orgName = tr_id;
		var parent_bdy = $(current_tr).parent();
		var  tr_inner = $("#tb_body").find(".tr_inner");
		//当前没有展开的
		if(tr_inner.length==0){
			   var orgDatas = queryorgs(orgName);
			   //伸展
			   $(current_tr).find("i").html("-&nbsp;&nbsp;");
			  //构造空的tr
			   var trHtml = createNullTr(orgDatas);
			   $(current_tr).after(trHtml);
			   $(".tr_inner").slideDown("slow");
			   //异步获取数据
			   queryTrData("pStationNo",orgName,1);
			   queryTrData("pStationNo",orgName,2);
			   queryTrData("pStationNo",orgName,3);
			   queryTrData("pStationNo",orgName,4);
		}else{
		   //有展开的	
		  //如果点击的是展开的tr,则收缩当前tr就行了
			var nextTr = $(current_tr).next("tr");
			var nextClass;
			//有下一个tr 
			if(nextTr.length!=0){
			nextClass =	$(nextTr).attr("class");
			        
                     if(nextClass=="tr_inner"){
                    	//收缩当前tr 就行了 
              		   $(current_tr).find("i").html("+&nbsp;&nbsp;");
              		   $(".tr_inner").slideUp("slow");
              		   $(".tr_inner").remove(); 
                     }else{
                      //收缩其他tr ,展开当前tr	 
                    	$("#tb_body").find("i").html("+&nbsp;&nbsp;");
             		    $(".tr_inner").slideUp("slow");
             		    $(".tr_inner").remove();	
             		   var orgDatas = queryorgs(orgName);
        			   //伸展
        			   $(current_tr).find("i").html("-&nbsp;&nbsp;");
        			  //构造空的tr
        			   var trHtml = createNullTr(orgDatas);
        			   $(current_tr).after(trHtml);
        			   $(".tr_inner").slideDown("slow");
        			   //异步获取数据
        			   queryTrData("pStationNo",orgName,1);
        			   queryTrData("pStationNo",orgName,2);
        			   queryTrData("pStationNo",orgName,3);
        			   queryTrData("pStationNo",orgName,4);
                     }			      
			
			}else{
			//没有下一个tr,则收缩其他tr ,展开当前tr	
			$("#tb_body").find("i").html("+&nbsp;&nbsp;");
		    $(current_tr).find("i").html("+&nbsp;&nbsp;");
		    $(".tr_inner").slideUp("slow");
		    $(".tr_inner").remove();	
		    var orgDatas = queryorgs(orgName);
			   //伸展
			   $(current_tr).find("i").html("-&nbsp;&nbsp;");
			  //构造空的tr
			   var trHtml = createNullTr(orgDatas);
			   $(current_tr).after(trHtml);
			   $(".tr_inner").slideDown("slow");
			   //异步获取数据
			   queryTrData("pStationNo",orgName,1);
			   queryTrData("pStationNo",orgName,2);
			   queryTrData("pStationNo",orgName,3);
			   queryTrData("pStationNo",orgName,4);
			}
		  //如果点击的是其他tr ,则收缩一切tr_inner 并展开当前tr下的tr_inner	
		}
	})
}

//创建空的地市公司TR数据
function createDataTr(datas){
	
	var html="";
	for(var i=0;i<datas.length;i++){
		html+='<tr class="tr_outer">';
		html+='<td class="td1">'+util_str_getOldIndex(util_str_rmnull(i+1))+'</td>';
		html+='<td class="tr_linked"  id="'+datas[i].PSORGNO+'"><i class="icon-org">+&nbsp;&nbsp;</i><a  class="a-org" href="#" >'+orgObject[util_str_rmnull(datas[i].PSORGNO)]+'</a></td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>'; 
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</td>';
		html+='<td class="td7">0</tr>';
	}  
	return  html;
	
}
//创建地市公司下属供电所的空数据 tr
function createNullTr(datas){
	 var  htmltrs ="";
	 for(var i=0;i<datas.length;i++){
	   htmltrs += "<tr class='tr_inner' style='display:none;' id='"+util_str_rmnull(datas[i].PSSTATIONNO)+"' >";
	   htmltrs += "<td class='td1'>"+(i+1)+"</td>";
	   htmltrs += "<td class='td2'>"+util_str_rmnull(datas[i].PSSTATIONNO)+"</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "<td class='td7'>0</td>";
	   htmltrs += "</tr> ";
	 }
	return  htmltrs;
}

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



//点击查询入口方法
var conditionQuery = function(){
	//$(".pageIndex").val(1);
	$(".loadDiv").show();
	doData();
	 $(".loadDiv").hide();
}	
