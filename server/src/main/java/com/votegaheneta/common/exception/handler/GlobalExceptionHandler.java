package com.votegaheneta.common.exception.handler;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import com.votegaheneta.common.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ApiResponse<String> handleNotFoundException(NotFoundException e) {
    log.warn("NotFoundException | " + e.getMessage());
    return ApiResponse.fail(NOT_FOUND, e.getMessage());
  }

  @ExceptionHandler(BadRequestException.class)
  public ApiResponse<String> handleBadRequestException(BadRequestException e) {
    log.warn("BadRequestException | " + e.getMessage());
    return ApiResponse.fail(BAD_REQUEST, e.getMessage());
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ApiResponse<String> handleIllegalArgumentException(IllegalArgumentException e) {
    log.warn("illegalArgumentException | " + e.getMessage());
    return ApiResponse.fail(BAD_REQUEST, e.getMessage());
  }

  @ExceptionHandler(RuntimeException.class)
  public ApiResponse<String> handleRuntimeException(RuntimeException e) {
    log.error("", e);
    return ApiResponse.fail(INTERNAL_SERVER_ERROR, e.getMessage());
  }

  @ExceptionHandler(Exception.class)
  public ApiResponse<String> handleException(Exception e) {
    log.error("", e);
    return ApiResponse.fail(INTERNAL_SERVER_ERROR, e.getMessage());
  }
}
