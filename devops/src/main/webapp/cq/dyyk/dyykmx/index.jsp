<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="/sgpssc/cq_project/com/tellhow/cq/dyyk/dyykmx/css/cq_view_dyyk_css.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/sgpssc/cq_project/com/tellhow/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="/sgpssc//cq_project/com/tellhow/js/cq_export_uitl.js"></script>
<script type="text/javascript" src="/sgpssc//cq_project/com/tellhow/js/cq_str_util.js"></script>

<script type="text/javascript" src="/sgpssc/cq_project/com/tellhow/minijs/boot.js" ></script> 
<!-- 引入皮肤操作 -->
<!-- <script type="text/javascript" src="/sgpssc/cq_project/com/tellhow/minijs/miniui/miniui.js" ></script>
<link href="/sgpssc/cq_project/com/tellhow/minijs/miniui/themes/default/miniui.css" rel="stylesheet" type="text/css" />
<link href="/sgpssc/cq_project/com/tellhow/minijs/miniui/themes/icons.css" rel="stylesheet" type="text/css" />
<link href="/sgpssc/cq_project/com/tellhow/minijs/miniui/themes/jqueryui-smoothness/skin.css" rel="stylesheet" type="text/css" /> -->
<script type="text/javascript" src="js/fnc.js" ></script>
<script type="text/javascript" src="js/main.js" ></script>
<title>工程明细</title>
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
						    <div class="conditionOne">
								<span class="conditionSpan">供电单位：</span>
								<input class="mini-combobox" id="psOrgNo" style="width: 150px;"   onValuechanged="orgChange()"   emptytext="请选择..."   valueField="id" textField="text"  url="/sgpssc/cq_project/rest/cq/jobdetail/getOrg" />
							</div>
						    <div class="conditionOne">
								<span class="conditionSpan">运维单位：</span>
								<input class="mini-combobox" id="team" style="width: 150px;"   showNullItem="true"  emptytext="请选择..."   valueField="id" textField="text"  />
							</div>
								<div class="conditionOne">
								<span class="conditionSpan">供电电压：</span>
								<input class="mini-combobox" id="voltCode" style="width: 150px;"   showNullItem="true"   emptytext="请选择..."  data="[{id:'交流220V',text:'交流220V'},{id:'交流380V',text:'交流380V'},{id:'10KV及以上',text:'10KV及以上'}]"/>
							</div>
							<div class="conditionOne">
								<span class="conditionSpan">工程名称：</span>
								<div class="mini-textbox" id="consName"  showNullItem="true"  showClose="false" style="width: 150px;" textField="text" valueField="id" >
								</div>
							</div>
							<div class="conditionOne">
								<span class="conditionSpan">用户编号：</span>
								<div class="mini-textbox" id="consNo"  showNullItem="true"  showClose="true" style="width: 150px;" textField="text" valueField="id"  >
								</div>
							</div>
							<div class="conditionOne">
				              <span class="conditionSpan">申请 始：</span>
				              <div id = "handleTime" class="mini-datepicker" style="width: 150px;"  format='yyyy-MM-dd'  ></div>
			               </div>
			               <div class="conditionOne">
					          <span class="conditionSpan">至：</span>
					          <div id = "meterTime" class="mini-datepicker" style="width: 150px;" format='yyyy-MM-dd' ></div> 
			               </div>
			               <div class="conditionOne">
								<span class="conditionSpan">工程类型：</span>
								<div class="mini-combobox" id="havePrjCode"  showNullItem="true"  emptytext="请选择..."  style="width: 150px;" textField="text" valueField="id" data="[{id:'01',text:'有外线(架空)无掘路'},{id:'02',text:'有外线(电缆)无掘路'},{id:'03',text:'低压衍生的高压'},{id:'04',text:'有外线(架空)有掘路'},{id:'05',text:'有外线(电缆)有掘路'},{id:'06',text:'无工程'},{id:'99',text:'其它'}]">
								</div>
							</div>
			               <div class="conditionOne">
								<span class="conditionSpan">业务类型：</span>
								<div class="mini-combobox" id="prType"  showNullItem="true"  emptytext="请选择..."  style="width: 150px;" textField="text" valueField="id" data="[{id:'102',text:'低压非居民新装'},{id:'110',text:'低压非居民增容'},{id:'101',text:'低压居民新装'},{id:'109',text:'低压居民增容'},{id:'104',text:'高压新装'},{id:'111',text:'高压增容 '}]">
								</div>
							</div>
							<div class="conditionOne">
								<span class="conditionSpan">超期：</span>
								<input class="mini-checkbox"    id="isOverTime" checked="false" style="width: 150px;"/>
							</div>
							<div class="conditionOne" id="extraConditionDiv" style="display: none;">
								<span class="conditionSpan" id="extraConditionFlag"></span>
								<input class="mini-checkbox"    id="hasExtraCondition" checked="true"  style="width: 150px;"/>
							</div>
							<div class="conditionOne" style="display: none;">
								<input    id="extraCondiotion" value=""  style="width: 150px;display: none;"/>
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
								<td class="td2">申请编号</td>
								<td class="td3">用户编号</td>
								<td class="td4">工程名称</td>
								<td class="td5">供电电压</td>
								<td class="td6">供电单位</td>
								<td class="td7">运维单位</td>
								<td class="td8">配套情况</td>
								<td class="td24">报装容量</td>
								<td class="td25">所属线路</td>
								<td class="td26">客户意向通电时间</td>
								<td class="td23">业务类型</td>
								<td class="td9">工程时限(天)</td>
								<td class="td10">低压耗时(天)</td>
								<td class="td11">高压耗时(天)</td>
								<td class="td12">总耗时(天)</td>
								<td class="td13"><span >申请时间</span></td>
								<td class="td14"><span >运检接收时间</span></td>
								<td class="td15"><span >联合勘查时间</span></td>
								<td class="td16"><span >物资到货时间</span></td>
								<td class="td17"><span >停电计划确认时间</span></td>
								<td class="td18"><span >行政审批资料准备时长</span></td>
								<td class="td19"><span >工程开工时间</span></td>
								<td class="td20"><span >低压完工时间</span></td>
								<td class="td21"><span >高压完工时间</span></td>
								<td class="td22"><span >装表送电时间</span></td> 
							</tr>
						</table>
					</div>
				</div>
				
				<div class="bodyDataDiv">
					<table class="classdataTbale classdataTbale">
						<tbody class="dataTbale">
						</tbody>
					</table>
				</div>
			<!-- 	<div id="datashows">
				<div id="listDates"> 
				           <div id="menubar"><div id="closebar">×</div></div>
						   <table class="bottomTable bottomdataTbale"> 
						      <tr id="data_tr1">
								<td class="dataTitle"><span >申请时间</span></td>
								<td class="dataVale"><span >运检接收时间</span></td>
								<td  class="dataTitle"><span >联合勘查时间</span></td>
								<td class="dataVale"><span >物资到货时间</span></td>
								<td class="dataTitle"><span >停电计划确认时间</span></td>
								<td class="dataVale"><span >行政审批资料准备时长</span></td>
								<td class="dataTitle"><span >工程开工时间</span></td>
								<td class="dataVale"><span >低压完工时间</span></td>
								<td class="dataTitle"><span >高压完工时间</span></td>
								<td class="dataTitle"><span >装表送电时间</span></td>
			                  </tr>
						      <tr id="data_tr0">
								<td class="dataVale"><div class="dataspan" id="sqsj"></div></td>
								<td class="dataVale"><div class="dataspan" id="yjsj"></div></td>
								<td  class="dataVale"><div class="dataspan" id="kcsj"></div></td>
								<td class="dataVale"><div class="dataspan" id="wzsj"></div></td>
								<td class="dataVale"><div class="dataspan" id="tdsj"></div></td>
								<td class="dataVale"><div class="dataspan" id="xzcaspsj"></div></td>
								<td class="dataVale"><div class="dataspan" id="gckgsj"></div></td>
								<td class="dataVale"><div class="dataspan" id="dywgsj"></div></td>
								<td class="dataVale"><div class="dataspan" id="gywgsj"></div></td>
								<td class="dataVale"><div class="dataspan" id="zbsdsj"></div></td>
			                  </tr>
							</table>
					</div>
				 </div> -->
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