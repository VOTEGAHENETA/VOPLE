package com.votegaheneta.vote.dto;

import com.votegaheneta.user.dto.UserDto;
import java.util.List;
import java.util.Map;
import lombok.Getter;

@Getter
public class VoteDetailDto {
  private List<UserDto> userList;
  private Map<Long, List<CandidateDto>> candidateList;

  public VoteDetailDto(List<UserDto> userList, Map<Long, List<CandidateDto>> candidateList) {
    this.userList = userList;
    this.candidateList = candidateList;
  }
}
