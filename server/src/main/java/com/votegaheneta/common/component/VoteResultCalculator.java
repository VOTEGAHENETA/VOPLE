package com.votegaheneta.common.component;

import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.repository.CandidateRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VoteResultCalculator {

  private final VoteRepository voteRepository;
  private final VoteTeamRepository voteTeamRepository;
  private final CandidateRepository candidateRepository;

  /**
   * 투표 결과 집계 로직 JPA 성능이슈가 있어서 로직 조금 수정 필요
   *
   * @param sessionId
   * @return List<VoteResult>
   */
  public List<VoteResult> calculateVoteResult(Long sessionId) {
    // 결과값 빼려면 wholeVoterPercent, VoteResults 이거 2개를 빼야하니까
//    List<VoteResult> voteResults = new ArrayList<>();
//    List<VoteResultProjection> votes = voteRepository.findVotesBySessionId(sessionId);
//    votes.stream().map(
//        voteResultProjection -> {
//
//        }
//    )
    return null;
//
  }
}
