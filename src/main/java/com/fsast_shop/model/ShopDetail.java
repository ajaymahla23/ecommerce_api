package com.fsast_shop.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "shop_detail")
public class ShopDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "SHOP_ID")
	private Long id;

	private Date date;

	@Column(name = "SHOP_NAME")
	private String shopName;

	@Column(name = "SHOP_PHONE_NO")
	private String shopPhoneNo;

	@Column(name = "SHOP_ADDRESS")
	private String shopAddress;

	@Column(name = "INTRODUCTION")
	private String introduction;

	@Column(name = "SHOP_LOGO")
	private String shopLogo;

	@Column(name = "SHOP_EMAIL")
	private String shopEmail;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public User getUser() {
		return user;
	}

	public String getShopEmail() {
		return shopEmail;
	}

	public void setShopEmail(String shopEmail) {
		this.shopEmail = shopEmail;
	}

	public void setUser(User user) {
		this.user = user;
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

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public String getShopPhoneNo() {
		return shopPhoneNo;
	}

	public void setShopPhoneNo(String shopPhoneNo) {
		this.shopPhoneNo = shopPhoneNo;
	}

	public String getShopAddress() {
		return shopAddress;
	}

	public void setShopAddress(String shopAddress) {
		this.shopAddress = shopAddress;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public String getShopLogo() {
		return shopLogo;
	}

	public void setShopLogo(String shopLogo) {
		this.shopLogo = shopLogo;
	}

}
