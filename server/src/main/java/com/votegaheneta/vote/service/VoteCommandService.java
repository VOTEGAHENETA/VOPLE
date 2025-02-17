package com.votegaheneta.vote.service;

import com.votegaheneta.vote.controller.request.VoteCastRequest;

public interface VoteCommandService {
  public void castVote(VoteCastRequest voteCastRequest, Long sessionId, Long userId);
  public void createVote(Long sessionId, String voteName);
  public void deleteVote(Long voteId);
  long saveVoteUserInfo(Long sessionId, Long userId);
}
