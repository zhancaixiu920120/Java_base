<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>员工面板</title>
    <link href="../css/cq_view_css.css" rel="stylesheet" type="text/css" />
    <link href="fq_css.css" rel="stylesheet" type="text/css" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" /></script>
    <script src="../minijs/boot.js" type="text/javascript"> </script>
    <style type="text/css">
    html, body
    {        
        padding:0;
        margin:0;
        border:0;
        height:100%;
        overflow:hidden;
    }
    </style>
</head>
<body>    
    <form id="form1" method="post">
        <fieldset style="border:solid 1px #aaa;padding:3px;">
            <legend>催办工单信息</legend>
            <div style="padding:5px;">
        <table cellpadding="1" cellspacing="7" style="width:100%;">
            <tr>
                <td >
                 <label>工单编号:</label>
                </td>
                <td >    
                    <input style="width:165px" name="name" class="mini-textbox" required="true"/>
                </td>
                <td > <label>客户编号:</label></td>
                <td >    
                    <input style="width:165px" name="name" class="mini-textbox" required="true"/>
                </td>
                <td > <label>客户名称:</label></td>
                <td >    
                    <input style="width:165px" name="name" class="mini-textbox" required="true"/>
                </td>
                
            </tr>
            <tr>
                <td style="width: 85px"> <label>受理时间:</label></td>
                <td >    
                    <input style="width:165px" name="birthday" class="mini-datepicker" required="true" emptyText="请选择日期"/>
                </td>
                <td style="width: 85px"> <label>业务结办时间:</label></td>
                <td >    
                    <input style="width:165px" name="birthday" class="mini-datepicker" required="true" emptyText="请选择日期"/>
                </td>
                <td style="width: 85px"> <label>所属地市:</label></td>
                <td >    
                        <input style="width:165px" name="dept_id" class="mini-combobox" valueField="id" textField="name" 
                            url=""
                            onvaluechanged="onDeptChanged" required="true"
                             emptyText="请选择单位"
                            />
                    </td>
            </tr>
            <tr>
                <td style="width: 85px"> <label>联系电话:</label></td>
                <td>    
                    <input style="width:165px" name="name" class="mini-textbox" required="true"/>
                </td>
                <td style="width: 85px"> <label>被催办工单编号:</label></td>
                <td>    
                    <input style="width:165px" name="name" class="mini-textbox" required="true"/>
                </td>
                 <td style="width: 85px"> <label>被催办单位:</label></td>
                <td >    
                    <input style="width:165px" name="country" class="mini-combobox" />
                </td>
            </tr>     
            <tr>
                <td style="width: 85px"> <label>催办时间:</label></td>
                <td >    
                    <input style="width:165px" name="birthday" class="mini-datepicker" required="true" emptyText="请选择日期"/>
                </td>
                <td style="width: 85px"> <label>催办原因:</label></td>
                <td>    
                    <input style="width:165px" name="name" class="mini-textbox" required="true"/>
                </td>
            </tr>
            <tr>
                <td style="width: 85px"><label>催办内容:</label></td>
                <td colspan="5">    
                    <input style="width:98%" name="remarks" class="mini-textarea"  />
                </td>
            </tr>          
        </table>            
            </div>
        </fieldset>
        <fieldset style="border:solid 1px #aaa;padding:3px;">
            <legend>派单信息</legend>
            <div style="padding:5px;">
        <table cellpadding="1" cellspacing="7" style="width:100%;">
            <tr>
                <td  style="width: 85px">
                 <label>处理单位:</label>
                </td>
                <td>    
                    <input style="width:165px" name="dept_id" class="mini-combobox" valueField="id" textField="name" 
                            url=""   onvaluechanged="onDeptChanged" required="true"  emptyText="请选择单位" />
                </td>
                 <td style="width: 85px">
                 <label>派单时间:</label>
                 </td>
                <td >    
                    <input style="width:165px" name="birthday" class="mini-datepicker" required="true" emptyText="请选择日期"/>
                </td>
            </tr>
            <tr>
                <td style="width: 85px"><label>备注:</label></td>
                <td colspan="3">    
                    <input style="width:98%" name="remarks" class="mini-textarea"  />
                </td>
            </tr>          
        </table>            
            </div>
        </fieldset>
         <fieldset style="border:solid 1px #aaa;padding:3px;">
            <legend>营销处理信息</legend>
            <div style="padding:5px;">
        <table cellpadding="1" cellspacing="7" style="width:100%;">
            <tr>
                <td style="width: 85px"> <label>处理单位:</label></td>
                <td >    
                        <input style="width:165px" name="dept_id" class="mini-combobox" valueField="id" textField="name" 
                            url=""
                            onvaluechanged="onDeptChanged" required="true"
                             emptyText="请选择单位"
                            />
                    </td>
                 <td > <label>处理人员:</label></td>
                <td >    
                    <input style="width:165px" name="name" class="mini-textbox" required="true"/>
                </td>    
              <td style="width: 85px"> <label>处理时间:</label></td>
                <td >    
                    <input style="width:165px" name="birthday" class="mini-datepicker" required="true" emptyText="请选择日期"/>
                </td>
               
                
            </tr>
            <tr>
                <td style="width: 85px"> <label>处理状态:</label></td>
                <td >    
                        <input style="width:165px" name="dept_id" class="mini-combobox" valueField="id" textField="name" 
                            url=""
                            onvaluechanged="onDeptChanged" required="true"
                             emptyText="请选择单位"
                            />
                    </td>
                <td style="width: 85px"> <label>是否超时:</label></td>
                <td >    
                        <input style="width:165px" name="dept_id" class="mini-combobox" valueField="id" textField="name" 
                            url=""
                            onvaluechanged="onDeptChanged" required="true"
                             emptyText="请选择单位"
                            />
                    </td>
            </tr>
            <tr>
                <td style="width: 85px"><label>确认意见:</label></td>
                <td colspan="5">    
                    <input style="width:98%" name="remarks" class="mini-textarea"  />
                </td>
            </tr>          
        </table>            
            </div>
        </fieldset>
    </form>
    <fieldset style="border:solid 1px #aaa;padding:3px;">
            <legend>其它信息</legend>
            <div style="padding:5px;">
      <div class="mini-tabs" activeIndex="0"  style="width:100%;height:200px;">
              <div title="派单历史记录">
