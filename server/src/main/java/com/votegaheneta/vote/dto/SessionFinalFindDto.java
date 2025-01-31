package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.ElectionSession;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SessionFinalFindDto {

  private final ElectionSessionDto electionSessionDto;
  private final Float wholeVoterPercent;
  private final List<VoteFinalResult> voteFinalResults;

  @Getter
  @RequiredArgsConstructor
  public static class ElectionSessionDto {
    private final Long sessionId;
    private final String sessionName;
    private final Integer wholeVoter;
    private final Integer votedVoter;
    private final LocalDateTime voteStartTime;
    private final LocalDateTime voteEndTime;

    public ElectionSessionDto from(ElectionSession electionSession) {
      return new ElectionSessionDto(
          electionSession.getId(),
          electionSession.getSessionName(),
          electionSession.getWholeVoter(),
          electionSession.getVotedVoter(),
          electionSession.getVoteStartTime(),
          electionSession.getVoteEndTime()
      );
    }
  }
  @Getter
  @RequiredArgsConstructor
  public static class VoteFinalResult {
    private final Long voteId;
    private final String voteName;
    private final Elected Elected;

    @Getter
    @RequiredArgsConstructor
    private static class Elected {
      private final Long voteTeamId;
      private final String poster;
      private final String prefix;

    }
  }

  @Getter
  @RequiredArgsConstructor
  public static class TeamFinalResult {}

  @Getter
  @RequiredArgsConstructor
  public static class candidateFinalResult {}

}
