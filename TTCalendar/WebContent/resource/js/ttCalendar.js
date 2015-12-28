/*!
 * TTCalendar JavaScript
 * Copyright 2015 hexin0614@gmail.com
 */

/** Weekday name array */
var WEEK_DAY = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var WEEK_DAY_REORDER = new Array(6, 0, 1, 2, 3, 4, 5);
/** Total amount of days in each month(The first element is an useless element) */
var DAY_AMOUNT_ARRAY = new Array(Number.MIN_VALUE, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

/** Split string for formatDate() */
var DATE_SPLIT_DEFAULT = new Array("", "", "");
var DATE_SPLIT_CN = new Array("年", "月", "日");
var DATE_SPLIT_EN = new Array("/", "/", "");

/** == Global variables == */
/** Array for calendar table */
var calendarTable = new Array();
/** Current displaying year and month */
var displayingYearMonth = "";

function init() {
	
	// [1]Re-calculate cell's height
	$(window).resize(getResizedTable);
	$(document).ready(getResizedTable);
	
	// [2]Get current date from server and draw teh table
	commonPost("json/TAJ1000Action", "", function(jData) {
		drawCalendarTable(jData.currentDate);
	})
	
	// [3] Binding default event as function to page elements
	// [3.1] PrevButton
	$('#mainNavigationPrevButton').bind('click', function(){
		drawCalendarTable(getNextYearMonth(parseInt(displayingYearMonth.substring(0, 4)), parseInt(displayingYearMonth.substring(4, 6)), -1) + "01");
	});
	// [3.2] NextButton
	$('#mainNavigationNextButton').bind('click', function(){
		drawCalendarTable(getNextYearMonth(parseInt(displayingYearMonth.substring(0, 4)), parseInt(displayingYearMonth.substring(4, 6)), 1) + "01");
	});
}

/**
 * Re-calculate cell's height
 */
function getResizedTable() {
	var calHeight = ($(window).height() - 170) / 5;
	$('div.normalLine table.CalendarTableBaseStyle td').css("height", calHeight + "px");
}

/**
 * Common post method
 * @param strUrl Post URL
 * @param strData Parameter list
 * @param funCallBack Callback function
 */
function commonPost(strUrl, strData, funCallBack) {
	$.ajax({
		type: "POST",
		url: strUrl,
		data: strData,
		beforeSend: playAnimationLoading(),
		success: function(jData) {
			// Callback function
			funCallBack(jData);
			// Stop loading animation
			stopAnimationLoading();
		}
	});
}

/**
 * Play loading animation
 */
function playAnimationLoading() {
	
}
/**
 * Stop loading animation
 */
function stopAnimationLoading() {
	
}

/**
 * Draw calendar table by according to a specified date(YYYYMMDD)
 * @param currentDate
 */
function drawCalendarTable(currentDate) {
	
	// Update global displaying year and month
	displayingYearMonth = currentDate.substring(0, 6);
	
	// The first date of month
	var firstDate = displayingYearMonth + "01";
	
	var _yyyyTmp = firstDate.substring(0, 4);
	var _yyyyTmpVal = parseInt(_yyyyTmp);
	var _mmTmp = firstDate.substring(4, 6);
	var _mmTmpVal = parseInt(_mmTmp);
	
	var lengthOfMonth = getLengthOfMonth(_yyyyTmpVal, _mmTmpVal);
	
	// Weekday of the first date
	var weekdayOfFirstDate = getZellerWeekDay(_yyyyTmpVal, _mmTmpVal, 1);
  	// Weekday of the last date
	var weekdayOfLastDate = getZellerWeekDay(_yyyyTmpVal, _mmTmpVal, lengthOfMonth);
	// Split String Array
	var splitStringArray = DATE_SPLIT_CN;
	
	calendarTable = new Array(5);
	var i, j, dayCount = 1;

	// Current month
	// [1]The first week
	calendarTable[0] = new Array(7);
	for(j = weekdayOfFirstDate; j < 7; j++) {
		calendarTable[0][j] = formatDate("", _mmTmpVal, dayCount++, splitStringArray);
	}
	// [2]The following weeks
	for(i = 1; i < 5; i++) {
		calendarTable[i] = new Array(7);
		
		for(j = 0; j < 7; j++) {
			calendarTable[i][j] = formatDate("", _mmTmpVal, dayCount++, splitStringArray);
			if(dayCount > lengthOfMonth) break;
		}
	}
	// [3]Previous month
	var _preYearMonth = getNextYearMonth(_yyyyTmpVal, _mmTmpVal, -1);
	var _preYyyyTmpVal = parseInt(_preYearMonth.substring(0, 4));
	var _preMmTmpVal = parseInt(_preYearMonth.substring(4, 6));
	var _prelengthOfMonth = getLengthOfMonth(_preYyyyTmpVal, _preMmTmpVal);
	for(j = weekdayOfFirstDate - 1; j >= 0; j--) {
		calendarTable[0][j] = formatDate("", _preMmTmpVal, _prelengthOfMonth--, splitStringArray);
	}
	// [4]Next month
	var _nextYearMonth = getNextYearMonth(_yyyyTmpVal, _mmTmpVal, 1);
	var _nextYyyyTmpVal = parseInt(_nextYearMonth.substring(0, 4));
	var _nextMmTmpVal = parseInt(_nextYearMonth.substring(4, 6));
	var _nextlengthOfMonth = getLengthOfMonth(_nextYyyyTmpVal, _nextMmTmpVal);
	i = 1;
	for(j = weekdayOfLastDate + 1; j < 7; j++) {
		calendarTable[4][j] = formatDate("", _nextMmTmpVal, i++, splitStringArray);
	}
	
	// Draw to the page
	var normalLineName = "";
	for(i = 0; i < 5; i++) {
		for(j = 0; j < 7; j++) {
			normalLineName = "#normalLine" + i + j;
			$(normalLineName).html(calendarTable[i][j]);
		}
	}
}

/**
 * Zeller's congruence
 * 
 * h is the day of the week (0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday)
 * q is the day of the month
 * m is the month (3 = March, 4 = April, 5 = May, ..., 14 = February)
 * K the year of the century (year mod 100).
 * J is the zero-based century.
 * 
 * @param intY
 * @param intM
 * @param intD
 * @return
 */
function getZellerWeekDay(intY, intM, intD) {
	
	// Return value
	var RTN = 0;
	
	/** q is the day of the month */
	var q = intD;
	var m = intM;
	m = (m < 3) ? m + 12 : m;
	var y = intY;
	y = (m < 3) ? y - 1 : y;
	var K = y % 100;
	var J = parseInt(y / 100);
	
	RTN = (q + parseInt(13 * (m + 1) / 5) + K + parseInt(K / 4) + parseInt(J / 4) - 2 * J) % 7;
	
	// TODO Debug
//	console.log("==getZellerWeekDay[start]==");
//	console.log("q=" + q);
//	console.log("m=" + m);
//	console.log("y=" + y);
//	console.log("K=" + K);
//	console.log("J=" + J);
//	console.log("RTN=" + RTN);
//	console.log("\n");
	
	return WEEK_DAY_REORDER[RTN];
}

/**
 * Get length Of month
 * @param year
 * @param monthIndex
 * @returns how many days in the month
 */
function getLengthOfMonth(year, monthIndex) {
	
	if(2 != monthIndex) {
		return DAY_AMOUNT_ARRAY[monthIndex]
	} else {
		// Leap year check
		if(0 == (year % 400)) {
			return 29;
		} else if(0 == (year % 4) && 0 != (year % 100)) {
			return 29;
		} else {
			return 28;
		}
	}
}

/**
 * Format date to string
 * @param strYear
 * @param intMonth
 * @param intDay
 * @param splitStringArray
 * @param attachHeadZeroFlag True, if attach "0" to the head; otherwise use space instead. Default is "False".
 */
function formatDate(strYear, intMonth, intDay, splitStringArray, attachHeadZeroFlag) {
	
	var _splitStringArray = (null == splitStringArray || 3 != splitStringArray.length) ? DATE_SPLIT_DEFAULT : splitStringArray;
	var _attachHead = (null == attachHeadZeroFlag || false == attachHeadZeroFlag) ? " " : "0";
	var _month = (10 > intMonth) ? _attachHead + intMonth : "" + intMonth;
	var _day = (10 > intDay) ? _attachHead + intDay : "" + intDay;
	
	return ((null == strYear || "" == strYear) ? "" : strYear + _splitStringArray[0]) + _month + _splitStringArray[1] + _day + _splitStringArray[2];
}

/**
 * Calculate next year and month by offset
 * @param year
 * @param month
 * @param offSet month offset
 * @returns "YYYYMM"
 */
function getNextYearMonth(year, month, offSet) {
	
	var _year = year;
	var _month = month;
	
	_year = _year + parseInt(offSet / 12);
	_month = _month + (offSet % 12);

	if(0 > offSet) {
		// Pre
		if(0 >= _month) {
			_month += 12;
			_year -= 1;
		}
	} else {
		// Next
		if(12 < _month) {
			_month -= 12;
			_year += 1;
		}
	}
	return formatDate(_year, _month, 1, null, true).substring(0, 6);
}