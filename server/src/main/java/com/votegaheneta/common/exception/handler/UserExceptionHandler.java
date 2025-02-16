package com.votegaheneta.common.exception.handler;

import com.votegaheneta.common.exception.EmptyOauthUserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserExceptionHandler {

  @ExceptionHandler(EmptyOauthUserException.class)
  public ResponseEntity<String> handleEmptyOauthUserException(EmptyOauthUserException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
