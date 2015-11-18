/*
 * ttCalendar
 */
package com.ttCalendar.core;

import com.opensymphony.xwork2.ActionSupport;

/**
 * BaseAction
 * @author hexin0614@gmail.com
 */
@SuppressWarnings("serial")
public abstract class BaseAction extends ActionSupport implements ActionDefaultMethod {

	/*
	 * (non-Javadoc)
	 * @see com.opensymphony.xwork2.ActionSupport#execute()
	 */
	@Override
	public String execute() throws Exception {

		// TODO: Show logs
		// TODO: Exceptions
		// TODO: Proxy security
		
		String RTN = this.process();
		
		return RTN;
		
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.ttCalendar.core.ActionDefaultMethod#process()
	 */
	public abstract String process();
}
