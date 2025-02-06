package com.votegaheneta.vote.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Schema(name = "SessionResultFindDto", description = "(현재진행중인 투표 결과)")
@Getter
@RequiredArgsConstructor
public class SessionResultFindDto {
  
  private final String sessionName;
  @Schema(description = "wholeVoterPercent(총투표자 퍼센트)")
  private final Float wholeVoterPercent;
  @Schema(description = "voteResults(투표결과 리스트)")
  private final List<VoteResult> voteResults;

  @Getter
  @RequiredArgsConstructor
  public static class VoteResult {

    private final Long voteId;
    private final String voteName;
    private final List<TeamResult> teamResults;

    @Getter
    @AllArgsConstructor
    public static class TeamResult {

      private final Long teamId;
      private final String prefix;
      private final Integer pollCnt;
      private final List<CandidateResultDto> voteCandidateDtos;
      private String poster;
      private String candidate_statement;
      private Float teamVotePercent;

      public TeamResult(Long teamId, String prefix, Float teamVotePercent, Integer pollCnt,
          List<CandidateResultDto> voteCandidateDtos) {
        this.teamId = teamId;
        this.prefix = prefix;
        this.teamVotePercent = teamVotePercent;
        this.pollCnt = pollCnt;
        this.voteCandidateDtos = voteCandidateDtos;
      }
      public void adjustVoteTeamPercent(float adjustment) {
        this.teamVotePercent += adjustment;
      }
    }
  }
}

