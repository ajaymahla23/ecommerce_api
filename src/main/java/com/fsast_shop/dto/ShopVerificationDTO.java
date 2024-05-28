package com.fsast_shop.dto;

import java.util.Date;
import com.fsast_shop.model.ShopVerification;

public class ShopVerificationDTO {

	private Long id;
	private String userName;
	private Date date;
	private String validIdDoc;
	private String passportCountry;
	private String address;
	private String shopName;
	private Long shopId;
	private String shopEmail;
	private String shoplogo;
	private String shopIntro;
	private String shopPhoneNo;
	private String verifyStatus;

	public ShopVerificationDTO(ShopVerification shopVerification) {
		this.id = shopVerification.getId();
		this.date = shopVerification.getDate();
		this.validIdDoc = shopVerification.getValidIdDoc();
		this.passportCountry = shopVerification.getPassportCountry();
		this.address = shopVerification.getAddress();
		this.shopName = shopVerification.getShopDetail().getShopName();
		this.shopId = shopVerification.getShopDetail().getId();
		this.shopEmail = shopVerification.getShopDetail().getShopEmail();
		this.shoplogo = shopVerification.getShopDetail().getShopLogo();
		this.shopIntro = shopVerification.getShopDetail().getIntroduction();
		this.userName = shopVerification.getUser().getEmail();
		this.shopPhoneNo = shopVerification.getShopDetail().getShopPhoneNo();
		this.verifyStatus = shopVerification.getStatus();
	}

	public String getVerifyStatus() {
		return verifyStatus;
	}

	public void setVerifyStatus(String verifyStatus) {
		this.verifyStatus = verifyStatus;
	}

	public String getShopPhoneNo() {
		return shopPhoneNo;
	}

	public void setShopPhoneNo(String shopPhoneNo) {
		this.shopPhoneNo = shopPhoneNo;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public Long getShopId() {
		return shopId;
	}

	public void setShopId(Long shopId) {
		this.shopId = shopId;
	}

	public String getShopEmail() {
		return shopEmail;
	}

	public void setShopEmail(String shopEmail) {
		this.shopEmail = shopEmail;
	}

	public String getShoplogo() {
		return shoplogo;
	}

	public void setShoplogo(String shoplogo) {
		this.shoplogo = shoplogo;
	}

	public String getShopIntro() {
		return shopIntro;
	}

	public void setShopIntro(String shopIntro) {
		this.shopIntro = shopIntro;
	}

	public String getValidIdDoc() {
		return validIdDoc;
	}

	public void setValidIdDoc(String validIdDoc) {
		this.validIdDoc = validIdDoc;
	}

	public String getPassportCountry() {
		return passportCountry;
	}

	public void setPassportCountry(String passportCountry) {
		this.passportCountry = passportCountry;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
