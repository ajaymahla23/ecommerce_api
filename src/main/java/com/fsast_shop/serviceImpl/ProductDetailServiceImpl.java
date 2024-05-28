package com.fsast_shop.serviceImpl;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsast_shop.model.ProductsDetail;
import com.fsast_shop.model.ShopDetail;
import com.fsast_shop.repo.ProductDetailRepo;
import com.fsast_shop.repo.ProductsRepo;
import com.fsast_shop.repo.UserRepository;
import com.fsast_shop.service.ProductDetailService;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {
	@Autowired
	ProductsRepo productsRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	ProductDetailRepo productDetailRepo;

	@Override
	public Optional<ProductsDetail> findProductDetailById(Long id) {
		return productDetailRepo.findById(id);
	}

	@Transactional
	@Override
	public void updateAmountWithDiscountByProductDetailIdAndShopDetail(Long discountPrice, Long unitPrice,
			Long estimatedProfit, Long productDetailId, ShopDetail shopDetail) {
		productDetailRepo.updateAmountWithDiscountByProductDetailIdAndShopDetail(discountPrice, unitPrice,
				estimatedProfit, productDetailId, shopDetail);
	}

}
