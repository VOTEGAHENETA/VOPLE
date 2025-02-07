package com.votegaheneta.vote.controller.request;

import com.votegaheneta.user.dto.UserDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CandidateRequestDto {
  private List<List<UserDto>> voteTeamList;
}
