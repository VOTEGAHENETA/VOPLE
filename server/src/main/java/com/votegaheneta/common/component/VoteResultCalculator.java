package com.votegaheneta.common.component;

import com.votegaheneta.vote.dto.CandidateResultDto;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.TeamResult;
import com.votegaheneta.vote.dto.VoteResultProjection;
import com.votegaheneta.vote.repository.CandidateRepository;
import com.votegaheneta.vote.repository.VoteRepository;
import com.votegaheneta.vote.repository.VoteTeamRepository;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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
    // 일단 투표 ID를 기준으로 teaid를 그룹화
    List<VoteResultProjection> voteResultProjections = voteRepository.findVotesBySessionId(
        sessionId);
    Map<Long, Map<Long, List<VoteResultProjection>>> voteMap = voteResultProjections.stream()
        .collect(Collectors.groupingBy(VoteResultProjection::getVoteId,
            Collectors.groupingBy(VoteResultProjection::getVoteTeamId)));
    // 투표id를 기준으로 반복
    return voteMap.entrySet().stream().map(
        voteEntry -> {
          Long voteId = voteEntry.getKey();
          Map<Long, List<VoteResultProjection>> teamEntry = voteEntry.getValue();
          List<TeamResult> teamResults = teamEntry.values().stream().map(
              teamResultProjection -> {
                VoteResultProjection firstVoteResult = teamResultProjection.get(0);
                List<CandidateResultDto> candidateResultDtos = teamResultProjection.stream().map(
                    candidate ->
                        new CandidateResultDto(
                            candidate.getCandidateId(),
                            candidate.getUserId(),
                            candidate.getUserName()
                        )).toList();
                return new TeamResult(
                    firstVoteResult.getVoteTeamId(),
                    firstVoteResult.getPrefix(),
                    firstVoteResult.getPollCnt(),
                    candidateResultDtos,
                    firstVoteResult.getPoster(),
                    firstVoteResult.getCandidateStatement(),
                    firstVoteResult.getTeamVotePercent()
                );
              }).toList();
          float teamVotetotalCount = 0.0f;
          for (TeamResult teamResult : teamResults) {
            teamVotetotalCount += teamResult.getPollCnt();
          }
          for (TeamResult teamResult : teamResults) {
            teamResult.setTeamVotePercent((float) (Math.round((teamVotetotalCount > 0 ?
                (teamResult.getPollCnt() / teamVotetotalCount) * 100 : 0.0f) * 10) / 10));
          }
          float voteTotalPercent = 0.0f;
          for (TeamResult teamResult : teamResults) {
            voteTotalPercent += teamResult.getTeamVotePercent();
          }
          TeamResult maxTeamResult = null;
          float maxTeamVotePercent = 0.0f;
          for (TeamResult teamResult : teamResults) {
            if (teamResult.getTeamVotePercent() > maxTeamVotePercent) {
              maxTeamVotePercent = teamResult.getTeamVotePercent();
              maxTeamResult = teamResult;
            }
            // 최종 조정치 계산
          }
          if (maxTeamResult != null) {
            float adjustment = 100f - voteTotalPercent;
            maxTeamResult.adjustVoteTeamPercent(adjustment);
          }

          return new VoteResult(
              voteId,
              voteResultProjections.stream()
                  .filter(voteResultProjection -> voteResultProjection.getVoteId().equals(voteId))
                  .map(VoteResultProjection::getVoteName).findFirst().orElse(""),
              teamResults
          );
        }
    ).toList();
  }
}
