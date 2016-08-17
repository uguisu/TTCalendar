/*!
 * TTCalendar JavaScript
 * Copyright 2015 hexin0614@gmail.com
 */

/** Weekday name array */
// var WEEK_DAY = new Array(null, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
var WEEK_DAY_REORDER = new Array(0, 1, 2, 3, 4, 5, 6);
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
/** Temp data */
var ttCalendarTemp = {
	/** length of current month */
	lengthOfMonth: 0,
	/** Weekday of the first date */
	weekdayOfFirstDate: 0,
	/** Weekday of the last date */
	weekdayOfLastDate: 0,
	/** Count weeks in current month */
	weeksInCurrentMonth: 0
};

/** Debug flag. TRUE - write log to browser's console */
var SYSDEBUG = false;

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
