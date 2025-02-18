package com.votegaheneta.vote.service;

import com.votegaheneta.vote.controller.request.CandidateRequestDto;
import com.votegaheneta.vote.controller.request.VoteTeamInfoRequest;
import com.votegaheneta.vote.controller.response.VoteTeamInfoResponse;
import com.votegaheneta.vote.dto.VoteTeamPledgeDto;
import org.springframework.web.multipart.MultipartFile;

public interface VoteTeamService {
  void modifyVoteTeam(Long sessionId, Long voteId, CandidateRequestDto candidateRequest);
  void updateVoteTeamInfo(VoteTeamInfoRequest voteTeamInfoRequest, MultipartFile file);
  VoteTeamInfoResponse getVoteTeamInfo(Long sessionId, Long userId);
  VoteTeamPledgeDto getVoteTeamInfoDetail(Long teamId);
}
