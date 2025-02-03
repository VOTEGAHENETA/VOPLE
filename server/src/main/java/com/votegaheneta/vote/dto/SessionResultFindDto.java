package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.Candidate;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Schema(name = "SessionResultFindDto(현재진행중인 투표 결과)")
@Getter
@RequiredArgsConstructor
public class SessionResultFindDto {
  
  private final String sessionName;
  @Schema(name = "wholeVoterPercent(총투표자 퍼센트)")
  private final Float wholeVoterPercent;
  @Schema(name = "voteResults(투표결과 리스트)")
  private final List<VoteResult> voteResults;

  @Getter
  @RequiredArgsConstructor
  public static class VoteResult {

    private final Long voteId;
    private final String voteName;
    @Schema(name = "투표팀 리스트")
    private final List<TeamResult> teamResults;

    @Getter
    @AllArgsConstructor
    public static class TeamResult {

      private final Long teamId;
      private final String poster;
      private Float teamVotePercent;
      private Integer pollCnt;
      private final List<CandidateResult> voteCandidateDtos;

      public void adjustVoteTeamPercent(float adjustment) {
        this.teamVotePercent += adjustment;
      }

    }

    @Getter
    @RequiredArgsConstructor
    public static class CandidateResult {

      private final Long candidateId;
      private final Long userId;
      private final String userName;

      public static CandidateResult from(Candidate candidate) {
        return new CandidateResult(
            candidate.getId(),
            candidate.getUser().getId(),
            candidate.getUser().getUsername()
        );
      }
    }
  }
}

