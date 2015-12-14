<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Oops! Error occured</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/ttCalendar.css" type="text/css" />
</head>
    <body style="background-image: url('${pageContext.request.contextPath}/resource/img/IMG_002.jpg');">
    <div class="warpContainer">
        <table class="messageTable">
            <tr>
                <th rowspan="2" class="messageID">Error</th>
                <td>Oops, there was a problem on our server!</td>
            </tr>
            <tr>
                <td>Please go back to the <a href="https://${pageContext.request.serverName}:8443${pageContext.request.contextPath}">home</a> page or try again later.</td>
            </tr>
        </table>
    </div>
    </body>
</html>
