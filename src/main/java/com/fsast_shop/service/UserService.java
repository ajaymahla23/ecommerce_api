package com.fsast_shop.service;

import java.util.List;
import java.util.Optional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fsast_shop.exception.CustomerNotFoundException;
import com.fsast_shop.model.User;
import com.fsast_shop.repo.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	SessionFactory sessionFactory;

	public List<User> findUserByEmail() {
		return userRepository.findAll();
	}

	public void addUserRegister(User user) {
		userRepository.save(user);
	}

	public Optional<User> getUserById(Integer id) {
		return userRepository.findById(id);
	}

	public User findByEmail(String email) {
		return this.userRepository.findByEmail(email);
	}


}
