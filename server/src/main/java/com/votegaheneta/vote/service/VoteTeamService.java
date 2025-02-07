package com.votegaheneta.vote.service;

import com.votegaheneta.vote.controller.request.CandidateRequestDto;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoteTeamService {

  private final VoteTeamRepository voteTeamRepository;
//  private final CandidateRepository candidateRepository;
//  private final PledgeRepository pledgeRepository;
//  private final StreamRepository streamRepository;

  public void modifyVoteTeam(Long sessionId, Long voteId) {
    voteTeamRepository.deleteVoteTeamByVoteId(voteId);
  }

  private void deleteAllVoteTeam(Long voteId) {

  }

  private void createVoteTeam(Long voteId, CandidateRequestDto request) {
    
  }

  private void createCandidate(Long voteTeamId, Long userId) {

  }
}
