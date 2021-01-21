package xyz.fowee.utils;

public class StringUtils {
 
	
	public static boolean  isBlank(String str) {
		if(null==str||"".equals(str)) {
			return  true;
		}
		return  false;
	}
	
}
