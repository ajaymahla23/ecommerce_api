package com.fsast_shop.controller;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fsast_shop.dto.WalletHistoryDTO;
import com.fsast_shop.helper.FileService;
import com.fsast_shop.model.RechargeWallet;
import com.fsast_shop.model.User;
import com.fsast_shop.model.Wallet;
import com.fsast_shop.model.WithdrawalRequest;
import com.fsast_shop.repo.RechargeWalletRepo;
import com.fsast_shop.repo.ShopDetailRepo;
import com.fsast_shop.repo.UserRepository;
import com.fsast_shop.repo.WalletRepository;
import com.fsast_shop.repo.WithdrawalRequestRepo;
import com.fsast_shop.service.WalletService;
import com.fsast_shop.service.WithdrawlRequestService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WalletController {
	@Autowired
	WalletService walletService;
	@Autowired
	UserRepository userRepository;
	@Autowired
	RechargeWalletRepo rechargeWalletRepo;
	@Autowired
	ShopDetailRepo shopDetailRepo;
	@Autowired
	WithdrawalRequestRepo withdrawalRequestRepo;
	@Autowired
	WalletRepository walletRepository;
	@Autowired
	WithdrawlRequestService withdrawlRequestService;

	@Value("${krishoop.addAmtByUser.screenshot}")
	private String uploadDirAddAmtByUser;

	@PostMapping("/recharge_wallet")
	public RechargeWallet addRechargeInWalletByShop(@ModelAttribute("rechargeWallet") RechargeWallet rechargeWallet,
			@RequestParam("amountByUser") double amount, @RequestPart("walletImg") MultipartFile file) {

		if (file.isEmpty()) {
			rechargeWallet.setImageScreenshot("default");
		} else {
			try {
				String filename = file.getOriginalFilename().substring(0, file.getOriginalFilename().lastIndexOf("."))
						+ file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
				System.out.println("file name : " + filename);

				uploadDirAddAmtByUser = uploadDirAddAmtByUser.trim();
				uploadDirAddAmtByUser = uploadDirAddAmtByUser.replaceAll("\\s", "");

				FileService.saveFile(uploadDirAddAmtByUser, filename, file);
				rechargeWallet.setImageScreenshot(filename);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

//		User user = userRepository.findByEmail(principal.getName());
		User user = userRepository.findById(5).get();
		rechargeWallet.setAmountByUser(amount);
		rechargeWallet.setUser(user);
		rechargeWallet.setDate(new Date());
		rechargeWallet.setRoleType("S");
		rechargeWallet.setCurrency("USDT");
		rechargeWallet.setRechargeType("Digital");
		return walletService.addRechargeWallet(rechargeWallet);
	}

	@PostMapping("/send_withdraw_req")
	public WithdrawalRequest sendWithdrawlReqByShop(
			@ModelAttribute("withdrawalRequest") WithdrawalRequest withdrawalRequest, Principal principal,
			@RequestParam("withdraw_req") double amount, RedirectAttributes redirectAttributes) {
//		User user = userRepository.findByEmail(principal.getName());
		User user = userRepository.findById(5).get();

		Wallet wallet = walletRepository.findByUser(user);
		WithdrawalRequest withdrawalRequest1 = withdrawalRequestRepo.findByUserAndStatus(user, "U");
		if (withdrawalRequest1 != null) {
			redirectAttributes.addFlashAttribute("message", "Request no send!!!");
			redirectAttributes.addFlashAttribute("alertClass", "alert-success");
		} else {

			if (wallet != null && wallet.getWalletAmount() >= amount) {
				withdrawalRequest.setUser(user);
				withdrawalRequest.setRoleType("S");
				withdrawalRequest.setStatus("U");
				withdrawalRequest.setDate(new Date());
				withdrawalRequest.setWithdrawAmout(amount);
				withdrawalRequest.setCurrency("USDT");
				return withdrawlRequestService.addWithdrawReq(withdrawalRequest);
			} else {
				// Handle the case when 'wallet' is null or the amount is insufficient
				if (wallet == null) {
					redirectAttributes.addFlashAttribute("message", "Wallet not found");
				} else {
					redirectAttributes.addFlashAttribute("message", "Insufficient funds in the wallet");
				}
				redirectAttributes.addFlashAttribute("alertClass", "alert-success");
			}
		}
		return null;
	}

	@GetMapping("/wallet")
	public ResponseEntity<?> viewWallet(Model model, Principal principal) {
//		model.addAttribute("username", principal.getName());
//	    User user = userRepository.findById(5).orElse(null);
//	    if (user == null) {
//	        return ResponseEntity.notFound().build();
////	User user = userRepository.findByEmail(principal.getName());}
		User user = userRepository.findById(5).get();

//	model.addAttribute("walletAmtListByUser", walletAmtListByUser);

//	model.addAttribute("walletAmtList", walletService.findByUser(user));

		List<RechargeWallet> walletAmtListByUser = rechargeWalletRepo.findByUser(user);
		List<WithdrawalRequest> withdrawalRequestList = withdrawalRequestRepo.findByUser(user);

		WalletHistoryDTO walletHistoryDTO = new WalletHistoryDTO(walletAmtListByUser, withdrawalRequestList);
//		WithdrawalRequest withdrawalRequestAmt = withdrawalRequestRepo.findByUserAndStatus(user, "U");
//		model.addAttribute("withdrawalRequestAmt", withdrawalRequestAmt);

		return ResponseEntity.ok(walletHistoryDTO);
	}

}
