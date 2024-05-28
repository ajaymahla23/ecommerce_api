package com.fsast_shop.serviceImpl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsast_shop.model.ShopDetail;
import com.fsast_shop.model.User;
import com.fsast_shop.repo.ShopDetailRepo;
import com.fsast_shop.service.ShopDetailService;

@Service
public class ShopDetailServiceImpl implements ShopDetailService {
	@Autowired
	ShopDetailRepo shopDetailRepo;

	@Override
	public ShopDetail addShopDetail(ShopDetail shopDetail, User user) {
		shopDetail.setUser(user);
		shopDetail.setDate(new Date());
		return shopDetailRepo.save(shopDetail);
	}

}
