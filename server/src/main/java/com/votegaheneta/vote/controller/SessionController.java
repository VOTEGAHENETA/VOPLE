package com.votegaheneta.vote.controller;

import com.votegaheneta.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/election")
public class SessionController {

  @PostMapping
  public ApiResponse createElection() {
     return ApiResponse.success(HttpStatus.CREATED, "선거 생성 성공", null);
  }
}
