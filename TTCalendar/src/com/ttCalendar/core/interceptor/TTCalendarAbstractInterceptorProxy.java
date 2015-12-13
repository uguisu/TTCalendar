/*
 * ttCalendar
 */
package com.ttCalendar.core.interceptor;

import com.opensymphony.xwork2.ActionInvocation;

/**
 * TTCalendar AbstractInterceptor Proxy
 * @author hexin0614@gmail.com
 */
public interface TTCalendarAbstractInterceptorProxy {

	/**
	 * Proxy method for invoke Intercept()
	 * @param invocation ActionInvocation
	 * @return forward path
	 * @throws Exception Exception
	 */
	String doIntercept(ActionInvocation invocation) throws Exception;
}
