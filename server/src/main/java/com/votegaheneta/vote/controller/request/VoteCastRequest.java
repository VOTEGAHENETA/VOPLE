package com.votegaheneta.vote.controller.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoteCastRequest {
  private Long userId;
  private List<VoteSelection> voteSelections;

  @Getter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class VoteSelection {
    private Long voteId;
    private Long voteTeamId;
  }
}
