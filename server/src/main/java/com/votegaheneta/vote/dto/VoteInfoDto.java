package com.votegaheneta.vote.dto;

import com.votegaheneta.vote.entity.Candidate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoteInfoDto {
  private Long userId;
  private String username;
  private String nickname;

  public static VoteInfoDto from(Candidate candidate) {
    return new VoteInfoDto(
        candidate.getUser().getId(),
        candidate.getUser().getUsername(),
        candidate.getUser().getNickname()
    );
  }
}
