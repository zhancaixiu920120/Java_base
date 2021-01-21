package xyz.fowee.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class TestController {
	
	@RequestMapping("/toIndex")
	public String toIndex() {
		return  "index";
	}

}
