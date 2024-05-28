package com.fsast_shop.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fsast_shop.model.ShopVerification;
import com.fsast_shop.repo.ShopVerifcationRepo;
import com.fsast_shop.service.StoreVerificationService;

@Service
public class StoreVerificationSeriveImpl implements StoreVerificationService {
	@Autowired
	ShopVerifcationRepo shopVerifcationRepo;

	@Override
	public ShopVerification addShopVerificatonData(ShopVerification shopVerification) {
		return this.shopVerifcationRepo.save(shopVerification);
	}
	
	@Override
	public List<ShopVerification> getAllShopVerification() {
		return shopVerifcationRepo.findAll();
	}
	
	@Transactional
	@Override
	public void updateStatusShopVerificationId(Long id, String status) {
		shopVerifcationRepo.updateStatusByShopVerificationId(status, id);
	}
	
	@Override
	public Optional<ShopVerification> editShopVerification(Long id) {
		return shopVerifcationRepo.findById(id);
	}

}
