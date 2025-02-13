package com.votegaheneta.vote.dto;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
  private final LocalDateTime endDate;
  @Schema(description = "voteResults(투표결과 리스트)")
  private final List<VoteResult> voteResults;

  @Getter
  @AllArgsConstructor
  @JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
  public static class VoteResult implements Serializable {

    private Long voteId;
    private String voteName;
    private List<TeamResult> teamResults;

    public VoteResult() {
      this.teamResults = new ArrayList<>();
    }

    @Getter
    @AllArgsConstructor
    @JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
    public static class TeamResult implements Serializable {

      private Long teamId;
      private String prefix;
      private Integer pollCnt;
      private List<CandidateResultDto> voteCandidateDtos;
      private String poster;
      private String candidate_statement;
      private Float teamVotePercent;

      public TeamResult() {
        this.voteCandidateDtos = new ArrayList<>();
      }

      public TeamResult(Long teamId, String prefix, Float teamVotePercent, Integer pollCnt,
          List<CandidateResultDto> voteCandidateDtos) {
        this.teamId = teamId;
        this.prefix = prefix;
        this.teamVotePercent = teamVotePercent;
        this.pollCnt = pollCnt;
        this.voteCandidateDtos = voteCandidateDtos;
      }

      public void setTeamVotePercent(Float teamVotePercent) {
        this.teamVotePercent = teamVotePercent;
      }

      public void adjustVoteTeamPercent(float adjustment) {
        this.teamVotePercent += adjustment;
      }
    }
  }
}

