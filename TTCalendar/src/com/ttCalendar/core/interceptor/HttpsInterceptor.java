/*
 * ttCalendar
 */
package com.ttCalendar.core.interceptor;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.util.logging.Logger;
import com.opensymphony.xwork2.util.logging.LoggerFactory;
import com.ttCalendar.TTCalendarStaticValue;

/**
 * HttpsInterceptor Verify whether server use HTTPS(SSL)
 * @author hexin0614@gmail.com
 */
public class HttpsInterceptor extends TTCalendarAbstractInterceptor {

    private static final long serialVersionUID = 3075737476427710745L;

    protected static final Logger LOG = LoggerFactory.getLogger(HttpsInterceptor.class);

	/**
     * HttpsInterceptor
     */
	public HttpsInterceptor() {
	    LOG.info("Loading HttpsInterceptor", new String[]{""});
	}

	/*
	 * (non-Javadoc)
	 * @see com.ttCalendar.core.interceptor.TTCalendarAbstractInterceptorProxy#doIntercept(com.opensymphony.xwork2.ActionInvocation)
	 */
	@Override
	public String doIntercept(ActionInvocation invocation) throws Exception {

		final String result;

		// Get HttpServletRequest
		HttpServletRequest request = ServletActionContext.getRequest();

		if (!TTCalendarStaticValue.VERIFY_INTERCEPTOR_HTTPS.equals(
				request.getScheme().trim().toUpperCase())) {
			// Verify failed
			result = TTCalendarStaticValue.VERIFY_INTERCEPTOR_FORBIDDEN;
		} else {
			// Verify passed
			result = invocation.invoke();
		}

		// For GC
		request = null;

		return result;
	}
}
