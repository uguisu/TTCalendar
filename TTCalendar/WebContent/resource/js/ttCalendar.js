/*!
 * TTCalendar JavaScript
 * Copyright 2015 hexin0614@gmail.com
 */

function init() {
	
	// Binding default event as function to page elements
	
	// TODO: For demo
	$('#mainNavigationPrevButton').bind('click', function(){
		commonPost("json/TAJ1000Action", "", function(jData) {
			alert(jData.currentDate);
		})
	});
	

	// Re-calculate cell's height
	$( window ).resize(getResizedTable);
}

/**
 * Re-calculate cell's height
 */
function getResizedTable() {
	$( '#mainLeftContent' ).append( $(document).height() + "//");
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
