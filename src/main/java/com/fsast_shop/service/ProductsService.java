package com.fsast_shop.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsast_shop.dto.ProductDto;
import com.fsast_shop.model.Category;
import com.fsast_shop.model.Products;
import com.fsast_shop.model.ProductsDetail;
import com.fsast_shop.model.ShopDetail;
import com.fsast_shop.model.User;
import com.fsast_shop.repo.ProductDetailRepo;
import com.fsast_shop.repo.ProductsRepo;
import com.fsast_shop.repo.ShopDetailRepo;
import com.fsast_shop.repo.UserRepository;

@Service
public class ProductsService {
	@Autowired
	ProductsRepo productsRepo;
	@Autowired
	CategoryService categoryService;
	@Autowired
	UserRepository userRepo;
	@Autowired
	ShopDetailRepo shopDetailRepo;
	@Autowired
	ProductDetailRepo productDetailRepo;

	public List<Products> getAllProducts() {
		return productsRepo.findAll();
	}

	public Products createProduct(ProductDto productDto) {
		Products product = new Products();
		product.setName(productDto.getName());
		product.setPrice(productDto.getPrice());
		product.setImageName(productDto.getImageName());
		product.setQty(productDto.getQty());
		product.setRemarks(productDto.getRemarks());

		// Assuming you have a CategoryService that can find a category by its ID
		Category category = categoryService.findCategoryById(productDto.getCategoryId()).get();
		product.setCategory(category);

		return productsRepo.save(product);
	}

	public List<Products> updateStatusAndCalculationOfProduct(String active, Long[] ids, User user, Long percentage) {
		if (!userRepo.existsById(user.getId())) {
			throw new EntityNotFoundException("User not found");
		}
		List<Products> products = productsRepo.findAllById(Arrays.asList(ids));
		List<ProductsDetail> productsDetails = new ArrayList<>();

		ShopDetail shopDetail = shopDetailRepo.findByUser(user);

		for (Products product : products) {
			double price = product.getPrice();

			double estimatedProfit = (price * percentage) / 100;
			Long estProfit = (long) estimatedProfit;

			double unitPrice = price + estimatedProfit;
			Long unitPrice1 = (long) unitPrice;

			int discount = 0;
			Long discount1 = Long.valueOf(discount);

			ProductsDetail productsDetail = new ProductsDetail();
			productsDetail.setProducts(product);
			productsDetail.setActive(active);
			productsDetail.setMarkupPercentage(percentage);
			productsDetail.setEstimatedProfit(estProfit);
			productsDetail.setUnitPrice(unitPrice1);
			productsDetail.setUserId(user.getId());
			productsDetail.setDiscountPrice(discount1);
			productsDetail.setPublish(1);
			productsDetail.setShopDetail(shopDetail);
			productsDetails.add(productsDetail);
		}
		productDetailRepo.saveAll(productsDetails);
		return productsRepo.saveAll(products);
	}

}
