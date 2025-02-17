package com.votegaheneta.common.exception.handler;

import com.votegaheneta.common.exception.EmptyOauthUserException;
import com.votegaheneta.common.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserExceptionHandler {

  @ExceptionHandler(EmptyOauthUserException.class)
  public ApiResponse<String> handleEmptyOauthUserException(EmptyOauthUserException e) {
    return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
  }
}
