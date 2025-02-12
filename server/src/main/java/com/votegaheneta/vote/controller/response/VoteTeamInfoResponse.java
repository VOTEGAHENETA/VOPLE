package com.votegaheneta.vote.controller.response;

import com.votegaheneta.vote.dto.PledgeDto;
import com.votegaheneta.vote.dto.VoteTeamDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VoteTeamInfoResponse {
  private VoteTeamDto voteTeam;
  private List<PledgeDto> pledges;
}
