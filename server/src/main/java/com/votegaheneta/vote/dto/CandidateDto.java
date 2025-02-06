package com.votegaheneta.vote.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CandidateDto {
  private final Long voteTeamId;
  private final Long userId;
  private final String username;
}
