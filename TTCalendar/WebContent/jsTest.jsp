<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>TTCalendar JS Test</title>
<s:include value="resource/page/common_title.jsp"></s:include>
<link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.0.1.css">
<script src="https://code.jquery.com/qunit/qunit-2.0.1.js"></script>
<script>
	QUnit.test("getZellerWeekDay - First day of month", function(assert) {
		var TyyyyTmpVal = 2016;
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 1, 1), 5);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 2, 1), 1);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 3, 1), 2);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 4, 1), 5);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 5, 1), 0);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 6, 1), 3);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 7, 1), 5);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 8, 1), 1);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 9, 1), 4);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 10, 1), 6);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 11, 1), 2);
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 12, 1), 4);
		// Error case
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 13, 1), 0);
	});
	QUnit.test("getZellerWeekDay - Last day of month", function(assert) {
		var TyyyyTmpVal = 2016;
		assert.equal(getZellerWeekDay(TyyyyTmpVal, 12, 31), 6);
	});
</script>
</head>
<body>
	<div id="qunit"></div>
</body>
</html>
