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
	 	var consName=mini.get("consName").getValue();
	 	var team=mini.get("team").getValue();
		var consNo= mini.get("consNo").getValue();
		var voltCode= mini.get("voltCode").getValue();
		var psOrgNo= mini.get("psOrgNo").getValue();
		var havePrjCode= mini.get("havePrjCode").getValue();
		var handleTime= (mini.get("handleTime").getFormValue().trim()).replace(new RegExp("-","g"),'/');
		var meterTime= (mini.get("meterTime").getFormValue().trim()).replace(new RegExp("-","g"),'/');
		//分页对象
		var pageNum=mini.get("pageNum").getValue();
		var pageIndex=$(".pageIndex").val();
		var index = $("#extraCondiotion").attr("value");
		if($("#extraConditionDiv").css('isplay')=='block'){
		var hasExtraCondition= mini.get("hasExtraCondition").getValue();
		if("false"==hasExtraCondition){
			index ="";
		} }
		var url="/"+util_str_getProjectName()+"/cq_project/rest/cq/jobdetail/exportExcl?";
		var data=[//数据参数
				{name:'consName',value:consName},{name:'team',value:team},{name:'consNo',value:consNo}
				,{name:'handleTime',value:handleTime},{name:'meterTime',value:meterTime},{name:'index',value:index}
				,{name:'voltCode',value:voltCode},{name:'psOrgNo',value:psOrgNo},{name:'havePrjCode',value:havePrjCode}
				//分页参数及导出全部和单条参数
				,{name:'pageNum',value:pageNum},{name:'pageIndex',value:pageIndex},{name:'exportType',value:exportType}
				];
	   cq_export_exportData(data,url);
	}
	
	var orgChange = function(value){
		var orgNo = mini.get("psOrgNo").getValue();
		mini.get("team").setUrl("/"+util_str_getProjectName()+"/cq_project/rest/cq/jobdetail/getOrg?orgNo="+orgNo);
		if(value==undefined||value==null){
			mini.get("team").setValue(""); 
		}else{
			value = decodeURI(decodeURI(value));
			mini.get("team").setValue(value); 
		}
		            
	}