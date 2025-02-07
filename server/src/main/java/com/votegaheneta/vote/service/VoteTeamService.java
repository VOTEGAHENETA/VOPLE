package com.votegaheneta.vote.service;

import com.votegaheneta.vote.controller.request.CandidateRequestDto;
import com.votegaheneta.vote.controller.request.VoteTeamInfoRequest;

public interface VoteTeamService {
  void modifyVoteTeam(Long sessionId, Long voteId, CandidateRequestDto candidateRequest);
  void updateVoteTeamInfo(Long sessionId, VoteTeamInfoRequest voteTeamInfoRequest);
}