<div id="datagrid1" class="mini-datagrid" style="width:100%;height: 165px" url="">
    <div property="columns">
        <div type="indexcolumn">序号</div>                
        <div field="loginname" width="120" headerAlign="center" allowSort="true">派单时间</div>    
        <div field="name" width="120" headerAlign="center" allowSort="true">派单人员</div>    
        <div field="loginname" width="120" headerAlign="center" allowSort="true">所属地市</div>    
        <div field="name" width="120" headerAlign="center" allowSort="true">处理单位</div>    
        <div field="loginname" width="120" headerAlign="center" allowSort="true">备注</div>    
    </div>
</div>
              </div>
              <div title="退单历史记录" >
<div id="datagrid1" class="mini-datagrid" style="width:100%;height: 165px" url="">
    <div property="columns">
        <div type="indexcolumn">序号</div>                
        <div field="loginname" width="120" headerAlign="center" allowSort="true">退单路径</div>    
        <div field="name" width="120" headerAlign="center" allowSort="true">退单时间</div>    
        <div field="loginname" width="120" headerAlign="center" allowSort="true">退单人员</div>    
        <div field="name" width="120" headerAlign="center" allowSort="true">原因分类</div>    
        <div field="loginname" width="120" headerAlign="center" allowSort="true">原因子类</div>    
        <div field="name" width="120" headerAlign="center" allowSort="true">退单原因</div>    
    </div>
</div>
              </div>
      </div>           
            </div>
        </fieldset>
         <div style="text-align:center;padding:10px;">               
            <a class="mini-button" onclick="onCancel" style="width:60px;">关闭</a>       
        </div>       
</body>
</html>