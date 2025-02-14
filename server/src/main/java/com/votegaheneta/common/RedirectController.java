package com.votegaheneta.common;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/redirect")
public class RedirectController {

  @GetMapping("/elections/{sessionId}/question")
  public ResponseEntity<Void> redirectQuestion(@PathVariable Long sessionId) {
    HttpHeaders headers = new HttpHeaders();
    headers.setAccessControlAllowOrigin("http://localhost:5173");
    headers.setAccessControlRequestMethod(HttpMethod.GET);
    String redirectURL = String.format("/elections/%d/question", sessionId);
    return new ResponseEntity<>(headers, HttpStatus.FORBIDDEN);
  }
}
