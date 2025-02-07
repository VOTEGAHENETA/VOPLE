package com.votegaheneta.vote.dto;

public interface VoteResultProjection {
  Long getVoteId();
  String getVoteName();
  Long getTeamId();
  String getPrefix();
  Integer getPollCnt();
  String getPoster();
  String getCandidateStatement();
  Float getTeamVotePercent();
  Long getCandidateId();
  Long getUserId();
  String getUserName();
}
