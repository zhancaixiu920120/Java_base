<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>demo layout</title>
        <!-- 引入jQuery的js -->
        <script type="text/javascript" src="../js/jquery.min.js"></script>
        <!-- 引入jQuery easyUI的js -->
        <script type="text/javascript" src="../js/jquery.easyui.min.js"></script>
        <!-- 引入 国际化的js -->
        <script type="text/javascript" src="../js/easyui-lang-zh_CN.js"ng-zh_CN.js"></script>
        <!-- 引入图片样式 -->
        <link rel="stylesheet" type="text/css" href="../themes/icon.css"></link>
        <!-- 引入默认样式 -->
        <link rel="stylesheet" type="text/css" href="../themes/default/easyui.css"></link>
    </head>
    <body>
        <!-- 使用easyui的layout布局 -->
        <div class="easyui-layout" data-options="fit:true">
            <!-- easyui在data-options配置配置 -->
            <!-- 只有center区域是必须的 -->
            <div data-options="region:'east',title:'东部'" style="width:200px;">东部</div>
            <div data-options="region:'west',title:'西部'" style="width:200px;">
                <!-- 可折叠面板accordion -->
                <!-- fit 属性，使得当前div大小占满 父容器 -->
                <div class="easyui-accordion" data-options="fit:true">
                    <!-- 每一个div就是一个面板 -->
                    <!-- 通过iconCls设置图标，找icon.css中定义的类 -->
                    <div data-options="title:'基本功能',iconCls:'icon-mini-add'">可折叠面板1</div>
                    <div data-options="title:'高级功能',iconCls:'icon-mini-add'">可折叠面板2</div>
                    <div data-options="title:'管理员功能',iconCls:'icon-mini-add'">可折叠面板3</div>
                </div>
            </div>
            <div data-options="region:'south',title:'南部'" style="height:100px;">南部</div>
            <div data-options="region:'north',title:'北部'" style="height:100px;">北部
            <h3>欢迎，${user.username }</h3>
            </div>
            <div data-options="region:'center',title:'中部'">
                <!-- 选项卡tab 面板 -->
                <div class="easyui-tabs" data-options="fit:true">
                    <!-- 这里的每一个div就是一个选项卡 -->
                    <div data-options="title:'tab1'">tab标签面板1</div>
                    <!-- closable 可关闭 -->
                    <div data-options="title:'tab2',closable:true">tab标签面板2</div>
                    <div data-options="title:'tab3',closable:true">tab标签面板3</div>
                    <div data-options="title:'tab4',closable:true">tab标签面板4</div>
                </div>
            </div>
        </div>
    </body>
</html>