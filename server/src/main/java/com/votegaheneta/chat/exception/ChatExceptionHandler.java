package com.votegaheneta.chat.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ChatExceptionHandler {

  @ExceptionHandler(InvalidChatRoomException.class)
  public ResponseEntity handleInvalidChatRoomException(InvalidChatRoomException e) {
    return ResponseEntity.status(e.getErrorCode()).body(e.getMessage());
  }
}
