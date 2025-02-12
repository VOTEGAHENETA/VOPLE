package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.VoteTeam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for {@link com.votegaheneta.vote.entity.VoteTeam}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteTeamDto {
  private Long voteTeamId;
  private String poster;
  private String prefix;
  private String candidateStatement;

  public void updateVoteTeamInfo(VoteTeam voteTeam) {
    voteTeam.setPoster(this.poster);
    voteTeam.setPrefix(this.prefix);
    voteTeam.setCandidateStatement(this.candidateStatement);
  }

  public VoteTeamDto(VoteTeam voteTeam) {
    this.poster = voteTeam.getPoster();
    this.prefix = voteTeam.getPrefix();
    this.candidateStatement = voteTeam.getCandidateStatement();
  }

}