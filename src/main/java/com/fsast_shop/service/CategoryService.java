package com.fsast_shop.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsast_shop.model.Category;
import com.fsast_shop.repo.CategoryRepo;

@Service
public class CategoryService {

	@Autowired
	CategoryRepo categoryRepo;

	public List<Category> getAllCategory() {
		return categoryRepo.findAll();
	}

	public Category addCategory(Category category) {
		category.setDate(new Date());
		return categoryRepo.save(category);
	}

	public void removeCategoryById(int id) {
		categoryRepo.deleteById(id);
	}

	public Optional<Category> getCategoryById(int id) {
		return categoryRepo.findById(id);
	}

	public Optional<Category> findCategoryById(int categoryId) {
		// TODO Auto-generated method stub
		return categoryRepo.findById(categoryId);
	}

}
