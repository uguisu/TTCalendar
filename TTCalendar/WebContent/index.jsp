<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags"%>

<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>TTCalendar</title>
    <s:include value="resource/page/common_title.jsp"></s:include>
</head>
    <body>
        <%-- Basic Frame [Start] --%>
        <div class='mainFrame' id='mainFrame'>
            <%-- Title Bar [Start] --%>
            <div class='mainTitleBar' id='mainTitleBar'>
                <s:include value="resource/page/main/mainTitleBar.jsp"></s:include>
            </div>
            <%-- Title Bar [End] --%>

            <%-- Navigation Bar [Start] --%>
            <div class='mainNavigation' id='mainNavigation'>
                <s:include value="resource/page/main/mainNavigationBar.jsp"></s:include>
            </div>
            <%-- Navigation Bar [End] --%>

            <hr /><%-- Separator line --%>

            <%-- LeftContent Bar [Start] --%>
            <div class='mainLeftContent' id='mainLeftContent'>
                <s:include value="resource/page/main/mainLeftContent.jsp"></s:include>
            </div>
            <%-- LeftContent Bar [End] --%>

            <%-- Footer Bar [Start] --%>
            <div class='mainFooter' id='mainFooter'>
                <s:include value="resource/page/main/mainFooter.jsp"></s:include>
            </div>
            <%-- Footer Bar [End] --%>
        </div>
        <%-- Basic Frame [End] --%>
    </body>
</html>
