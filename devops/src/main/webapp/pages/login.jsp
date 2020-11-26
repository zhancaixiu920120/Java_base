<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>企业信息管理系统-登录</title>
	<link href="../css/miniui.css" rel="stylesheet" type="text/css" />
	 <script src="../js/jquery.min.js" type="text/javascript"></script>
    <script src="../js/miniui.js" type="text/javascript"></script>
   
    
	<!-- base需要放到head中 -->    
    <base href=" <%=basePath%>">   
 </head>
 
 <body>
    	<td style="width:100%;">
                        <a class="mini-button" iconCls="icon-add" onclick="add()">派单</a>
                        <a class="mini-button" iconCls="icon-add" onclick="edit()">回退</a>
                        <a class="mini-button" iconCls="icon-remove" onclick="shenhe()">待审核</a>       
                        <a class="mini-button" iconCls="icon-remove" onclick="cuiban_pd()">催办工单</a>       
                        <a class="mini-button" iconCls="icon-remove" onclick="cuiban_info()">催办工单信息</a>       
                        <a class="mini-button" iconCls="icon-remove" onclick="gd_info()">工单详情</a>       
       </td>
 	
 </body>
  <script type="text/javascript">
        function edit() {
            
                mini.open({
                    url: "pages/fq_huitui.jsp",
                    title: "回退", width: 1000, height: 700,
                    onload: function () {
                        var iframe = this.getIFrameEl();
                        var data = { action: "edit", id:'12' };
                    },
                    ondestroy: function (action) {
                        
                    }
                });
        }
 function add() {
            
            mini.open({
                url:  "pages/fq_paidan.jsp",
                title: "派单",width: 1000, height: 700,
                onload: function () {
                },
                ondestroy: function (action) {

                }
            });
        }
 function shenhe() {
            
            mini.open({
                url:  "pages/fq_daishenhe.jsp",
                title: "回单审核",width: 1000, height: 1000,
                onload: function () {
                },
                ondestroy: function (action) {

                }
            });
        }
 
 function cuiban_pd() {
            
            mini.open({
                url:  "pages/fq_cuiban_pd.jsp",
                title: "派单",width: 1000, height: 650,
                onload: function () {
                },
                ondestroy: function (action) {

                }
            });
        }
 function cuiban_info() {
            
            mini.open({
                url:  "pages/fq_cuiban_info.jsp",
                title: "工单详情",width: 1000, height: 830,
                onload: function () {
                },
                ondestroy: function (action) {

                }
            });
        }
 function gd_info() {
            
            mini.open({
                url:  "pages/fq_gd_info.jsp",
                title: "工单详情",width: 1000, height: 1200,
                onload: function () {
                },
                ondestroy: function (action) {

                }
            });
        }
    </script>
</html>       