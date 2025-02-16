package com.votegaheneta.common;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/redirect")
public class RedirectController {

  @Operation(
      summary = "암구호 리다이렉트 API",
      description = """
          403 코드를 반환해 프론트엔드에서 암구호 화면으로 리다이렉트하도록 유도합니다.
          """
  )
  @GetMapping("/elections/{sessionId}/question")
  public ResponseEntity<Void> redirectQuestion(@PathVariable Long sessionId) {
    return new ResponseEntity<>(HttpStatus.FORBIDDEN);
  }

  @Operation(
      summary = "로그인 리다이렉트 API",
      description = """
          인증되지 않은 사용자를 /login 페이지로 리다이렉트합니다.
          """
  )
  @GetMapping("/login")
  public ResponseEntity<Void> redirectLogin() {
    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }
}
