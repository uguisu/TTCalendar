/*
 * ttCalendar
 */
package com.ttCalendar.core.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

/**
 * TTCalendar AbstractInterceptor
 * @author hexin0614@gmail.com
 */
@SuppressWarnings("serial")
public abstract class TTCalendarAbstractInterceptor extends AbstractInterceptor implements TTCalendarAbstractInterceptorProxy {

    /** Enable flag */
    protected boolean enable = true;

    /**
     * Is Enabled
     * @return
     */
    protected boolean isEnable() {
		return this.enable;
	}
    /**
     * Set Enabled statues
     * @param enable
     */
    public void setEnable(boolean enable) {
    	this.enable = enable;
    }

    /*
     * (non-Javadoc)
     * @see com.opensymphony.xwork2.interceptor.AbstractInterceptor#intercept(com.opensymphony.xwork2.ActionInvocation)
     */
    @Override
    public String intercept(ActionInvocation invocation) throws Exception {

		// Lock for sync
		final String lock = "";
		final String result;

    	synchronized (lock) {

    		if(isEnable()) {
    			// Parameter "enable" is "TRUE"
    			result = doIntercept(invocation);
    		} else {
    			// Skip TTCalendarAbstractInterceptor
    			result = invocation.invoke();
    		}
    	}
    	return result;
    }
}
