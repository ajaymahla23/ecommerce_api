package com.fsast_shop.dto;

import java.util.Date;

import com.fsast_shop.model.WithdrawalRequest;

public class WithdrawalRequestDto {

	private Long id;
	private Date date;
	private double withdrawAmout;
	private String status;
	private String roleType;
	private String currecy;
	private String userEmail;

	public WithdrawalRequestDto(WithdrawalRequest withdrawalRequest) {
		this.id = withdrawalRequest.getId();
		this.date = withdrawalRequest.getDate();
		this.withdrawAmout = withdrawalRequest.getWithdrawAmout();
		this.status = withdrawalRequest.getStatus();
		this.roleType = withdrawalRequest.getRoleType();
		this.userEmail = withdrawalRequest.getUser().getEmail();
		this.currecy = withdrawalRequest.getCurrency();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public double getWithdrawAmout() {
		return withdrawAmout;
	}

	public void setWithdrawAmout(double withdrawAmout) {
		this.withdrawAmout = withdrawAmout;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRoleType() {
		return roleType;
	}

	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}

	public String getCurrecy() {
		return currecy;
	}

	public void setCurrecy(String currecy) {
		this.currecy = currecy;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

}
