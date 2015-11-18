/*
 * ttCalendar
 */
package com.ttCalendar.core;

/**
 * ActionDefaultMethod
 * @author hexin0614@gmail.com
 */
public interface ActionDefaultMethod {

	/**
	 * To avoid default [execute()] method,
	 * each action should use this interface.
	 * @return Result path
	 */
	String process();
}
