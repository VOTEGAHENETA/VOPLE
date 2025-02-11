package com.votegaheneta.chat.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class InvalidChatRoomException extends RuntimeException {
  private final HttpStatus errorCode = HttpStatus.NOT_FOUND;

  public InvalidChatRoomException(String message) {
    super(message);
  }
}
