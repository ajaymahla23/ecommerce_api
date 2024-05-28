package com.fsast_shop.service;

import java.util.Optional;

import com.fsast_shop.model.ProductsDetail;
import com.fsast_shop.model.ShopDetail;


public interface ProductDetailService {
	
	public Optional<ProductsDetail> findProductDetailById(Long productDetailId);
	
	public void updateAmountWithDiscountByProductDetailIdAndShopDetail(Long discountPrice, Long unitPrice,
			Long estimatedProfit, Long productDetailId, ShopDetail shopDetail);

}
