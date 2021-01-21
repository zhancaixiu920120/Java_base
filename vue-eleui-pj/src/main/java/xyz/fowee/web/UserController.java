package xyz.fowee.web;
 
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

 
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import xyz.fowee.utils.AjaxResult;
import xyz.fowee.utils.StringUtils;


import xyz.fowee.dao.UserDao;
import xyz.fowee.pojo.User;
 
/**
 * 用户控制器
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {
	Logger logger = LoggerFactory.getLogger(UserController.class);
    @Resource
    private UserDao userDao;
 
    @RequestMapping("/view")
    public String view() {
        return "main/login";
    }
 
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ModelAndView login(User model, HttpSession session) {
        User user = userDao.findByUsername(model.getUsername());
 
        if (user == null || !user.getPassword().equals(model.getPassword())) {
            return new ModelAndView("redirect:/pages/login.jsp");
        } else {
            session.setAttribute("user", user);
            ModelAndView mav = new ModelAndView();
            mav.setViewName("pages/index");
            return mav;
        }
    }
    
    
    @RequestMapping("/loginout")
    @ResponseBody
    public AjaxResult login(HttpServletRequest request, HttpServletResponse response, User loginDto) throws Exception{

        if(loginDto == null || StringUtils.isBlank(loginDto.getUsername()) || StringUtils.isBlank(loginDto.getPassword())){
            return AjaxResult.error("用户名或密码不能为空");
        }
        UsernamePasswordToken token = new UsernamePasswordToken(loginDto.getUsername(),loginDto.getPassword().toCharArray());
        Subject subject = SecurityUtils.getSubject();
        try{
            subject.login(token);
        }catch (Exception e){
            logger.info("登录失败，失败原因：[{}]", e.getMessage());
            e.printStackTrace();
            return AjaxResult.error("登录失败，请检查用户名和密码是否正确！");
        }
        return AjaxResult.success("success");
    }
}