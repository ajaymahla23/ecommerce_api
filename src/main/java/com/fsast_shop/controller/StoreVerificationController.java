package com.fsast_shop.controller;

import java.security.Principal;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fsast_shop.helper.FileService;
import com.fsast_shop.model.ShopDetail;
import com.fsast_shop.model.ShopVerification;
import com.fsast_shop.model.User;
import com.fsast_shop.repo.ShopDetailRepo;
import com.fsast_shop.repo.ShopVerifcationRepo;
import com.fsast_shop.repo.UserRepository;
import com.fsast_shop.service.StoreVerificationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StoreVerificationController {
	@Autowired
	StoreVerificationService storeVerificationService;
	@Autowired
	UserRepository userRepository;
	@Autowired
	ShopDetailRepo shopDetailRepo;
	@Autowired
	ShopVerifcationRepo shopVerifcationRepo;

	@Value("${krishoop.shopverify.doc}")
	private String uploadDirShopVerify;

	@PostMapping("/storeverification")
	private ShopVerification addStoreVerificationData(
			@ModelAttribute("shopVerification") ShopVerification shopVerification,
			RedirectAttributes redirectAttributes, Principal principal, Model model,
			@RequestPart("verificationfile") MultipartFile file) {
//		User user = userRepository.findByEmail(principal.getName());
		User user=userRepository.findById(5).get();
		ShopDetail shopDetail = shopDetailRepo.findByUser(user);

		if (shopDetail != null) {
			if (file.isEmpty()) {
				shopVerification.setValidIdDoc("default");
			} else {
				try {
					String filename = file.getOriginalFilename();
					uploadDirShopVerify = uploadDirShopVerify.trim().replaceAll("\\s", "");
					FileService.saveFile(uploadDirShopVerify, filename, file);
					shopVerification.setValidIdDoc(filename);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			shopVerification.setShopDetail(shopDetail);
			shopVerification.setUser(user);
			shopVerification.setDate(new Date());

			redirectAttributes.addFlashAttribute("message", "Record has been added successfully!");
			redirectAttributes.addFlashAttribute("alertClass", "alert-success");
			return storeVerificationService.addShopVerificatonData(shopVerification);

		} else {
			System.out.println("data not save:add alert message");
		}
		return null;
	}

}
