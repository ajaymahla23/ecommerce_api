package com.fsast_shop.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fsast_shop.model.Products;

@Repository
public interface ProductsRepo extends JpaRepository<Products, Long> {

}
