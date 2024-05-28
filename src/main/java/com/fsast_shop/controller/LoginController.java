package com.fsast_shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fsast_shop.model.User;
import com.fsast_shop.repo.UserRepository;
import com.fsast_shop.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserService userService;

	@PostMapping("/register")
	public User registerNewUser(@RequestBody User user) {
		if (userRepository.existsByEmailOrMobileNumber(user.getEmail(), user.getMobileNumber())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"Please check e-mail or mobile no. is already exist!!!");
		} else {
			user.setRole("ROLE_USER");
			user.setEnabled(true);
			user.setRegisterStatus("U");
			userRepository.save(user);
		}
		return userRepository.save(user);
	}
	
	
//	
//	
//	 @PostMapping("/login")
//	    public ResponseEntity<?> login(@RequestBody User loginRequest) {
//	        // Validate the user's credentials and return a response
//	        // This is just a placeholder and should be replaced with your actual validation logic
//	        if (isValidUser(loginRequest)) {
//	            return ResponseEntity.ok(new LoginResponse("success"));
//	        } else {
//	            return ResponseEntity.ok(new LoginResponse("fail"));
//	        }
//	    }
//
//	    private boolean isValidUser(User loginRequest) {
//	        // Replace this with your actual validation logic
//	        return true;
//	    }
//	
//
}
