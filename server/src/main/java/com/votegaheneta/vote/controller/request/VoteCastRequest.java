package com.votegaheneta.vote.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class VoteCastRequest {
  private Long userId;
  private Long voteId;
  private Long voteTeamId;
}
