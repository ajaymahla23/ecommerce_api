package com.fsast_shop.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsast_shop.model.RechargeWallet;
import com.fsast_shop.model.User;
import com.fsast_shop.model.Wallet;
import com.fsast_shop.repo.RechargeWalletRepo;
import com.fsast_shop.repo.WalletRepository;
import com.fsast_shop.service.WalletService;

@Service
public class WalletServiceImpl implements WalletService {
	@Autowired
	RechargeWalletRepo rechargeWalletRepo;
	@Autowired
	WalletRepository walletRepository;

	@Override
	public RechargeWallet addRechargeWallet(RechargeWallet rechargeWallet) {
		return rechargeWalletRepo.save(rechargeWallet);
	}

	@Override
	public Wallet findByUser(User user) {
		return walletRepository.findByUser(user);
	}
	
	@Override
	public Wallet addWalletAmtAndId(Wallet wallet, Long id) {
		List<RechargeWallet> rechargeWalletList = rechargeWalletRepo.findByStatusAndId("U", id);
		for (RechargeWallet rechargeWallet : rechargeWalletList) {
			rechargeWallet.setStatus("P");
		}
		rechargeWalletRepo.saveAll(rechargeWalletList);
		return this.walletRepository.save(wallet);
	}
	
	@Transactional
	@Override
	public void updateAmountByUser(double walletAmount, User user, Long id) {
		rechargeWalletRepo.updateAmountStatusByUser("P", id);
		walletRepository.updateAmountByUser(walletAmount, user);
	}

}
