package com.fsast_shop.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fsast_shop.model.ShopVerification;

@Repository
public interface ShopVerifcationRepo extends JpaRepository<ShopVerification, Long> {
	
	@Modifying
	@Query("update ShopVerification s set s.status = ?1 where s.id=?2")
	void updateStatusByShopVerificationId(String status, Long shopVerificationId);

}
