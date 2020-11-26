package xyz.fowee.dao;
 
import xyz.fowee.pojo.User;

public interface UserDao {
    public abstract User findByUsername(String username);
}