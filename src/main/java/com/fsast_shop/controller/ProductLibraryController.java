package com.fsast_shop.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fsast_shop.model.Products;
import com.fsast_shop.model.ProductsDetail;
import com.fsast_shop.model.ShopDetail;
import com.fsast_shop.model.User;
import com.fsast_shop.repo.ProductDetailRepo;
import com.fsast_shop.repo.ShopDetailRepo;
import com.fsast_shop.repo.UserRepository;
import com.fsast_shop.service.ProductDetailService;
import com.fsast_shop.service.ProductsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductLibraryController {
	@Autowired
	ProductsService productsService;
	@Autowired
	UserRepository userRepo;
	@Autowired
	ProductDetailRepo productDetailRepo;
	@Autowired
	ProductDetailService productDetailService;
	@Autowired
	ShopDetailRepo shopDetailRepo;

	@GetMapping("/productLibrary")
	public List<Products> viewProductLibrary(Model model, Principal principal) {
//		model.addAttribute("username", principal.getName());
		System.out.println("product list :" + productsService.getAllProducts());
		return productsService.getAllProducts();
	}

	@PostMapping("/checkboxesClicked")
	public ResponseEntity<?> addProductsOnKrisshopHome(@RequestBody Map<String, Object> data, Principal principal) {

		String inputPercentage = data.get("markupPercentage").toString().replaceAll("[^\\d.]", "");
		Long percentage = Long.parseLong(inputPercentage);

		Object obj = data.get("selectedProductIds");
		List<String> idList = new ArrayList<>();
		if (obj instanceof Collection<?>) {
			for (Object item : (Collection<?>) obj) {
				idList.add(String.valueOf(item));
			}
		} else {
			// Handle the case where obj is not a collection
			// You might want to log an error or throw an exception
		}

		Long[] productId = new Long[idList.size()];
		for (int i = 0; i < idList.size(); i++) {
			String input = idList.get(i).trim();
			productId[i] = Long.parseLong(input);
		}

//	    User user = userRepo.findByEmail(principal.getName());
		int userId = 5;
		// Assuming userService is an instance of UserService
		User user = userRepo.findById(5).get();

//	    boolean isExist = productDetailRepo.existsByMarkupPercentageAndUserIdAndProducts(percentage, user.getId(), productId);
		boolean isExist = productDetailRepo.existsByMarkupPercentageAndUserIdAndProducts(percentage, userId, productId);
		if (isExist) {
			return new ResponseEntity<>("Product is already exists..! please try with another product",
					HttpStatus.BAD_REQUEST);
		} else {
			List<Products> products = productsService.updateStatusAndCalculationOfProduct("Y", productId, user,
					percentage);
			return new ResponseEntity<>(products, HttpStatus.OK);
		}
	}

	@GetMapping("/productlist")
	public List<ProductsDetail> viewProduct(Model model, Principal principal) {
//		model.addAttribute("username", principal.getName());
//		User user = userRepo.findByEmail(principal.getName());
		int userId = 5;
		List<ProductsDetail> productDetailList = productDetailRepo.findByActiveAndUserId("Y", userId);
//		List<ProductsDetail> productDetailList = productDetailRepo.findByActiveAndUserId("Y", user.getId());
		return productDetailList;
	}

	@GetMapping("/updateProduct/{id}")
	public ProductsDetail viewDiscountForm(@PathVariable("id") Long productDetailId) {
		System.out.println("produ id :" + productDetailId);
		return productDetailRepo.findById(productDetailId).get();
	}

	@PostMapping("/update_discount")
	public void addDiscountOnProduct(@RequestBody Map<String, Object> data
//			, @RequestParam double purchasePrice,
//			@RequestParam Long productDetailId, RedirectAttributes redirectAttributes
	) {
		String newdiscount = data.get("discount").toString().replaceAll("[^\\d.]", "");
		Long discount = Long.parseLong(newdiscount);
		System.out.println("discount :" + discount);
//		ProductsDetail productsDetail = productDetailService.findProductDetailById(productDetailId).get();
//
//		Long percentage = productsDetail.getMarkupPercentage();
//
//		double discountPrice = purchasePrice - discount;
//
//		double estimatedProfit = (discountPrice * percentage) / 100;
//		Long estProfit = (long) estimatedProfit;
//
//		double unitPrice = discountPrice + estimatedProfit;
//		Long unitPrice1 = (long) unitPrice;
//
//		ShopDetail shopDetail = shopDetailRepo.findShopByProductDetailId(productDetailId);
//		productDetailService.updateAmountWithDiscountByProductDetailIdAndShopDetail(discount, unitPrice1, estProfit,
//				productDetailId, shopDetail);
//		redirectAttributes.addFlashAttribute("message", "Record has been updated successfully!");
//		redirectAttributes.addFlashAttribute("alertClass", "alert-success");

	}

}
