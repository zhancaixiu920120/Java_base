<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>工程进度管理</title>
<link rel="stylesheet" href="css/job_base.css"> <!--初始化文件-->
<link rel="stylesheet" href="css/job_menu.css"> <!--主样式-->
<script src="../../../js/jquery-1.9.1.min.js"></script> <!--控制js-->
<script type="text/javascript" src="/sgpssc//cq_project/com/tellhow/js/cq_str_util.js"></script>
<script type="text/javascript" src="/sgpssc/cq_project/com/tellhow/minijs/boot.js" ></script>

</head>
<body>
<div class="loadDiv">
			<center>
				<img src="/sgpssc/cq_project/com/tellhow/img/loading.gif">
			</center>
		</div>
<div id="menu">
   <div id="datechecked">
    <div id="week" class="selector click-selector" style="margin-left: 0%">周</div>
    <div id="month" class="selector">月</div>
    <div id="season" class="selector">季</div>
    <div id="year"  class="selector">年</div>
    <i class="ui-icon-plus"></i>
   </div>
   <div id="sh_condition">
       <table id="searchtb">
          <tr>
            <td> <span class="conditionsSpan">时间始：</span></td>
            <td><input value="" id = "time1" class="mini-datepicker" style="width: 170px"  showOkButtom = 'true' /></td>
            <td><span class="conditionsSpan">至：</span></td>
	        <td><input id = "time2" class="mini-datepicker"  style="width: 170px" showOkButtom = 'true' /></td>
            <td>&emsp;&emsp;<span class="conditionsSpan">工程类型：</span></td>
            <td><input class="mini-combobox" id="lineName" style="width: 170px;" emptytext="请选择..." data="[{id:'01',text:'有外线(架空)无掘路'},{id:'02',text:'有外线(电缆)无掘路'},{id:'03',text:'低压衍生的高压'},{id:'04',text:'有外线(架空)有掘路'},{id:'05',text:'有外线(电缆)有掘路'},{id:'06',text:'无工程'}]" /></td>
            <td>&emsp;&emsp;&emsp;&emsp;<button type="button" class="shbutton" onclick="conditionQuery()" >查&emsp;询</button></td>
          <!--   <td>&emsp;&emsp;<button type="button" class="shbutton" >导&emsp;出</button></td> -->
          </tr>
       </table>
       <input class="mini-textbox"  id="sys_org_id"  value=""   style="display: none;" />
       <div id="lines">
       <div align="center" style="border-top-width: 1pt; border-top-style: solid; border-top-color: rgb(204, 204, 204); margin-top: 0px; background: rgb(255, 255, 255);">
       </div>
       </div>
   </div>
   <div id="dataTitle"  style="float: left;height:125px;width: 100%;overflow-y:scroll;" >
   <table class="tbdate" cellpadding="8" bordercolor="#EFEFEF"  border="1"  cellspacing="0" >
     <thead> 
     <tr id="top_tr">
     <td class="td1" rowspan="2">序号</td> 
     <td class="td2" rowspan="2">&emsp;&nbsp;单位&emsp;&nbsp;</td> 
     <td class="td7"  rowspan="2">接单总数</td>   
     <td colspan="4">工程完工数（运检流程）</td> 
     <td colspan="4">完工数（工单整体流程）</td> 
     <td colspan="2">平均时长（天）</td> 
     <td colspan="4">超时数量</td> 
     </tr>
     
     <tr>
     <td class="td7" >已完工总数</td>     
     <td class="td7">完工率</td>     
     <td class="td7">未完工总数</td>     
     <td class="td7" >未完工率</td>  
            
     <td class="td7" >已完工总数</td>    
     <td class="td7" >完工率</td>     
     <td class="td7" >未完工总数</td>     
     <td class="td7" >未完工率</td>  
        
     <td class="td7" >获得电力平均时长</td>     
     <td class="td7" >工程完工平均时长</td>  
        
     <td class="td7" >超时总数</td>     
     <td class="td7" >总超时率</td>     
     <td class="td7" >其中工程超时数</td>     
     <td class="td7" >工程超时率</td>     
     </tr>
     </thead>
   </table> 
   </div>
   <div id="datacontent"  style="float: left;width: 100%;overflow-y:scroll; " >
   <table class="tbdate" cellpadding="8" bordercolor="#EFEFEF"  border="1"  style="margin-top: 0%;"  cellspacing="0" >
     <tbody id="tb_body">
     </tbody>
   </table> 
   </div>
</div>
<script src="js/fnc.js"></script> <!--控制js-->
<script src="js/job_menu.js"></script> <!--控制js-->


</body>
</html>