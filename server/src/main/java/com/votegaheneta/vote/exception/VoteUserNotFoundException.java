package com.votegaheneta.vote.exception;

import com.votegaheneta.common.exception.VopleExcpetion;

public class VoteUserNotFoundException extends VopleExcpetion {

  public VoteUserNotFoundException(String message) {
    super(message);
  }

  public VoteUserNotFoundException(Throwable cause) {
    super(cause);
  }

  public VoteUserNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }
}
