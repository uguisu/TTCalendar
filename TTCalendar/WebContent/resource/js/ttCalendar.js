/*!
 * TTCalendar JavaScript
 * Copyright 2015 hexin0614@gmail.com
 */

function init() {

	// [1]Get current date from server and draw the table
	commonPost("json/TAJ1000Action", "", function(jData) {
		drawCalendarTable(jData.currentDate);
	});
	
	// [2]Re-calculate cell's height
	$(window).resize(getResizedTable);
	
	// [3] Binding default event as function to page elements
	// [3.1] PrevButton
	$('#mainNavigationPrevButton').bind('click', function(){
		drawCalendarTable(getNextYearMonth(parseInt(displayingYearMonth.substring(0, 4)), parseInt(displayingYearMonth.substring(4, 6)), -1) + "01");
	});
	// [3.2] NextButton
	$('#mainNavigationNextButton').bind('click', function(){
		drawCalendarTable(getNextYearMonth(parseInt(displayingYearMonth.substring(0, 4)), parseInt(displayingYearMonth.substring(4, 6)), 1) + "01");
	});
	// [3.3] Bind event
	bindEventWhenSwitchToMonth();
	
	// [3.4] Month button
	$('#mainNavigationMonthButton').bind('click', function(){
    	if(SYSDEBUG) {
    		console.log("Month button");
    	}
    	// Show monthly view
    	$('#mainCalendarTableWrap').show();
    	// bind event
    	bindEventWhenSwitchToMonth();
	});
	// [3.5] Year button
	$('#mainNavigationYearButton').bind('click', function(){
    	if(SYSDEBUG) {
    		console.log("Year button");
    	}
    	// Hide monthly view
    	$('#mainCalendarTableWrap').hide();
    	
    	// bind event
    	bindEventWhenSwitchToYear();
	});
	
}

/**
 * Re-calculate cell's height
 */
