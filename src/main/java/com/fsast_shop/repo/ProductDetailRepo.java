package com.fsast_shop.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fsast_shop.model.ProductsDetail;
import com.fsast_shop.model.ShopDetail;

@Repository
public interface ProductDetailRepo extends JpaRepository<ProductsDetail, Long> {

	@Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM ProductsDetail p WHERE p.markupPercentage = :markupPercentage AND p.userId = :userId AND p.products.id IN :productIds")
	Boolean existsByMarkupPercentageAndUserIdAndProducts(@Param("markupPercentage") Long markupPercentage,
			@Param("userId") Integer userId, @Param("productIds") Long[] productId);

	public List<ProductsDetail> findByActiveAndUserId(String active, Integer userId);

	@Modifying
	@Query("update ProductsDetail pd set pd.discountPrice=?1 ,pd.unitPrice=?2,pd.estimatedProfit=?3 where pd.productDetailId=?4 and pd.shopDetail=?5")
	public void updateAmountWithDiscountByProductDetailIdAndShopDetail(Long discountPrice, Long unitPrice,
			Long estimatedProfit, Long productDetailId, ShopDetail shopDetail);

}
