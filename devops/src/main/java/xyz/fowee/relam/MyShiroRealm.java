package xyz.fowee.relam;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import xyz.fowee.pojo.User;
import xyz.fowee.service.UserService;
import xyz.fowee.utils.StringUtils;

public class MyShiroRealm extends AuthorizingRealm {
      
	@Autowired
    UserService userService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

        return null;
    }

    /**
     * 获取验证信息
     * @param token
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;
        if(StringUtils.isBlank(usernamePasswordToken.getUsername())){
            return null;
        }
        /**
         * 下面可以写自己的验证逻辑（因为是测试用例，简单验证下）
         */
        User user = userService.findUserByUsername(usernamePasswordToken.getUsername());
        if(user == null){
            throw new AuthenticationException("用户信息认证失败");
        }
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(usernamePasswordToken.getUsername(), user.getPassword(), getName());
        return info;
    }

   
}
