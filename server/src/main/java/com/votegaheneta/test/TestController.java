package com.votegaheneta.test;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// TestController.java
@RestController
@RequestMapping("/api/test")
public class TestController {

  @GetMapping
  public ResponseEntity<String> test() {
    return ResponseEntity.ok("Server is running successfully!");
  }

  // DB 연결 테스트
  @GetMapping("/db")
  public ResponseEntity<String> testDB() {
    try {
      // JPA repository 메소드 호출 또는 EntityManager로 쿼리 실행
      return ResponseEntity.ok("Database connection successful!");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Database connection failed: " + e.getMessage());
    }
  }
}