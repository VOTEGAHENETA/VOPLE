package com.votegaheneta.vote.dto;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
public class CandidateResultDto implements Serializable {
  private Long candidateId;
  private Long userId;
  private String userName;
}
