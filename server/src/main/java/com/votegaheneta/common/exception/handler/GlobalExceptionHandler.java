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
  public ApiResponse<Void> handleNotFoundException(NotFoundException e) {
    log.warn("NotFoundException | " + e.getMessage());
    return ApiResponse.fail(NOT_FOUND, e.getMessage());
  }

  @ExceptionHandler(BadRequestException.class)
  public ApiResponse<Void> handleBadRequestException(BadRequestException e) {
    log.warn("BadRequestException | " + e.getMessage());
    return ApiResponse.fail(BAD_REQUEST, e.getMessage());
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ApiResponse<Void> handleIllegalArgumentException(IllegalArgumentException e) {
    log.warn("illegalArgumentException | " + e.getMessage());
    return ApiResponse.fail(BAD_REQUEST, e.getMessage());
  }

  @ExceptionHandler(RuntimeException.class)
  public ApiResponse<Void> handleRuntimeException(RuntimeException e) {
    log.error("", e);
    return ApiResponse
        .fail(INTERNAL_SERVER_ERROR, e.getMessage());
  }

  @ExceptionHandler(Exception.class)
  public ApiResponse<Void> handleException(Exception e) {
    log.error("", e);
    return ApiResponse
        .fail(INTERNAL_SERVER_ERROR, "서버에서 알 수 없는 오류가 발생했습니다. 잠시후 다시 시도해 주세요");
  }
}
