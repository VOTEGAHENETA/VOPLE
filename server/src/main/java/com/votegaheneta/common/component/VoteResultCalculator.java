package com.votegaheneta.common.component;

import com.votegaheneta.vote.dto.CandidateResultDto;
import com.votegaheneta.vote.dto.SessionFinalResultFindDto.Elected;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.TeamResult;
import com.votegaheneta.vote.dto.VoteResultProjection;
import com.votegaheneta.vote.repository.CustomVoteRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class VoteResultCalculator {

  private final CustomVoteRepository customVoteRepository;

  public VoteResultCalculator(
      @Qualifier("customVoteRepositoryImpl") CustomVoteRepository customVoteRepository) {
    this.customVoteRepository = customVoteRepository;
  }

  public List<Elected> electionListResult(List<VoteResult> voteResults) {
    List<Elected> electedList = new ArrayList<>();
    for (VoteResult voteResult : voteResults) {
      List<TeamResult> maxTeamResultList = new ArrayList<>();
      int max = -1;
      for (TeamResult teamResult : voteResult.getTeamResults()) {
        if (teamResult.getPollCnt() > max) {
          max = teamResult.getPollCnt();
          maxTeamResultList.clear();
          maxTeamResultList.add(teamResult);
        } else if (teamResult.getPollCnt() == max) {
          maxTeamResultList.add(teamResult);
        }
      }
      TeamResult minIdTeam = maxTeamResultList.get(0);
      for (TeamResult team : maxTeamResultList) {
        if (team.getTeamId() < minIdTeam.getTeamId()) {
          minIdTeam = team;
        }
      }
      maxTeamResultList.clear();
      electedList.add(
          new Elected(
              voteResult.getVoteId(),
              voteResult.getVoteName(),
              minIdTeam.getTeamId(),
              minIdTeam.getPrefix(),
              minIdTeam.getPoster(),
              minIdTeam.getVoteCandidateDtos())
      );
    }
    return electedList;
  }

  /**
   * 투표 결과 집계 로직
   *
   * @param sessionId
   * @return List<VoteResult>
   */
  public List<VoteResult> calculateVoteResult(Long sessionId) {
    List<VoteResultProjection> voteResultProjections = customVoteRepository.findVoteResultBySessionId(
        sessionId);
    // 1. null이 아닌 voteTeamId를 가진 항목만 그룹화
    Map<Long, Map<Long, List<VoteResultProjection>>> voteMap = voteResultProjections.stream()
        .filter(projection -> projection.getVoteTeamId() != null)
        .collect(Collectors.groupingBy(VoteResultProjection::getVoteId,
            Collectors.groupingBy(VoteResultProjection::getVoteTeamId)));
    return voteResultProjections.stream()
        .map(VoteResultProjection::getVoteId)
        .distinct()
        .map(voteId -> {
          String voteName = voteResultProjections.stream()
              .filter(p -> p.getVoteId().equals(voteId))
              .map(VoteResultProjection::getVoteName)
              .findFirst()
              .orElse("");
          // voteId에 해당하는 팀 결과가 있는 경우에만 처리
          List<TeamResult> teamResults = voteMap.containsKey(voteId)
              ? voteMap.get(voteId).values().stream()
              .map(teamResultProjection -> {
                VoteResultProjection firstVoteResult = teamResultProjection.get(0);
                System.out.println("Team ID: " + firstVoteResult.getVoteTeamId() + ", PollCnt: "
                    + firstVoteResult.getPollCnt());
                List<CandidateResultDto> candidateResultDtos = teamResultProjection.stream()
                    .filter(candidate -> candidate.getCandidateId() != null)
                    .map(candidate -> new CandidateResultDto(
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
              })
              .sorted((a, b) -> b.getPollCnt().compareTo(a.getPollCnt()))
              .toList()
              : new ArrayList<>();
          if (!teamResults.isEmpty()) {
            float teamVotetotalCount = teamResults.stream()
                .map(TeamResult::getPollCnt)
                .reduce(0, Integer::sum)
                .floatValue();
            // 투표수에 따라 비율 계산 (0표면 0%로 설정)
            teamResults.forEach(teamResult -> {
              if (teamVotetotalCount == 0 || teamResult.getPollCnt() == 0) {
                teamResult.setTeamVotePercent(0.0f);
              } else {
                teamResult.setTeamVotePercent((float) (Math.round(
                    (teamResult.getPollCnt() / teamVotetotalCount) * 100 * 10) / 10));
              }
            });
            // 최종 조정
            float voteTotalPercent = teamResults.stream()
                .map(TeamResult::getTeamVotePercent)
                .reduce(0.0f, Float::sum);
            if (voteTotalPercent < 100f && !teamResults.isEmpty()) {
              TeamResult maxTeamResult = teamResults.stream()
                  .filter(team -> team.getPollCnt() > 0)
                  .max(Comparator.comparing(TeamResult::getTeamVotePercent))
                  .orElse(null);
              if (maxTeamResult != null) {
                float adjustment = 100f - voteTotalPercent;
                maxTeamResult.adjustVoteTeamPercent(adjustment);
              }
            }
          }
          return new VoteResult(voteId, voteName, teamResults);
        })
        .sorted(Comparator.comparing(VoteResult::getVoteId))
        .collect(Collectors.toCollection(ArrayList::new));
  }
}
