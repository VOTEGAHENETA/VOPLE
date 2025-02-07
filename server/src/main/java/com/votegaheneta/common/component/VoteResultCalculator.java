package com.votegaheneta.common.component;

import com.votegaheneta.vote.dto.CandidateResultDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.TeamResult;
import com.votegaheneta.vote.dto.VoteResultProjection;
import com.votegaheneta.vote.repository.CandidateRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    List<VoteResult> voteResults = new ArrayList<>();
    Map<Long, Map<Long, TeamResult>> voteMap = new HashMap<>();
    // 1번 투표, 1번
    List<VoteResultProjection> votes = voteRepository.findVotesBySessionId(sessionId);
    for (VoteResultProjection vote : votes) {
      // voteId, voteName은 2개
      // voteTeam은 2팀
      // candidate는 2명
      voteMap.computeIfAbsent(vote.getVoteId(), K ->
        new HashMap<>()).computeIfAbsent(vote.getTeamId(), k ->
          new TeamResult(
              vote.getTeamId(),
              vote.getPrefix(),
              vote.getPollCnt(),
              new ArrayList(),
              vote.getPoster(),
              vote.getCandidateStatement(),
              0.0f
          )).getVoteCandidateDtos().add(
              new CandidateResultDto(
                  vote.getCandidateId(),
                  vote.getUserId(),
                  vote.getUserName()
              ));
    }
    // pollCount 계산
    return null;
  }
}
