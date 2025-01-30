package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.Candidate;
import com.votegaheneta.vote.entity.VoteTeam;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public class SessionResultFindDto {
  private final Long sessionId;
  private final String sessionName;
  private final Float wholeVoterPercent;
  private final List<VoteResult> voteResults;

  @Getter
  @RequiredArgsConstructor
  public static class VoteResult {
    private final Long voteId;
    private final String voteName;
    private final Float totalVotePercent;
    private final List<TeamResult> voteTeamResultDtos;

    @Getter
    @AllArgsConstructor
    public static class TeamResult {
      private final Long teamId;
      //    private final String poster;
      private Float teamVotePercent;
      private final List<CandidateResult> voteCandidateDtos;

      public void adjustVoteTeamPercent(float adjustment) {
        this.teamVotePercent += adjustment;
      }

      public static TeamResult from(VoteTeam voteTeam, Float teamVotePercent) {
        return new TeamResult(
            voteTeam.getId(),
            //voteTeam.getPoster(),
            teamVotePercent,
            voteTeam.getCandidates().stream().map(CandidateResult::from).toList()
        );
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

