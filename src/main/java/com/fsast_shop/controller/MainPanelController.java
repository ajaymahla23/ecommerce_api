package com.fsast_shop.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fsast_shop.helper.FileService;
import com.fsast_shop.model.ShopDetail;
import com.fsast_shop.model.User;
import com.fsast_shop.repo.ProductsRepo;
import com.fsast_shop.repo.ShopDetailRepo;
import com.fsast_shop.repo.UserRepository;
import com.fsast_shop.service.ShopDetailService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainPanelController {
	@Autowired
	ShopDetailRepo shopDetailRepo;
	@Autowired
	ProductsRepo productsRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	ShopDetailService shopDetailService;

	@Value("${krishoop.img.logo}")
	private String uploadDirShoplogo;

	@PostMapping("/shopsetting")
	public ShopDetail addNewShopDetail1(@ModelAttribute("shopdetail") ShopDetail shopdetail, Principal principal,
			RedirectAttributes redirectAttributes, @RequestPart("shopLogofile") MultipartFile file) throws IOException {

//		User user = userRepo.findByEmail(principal.getName());
		User user = userRepo.findById(5).get();

		if (file.isEmpty()) {
			shopdetail.setShopLogo("default");
		} else {

			try {
				String filename = file.getOriginalFilename();
				uploadDirShoplogo = uploadDirShoplogo.trim().replaceAll("\\s", "");

				// Delete the old image file
				Path oldImagePath = Paths.get(uploadDirShoplogo, filename);
				Files.deleteIfExists(oldImagePath);

				FileService.saveFile(uploadDirShoplogo, filename, file);
				shopdetail.setShopLogo(filename);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		redirectAttributes.addFlashAttribute("message", "Record has been added successfully!");
		redirectAttributes.addFlashAttribute("alertClass", "alert-success");
		return shopDetailService.addShopDetail(shopdetail, user);
	}

	@GetMapping("/manageprofile")
	public List<ShopDetail> viewManageProfile(Model model, Principal principal) {
		List<ShopDetail> shopDetail = shopDetailRepo.findAll();
		System.out.println("managae data :" + shopDetail);
//		model.addAttribute("shopDetail", shopDetail);
		return shopDetail;
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteUserById(@PathVariable("id") Integer id) {
		try {
			if (userRepo.existsById(id)) {
				userRepo.deleteById(id);
				return ResponseEntity.ok("User with ID " + id + " deleted successfully.");
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while deleting the user with ID " + id);
		}
	}

	@GetMapping("/user/{id}")
	public Optional<User> getUserById(@PathVariable("id") Integer id) {
		return userRepo.findById(id);
	}

	@GetMapping("/user")
	public List<User> getAllUser() {
		return this.userRepo.findAll();
	}
}
