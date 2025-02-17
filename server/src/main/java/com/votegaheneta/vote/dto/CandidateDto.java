package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.Candidate;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CandidateDto {
  private final Long voteTeamId;
  private final Long userId;
  private final String username;

  public static CandidateDto fromEntity(Candidate candidate) {
    return new CandidateDto(candidate.getVoteTeam().getId(), candidate.getUser().getId(), candidate.getUser().getUsername());
  }
}
