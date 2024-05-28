package com.fsast_shop.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fsast_shop.model.RechargeWallet;
import com.fsast_shop.model.User;


@Repository
public interface RechargeWalletRepo extends JpaRepository<RechargeWallet, Long> {
	
	public List<RechargeWallet> findByUser(User user);
	
	public List<RechargeWallet> findByStatus(String status);
	public List<RechargeWallet> findByStatusAndId(String status, Long id);
	
	@Modifying
	@Query("update RechargeWallet rw set rw.status=?1 where rw.id=?2")
	public void updateAmountStatusByUser(String status, Long id);

}
