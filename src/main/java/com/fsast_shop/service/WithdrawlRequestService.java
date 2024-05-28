package com.fsast_shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsast_shop.model.Wallet;
import com.fsast_shop.model.WithdrawalRequest;
import com.fsast_shop.repo.WalletRepository;
import com.fsast_shop.repo.WithdrawalRequestRepo;

@Service
public class WithdrawlRequestService {
	@Autowired
	WithdrawalRequestRepo withdrawalRequestRepo;
	@Autowired
	WalletRepository walletRepository;

	public WithdrawalRequest addWithdrawReq(WithdrawalRequest withdrawalRequest) {
		return this.withdrawalRequestRepo.save(withdrawalRequest);
	}
	
	public void updateTotalWalletAmt(Long withdrawReqid) {
		WithdrawalRequest withdrawalRequest = withdrawalRequestRepo.findById(withdrawReqid).get();
		Wallet wallet = walletRepository.findByUser(withdrawalRequest.getUser());
		double withdrawlReqAmt = withdrawalRequest.getWithdrawAmout();
		double pendingTotalAmtInWallet = wallet.getWalletAmount() - withdrawlReqAmt;
		withdrawalRequestRepo.updateAmountStatusforWithdraw("A", withdrawReqid);
		walletRepository.updateWalletAmountById(pendingTotalAmtInWallet, wallet.getId());
	}

}
