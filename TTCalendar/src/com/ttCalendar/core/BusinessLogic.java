/*
 * ttCalendar
 */
package com.ttCalendar.core;

import com.ttCalendar.core.BaseBean;

/**
 * BusinessLogic
 * @author hexin0614@gmail.com
 */
public interface BusinessLogic {
	
	/**
	 * Main process method
	 * @param inBean Customer data
	 * @return Customer data
	 */
	BaseBean process(BaseBean inBean);
}
