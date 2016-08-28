/*!
 * TTCalendar JavaScript
 * Copyright 2015 hexin0614@gmail.com
 */
function drawMonthView() {
	// Clean current view
	$('#mainCalendarTableWrap').empty();
	
	// [1] append base DIV element
	$('#mainCalendarTableWrap').append("<div class='mainCalendarTable' id='mainCalendarTable'></div>");
	// [2.1] append header
	$('#mainCalendarTable').append("<div class='lineHead' id='mainCalendarTableWeekdayName'></div>");
	$('#mainCalendarTableWeekdayName').append("<table id='CalendarTablelineHead' class='CalendarTableBaseStyle'><tr>" +
		"<td class='columnBaseStyle'>Sun</td>" +
		"<td class='columnBaseStyle'>Mon</td>" +
		"<td class='columnBaseStyle'>Tue</td>" +
		"<td class='columnBaseStyle'>Wed</td>" +
		"<td class='columnBaseStyle'>Thu</td>" +
		"<td class='columnBaseStyle'>Fri</td>" +
		"<td class='columnBaseStyle'>Sat</td>" +
		"</tr></table>");
	
	// [2.2] append calendar line
	var intRow = 1;
	var intCol = 0;
	var strEachRow = "";
	
	for(intRow = 1; intRow <= 6; intRow++) {
		
		strEachRow += "<div id='line" + intRow + "' class='normalLine'>";
		strEachRow += "<table id='CalendarTableline" + intRow + "' class='CalendarTableBaseStyle'><tr>";
		for(intCol = 0; intCol <= 6; intCol++) {
			strEachRow += "<td class='columnBaseStyle' id='normalLine" + (intRow - 1) + intCol + "'></td>";
		}
		
		strEachRow += "</tr></table></div>";
	}
	
	$('#mainCalendarTable').append(strEachRow);
}