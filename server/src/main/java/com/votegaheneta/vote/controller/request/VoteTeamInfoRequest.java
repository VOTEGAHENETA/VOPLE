package com.votegaheneta.vote.controller.request;

import com.votegaheneta.vote.dto.PledgeDto;
import com.votegaheneta.vote.dto.VoteTeamDto;
import lombok.Data;

@Data
public class VoteTeamInfoRequest {
  private VoteTeamDto voteTeam;
  private PledgeDto[] pledges;
}
