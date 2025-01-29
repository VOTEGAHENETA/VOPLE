package com.votegaheneta.vote.service;

import com.votegaheneta.vote.dto.VoteFindDto;
import com.votegaheneta.vote.entity.Vote;
import com.votegaheneta.vote.entity.VoteTeam;
import com.votegaheneta.vote.repository.VoteRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 생성, 조회, 수정, 삭제 관련 투표 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class VoteFindService {

  private final VoteRepository voteRepository;

  @Transactional(readOnly = true)
  public VoteFindDto findVoteByVoteId(Long voteId) {
    Optional<Vote> vote = voteRepository.findById(voteId);
    Vote voteEntity = vote.orElseThrow(() -> new IllegalArgumentException("투표를 찾을 수 없습니다."));
    List<VoteTeam> voteTeams = voteRepository.findVoteTeamWithCandidateByVoteId(voteId);
    return VoteFindDto.from(voteEntity, voteTeams);
  }
}
