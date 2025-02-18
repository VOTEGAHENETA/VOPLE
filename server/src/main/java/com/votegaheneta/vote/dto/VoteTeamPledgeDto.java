package com.votegaheneta.vote.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoteTeamPledgeDto {

  private String poster;
  private List<PledgeDto> pledges;
}