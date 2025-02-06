package com.votegaheneta.vote.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CandidateResultDto {
  private final Long candidateId;
  private final Long userId;
  private final String userName;
}
