package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.Vote;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SessionEditDto {

  private SessionDto sessionDto;
  private List<VoteEditInfo> voteEditInfos;

  @Getter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class VoteEditInfo {
    private Long voteId;
    private String sessionName;
    private String voteName;

    public static VoteEditInfo from(Vote vote, String sessionName) {
      return new VoteEditInfo(
          vote.getId(),
          sessionName,
          vote.getVoteName()
      );
    }
  }
}
