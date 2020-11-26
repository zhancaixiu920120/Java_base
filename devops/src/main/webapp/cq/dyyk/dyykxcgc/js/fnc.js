var openEquipInfo = function(id,name){
		mini.open({
			targetWindow : window,
			url:"/sgpssc/pwywfz/view_sbhx/page/newSbhx_pb.jsp?pbbh=&byqjh=&pms_id=&pmcs_byqbh="+id,
			title:'【'+name+'】公变情况',
			width:$(window).width()-100,
			height:$(window).height()-40,
			onload:function(){
				/*var iframe = this.getIFrameEl();
				viframe.contentWindow.iniData(type,code,eqname);*/
			}
		});		
	}
   	function exportExcl(exportType){
   	//查询框数据
		var consName= mini.get("consName").getValue();
		var psOrgNo= mini.get("psOrgNo").getValue();
		var time1= (mini.get("time1").getFormValue().trim()).replace(new RegExp("-","g"),'/');
		var time2= (mini.get("time2").getFormValue().trim()).replace(new RegExp("-","g"),'/');
		//分页对象
		var pageNum=mini.get("pageNum").getValue();
		var pageIndex=$(".pageIndex").val();
		var url="/"+util_str_getProjectName()+"/cq_project/rest/cq/jobdetail/exportXCGCExcl?";
		var data=[//数据参数
				{name:'consName',value:consName},{name:'psOrgNo',value:psOrgNo}
				,{name:'time1',value:time1},{name:'time2',value:time2},{name:'pageNum',value:pageNum}
				,{name:'pageIndex',value:pageIndex}
				];
	   cq_export_exportData(data,url);
	}
   	
  //查询数据统一方法
	var  getIPPort = function(){
		var result;
		$.ajax({
			async:false,
			url : "/sgpssc/cq_project/rest/cq/jobdetail/getXCGCJobIPPORT",
			type : "POST",
			error:function(error){
			},
			success : function(data){
				result= data;
			}
		}); 
		return  result;
	}
   
   	var openGCInfo = function(id,name){
   		var ipport = getIPPort();
   	    var  url = ipport+"/EPC/dynamicGongFu/engDataMain?id="+id;
		mini.open({
			targetWindow : window,
			url:url,
			title:'【'+name+'】工程情况',
			width:$(window).width()-100,
			height:$(window).height()-40,
			onload:function(){
				/*var iframe = this.getIFrameEl();
				viframe.contentWindow.iniData(type,code,eqname);*/
			}
		});		
	}
	