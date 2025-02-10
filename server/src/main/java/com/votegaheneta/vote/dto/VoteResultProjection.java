package com.votegaheneta.vote.dto;

import lombok.Getter;

@Getter
public class VoteResultProjection {
  private final Long voteId;
  private final String voteName;
  private final Long voteTeamId;
  private final String prefix;
  private final String poster;
  private final Integer pollCnt;
  private final String candidateStatement;
  private final Long candidateId;
  private final Long userId;
  private final String userName;
  private Float teamVotePercent;  // 추가

  // 이 생성자가 반드시 있어야 함
  public VoteResultProjection(
      Long voteId,
      String voteName,
      Long voteTeamId,
      String prefix,
      String poster,
      Integer pollCnt,
      String candidateStatement,
      Long candidateId,
      Long userId,
      String userName
  ) {
    this.voteId = voteId;
    this.voteName = voteName;
    this.voteTeamId = voteTeamId;
    this.prefix = prefix;
    this.poster = poster;
    this.pollCnt = pollCnt;
    this.candidateStatement = candidateStatement;
    this.candidateId = candidateId;
    this.userId = userId;
    this.userName = userName;
  }
}
