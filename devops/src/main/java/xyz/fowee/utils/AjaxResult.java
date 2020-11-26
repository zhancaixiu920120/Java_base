package xyz.fowee.utils;

public class AjaxResult {

	private  String  msg;
	
	private  int  code;

	
	public AjaxResult(String msg, int code) {
		super();
		this.msg = msg;
		this.code = code;
	}
  
	public static  AjaxResult  success(String msg) {
		
		return  new AjaxResult(msg, 200);
	}
	public static  AjaxResult  error(String msg) {
		
		return  new AjaxResult(msg, 400);
	}
	
	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
	
	
}
