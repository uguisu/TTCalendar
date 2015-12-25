/*
 * ttCalendar
 */
package com.ttCalendar.json.action;

import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import com.ttCalendar.TTCalendarStaticValue;
import com.ttCalendar.core.BaseAction;

/**
 * TAJ1000Action Get system current date.<br/>
 * [JSON SAMPLE]<br/>
 *     {<br/>
 *         "currentDate":"20151119",<br/>
 *         "lengthOfMonth":"30"<br/>
 *     }
 * @author hexin0614@gmail.com
 */
public class TAJ1000Action extends BaseAction {

	/** Default */
	private static final long serialVersionUID = 8889985359975150113L;

	/** Page variables */
	/** Current date */
	private String currentDate;
	/** Length of current month */
	private int lengthOfMonth;
	
	/*
	 * (non-Javadoc)
	 * @see com.ttCalendar.core.BaseAction#process()
	 */
	@Override
	public String process() {

		DateTimeFormatter dtf = DateTimeFormatter.ofPattern(
				TTCalendarStaticValue.FORMAT_STYLE_YYYYMMDD, Locale.PRC);
		currentDate = LocalDate.now().format(dtf);
		
		Month month = Month.of(Integer.valueOf((currentDate.substring(4, 6))));
		lengthOfMonth = month.length(true);

		// GC
		dtf = null;
		month = null;
		
		return SUCCESS;
	}
	
	public String getCurrentDate() {
		return currentDate;
	}
	public void setCurrentDate(String currentDate) {
		this.currentDate = currentDate;
	}
	public int getLengthOfMonth() {
		return lengthOfMonth;
	}
	public void setLengthOfMonth(int lengthOfMonth) {
		this.lengthOfMonth = lengthOfMonth;
	}
}
