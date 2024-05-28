package com.fsast_shop.controller;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fsast_shop.model.ShopVerification;
import com.fsast_shop.service.StoreVerificationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {
	@Autowired
	StoreVerificationService storeVerificationService;

	@Value("${krishoop.img.logo}")
	private String uploadDirShoplogo;

	@Value("${krishoop.shopverify.doc}")
	private String uploadDirShopVerify;

	@Value("${krishoop.addproduct.image}")
	private String uploadDirAddProuduct;

	@Value("${krishoop.addAmtByUser.screenshot}")
	private String uploadDirAddAmtByUser;

//	shop logo
	@GetMapping("/shoplogo/{imageName}")
	public ResponseEntity<byte[]> getShopLogo(@PathVariable String imageName) throws IOException {
		uploadDirShoplogo = uploadDirShoplogo.trim().replaceAll("\\s", "");
		Path imagePath = Paths.get(uploadDirShoplogo, imageName);
		byte[] imageBytes = Files.readAllBytes(imagePath);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
	}

//	download verifictaion documnent
	@RequestMapping(value = "/store_management/download/{id}", method = RequestMethod.GET)
	public void downloadShopVerificationDocs(@PathVariable("id") Long shopVerificationId, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		ShopVerification shopVerification = storeVerificationService.editShopVerification(shopVerificationId).get();
		Path uploadDir = Paths.get(uploadDirShopVerify);
		System.out.println("upload path :" + uploadDir);

		File file = new File(uploadDir + File.separator + shopVerification.getValidIdDoc());
		System.out.println("path :" + file);
		byte[] byteArray = Files.readAllBytes(file.toPath());
		response.setContentType(MimeTypeUtils.APPLICATION_OCTET_STREAM.getType());
		response.setHeader("Content-Disposition", "attachment; filename=" + shopVerification.getValidIdDoc());
		response.setContentLength(byteArray.length);
		OutputStream os = response.getOutputStream();
		try {
			os.write(byteArray, 0, byteArray.length);
		} finally {
			os.close();
		}
	}

	@GetMapping("/addproductimg/{imageName}")
	public ResponseEntity<byte[]> getProductImage(@PathVariable String imageName) throws IOException {
		uploadDirAddProuduct = uploadDirAddProuduct.trim().replaceAll("\\s", "");
		Path imagePath = Paths.get(uploadDirAddProuduct, imageName);
		byte[] imageBytes = Files.readAllBytes(imagePath);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
	}

	@GetMapping("/addAmtByUser/{imageName}")
	public ResponseEntity<byte[]> getRechargeScreenshotImg(@PathVariable String imageName) throws IOException {
		uploadDirAddAmtByUser = uploadDirAddAmtByUser.trim().replaceAll("\\s", "");
		Path imagePath = Paths.get(uploadDirAddAmtByUser, imageName);
		byte[] imageBytes = Files.readAllBytes(imagePath);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
	}
}
