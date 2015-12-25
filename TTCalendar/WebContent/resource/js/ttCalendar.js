/*!
 * TTCalendar JavaScript
 * Copyright 2015 hexin0614@gmail.com
 */

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
		// TODO: PrevButton
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
 * @param dateYYYYMMDD Specified date(YYYYMMDD)
 */
function drawCalendarTable(dateYYYYMMDD) {
	
	// The first date of month
	var firstDate = dateYYYYMMDD.substring(0, 6) + "01";
	
	alert(getZellerWeekDay(firstDate.substring(0, 4), firstDate.substring(4, 6), "01"));
	
	
}

/**
 * Zeller's congruence
 * 
 * 
 * h is the day of the week (0 = Saturday, 1 = Sunday, 2 = Monday, ..., 6 = Friday)
 * q is the day of the month
 * m is the month (3 = March, 4 = April, 5 = May, ..., 14 = February)
 * K the year of the century (year mod 100).
 * J is the zero-based century.
 * 
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
	var q = parseInt(intD);
	var m = parseInt(intM);
	m = (m < 3) ? m + 12 : m;
	var y = parseInt(intY);
	y = (m < 3) ? y - 1 : y;
	var K = y % 100;
	var J = parseInt(y / 100);
	
	RTN = (q + 13 * parseInt((m + 1) / 5) + K + parseInt(K / 4) + parseInt(J / 4) - 2 * J) % 7;
	
	return RTN;
}