function getResizedTable() {
	var calHeight = ($(window).height() - 170) / ttCalendarTemp.weeksInCurrentMonth;
	$('div.normalLine table.CalendarTableBaseStyle td').css("height", calHeight + "px");
	// Notice: For addition cells(rows) in calendar table, they will be extruded out of page but not hidden(or removed)
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
	
	ttCalendarTemp.lengthOfMonth = getLengthOfMonth(_yyyyTmpVal, _mmTmpVal);
	
	// Weekday of the first date
	ttCalendarTemp.weekdayOfFirstDate = getZellerWeekDay(_yyyyTmpVal, _mmTmpVal, 1);
  	// Weekday of the last date
	ttCalendarTemp.weekdayOfLastDate = getZellerWeekDay(_yyyyTmpVal, _mmTmpVal, ttCalendarTemp.lengthOfMonth);
	// Split String Array
	var splitStringArray = DATE_SPLIT_DEFAULT;
	// Calculate how many weeks in current month. Notice: "+0.4" means if the last day of month is just located at the end of
	// the cell of calendar table, then we should not show a "blank" row at the bottom of table.
	ttCalendarTemp.weeksInCurrentMonth = Math.round((ttCalendarTemp.lengthOfMonth + ttCalendarTemp.weekdayOfFirstDate) / 7 + 0.4);
	
	// Debug
	if(SYSDEBUG) {
		console.log(ttCalendarTemp.weeksInCurrentMonth);
		console.log("weekdayOfFirstDate=[" + ttCalendarTemp.weekdayOfFirstDate + "]");
		console.log("weekdayOfLastDate=[" + ttCalendarTemp.weekdayOfLastDate + "]");
	}
	
	calendarTable = new Array(6);
	var i, j, dayCount = 1;

	// Current month
	// [1]The first week
	calendarTable[0] = new Array(7);
	for(j = ttCalendarTemp.weekdayOfFirstDate; j < 7; j++) {
		calendarTable[0][j] = formatDate(null, null, dayCount++, splitStringArray);
	}
	// [2]The following weeks
	for(i = 1; i < 6; i++) {
		calendarTable[i] = new Array(7);
		
		for(j = 0; j < 7; j++) {
			calendarTable[i][j] = formatDate(null, null, dayCount++, splitStringArray);
			if(dayCount > ttCalendarTemp.lengthOfMonth) break;
		}
	}
	// [3]Previous month
	var _preYearMonth = getNextYearMonth(_yyyyTmpVal, _mmTmpVal, -1);
	var _preYyyyTmpVal = parseInt(_preYearMonth.substring(0, 4));
	var _preMmTmpVal = parseInt(_preYearMonth.substring(4, 6));
	var _prelengthOfMonth = getLengthOfMonth(_preYyyyTmpVal, _preMmTmpVal);
	ttCalendarTemp.dayCountOfPreMonth = 0;
	for(j = ttCalendarTemp.weekdayOfFirstDate - 1; j >= 0; j--) {
		calendarTable[0][j] = formatDate(null, null, _prelengthOfMonth--, splitStringArray);
		ttCalendarTemp.dayCountOfPreMonth++;
	}
	// [4]Next month
	var _nextYearMonth = getNextYearMonth(_yyyyTmpVal, _mmTmpVal, 1);
	var _nextYyyyTmpVal = parseInt(_nextYearMonth.substring(0, 4));
	var _nextMmTmpVal = parseInt(_nextYearMonth.substring(4, 6));
	var _nextlengthOfMonth = getLengthOfMonth(_nextYyyyTmpVal, _nextMmTmpVal);
	ttCalendarTemp.dayCountOfNextMonth = 0;
	i = 1;
	for(j = ttCalendarTemp.weekdayOfLastDate + 1; j < 7; j++) {
		calendarTable[ttCalendarTemp.weeksInCurrentMonth - 1][j] = formatDate(null, null, i++, splitStringArray);
		ttCalendarTemp.dayCountOfNextMonth++;
	}

	// Debug
	if(SYSDEBUG) {
		console.log("ttCalendarTemp.dayCountOfPreMonth=[" + ttCalendarTemp.dayCountOfPreMonth + "]");
		console.log("ttCalendarTemp.dayCountOfNextMonth=[" + ttCalendarTemp.dayCountOfNextMonth + "]");
	}
	
	// Draw to the page
	var normalLineName = "";
	for(i = 0; i < 6; i++) {
		for(j = 0; j < 7; j++) {
			normalLineName = "#normalLine" + i + j;
			$(normalLineName).html(calendarTable[i][j]);
			if ((i == 0 && ttCalendarTemp.dayCountOfPreMonth > j) || 
			(i == ttCalendarTemp.weeksInCurrentMonth - 1 && j >= 7 - ttCalendarTemp.dayCountOfNextMonth)) {
				$(normalLineName).addClass("oMonth");
			} else {
				$(normalLineName).removeClass("oMonth");
			}
			
		}
	}
	
	// Update year&month name
	// $("#mainNavigationYearName").html("<tt>" + formatDate(_yyyyTmpVal, _mmTmpVal, null, ["/", "", ""], true) + "</tt>");
	$("#mainNavigationYearName").html(formatDate(_yyyyTmpVal, _mmTmpVal, null, ["/", "", ""], true));
	
	// Re-calculate cell's height
	getResizedTable();
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
	var y = intY;
	y = (m < 3) ? y - 1 : y;
	m = (m < 3) ? m + 12 : m;
	var K = y % 100;
	var J = parseInt(y / 100);
	
	// Original method may cause problem when calculation result is a negative value.
	// Refer: https://en.wikipedia.org/wiki/Zeller%27s_congruence
	RTN = (q + parseInt(13 * (m + 1) / 5) + K + parseInt(K / 4) + 5 + 6 * J) % 7;
	
	// Debug
	if(SYSDEBUG) {
		console.log("<<Call getZellerWeekDay>>");
		console.log("    q=[" + q + "], m=[" + m +"], y=[" + y + "], K=[" + K + "], J=[" + J +"] RTN=[" + RTN + "]");
	}

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
	var _attachHead = (null == attachHeadZeroFlag || false == attachHeadZeroFlag) ? "&nbsp;" : "0";

	var _strYear = (null == strYear || "" == strYear) ? "" : strYear + _splitStringArray[0];
	var _month = (null == intMonth) ? "" : ((10 > intMonth) ? _attachHead + intMonth + _splitStringArray[1] : intMonth + _splitStringArray[1]);
	var _day = (null == intDay) ? "" : ((10 > intDay) ? _attachHead + intDay + _splitStringArray[2] : intDay + _splitStringArray[2]);
	
	return _strYear + _month + _day;
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


function bindEventWhenSwitchToMonth() {
	// [1] Bind wheel event
	$(document).off("mousewheel DOMMouseScroll", mouseWheelEventForYear);
	$(document).on("mousewheel DOMMouseScroll", mouseWheelEventForMonth);
}
function bindEventWhenSwitchToYear() {
	// [1] Bind wheel event
	$(document).off("mousewheel DOMMouseScroll", mouseWheelEventForMonth);
	$(document).on("mousewheel DOMMouseScroll", mouseWheelEventForYear);
}


/**
 * Mouse Wheel Event For Month View
 * @param e event
 */
function mouseWheelEventForMonth(e) {
	
    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome
																								// & ie
	(e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));            // firefox
    
	if(delta > 0) {
		// wheel up
		if(SYSDEBUG) {
			console.log("wheelup");
		}
		drawCalendarTable(getNextYearMonth(parseInt(displayingYearMonth.substring(0, 4)), parseInt(displayingYearMonth.substring(4, 6)), -1) + "01");
	} else if (delta < 0) {
		// wheel down
		if(SYSDEBUG) {
			console.log("wheeldown");
		}
		drawCalendarTable(getNextYearMonth(parseInt(displayingYearMonth.substring(0, 4)), parseInt(displayingYearMonth.substring(4, 6)), 1) + "01");
	}
}

/**
 * Mouse Wheel Event For Year View
 * @param e event
 */
function mouseWheelEventForYear(e) {
	
    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
	(e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
    
	if(delta > 0) {
		// wheel up
		if(SYSDEBUG) {
			console.log("wheelup");
		}
		// TODO
	} else if (delta < 0) {
		// wheel down
		if(SYSDEBUG) {
			console.log("wheeldown");
		}
		// TODO
	}
}