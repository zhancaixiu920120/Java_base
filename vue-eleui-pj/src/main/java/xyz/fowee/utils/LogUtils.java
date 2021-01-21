package  xyz.fowee.utils;
import java.text.SimpleDateFormat;
import java.util.Date;
/*
 * 日志工具类
 */
public class LogUtils {

	/*
	 * 自定义日志工具类
	 */
	public  static   void  inof(Object cont,Object claz) {
	SimpleDateFormat   sdf  =  new  SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String  className =  claz.getClass().getName();
	String  date  =  sdf.format(new Date());
    StackTraceElement[] stackTrace = new Throwable().getStackTrace();
    int  lines = stackTrace[1].getLineNumber( );
	System.out.println(date+" "+className+"  line:"+lines+" "+cont.toString());
	}
	
	
	
	
}
