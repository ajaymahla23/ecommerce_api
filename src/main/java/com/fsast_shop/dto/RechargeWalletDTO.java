package com.fsast_shop.dto;

import java.util.Date;

import com.fsast_shop.model.RechargeWallet;

public class RechargeWalletDTO {

	private Long id;
	private Date date;
	private double amountByUser;
	private String imageScreenshot;
	private String status;
	private String roleType;
	private String userEmail;
	private String firstName;
	private String currecy;
	private String rechargeType;

	public RechargeWalletDTO(RechargeWallet rechargeWallet) {
		this.id = rechargeWallet.getId();
		this.date = rechargeWallet.getDate();
		this.amountByUser = rechargeWallet.getAmountByUser();
		this.imageScreenshot = rechargeWallet.getImageScreenshot();
		this.status = rechargeWallet.getStatus();
		this.roleType = rechargeWallet.getRoleType();
		this.userEmail = rechargeWallet.getUser().getEmail();
		this.firstName = rechargeWallet.getUser().getFirstName();
		this.currecy = rechargeWallet.getCurrency();
		this.rechargeType = rechargeWallet.getRechargeType();
	}

	public String getCurrecy() {
		return currecy;
	}

	public void setCurrecy(String currecy) {
		this.currecy = currecy;
	}

	public String getRechargeType() {
		return rechargeType;
	}

	public void setRechargeType(String rechargeType) {
		this.rechargeType = rechargeType;
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

	public double getAmountByUser() {
		return amountByUser;
	}

	public void setAmountByUser(double amountByUser) {
		this.amountByUser = amountByUser;
	}

	public String getImageScreenshot() {
		return imageScreenshot;
	}

	public void setImageScreenshot(String imageScreenshot) {
		this.imageScreenshot = imageScreenshot;
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

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

}
