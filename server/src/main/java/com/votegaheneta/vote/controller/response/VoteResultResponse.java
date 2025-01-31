package com.votegaheneta.vote.controller.response;

import com.votegaheneta.vote.dto.SessionResultFindDto.VoteResult;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoteResultResponse {

  private Long electionSessionId;
  private List<VoteResult> voteResultFindDtos;
}
