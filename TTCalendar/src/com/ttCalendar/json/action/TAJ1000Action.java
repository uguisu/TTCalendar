/*
 * ttCalendar
 */
package com.ttCalendar.json.action;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import com.ttCalendar.core.BaseAction;

/**
 * TAJ1000Action Get system current date
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
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd", Locale.PRC);
		currentDate = LocalDate.now().format(dtf);
		
		return SUCCESS;
	}
	
	public String getCurrentDate() {
		return currentDate;
	}
	public void setCurrentDate(String currentDate) {
		this.currentDate = currentDate;
	}
}
