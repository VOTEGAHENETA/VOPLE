package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult.CandidateResult;
import com.votegaheneta.vote.entity.ElectionSession;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Schema(name = "sessionFinalResultFindDto(투표최종결과)", description = "투표의 최종결과를 반환할 dto 객체")
@Getter
@RequiredArgsConstructor
public class SessionFinalResultFindDto {

  private final ElectionSessionDto electionSessionDto;
  private final Float wholeVoterPercent;
  private final List<VoteResult> voteFinalResults;
  private final List<Elected> electedList;

  @Schema(name = "Elected(당선된 팀 객체)")
  @Getter
  @RequiredArgsConstructor
  public static class Elected {
    private final Long voteId;
    private final String voteName;
    private final Long voteTeamId;
    private final String poster;
    private final List<CandidateResult> candidateResults;
  }

  @Schema(name = "ElectionSessionDto(투표세션데이터)", description = "투표세션에 대한 정보를 반환할 dto 객체")
  @Getter
  @RequiredArgsConstructor
  public static class ElectionSessionDto {

    private final Long sessionId;
    private final String sessionName;
    @Schema(name = "wholeVoter(총 투표자수)")
    private final Integer wholeVoter;
    @Schema(name = "votedVoter(투표진행한 투표자수)")
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
