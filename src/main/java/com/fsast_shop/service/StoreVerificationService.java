package com.fsast_shop.service;

import java.util.List;
import java.util.Optional;

import com.fsast_shop.model.ShopVerification;

public interface StoreVerificationService {
	
	public ShopVerification addShopVerificatonData(ShopVerification shopVerification);
	
	public List<ShopVerification> getAllShopVerification();
	
	public void updateStatusShopVerificationId(Long id, String status);
	
	public Optional<ShopVerification> editShopVerification(Long id);

}
