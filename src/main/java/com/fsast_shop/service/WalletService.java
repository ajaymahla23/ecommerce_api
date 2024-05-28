package com.fsast_shop.service;

import com.fsast_shop.model.RechargeWallet;
import com.fsast_shop.model.User;
import com.fsast_shop.model.Wallet;

public interface WalletService {

	public RechargeWallet addRechargeWallet(RechargeWallet rechargeWallet);

	public Wallet findByUser(User user);
	
	public Wallet addWalletAmtAndId(Wallet wallet,Long id);
	public void updateAmountByUser(double walletAmount, User user,Long id);

}
