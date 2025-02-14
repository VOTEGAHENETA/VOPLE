package com.votegaheneta.common.exception;

public class EmptyOauthUserException extends RuntimeException {

  private static final String MESSAGE = "Oauth user가 null입니다.";

  public EmptyOauthUserException() {
    super(MESSAGE);
  }
}
