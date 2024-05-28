package com.fsast_shop.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fsast_shop.model.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
	public List<Category> findByNameContaining(String name);

}
