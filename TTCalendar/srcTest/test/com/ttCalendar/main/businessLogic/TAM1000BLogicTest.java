/*
 * ttCalendar
 */
package test.com.ttCalendar.main.businessLogic;

import junit.framework.TestCase;

import org.junit.Test;

import com.ttCalendar.main.businessLogic.TAM1000BLogic;

/**
 * TAM1000BLogic Test
 * @author hexin0614@gmail.com
 */
public class TAM1000BLogicTest extends TestCase {
	
	/**
	 * Test 001
	 */
	@Test
	public void test_001() {
		TAM1000BLogic tAM1000BLogic = new TAM1000BLogic();
		assertNull(tAM1000BLogic.process(null));
	}
}
