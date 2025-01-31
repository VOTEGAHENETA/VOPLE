package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.CandidateResult;
import com.votegaheneta.vote.entity.ElectionSession;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SessionFinalResultFindDto {

  private final ElectionSessionDto electionSessionDto;
  private final Float wholeVoterPercent;
  private final List<VoteResult> voteFinalResults;
  private final List<Elected> electedList;

  @Getter
  @RequiredArgsConstructor
  public static class Elected {
    private final Long voteId;
    private final String voteName;
    private final Long voteTeamId;
    private final String poster;
    private final List<CandidateResult> candidateResults;
  }

  @Getter
  @RequiredArgsConstructor
  public static class ElectionSessionDto {

    private final Long sessionId;
    private final String sessionName;
    private final Integer wholeVoter;
    private final Integer votedVoter;
    private final LocalDateTime voteStartTime;
    private final LocalDateTime voteEndTime;

    public static ElectionSessionDto from(ElectionSession electionSession) {
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
}
