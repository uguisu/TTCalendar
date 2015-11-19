/*
 * ttCalendar
 */
package com.ttCalendar.core;

import javax.servlet.ServletContext;

import org.apache.struts2.ServletActionContext;
import org.springframework.web.context.WebApplicationContext;

/**
 * BusinessLogicFactroy
 * @author hexin0614@gmail.com
 */
public class BusinessLogicFactroy {

	/** Private construction */
	private BusinessLogicFactroy() { }

	/**
	 * Create instance
	 * @param strBusinessLogicName Bean name
	 * @return BusinessLogic instance
	 */
	public static BusinessLogic create(String strBusinessLogicName) {

		// Get ServletContext from Java server
		ServletContext context = ServletActionContext.getServletContext();
		// Use "WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE" key to
		// get WebApplicationContext
		WebApplicationContext webContext = (WebApplicationContext) context
				.getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
		
		// Synchronized get bean instance from spring IOC
		synchronized (BusinessLogicFactroy.class) {
			return (BusinessLogic) webContext.getBean(strBusinessLogicName);
		}
	}
}
