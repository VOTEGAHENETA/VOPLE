package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import com.votegaheneta.vote.entity.VoteStatus;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SessionInitialInfoDto {
  private Long sessionId;
  private String sessionName;
  private VoteStatus voteStatus;
  private List<VoteResult> voteResults;
  private Float wholeVoterPercent;
}
