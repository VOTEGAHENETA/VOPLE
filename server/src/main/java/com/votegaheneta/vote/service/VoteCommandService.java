package com.votegaheneta.vote.service;

import com.votegaheneta.vote.controller.request.VoteCastRequest;

public interface VoteCommandService {
  public void castVote(VoteCastRequest voteCastRequest, Long sessionId);


}
