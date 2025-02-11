package com.votegaheneta.vote.controller.response;


import com.votegaheneta.vote.dto.SessionListDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponse {
  private List<SessionListDto> involvedSessions;
  private List<SessionListDto> managedSessions;
}
