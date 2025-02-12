package com.votegaheneta.vote.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoteInfoDto {
  private Long userId;
  private String userName;
  private String nickname;
}
