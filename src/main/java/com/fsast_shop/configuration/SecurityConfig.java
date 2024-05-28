//package com.fsast_shop.configuration;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.NoOpPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import com.fsast_shop.serviceImpl.UserDetailsServiceImpl;
//
//
//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//	@Autowired
//	UserDetailsServiceImpl userDetailsServiceImpl;
//
//	@Bean
//	public UserDetailsService getUserDetailsService() {
//		return new UserDetailsServiceImpl();
//	}
//
//
////	show password
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//
//		return NoOpPasswordEncoder.getInstance();
//	}
//
//	public DaoAuthenticationProvider authenticationProvider() {
//		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
//		daoAuthenticationProvider.setUserDetailsService(this.getUserDetailsService());
//		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
//		return daoAuthenticationProvider;
//	}
//
////	    configure method
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.authenticationProvider(authenticationProvider());
//		auth.inMemoryAuthentication().withUser("admn").password(this.passwordEncoder().encode("admn")).roles("ADMIN");
//	}
//
//	
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//	http.authorizeRequests()
//	    .antMatchers("/resources/*").permitAll()
//		.antMatchers("/admin/**").hasRole("ADMIN")
//		.antMatchers("/user/**").hasRole("USER")
//		.antMatchers("/login","/register").permitAll()
//		.anyRequest().authenticated().and()
//		.formLogin()
//		.loginPage("/login")
//		.loginProcessingUrl("/dologin")
//		.defaultSuccessUrl("/home",true)
//		.and()
//		.logout()
//		.logoutSuccessUrl("/login")
//		.logoutUrl("/logout")
//		.and()
//		.csrf().disable();
//	
//}
//
//	
//}