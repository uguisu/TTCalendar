/*
 * ttCalendar
 */
package com.ttCalendar.main.action;

import com.opensymphony.xwork2.ActionSupport;
import com.ttCalendar.core.BusinessLogic;
import com.ttCalendar.core.BusinessLogicFactroy;

/**
 * TAM1000Action
 * @author hexin0614@gmail.com
 */
public class TAM1000Action extends ActionSupport {

	/** Default */
	private static final long serialVersionUID = -6730841613085472102L;

	/*
	 * (non-Javadoc)
	 * @see com.opensymphony.xwork2.ActionSupport#execute()
	 */
	@Override
	public String execute() throws Exception {
		
		// Create BusinessLogic object
		BusinessLogic prc = BusinessLogicFactroy.create("TAM1000BLogic");

		// TODO Do nothing
		prc.process(null);
		
		// TODO Auto-generated method stub
		return SUCCESS;
	}
}
