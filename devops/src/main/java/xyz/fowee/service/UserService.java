package xyz.fowee.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.fowee.dao.UserDao;
import xyz.fowee.pojo.User;

@Service
public class UserService {
   
	@Autowired
	UserDao   userDao;
	
    public  User  findUserByUsername(String username) {
    	return userDao.findByUsername(username);
    }
	
}
