package com.votegaheneta.common;

import com.votegaheneta.common.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/redirect")
public class RedirectController {

  @GetMapping("/elections/{sessionId}/question")
  public ApiResponse<Boolean> redirectQuestion(@PathVariable Long sessionId) {
//    HttpHeaders headers = new HttpHeaders();
//    String redirectURL = String.format("/elections/%d/question", sessionId);
    return ApiResponse.success(HttpStatus.FORBIDDEN, "질문 페이지로 리다이렉트", true);
  }
}
