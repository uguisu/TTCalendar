/*
 * ttCalendar
 */
package com.ttCalendar.core.database;

/**
 * Basic DAO bean
 * @author hexin0614@gmail.com
 */
public abstract class DaoBaseBean {
	/** Logic delete flag */
	private String delFlg;
	/**
	 * Get Logic delete flag
	 * @return Logic delete flag
	 */
	public String getDelFlg() {
		return delFlg;
	}
	/**
	 * Set Logic delete flag
	 * @param delFlg Logic delete flag
	 */
	public void setDelFlg(String delFlg) {
		this.delFlg = delFlg;
	}
}
