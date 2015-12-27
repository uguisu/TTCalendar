/*
 * ttCalendar
 */
package com.ttCalendar.json.action;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import com.ttCalendar.TTCalendarStaticValue;
import com.ttCalendar.core.BaseAction;

/**
 * TAJ1000Action Get system current date.<br/>
 * [JSON SAMPLE]<br/>
 *     {<br/>
 *         "currentDate":"20151119",<br/>
 *     }
 * @author hexin0614@gmail.com
 */
public class TAJ1000Action extends BaseAction {

	/** Default */
	private static final long serialVersionUID = 8889985359975150113L;

	/** Page variables */
	/** Current date */
	private String currentDate;
	
	/*
	 * (non-Javadoc)
	 * @see com.ttCalendar.core.BaseAction#process()
	 */
	@Override
	public String process() {

		DateTimeFormatter dtf = DateTimeFormatter.ofPattern(
				TTCalendarStaticValue.FORMAT_STYLE_YYYYMMDD, Locale.PRC);
		currentDate = LocalDate.now().format(dtf);
		
		// GC
		dtf = null;
		
		return SUCCESS;
	}
	
	public String getCurrentDate() {
		return currentDate;
	}
	public void setCurrentDate(String currentDate) {
		this.currentDate = currentDate;
	}
}
