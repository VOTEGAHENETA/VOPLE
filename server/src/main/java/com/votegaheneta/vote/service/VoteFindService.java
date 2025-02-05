package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.SessionFinalResultFindDto;
import com.votegaheneta.vote.dto.SessionFindDto;
import com.votegaheneta.vote.dto.SessionResultFindDto;

public interface VoteFindService {

  public Boolean hasVoted(Long sessionId, Long userId);
  public SessionFindDto findVoteBySessionId(Long sessionId);
  public SessionResultFindDto findVoteResultBySessionId(Long sessionId);
  public SessionFinalResultFindDto findVoteFinalResultBySessionId(Long sessionId);

}
