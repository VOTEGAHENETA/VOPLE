package com.votegaheneta.chat.exception;

import com.votegaheneta.common.response.ApiResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ChatExceptionHandler {

  @ExceptionHandler(InvalidChatRoomException.class)
  public ApiResponse handleInvalidChatRoomException(InvalidChatRoomException e) {
    return ApiResponse.fail(e.getErrorCode(), e.getMessage());
  }
}
