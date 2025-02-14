package com.votegaheneta.common;

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
    return new ResponseEntity<>(HttpStatus.FORBIDDEN);
  }

  @GetMapping("/login")
  public ResponseEntity<Void> redirectLogin() {
    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }
}
