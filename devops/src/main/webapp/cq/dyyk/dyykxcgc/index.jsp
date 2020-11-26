<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="/sgpssc/cq_project/com/tellhow/css/cq_view_css.css" rel="stylesheet" type="text/css" />
<link href="css/maincss.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/sgpssc/cq_project/com/tellhow/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="/sgpssc/cq_project/com/tellhow/minijs/boot.js" ></script>
<script type="text/javascript" src="/sgpssc/cq_project/com/tellhow/js/cq_str_util.js" ></script>
<script type="text/javascript" src="/sgpssc/cq_project/com/tellhow/js/cq_export_uitl.js" ></script>
<script type="text/javascript" src="/sgpssc/cq_project/com/tellhow/codejs/cons_code_uitl.js" ></script>
<script type="text/javascript" src="js/fnc.js" ></script>
<script type="text/javascript" src="js/main.js" ></script>
<style type="text/css">
	.clickSpan{
		text-decoration: underline;
		cursor: pointer;
		color: green;
		font-size: 12px;
	}
</style>
<title>低压业扩现场工程</title>
<script type="text/javascript">
</script>
</head>
<body>
		<div class="loadDiv">
			<center>
				<img src="/sgpssc/cq_project/com/tellhow/img/loading.gif">
			</center>
		</div>
		<div class="mainDiv">
				<div class="topDiv">
					<div class="queryDiv">
						<div class="conditionDiv">
							<div class="conditionOne" style="margin-left: 20px;  ">
								<span class="conditionSpan" style="width: 100px;">单体工程名称：</span>
								<div class="mini-textbox" id="consName"  showNullItem="true"  showClose="false" style="width: 150px;" textField="text" valueField="id" >
								</div>
							</div>
						    <div class="conditionOne" style="margin-left: 20px;">
								<span class="conditionSpan" >供电单位：</span>
								<input class="mini-combobox" id="psOrgNo" style="width: 150px;"     emptytext="请选择..."   valueField="id" textField="text"  url="/sgpssc/cq_project/rest/cq/jobdetail/getOrg" />
							</div>
							
							<div class="conditionOne" style="width:230px;">
				              <span class="conditionSpan" style="width:50px">始：</span>
				              <div id = "time1" class="mini-datepicker" style="width: 170px;"  format='yyyy-MM-dd HH:mm:ss'  ></div>
			               </div>
			               <div class="conditionOne">
					          <span class="conditionSpan" style="width:50px">至：</span>
					          <div id = "time2" class="mini-datepicker" style="width: 170px;" format='yyyy-MM-dd HH:mm:ss' ></div>
			               </div>
			                <div class="conditionOne" id="chooseArea">
								 <span class="conditionSpan" id="chooseMonth" >按月</span>
								 <span class="conditionSpan" id="splitLine" >|</span> 
								 <span class="conditionSpan" id="chooseWeek" >按周</span>
							</div>
						</div>
						<div class="conditionBtDiv">
								<div class="bodybtDiv" onclick="conditionQuery()">查询</div>
								<div class="bodybtDiv" onclick="exportExcl('one')">导出当前</div>
								<div class="bodybtDiv" onclick="exportExcl('all')">导出所有</div>
						</div>
					</div>
					
					<div class="titleTableDiv"> 
						<table class="topTable classdataTbale">
							<tr>
								<td class="td1">序号</td>
								<td class="td2">单体工程名称</td>
								<td class="td3">WBS编号</td>
								<td class="td12">供电公司</td>
								<td class="td4">工程状态</td>
								<td class="td5">风险等级</td>
								<td class="td6">开始时间</td>
								<td class="td7">结束时间</td>
								<td class="td8">施工内容</td>
								<td class="td9">工作地点</td>
								
								<td class="td13">施工单位</td>
								<td class="td14">监理单位</td>
								<td class="td15">施工负责人</td>
								<td class="td16">联系方式</td>
								<td class="td17">施工班组人数</td>
								<td class="td18">执行结果</td>
								<td class="td19">现场动态</td>
							</tr>
						</table>
					</div>
				</div>
				
				<div class="bodyDataDiv">
					<table class="classdataTbale">
						<tbody class="dataTbale ">
						</tbody>
					</table>
				</div>
				
				<div class="footDiv">
					<ul>
						<li style="height:16px;width:60px">
							<input class="mini-combobox" onValuechanged="pageSizeChange" id="pageNum" value="20" style="width: 48px;" data="[{'id':'10','text':'10'},{'id':'20','text':'20'},{'id':'30','text':'30'},{'id':'40','text':'40'},{'id':'50','text':'50'},{'id':'100','text':'100'}]">
						</li>
						<li class="splitLine"><img src="/sgpssc/cq_project/com/tellhow/img/pagenavibar_separator.png"></li>
						<li class="pageTd"><img onclick="pageIndex(1)" src="/sgpssc/cq_project/com/tellhow/img/5.1-11.png"></li>
						<li class="pageTd"><img onclick="pageChange(-1)" src="/sgpssc/cq_project/com/tellhow/img/5.1-21.png"></li>
						<li class="splitLine"><img src="/sgpssc/cq_project/com/tellhow/img/pagenavibar_separator.png"></li>
						<li><input type="text" onchange="yschange()" class="pageIndex" style="width:30px;height:15px;margin-left: 5px;" value="1">
						 	<span>/</span>
						 	<span class="sumPag">0</span>
						</li>
						<li class="splitLine"><img src="/sgpssc/cq_project/com/tellhow/img/pagenavibar_separator.png"></li>
						<li class="pageTd"><img onclick="pageChange(1)" src="/sgpssc/cq_project/com/tellhow/img/5.1-31.png"></li>
						<li class="pageTd"><img onclick="pageIndex(-1)" src="/sgpssc/cq_project/com/tellhow/img/5.1-41.png"></li>
						<li class="splitLine"><img src="/sgpssc/cq_project/com/tellhow/img/pagenavibar_separator.png"></li>
						<li style="float: right;margin-right: 15px;">
							<span>当前总记录</span><span class="sumSpan">0</span><span>条，每页显示</span><span class="pageNumSpan">20</span><span>条</span>
						</li>
					</ul>
				</div>
			</div>
	</body>
</html>