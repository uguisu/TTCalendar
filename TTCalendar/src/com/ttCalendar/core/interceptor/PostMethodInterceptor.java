/*
 * ttCalendar
 */
package com.ttCalendar.core.interceptor;

import java.util.Collections;
import java.util.Set;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.util.TextParseUtil;
import com.opensymphony.xwork2.util.logging.Logger;
import com.opensymphony.xwork2.util.logging.LoggerFactory;
import com.ttCalendar.TTCalendarStaticValue;

/**
 * PostMethodInterceptor Verify whether server use POST method
 * @author hexin0614@gmail.com
 */
public class PostMethodInterceptor extends TTCalendarAbstractInterceptor {

    private static final long serialVersionUID = -8328522662043436682L;

    protected static final Logger LOG = LoggerFactory.getLogger(PostMethodInterceptor.class);

    /** Forgive path patterns */
    protected Set<String> forgivePathPatterns = Collections.emptySet();

	/**
     * PostMethodInterceptor
     */
	public PostMethodInterceptor() {
	    LOG.info("Loading PostMethodInterceptor", new String[]{""});
	}

	/*
	 * (non-Javadoc)
	 * @see com.ttCalendar.core.interceptor.TTCalendarAbstractInterceptorProxy#doIntercept(com.opensymphony.xwork2.ActionInvocation)
	 */
	@Override
	public String doIntercept(ActionInvocation invocation) throws Exception {

		final String result;

		boolean isForgivePath = false;

		// Get HttpServletRequest
		HttpServletRequest request = ServletActionContext.getRequest();

		for(String pattern : forgivePathPatterns) {
			if(!isForgivePath) {
				isForgivePath = isForgivePath || Pattern.matches(pattern, request.getServletPath());
			} else {
				// Find some path which should be skipped
				break;
			}
		}

		if (isForgivePath || TTCalendarStaticValue.VERIFY_INTERCEPTOR_METHOD_POST.equals(
				request.getMethod().trim().toUpperCase())) {
			// Verify passed
			result = invocation.invoke();
		} else {
			// Verify failed
			result = TTCalendarStaticValue.VERIFY_INTERCEPTOR_FORBIDDEN;
		}

		// For GC
		request = null;

		return result;
	}

    /**
	 * @return the forgivePathPatterns
	 */
	public Set<String> getForgivePathPatterns() {
		return forgivePathPatterns;
	}
	/**
	 * @param forgivePathPatterns the forgivePathPatterns to set
	 */
	public void setForgivePathPatterns(String forgivePathPatterns) {
		this.forgivePathPatterns = TextParseUtil.commaDelimitedStringToSet(forgivePathPatterns);
	}
}
