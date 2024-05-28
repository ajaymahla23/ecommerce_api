package com.fsast_shop.dto;

import java.util.List;

import com.fsast_shop.model.RechargeWallet;
import com.fsast_shop.model.WithdrawalRequest;

public class WalletHistoryDTO {

	private List<RechargeWallet> rechargeHistory;
	private List<WithdrawalRequest> withdrawalHistory;

	public WalletHistoryDTO(List<RechargeWallet> rechargeHistory, List<WithdrawalRequest> withdrawalHistory) {
		this.rechargeHistory = rechargeHistory;
		this.withdrawalHistory = withdrawalHistory;
	}

	public List<RechargeWallet> getRechargeHistory() {
		return rechargeHistory;
	}

	public void setRechargeHistory(List<RechargeWallet> rechargeHistory) {
		this.rechargeHistory = rechargeHistory;
	}

	public List<WithdrawalRequest> getWithdrawalHistory() {
		return withdrawalHistory;
	}

	public void setWithdrawalHistory(List<WithdrawalRequest> withdrawalHistory) {
		this.withdrawalHistory = withdrawalHistory;
	}

}
