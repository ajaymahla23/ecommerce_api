package com.fsast_shop.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fsast_shop.dto.RechargeWalletDTO;
import com.fsast_shop.dto.ShopVerificationDTO;
import com.fsast_shop.dto.WithdrawalRequestDto;
import com.fsast_shop.model.Category;
import com.fsast_shop.model.Products;
import com.fsast_shop.model.RechargeWallet;
import com.fsast_shop.model.ShopVerification;
import com.fsast_shop.model.Wallet;
import com.fsast_shop.model.WithdrawalRequest;
import com.fsast_shop.repo.CategoryRepo;
import com.fsast_shop.repo.ProductDetailRepo;
import com.fsast_shop.repo.ProductsRepo;
import com.fsast_shop.repo.RechargeWalletRepo;
import com.fsast_shop.repo.ShopDetailRepo;
import com.fsast_shop.repo.ShopVerifcationRepo;
import com.fsast_shop.repo.UserRepository;
import com.fsast_shop.repo.WalletRepository;
import com.fsast_shop.repo.WithdrawalRequestRepo;
import com.fsast_shop.service.CategoryService;
import com.fsast_shop.service.ProductDetailService;
import com.fsast_shop.service.ProductsService;
import com.fsast_shop.service.StoreVerificationService;
import com.fsast_shop.service.UserService;
import com.fsast_shop.service.WalletService;
import com.fsast_shop.service.WithdrawlRequestService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

	@Autowired
	ProductDetailRepo productDetailRepo;
	@Autowired
	UserRepository userRepository;
	@Autowired
	CategoryRepo categoryRepo;
	@Autowired
	ShopVerifcationRepo shopVerifcationRepo;
	@Autowired
	ShopDetailRepo shopDetailRepo;
	@Autowired
	RechargeWalletRepo rechargeWalletRepo;
	@Autowired
	WalletRepository walletRepo;
	@Autowired
	ProductDetailService productDetailService;
	@Autowired
	ProductsRepo productsRepo;
	@Autowired
	WalletService walletService;
	@Autowired
	StoreVerificationService storeVerificationService;
	@Autowired
	ProductsService productsService;
	@Autowired
	CategoryService categoryService;
	@Autowired
	UserService userService;
	@Autowired
	WithdrawalRequestRepo withdrawalRequestRepo;
	@Autowired
	WithdrawlRequestService withdrawlRequestService;

	@Value("${krishoop.addproduct.image}")
	private String uploadDirAddProuduct;

	@Value("${krishoop.shopverify.doc}")
	private String uploadDirShopVerify;

	@PostMapping("/add_newcategory")
	public Category addCategory(@RequestBody Category category) {
		return categoryService.addCategory(category);
	}

	@GetMapping("/category_management")
	public List<Category> viewCategoryList(Principal principal) {
//		model.addAttribute("username", principal.getName());
		return categoryRepo.findAll();
	}

	@PostMapping("/addproduct")
	public Products addProduct(@RequestPart("file") MultipartFile file, @ModelAttribute("products") Products products,
			@RequestParam("selectedCategory") int categoryId) throws IOException {

		uploadDirAddProuduct = uploadDirAddProuduct.trim().replaceAll("\\s", "");
		Category category = categoryRepo.findById(categoryId).get();

		String imageUUID = file.getOriginalFilename();
		if (!file.isEmpty()) {
			try {
				Path fileNameAndPath = Paths.get(uploadDirAddProuduct, imageUUID);
				Files.write(fileNameAndPath, file.getBytes());
				products.setImageName(imageUUID);
				products.setCategory(category);
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		} else {
			products.setImageName("default");
		}
		return productsRepo.save(products);
	}

	@GetMapping("/store_management")
	public List<ShopVerificationDTO> listofStoreManagement(Principal principal) {
		List<ShopVerification> shopVerifications = storeVerificationService.getAllShopVerification();
		List<ShopVerificationDTO> shopVerificationDTOs = shopVerifications.stream().map(ShopVerificationDTO::new)
				.collect(Collectors.toList());
		return shopVerificationDTOs;
	}

	@PostMapping("/store_management/verification_status")
	public void updateShopVerificationStatus(@RequestBody Map<String, Object> data,
			RedirectAttributes redirectAttributes) {
		String input = data.get("selectedVerfyId").toString().replaceAll("[^\\d.]", "");
		Long verificationStatusId = Long.parseLong(input);
		storeVerificationService.updateStatusShopVerificationId(verificationStatusId, "Y");
		redirectAttributes.addFlashAttribute("shopVerificationMessage", "Shop has been verified successfully!!!");
		redirectAttributes.addFlashAttribute("alertClass", "alert-success");
	}

	@GetMapping("/recharge_management")
	public List<RechargeWalletDTO> listofRechargeManagement(Principal principal) {
//		model.addAttribute("username", principal.getName());
//		model.addAttribute("rechargeWalletList", rechargeWalletRepo.findByStatus("U"));
		List<RechargeWallet> rechargeWalletList = rechargeWalletRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<RechargeWalletDTO> rechargeWalletDTO = rechargeWalletList.stream().map(RechargeWalletDTO::new)
				.collect(Collectors.toList());
		return rechargeWalletDTO;
	}

	@PostMapping("/addAmountOnWallet")
	public void addAmountOnWallet(@ModelAttribute("wallet") Wallet wallet, RedirectAttributes redirectAttributes,
			@RequestParam("rechargeId") Long rechargeId) {

		RechargeWallet rechargeWallet = rechargeWalletRepo.findById(rechargeId).get();
		Wallet wallet1 = walletRepo.findByUser(rechargeWallet.getUser());
		if (wallet1 == null) {
			Wallet walletAmt = walletService.addWalletAmtAndId(wallet, rechargeId);
			System.out.println("walletAmt :" + walletAmt);
		} else {
			double oldWalletAmount = wallet1.getWalletAmount();
			double newWalletAmount = oldWalletAmount + rechargeWallet.getAmountByUser();
			walletService.updateAmountByUser(newWalletAmount, rechargeWallet.getUser(), rechargeId);
		}
		redirectAttributes.addFlashAttribute("message", "Amount has been added!!!");
		redirectAttributes.addFlashAttribute("alertClass", "alert-success");

	}

	@GetMapping("/withdraw_request")
	public List<WithdrawalRequestDto> listofWithdrawRequest(Principal principal) {
//		model.addAttribute("username", principal.getName());
//		model.addAttribute("rechargeWalletList", rechargeWalletRepo.findByStatus("U"));
		List<WithdrawalRequest> withdrawalRequestList = withdrawalRequestRepo
				.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<WithdrawalRequestDto> withdrawalRequestDto = withdrawalRequestList.stream().map(WithdrawalRequestDto::new)
				.collect(Collectors.toList());
		return withdrawalRequestDto;
	}

	@PostMapping("/addAmountforWithdraw")
	public void addAmountforWithdraw(RedirectAttributes redirectAttributes,
			@RequestParam("withdrawalId") Long withdrawReqid) {
		withdrawlRequestService.updateTotalWalletAmt(withdrawReqid);
		redirectAttributes.addFlashAttribute("message", "Amount has been added!!!");
		redirectAttributes.addFlashAttribute("alertClass", "alert-success");
	}

}
