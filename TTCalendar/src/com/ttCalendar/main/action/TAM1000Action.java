/*
 * ttCalendar
 */
package com.ttCalendar.main.action;

import com.ttCalendar.core.BaseAction;
import com.ttCalendar.core.BusinessLogic;
import com.ttCalendar.core.BusinessLogicFactroy;

/**
 * TAM1000Action
 * @author hexin0614@gmail.com
 */
public class TAM1000Action extends BaseAction {

	/** Default */
	private static final long serialVersionUID = -6730841613085472102L;

	/*
	 * (non-Javadoc)
	 * @see com.ttCalendar.core.BaseAction#process()
	 */
	@Override
	public String process() {
		// Create BusinessLogic object
		BusinessLogic prc = BusinessLogicFactroy.create("TAM1000BLogic");

		// TODO Do nothing
		prc.process(null);
		
		// TODO Auto-generated method stub
		return SUCCESS;
	}
}
