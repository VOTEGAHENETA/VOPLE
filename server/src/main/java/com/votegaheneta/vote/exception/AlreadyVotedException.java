package com.votegaheneta.vote.exception;

import com.votegaheneta.common.exception.VopleExcpetion;

public class AlreadyVotedException extends VopleExcpetion {

  public AlreadyVotedException(String message) {
    super(message);
  }

  public AlreadyVotedException(Throwable cause) {
    super(cause);
  }

  public AlreadyVotedException(String message, Throwable cause) {
    super(message, cause);
  }
}
