package com.fsast_shop.repo;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fsast_shop.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	public User findByEmail(String email);

	public User findByMobileNumber(String mobileNumber);
	
	@Query("select u from User u where u.email = :email OR u.mobileNumber = :mobileNumber")
	public User getUserByUserName(@Param("email") String email, @Param("mobileNumber") String mobileNumber);
	
	@Transactional
	@Modifying
	@Query("update User u set u.onlineStatus=:onlineStatus where u.id=:id")
	public void updateOnlineStatus(@Param("onlineStatus") String onlineStatus, @Param("id") Integer id);
	
	public boolean existsByEmailOrMobileNumber(String email, String mobileNumber);

	
}
